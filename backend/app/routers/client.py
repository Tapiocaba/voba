from fastapi import APIRouter, HTTPException, status

from dependencies import llm
from models import VocabList, SentenceResponse, SentenceChoices

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
async def getSentenceOptions(story: str, vocab_list: VocabList, mode: str) -> SentenceChoices:
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
    c1 = SentenceResponse(
        sentence="TODO",
        audio="TODO",
        isCorrect=False,
    )

    c2 = SentenceResponse(
        sentence="TODO",
        audio="TODO",
        isCorrect=False,
    )

    c3 = SentenceResponse(
        sentence="TODO",
        audio="TODO",
        isCorrect=False,
    )

    c4 = SentenceResponse(
        sentence="TODO",
        audio="TODO",
        isCorrect=False,
    )

    ret = SentenceChoices(
        choice1=c1,
        choice2=c2,
        choice3=c3,
        choice4=c4,
    )

    return ret