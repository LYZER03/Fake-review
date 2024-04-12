from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import ml_model

app = Flask(__name__)
CORS(app)  # Activer CORS pour autoriser les requêtes cross-origin

# Chargez le modèle entraîné
with open('model.pkl', 'rb') as f:
    pipeline = pickle.load(f)

# Define the / endpoint
@app.route("/", methods=['GET'])
def return_home():
    return jsonify({
        'message': "This the backend!"
    })

@app.route('/api/detect-comment', methods=['POST'])
def predict_comment_veracity():
    # Prétraitement du commentaire
    data = request.get_json()
    comment = data['comment']
    comment = ml_model.clean_text(comment)
    cleaned_comment = ml_model.preprocess(comment)
    stemmed_comment = ml_model.stem_words(cleaned_comment)
    lemmatized_comment = ml_model.lemmatize_words(stemmed_comment)
    
    # Faire la prédiction
    prediction = pipeline.predict([lemmatized_comment])

    if prediction == 1:
        return jsonify({"result" : "The review seems to be wrong."})
    else:
        return jsonify({"result" : "The review appears to be genuine."})

if __name__ == '__main__':
    app.run(debug=True, port=8080)

