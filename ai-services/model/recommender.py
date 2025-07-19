import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Load data
df = pd.read_csv("data/food_items.csv")

# Convert food descriptions into numbers using TF-IDF
vectorizer = TfidfVectorizer()
tfidf_matrix = vectorizer.fit_transform(df['description'])

# Recommender function
def recommend(food_name: str, top_n: int = 3):
    if food_name not in df['name'].values:
        return ["Food item not found."]
    
    # Find the index of the given food name
    idx = df.index[df['name'] == food_name][0]

    # Calculate cosine similarity with all items
    cosine_sim = cosine_similarity(tfidf_matrix[idx], tfidf_matrix).flatten()

    # Get indices of top N similar items (excluding itself)
    similar_indices = cosine_sim.argsort()[::-1][1:top_n+1]

    # Return the names of the top similar food items
    return df['name'].iloc[similar_indices].tolist()