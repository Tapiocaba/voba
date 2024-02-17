from fastapi import APIRouter, HTTPException, status

from dependencies import llm
from models import VocabList, SentenceResponse

router = APIRouter()

@router.get("/", tags=['client'], status_code=status.HTTP_200_OK)
async def healthCheck():
    return {"message": "Client API OK"}

@router.get("/status", tags=['client'], status_code=status.HTTP_200_OK)
async def healthStatus():
    return {"message": "Client API Healthy"}

@router.get("/get-initial-story", tags=['client'], status_code=status.HTTP_200_OK)
async def getInitialStory(mode: str) -> str:
    if mode == "creative":
        pass
    elif mode == "test":
        pass
    elif mode == "mixed":
        pass
    else:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Error: Invalid mode provided")

@router.get("/get-story-continue", tags=['client'], status_code=status.HTTP_200_OK)
async def getStoryContinue(story: str, mode: str) -> dict:
    if mode == "creative":
        pass
    elif mode == "test":
        pass
    elif mode == "mixed":
        pass
    else:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Error: Invalid mode provided")
    # Langchain stuff here
    next_sentence = "Next Sentence."
    new_story = story + next_sentence
    return {"story": new_story, "next_sentence": next_sentence}

@router.get("/get-sentence options", tags=['client'], status_code=status.HTTP_200_OK)
async def getSentenceOptions(story: str, vocab_list: VocabList, mode: str) -> SentenceResponse:
    if mode == "creative":
        pass
    elif mode == "test":
        pass
    elif mode == "mixed":
        pass
    else:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Error: Invalid mode provided")
    # Langchain stuff here
    
    # Generate audio

    # Return
    ret = SentenceResponse(
        sentence1="TODO",
        sentence2="TODO",
        sentence3="TODO",
        sentence4="TODO",
        audio1="TODO",
        audio2="TODO",
        audio3="TODO",
        audio4="TODO",
    )

    return ret