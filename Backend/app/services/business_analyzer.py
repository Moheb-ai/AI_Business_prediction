import pandas as pd

def business_kpi_analysis(df: pd.DataFrame):
   
    df["Date"] = pd.to_datetime(df["Date"])

    total_revenue = df["TotalPrice"].sum()
    total_orders = len(df)
    avg_order_value = total_revenue / total_orders

    best_product = (
        df.groupby("Product")["TotalPrice"]
        .sum()
        .sort_values(ascending=False)
        .idxmax()
    )

    best_region = (
        df.groupby("CustomerRegion")["TotalPrice"]
        .sum()
        .sort_values(ascending=False)
        .idxmax()
    )

    monthly_sales = (
        df.groupby(df["Date"].dt.to_period("M"))["TotalPrice"]
        .sum()
        .astype(float)
        .to_dict()
    )

    insights = [
        f"the Best selling product is '{best_product}'",
        f"the Best region for your product is '{best_region}'",
        f"Average order value is ${round(avg_order_value, 2)}"
    ]

    return {
        "total_revenue": round(total_revenue, 2),
        "total_orders": total_orders,
        "average_order_value": round(avg_order_value, 2),
        "best_product": best_product,
        "best_region": best_region,
        "monthly_sales": {str(k): v for k, v in monthly_sales.items()},
        "business_insights": insights
    }
