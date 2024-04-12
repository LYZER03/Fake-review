import pickle
import ml_model

# Charger le modèle entraîné
with open('model.pkl', 'rb') as f:
    pipeline = pickle.load(f)

def predict_comment_veracity(comment):
    # Prétraitement du commentaire
    comment = ml_model.clean_text(comment)
    cleaned_comment = ml_model.preprocess(comment)
    stemmed_comment = ml_model.stem_words(cleaned_comment)
    lemmatized_comment = ml_model.lemmatize_words(stemmed_comment)
    
    # Faire la prédiction
    prediction = pipeline.predict([lemmatized_comment])
    

# Utilisation
comment = "Love this!  Well made, sturdy, and very comfortable.  I love it!Very pretty"
prediction = predict_comment_veracity(comment)
if prediction == 1:
    print("Le commentaire semble être faux.")
else:
    print("Le commentaire semble être authentique.")