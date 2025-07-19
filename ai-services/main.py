from fastapi import FastAPI
from pydantic import BaseModel
from model.recommender import recommend

# Create FastAPI app
app = FastAPI()

# Define what kind of input we expect
class FoodInput(BaseModel):
    food_name: str

# Define the endpoint
@app.post("/recommend")
def get_recommendation(data: FoodInput):
    results = recommend(data.food_name)
    return {"recommendations": results}