from fastapi import APIRouter, status

# from dependencies import 
from models import SimpleEvent

router = APIRouter()

@router.get("/", tags=['client'], status_code=status.HTTP_200_OK)
async def healthCheck():
    return {"message": "Client API OK"}

@router.get("/status", tags=['client'], status_code=status.HTTP_200_OK)
async def healthStatus():
    return {"message": "Client API Healthy"}

@router.get("/get-story-continue", tags=['client'], status_code=status.HTTP_200_OK)
async def getStoryContinue():
    pass

@router.get("/get-sentence options", tags=['client'], status_code=status.HTTP_200_OK)
async def getSentenceOptions():
    pass