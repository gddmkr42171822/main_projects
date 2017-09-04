import csv
import random
import re
import sys
import numpy as np
from os import listdir
from os.path import isfile, join
from collections import OrderedDict

from sklearn.naive_bayes import MultinomialNB
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.utils import shuffle
from sklearn.model_selection import cross_val_score
from sklearn.ensemble import AdaBoostClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.linear_model import Perceptron
from sklearn.pipeline import FeatureUnion
from sklearn.pipeline import Pipeline

from nltk.corpus import stopwords
from nltk.stem.snowball import SnowballStemmer
from nltk import pos_tag

import sqlite3

# Prevent the csv reader from throwing an error about the size of the
# field it is reading in.
csv.field_size_limit(sys.maxsize)

class POSCountTokenizer(object):
  def __call__(self, text):
      words = text.split()
      words_and_pos_tags = pos_tag(words)
      # Return a list of the part of speech for each word in the sentence.
      return [word_and_pos[1] for word_and_pos in words_and_pos_tags]

def AppendPartsOfSpeechToWords(words):
  text_modified = []
  words_and_pos_tags = pos_tag(words)
  # return a list of 'word_pos'
  for word_and_pos in words_and_pos_tags:
    text_modified.append(word_and_pos[0] + '_' + word_and_pos[1])
  return text_modified

def GetSamplesFromCSVFiles(files):
  X = []
  y = []
  for f in files:
    if f.endswith('.csv'):
      with open(f, 'r') as csvfile:
        reader = csv.reader(csvfile)
        for row in reader:
          X.append(row[1])
          y.append(row[0])
  return (np.array(X), np.array(y))

def RemoveStopWords(stop_words, word_list):
  filtered_text = [
  word for word in word_list if word.lower() not in stop_words]
  return filtered_text

def StemText(stemmer, word_list):
  stemmed_text = [stemmer.stem(word) for word in word_list]
  # Remove duplicate strings in the stemmed_text list while keeping the original order.
  return list(OrderedDict.fromkeys(stemmed_text))

def KeepWordsSpacesOnly(text):
  regex = re.compile(r'[^a-zA-Z ]')
  text = regex.sub('', text)
  return text

def PreprocessSamplesFromCSVFiles(y, X, ws, sw, st, pos):
  print 'Preprocessing samples...'
  stop_words = stopwords.words('english')
  stemmer = SnowballStemmer('english')
  X_modified = []
  y_modified = []
  # Preprocess the training examples: remove stop words, stem the words, etc.
  for line, author in zip(X, y):
    if ws: line = KeepWordsSpacesOnly(line)
    line.lower()
    # Tokenize the line into a list of words.
    line = line.split()
    if sw: line = RemoveStopWords(stop_words, line)
    if st: line = StemText(stemmer, line)
    if pos: line = AppendPartsOfSpeechToWords(line)
    # Rejoin the list of words into a single string.
    line = ' '.join(line)
    if line:
      X_modified.append(line)
      y_modified.append(author)
  return (np.array(X_modified), np.array(y_modified))

def createSQLiteDatabase():
  db = sqlite3.connect('authors.db')
  cursor = db.cursor()
  try:
    cursor.execute('''
      CREATE TABLE authors(id INTEGER PRIMARY KEY, name TEXT, sentence TEXT)
      ''')
    print 'Creating database with training samples'
    # Create a list of the relatives paths to all of the csv files.
    csv_files = []
    for f in listdir('csv_data/'):
      f = join('csv_data/', f)
      if isfile(f):
        csv_files.append(f)
    X, y = GetSamplesFromCSVFiles(csv_files)
    preprocessed_X, y = PreprocessSamplesFromCSVFiles(y, X, True, False, False, False)
    z = zip(y, preprocessed_X)
    cursor.executemany('''
      INSERT INTO authors(name, sentence) VALUES(?,?)
      ''', z)
    db.commit()
  except:
    print 'Database already exists...'
    print 'Getting training samples from existing database...'
    preprocessed_X = []
    y = []
    cursor.execute('''SELECT name FROM authors''')
    all_rows = cursor.fetchall()
    for row in all_rows:
      y.append(row[0])

    cursor.execute('''SELECT sentence FROM authors''')
    all_rows = cursor.fetchall()
    for row in all_rows:
      preprocessed_X.append(row[0])
  db.close()

  return preprocessed_X, y

class AuthorPrediction(object):
  def __init__(self):
    self.pipeline = Pipeline([
      ('bag_of_words', CountVectorizer()),
      ('clf', MultinomialNB())
    ])
    self.preprocessed_X, self.y = createSQLiteDatabase()
    print 'Unique authors in the training data', np.unique(self.y)
    print 'Number of starting training samples: ', len(self.preprocessed_X)
    self.pipeline.fit(self.preprocessed_X, self.y)

  def AddTrainingSampleToDatabase(self, author, sentence):
    # Update the sqlite database with the new training sample
      db = sqlite3.connect('authors.db')
      cursor = db.cursor()
      cursor.execute('''
        INSERT INTO authors(name, sentence) VALUES(?, ?)
        ''', (author, sentence))
      db.commit()
      db.close()

def main():

  clf = Pipeline([
    ('bag_of_words', CountVectorizer()),
    ('clf', MultinomialNB())
  ])

  preprocessed_X, y = createSQLiteDatabase()
  print 'Unique authors in the training data', np.unique(y)
  print 'Number of starting training samples: ', len(preprocessed_X)

  print 'Fitting the classifier to the data'
  clf.fit(preprocessed_X, y)

  # print clf.named_steps['bag_of_words'].vocabulary_
  # print clf.named_steps['clf'].classes_
  # print clf.named_steps['clf'].class_count_
  # print 'Multinomial Naive Bayes score', cross_val_score(clf, preprocessed_X, y).mean()

  while True:
    sentence = raw_input("Enter sentence of an author to predict.  Type 'exit' to end: ")
    if sentence == 'exit':
      break
    preprocessed_sentence, _ = PreprocessSamplesFromCSVFiles(['unknown'], np.array([sentence]), True, False, False, False)
    print 'Preprocessed sentence', preprocessed_sentence
    print 'The classifier predicts the author is', clf.predict(preprocessed_sentence)[0]
    answer = raw_input("Is this correct? (yes or no): ")
    if answer == 'no':
      # Learn from mistake and add it to the training data of the classifier
      correct_author = raw_input("Who is the correct author?: ")

      # Update the sqlite database with the new training sample
      db = sqlite3.connect('authors.db')
      cursor = db.cursor()
      cursor.execute('''
        INSERT INTO authors(name, sentence) VALUES(?, ?)
        ''', (correct_author, preprocessed_sentence[0]))
      db.commit()
      db.close()

      preprocessed_X = np.append(preprocessed_X, preprocessed_sentence)
      y = np.append(y, correct_author)
      print 'Unique authors in the training data', np.unique(y)
      print 'Number of starting training samples:', len(preprocessed_X)
      print 'Fitting and transforming the new data'
      print 'Fitting the classifier to the new data'
      clf.fit(preprocessed_X, y)


if __name__ == '__main__':
  main()
