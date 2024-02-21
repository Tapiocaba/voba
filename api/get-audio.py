from fastapi import FastAPI, Request, HTTPException, status
from mangum import Mangum
from fastapi.responses import Response
from fastapi.responses import JSONResponse


from models import VocabList, SentenceResponse, SentenceChoices
from api.dependencies.dependencies import get_sentence_options, get_story_start, get_story_continue, explain_why_wrong, client
from typing import List
import json

app = FastAPI()

@app.get("/get-audio", tags=['client'], status_code=status.HTTP_200_OK)
async def getAudio(audio_str: str):
    # Generate audio
    response = client.audio.speech.create(
        model="tts-1",
        voice="shimmer",
        input=audio_str,
    )

    return Response(content=response.content, media_type="audio/mpeg")


handler = Mangum(app)
