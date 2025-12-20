# This acts like a temporary database
CROP_SCAN_RESULTS = []

def save_crop_scan_result(prediction: str):
    is_healthy = "healthy" in prediction.lower()

    CROP_SCAN_RESULTS.append({
        "prediction": prediction,
        "is_healthy": is_healthy
    })

def get_crop_health_summary():
    total = len(CROP_SCAN_RESULTS)
    if total == 0:
        return {
            "total_fields": 0,
            "healthy_percentage": 0,
            "diseased_fields": 0
        }

    healthy = sum(1 for r in CROP_SCAN_RESULTS if r["is_healthy"])
    diseased = total - healthy

    return {
        "total_fields": total,
        "healthy_percentage": int((healthy / total) * 100),
        "diseased_fields": diseased
    }
