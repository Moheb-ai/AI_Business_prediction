from fastapi import APIRouter, UploadFile, File
import pandas as pd

router = APIRouter()

@router.post("/predict")
async def predict_sales(file: UploadFile = File(...)):
    df = pd.read_csv(file.file)

    # Normalize column names (important!)
    df.columns = df.columns.str.lower()

    # Convert date column
    df["date"] = pd.to_datetime(df["date"])

    # We will use TotalPrice as sales
    df["sales"] = df["totalprice"]

    monthly = (
        df.groupby(df["date"].dt.to_period("M"))["sales"]
        .sum()
        .reset_index()
    )

    last_value = monthly["sales"].iloc[-1]

    forecast = []
    for i in range(1, 7):
        forecast.append({
            "month": f"2026-0{i}",
            "predicted_sales": round(last_value * (1 + i * 0.08), 2)
        })

    return {"forecast": forecast}
