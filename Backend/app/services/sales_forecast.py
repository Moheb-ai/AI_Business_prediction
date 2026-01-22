import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression

def forecast_sales(df: pd.DataFrame, months: int = 6):
    # Convert Date column to datetime
    df["Date"] = pd.to_datetime(df["Date"])

    # Aggregate total sales by month
    monthly = (
        df.groupby(df["Date"].dt.to_period("M"))["TotalPrice"]
        .sum()
        .reset_index()
    )

    # Convert Period type to timestamp
    monthly["Date"] = monthly["Date"].dt.to_timestamp()

    # Create a numerical time index for regression
    monthly["month_index"] = np.arange(len(monthly))

    # Features (X) and target (y)
    X = monthly[["month_index"]]
    y = monthly["TotalPrice"]

    # Train linear regression model
    model = LinearRegression()
    model.fit(X, y)

    # Generate future time indices
    future_index = np.arange(len(monthly), len(monthly) + months)

    # Generate future monthly dates
    future_dates = pd.date_range(
        start=monthly["Date"].iloc[-1] + pd.offsets.MonthBegin(),
        periods=months,
        freq="MS"
    )

    # Predict future sales
    predictions = model.predict(future_index.reshape(-1, 1))

    # Format forecast output
    forecast = []
    for date, value in zip(future_dates, predictions):
        forecast.append({
            "month": date.strftime("%Y-%m"),
            "predicted_sales": round(float(value), 2)
        })

    return forecast
