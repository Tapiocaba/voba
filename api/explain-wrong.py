from fastapi import FastAPI, Request, HTTPException, status
from mangum import Mangum
from fastapi.responses import Response
from fastapi.responses import JSONResponse


from models import VocabList, SentenceResponse, SentenceChoices
from api.dependencies.dependencies import get_sentence_options, get_story_start, get_story_continue, explain_why_wrong, client
from typing import List
import json

app = FastAPI()

@app.get("/explain-wrong", tags=['client'], status_code=status.HTTP_200_OK)
async def explainWrong(sentence: str, word: str) -> str:
    explanation = explain_why_wrong(sentence=sentence, word=word)
    return Response(content=explanation, media_type="text/plain")
    

handler = Mangum(app)
