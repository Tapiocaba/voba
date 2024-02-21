from fastapi import FastAPI, Request, HTTPException, status
from mangum import Mangum
from fastapi.responses import Response
from fastapi.responses import JSONResponse


from models import VocabList, SentenceResponse, SentenceChoices
from api.dependencies.dependencies import get_sentence_options, get_story_start, get_story_continue, explain_why_wrong, client
from typing import List
import json

app = FastAPI()

@app.get("/get-initial-story", tags=['client'], status_code=status.HTTP_200_OK)
async def getInitialStory(vocab_list: str, mode: str) -> str:
    if mode in ["creative", "test", "mixed"]:
        story = get_story_start(vocab_list=vocab_list, mode=mode)
        return Response(content=story, media_type="text/plain")
    else:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Error: Invalid mode provided")


handler = Mangum(app)
