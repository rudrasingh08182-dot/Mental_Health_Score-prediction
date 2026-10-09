import joblib
import pandas as pd
from fastapi import FastAPI
from pydantic import BaseModel,Field
from typing import Literal
from fastapi.middleware.cors import CORSMiddleware
model=joblib.load("Mental_health_model.pkl")

app=FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://mental-health-score-prediction-ten.vercel.app"
    ],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)
class StudentData(BaseModel):
    
             Age:  int = Field(...,ge=10,le=100)                 
             Gender: Literal["Male","Female"]
             Country:str
             Academic_Level:Literal['Undergraduate', 'Graduate', 'High School']
             Most_Used_Platform:Literal[ 'Facebook',  'LinkedIn', 'Instagram',  'Snapchat',   'Twitter',   'YouTube','TikTok',      'LINE', 'KakaoTalk', 'VKontakte',  'WhatsApp',    'WeChat']
             Purpose_Of_Use:Literal['Networking', 'Education', 'Entertainment', 'News']
             Avg_Daily_Usage_Hours:float=Field(...,ge=0,le=24)
             Daily_Unlocks:int=Field(...,ge=0)
             Study_Hours:float=Field(...,ge=0,le=24)
             Physical_Activity_Hours:float=Field(...,ge=0,le=24)
             Sleep_Hours_Per_Night:float=Field(...,ge=0,le=24)
             Stress_Level:Literal['Medium', 'Low', 'Very High', 'High']
             
        
# ── Category helper (score range in dataset: 3.6 – 9.4, scale of 10) ──────
def get_category(score: float) -> dict:
    """
    Classifies a mental health score into a human-readable category.
    Thresholds are aligned with standard psychological wellbeing scales
    (WHO-5, K10, DASS-21 relative ranges mapped to a 0-10 scale).
    """
    if score >= 8.0:
        return {
            "label": "Excellent",
            "level": "safe",
            "emoji": "🟢",
            "description": "Your mental wellbeing appears very strong. Keep maintaining healthy habits.",
            "advice": "Great balance of sleep, activity, and screen time. Keep it up!"
        }
    elif score >= 6.5:
        return {
            "label": "Good",
            "level": "normal",
            "emoji": "🔵",
            "description": "Your mental health is in a healthy range with minor areas to watch.",
            "advice": "Small improvements in sleep or screen-time could further boost your wellbeing."
        }
    elif score >= 5.0:
        return {
            "label": "Fair",
            "level": "caution",
            "emoji": "🟡",
            "description": "Moderate mental health indicators detected. Some lifestyle adjustments are recommended.",
            "advice": "Consider reducing social media usage and increasing physical activity or sleep."
        }
    elif score >= 3.5:
        return {
            "label": "At Risk",
            "level": "danger",
            "emoji": "🟠",
            "description": "Signs of mental health strain are present. Professional support is advisable.",
            "advice": "We strongly recommend speaking with a counselor or mental health professional."
        }
    else:
        return {
            "label": "Critical",
            "level": "critical",
            "emoji": "🔴",
            "description": "Significant mental health concerns detected. Immediate attention is recommended.",
            "advice": "Please reach out to a mental health professional or helpline as soon as possible."
        }

#Describe what we send back
class PredictionResponse(BaseModel):
       predicted_mental_score: float
       mental_health_category: dict
@app.get('/')
def greet():
    return {"Welcom to mental heath detection build By Rudra"}

top_countries= ["Other","India","USA","Canada","Australia","UK","Germany","Mexico","Turkey","France"]
@app.post("/predict",response_model=PredictionResponse)
def predict(data:StudentData):
    country_group= data.Country if data.Country in top_countries else "Other"
    input_rows =pd.DataFrame([{

        "Age":  data.Age  ,                
        "Gender": data.Gender,
        "Country":data.Country,
        "Academic_Level":data.Academic_Level  ,
        "Most_Used_Platform":data.Most_Used_Platform  ,
        "Purpose_Of_Use":data.Purpose_Of_Use  ,
        "Avg_Daily_Usage_Hours":data.Avg_Daily_Usage_Hours  ,
        "Daily_Unlocks":data.Daily_Unlocks  ,
        "Study_Hours":data.Study_Hours  ,
        "Physical_Activity_Hours":data.Physical_Activity_Hours  ,
        "Sleep_Hours_Per_Night":data.Sleep_Hours_Per_Night  ,
        "Stress_Level":data.Stress_Level , 
        "Grouped_country":country_group
    }])
    prediction=model.predict(input_rows)[0]
    score = round(float(prediction), 2)
    return PredictionResponse(
        predicted_mental_score=score,
        mental_health_category=get_category(score)
    )
