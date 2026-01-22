import pandas as pd

def analyze_csv(df: pd.DataFrame):
    analysis = {
        "rows": len(df),
        "columns": {},
        "suggestions": []
    }

    for col in df.columns:
        dtype = str(df[col].dtype)
        analysis["columns"][col] = dtype

        if dtype == "object":
            analysis["suggestions"].append(
                f"ستون '{col}' مناسب اتوماسیون متن (ایمیل، CRM، تیکت)"
            )

        if "date" in col.lower():
            analysis["suggestions"].append(
                f"ستون '{col}' مناسب زمان‌بندی و گزارش‌دهی"
            )

    return analysis
