from fastapi import FastAPI, Request, HTTPException, status
from mangum import Mangum
from fastapi.responses import Response
from fastapi.responses import JSONResponse


from models import VocabList, SentenceResponse, SentenceChoices
from api.dependencies.dependencies import get_sentence_options, get_story_start, get_story_continue, explain_why_wrong, client
from typing import List
import json

app = FastAPI()

@app.get("/get-sentence-options", tags=['client'], status_code=status.HTTP_200_OK)
async def getSentenceOptions(story: str, vocab_list: str, mode: str) -> SentenceChoices:
    if mode not in ["creative", "test", "mixed",""]:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Error: Invalid mode provided")
    try:
        sentence_options = get_sentence_options(story=story,vocab_list=vocab_list,mode=mode)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Error: Incorrect JSON format.")

    formatted_sentences = {}

    if mode == "test":
        for option, text in sentence_options.items():
            formatted_sentences[option] = {
                "text": text,
                "isCorrect": True if option == "option1" else False
            }
    elif mode == "creative":
        for option, text in sentence_options.items():
            formatted_sentences[option] = {
                "text": text,
                "isCorrect": True
            }
    else:
        for option, text in sentence_options.items():
            formatted_sentences[option] = {
                "text": text,
                "isCorrect": True if option == "option1" or option == "option2" else False
            }
    
    return JSONResponse(content=formatted_sentences)

handler = Mangum(app)
