from fastapi import APIRouter, UploadFile, File
import pandas as pd
from app.services.business_analyzer import business_kpi_analysis

router = APIRouter()

@router.post("/upload")
async def upload_csv(file: UploadFile = File(...)):
    df = pd.read_csv(file.file)
    result = business_kpi_analysis(df)
    return result
