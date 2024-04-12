import time
import numpy as np
import pandas as pd

import string, nltk
from nltk.corpus import stopwords
from nltk import word_tokenize
from nltk.stem import PorterStemmer
from nltk.stem import WordNetLemmatizer
nltk.download('wordnet')
nltk.download('stopwords')
nltk.download('punkt')
nltk.download('omw-1.4')

from sklearn.linear_model import SGDClassifier


from sklearn.pipeline import Pipeline
from sklearn.feature_extraction.text import CountVectorizer, TfidfTransformer, TfidfVectorizer

from sklearn.model_selection import cross_val_score
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.metrics import classification_report, confusion_matrix, accuracy_score, recall_score,   precision_score, roc_auc_score, f1_score

import pickle

import warnings, string
warnings.filterwarnings('ignore')

def clean_text(text):
    # Remove punctuation
    nopunc = ''.join([char for char in text if char not in string.punctuation])
    
    # Remove stopwords
    cleaned_text = ' '.join([word for word in nopunc.split() if word.lower() not in stopwords.words('english')])
    
    return cleaned_text

def preprocess(text):
    return ' '.join([word for word in word_tokenize(text) if word not in stopwords.words('english') and not word.isdigit() and word not in string.punctuation])

stemmer = PorterStemmer()

def stem_words(text):
    return ' '.join([stemmer.stem(word) for word in text.split()])

lemmatizer = WordNetLemmatizer()

def lemmatize_words(text):
    return ' '.join([lemmatizer.lemmatize(word) for word in text.split()])


df = pd.read_csv('Preprocessed Fake Reviews Detection Dataset.csv')
df.dropna(inplace=True)
df['target'] = np.where(df['label']=='CG', 1, 0)

X = df['text_']
y = df['target']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=1, shuffle=True)

classifiers = {}
classifiers.update({"SGDClassifier": SGDClassifier()})

pipeline = Pipeline([("tfidf", 
                      TfidfVectorizer()), 
                      ("clf", SGDClassifier())
                    ])
pipeline.fit(X_train, y_train)

with open('model.pkl', 'wb') as file:
    pickle.dump(pipeline, file)


