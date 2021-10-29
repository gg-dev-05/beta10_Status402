import os
from flask import Flask, jsonify, request
import pickle

app = Flask(__name__)


@app.route("/")
def returnPrice():
    item = request.args.get("item")
    month = request.args.get("month")
    year = request.args.get("year")

    if None in [item, month, year]:
        return jsonify({"error": "Specify item, month and year"})

    month = int(month)
    year = int(year)

    item = item.lower()
    if os.path.exists(f"models/{item}.sav"):
        loaded_model = pickle.load(open(f"models/{item}.sav", "rb"))
        num = ((year - 2000) * 12) + month

        price = loaded_model.predict([[num]])[0]
        return jsonify({"price": price})

    return jsonify({"error": "Unknown Item"})


if __name__ == "__main__":
    app.run(debug=True)
