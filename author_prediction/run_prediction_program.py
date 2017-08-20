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


def Getcsv_files(files):
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
  # Remove duplicate strings in the stemmed_text list while keeping order.
  return list(OrderedDict.fromkeys(stemmed_text))

def KeepWordsSpaces(text):
  regex = re.compile(r'[^a-zA-Z ]')
  text = regex.sub('', text)
  return text

def Preprocesscsv_files(X, ws, sw, st):
  stop_words = stopwords.words('english')
  stemmer = SnowballStemmer('english')
  X_modified = []
  # Preprocess the training examples: remove stop words, stem the words, etc.
  for line in X:
    if ws: line = KeepWordsSpaces(line)
    # Tokenize the line into a list of words.
    line = line.split()
    if sw: line = RemoveStopWords(stop_words, line)
    if st: line = StemText(stemmer, line)
    # Rejoin the list of tokens in to a single string.
    line = ' '.join(line)
    X_modified.append(line)
  return np.array(X_modified)

def MultinomialNaiveBayesCrossVal(X, y):
  clf = MultinomialNB()
  print 'Multinomial Naive Bayes score', cross_val_score(clf, X, y).mean()

def PerceptronPredictionCrossVal(X, y):
  clf = Perceptron(max_iter=5, tol=None)
  print 'Perceptron score', cross_val_score(clf, X, y).mean()

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
    X, y = Getcsv_files(csv_files)
    preprocessed_X = Preprocesscsv_files(X, True, True, True)
    z = zip(y, preprocessed_X)
    cursor.executemany('''
      INSERT INTO authors(name, sentence) VALUES(?,?)
      ''', z)
    db.commit()
  except:
    print 'Getting training samples from existing database'
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

def main():
  
  bag_of_words_vectorizer = CountVectorizer()
  pos_vectorizer = CountVectorizer(tokenizer=POSCountTokenizer())

  preprocessed_X, y = createSQLiteDatabase()
  print 'Unique authors in the training data', np.unique(y)
  print 'Number of starting training samples: ', len(preprocessed_X)

  fu = FeatureUnion([
    ('bag_of_words', bag_of_words_vectorizer),
    ('pos_count', pos_vectorizer)])

  # X, y = shuffle(X, y, random_state=random.randint(1, 100))
  print 'Fitting and transforming the data'
  X = fu.fit_transform(preprocessed_X)

  clf = MultinomialNB()
  print 'Fitting the classifier to the data'
  clf.fit(X, y)

  # MultinomialNaiveBayesCrossVal(X, y)
  while True:
    sentence = raw_input("Enter sentence of an author to predict.  Type 'exit' to end: ")
    if sentence == 'exit':
      break
    preprocessed_sentence = Preprocesscsv_files(np.array([sentence]), True, True, True)
    print 'Preprocessed sentence', preprocessed_sentence
    transformed_sentence = fu.transform(preprocessed_sentence)
    print 'The classifier predicts the author is', clf.predict(transformed_sentence)[0]
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
      X = fu.fit_transform(preprocessed_X)
      print 'Fitting the classifier to the new data'
      clf.fit(X, y)


if __name__ == '__main__':
  main()