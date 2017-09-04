from flask import Flask
from flask import render_template
from flask import request
import numpy as np
from run_prediction_program import AuthorPrediction
from run_prediction_program import PreprocessSamplesFromCSVFiles

app = Flask(__name__)

ap = AuthorPrediction()

@app.route('/', methods=['POST', 'GET'])
def hello_world():
    if request.method == 'POST':
        print request.form
        if 'sentence' in request.form:
            sentence = request.form['sentence']
            preprocessed_sentence, _  = PreprocessSamplesFromCSVFiles(['unknown'], [sentence], True, False, False, False)
            author = ap.pipeline.predict(preprocessed_sentence)[0]
            ap.preprocessed_sentence = preprocessed_sentence
            return render_template('index.html', author=author)
        elif 'isCorrectAuthor' in request.form:
            isCorrectAuthor = request.form['isCorrectAuthor']
            if isCorrectAuthor == 'yes':
                return render_template('index.html')
            else:
                # add author and sentence to database
                ap.author = request.form['correctAuthor']
                ap.AddTrainingSampleToDatabase(ap.author, ap.preprocessed_sentence[0])
                ap.preprocessed_X = np.append(ap.preprocessed_X, ap.preprocessed_sentence)
                ap.y = np.append(ap.y, ap.author)
                ap.pipeline.fit(ap.preprocessed_X, ap.y)
                authors = np.unique(ap.y)
                num_training_samples = len(ap.preprocessed_X)
                return render_template('index.html', incorrect=True, num_training_samples=num_training_samples, authors=authors)
    else:
        return render_template('index.html')

if __name__ == '__main__':
    app.run()
