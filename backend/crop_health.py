from fastapi import APIRouter
from services.crop_health_service import get_crop_health_summary

router = APIRouter()

@router.get("/api/crop-health/summary")
def crop_health_summary():
    return get_crop_health_summary()
