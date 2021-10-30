import os
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
import numpy as np
import pickle
import warnings

app = Flask(__name__)
cors = CORS(app)
warnings.filterwarnings("ignore")

app.config['CORS_HEADERS'] = 'Content-Type'

@app.route("/")
@cross_origin()
def returnPrice():
    item = request.args.get("item")
    month = request.args.get("month")
    year = request.args.get("year")

    if None in [item, month, year]:
        return jsonify({"error": "Specify item, month and year"})

    month = int(month)
    year = int(year)

    item = item.lower()

    crops = ['moong', 'rice', 'wheat', 'bajra', 'jowar', 'maize', 'urad']


    if item in crops:
        num = ((year - 2000) * 12) + month

        scaler = pickle.load(open('models/scaler.pkl', 'rb'))
        loaded_model = pickle.load(open('models/model.sav', 'rb'))

        finalDate = scaler.transform(np.array([num]).reshape(-1,1))

        consideredCols = ['jowar','maize','moong','rice','urad','wheat']

        try:
            index = consideredCols.index(item)
        except:
            index = -1

        a = np.zeros(len(consideredCols))
        if index != -1:
            a[index] = 1
            
        X = [finalDate[0][0]]
        X.extend(a)

        price = loaded_model.predict([X])[0]

        return jsonify({"price": price})

    return jsonify({"error": "Unknown Item"})


if __name__ == "__main__":
    app.run()
