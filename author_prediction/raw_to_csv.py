import csv
import re
from os import listdir
from os.path import isfile

def writeEntireBook(data, author, writer):
    entireText = ''
    for line in data:
      if line:
        entireText = entireText + line + ' '
      entireText.rstrip()
      writer.writerow([author, entireText])

def writeSentence(data, author, writer):
  for line in data:
    if line:
      writer.writerow([author, line])

def writeParagraph(data, author, writer):
  paragraph = ''
  for line in data:
    # If the line is empty then it must be the end of the paragraph
    if line:
      paragraph = paragraph + line + ' '
    else:
      if paragraph:
        # Remove the final space on end of each paragraph.
        paragraph = paragraph.rstrip()
        writer.writerow([author, paragraph])
      paragraph = ''

def main():
  writeParagraph = False
  writeEntireText = False

  # Create a list of the relatives paths to all of the raw files.
  raw_files = []
  for f in listdir('raw_data/'):
    if f.endswith('.txt') and isfile('raw_data/%s' % f):
      raw_files.append(f)

  for raw_file in raw_files:
    filename = raw_file.replace('.txt', '')
    author = filename.partition('_')[0]

    f = open('raw_data/%s.txt' % filename, 'r')
    data = f.read()
    f.close()

    # Create a list out of the lines in the file.
    data = data.split('\n')

    # Remove any leading whitespace characters and spaces from each line.
    data = [line.lstrip() for line in data]
    # Remove any trailing whitespace characters and spaces from each line.
    data = [line.rstrip() for line in data]

    # Write out each line to a csv file with column 1 being the author name
    # and column 2 being the sentence, paragraph, or entire book.
    with open('csv_data/%s.csv' % filename, 'w') as csvfile:
      writer = csv.writer(csvfile)
      if writeParagraph:
        writeParagraph(data, author, writer)
      elif writeEntireText:
        writeEntireBook(data, author, writer)
      else:
        writeSentence(data, author, writer)

if __name__ == '__main__':
  main()


