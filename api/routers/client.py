from fastapi import APIRouter, HTTPException, status
from fastapi.responses import Response
from fastapi.responses import JSONResponse


from models import VocabList, SentenceResponse, SentenceChoices
from dependencies import get_sentence_options, get_story_start, get_story_continue, explain_why_wrong, client
from typing import List
import json

router = APIRouter()

@router.get("/", tags=['client'], status_code=status.HTTP_200_OK)
async def healthCheck():
    return {"message": "Client API OK"}

@router.get("/status", tags=['client'], status_code=status.HTTP_200_OK)
async def healthStatus():
    return {"message": "Client API Healthy"}

@router.get("/get-initial-story", tags=['client'], status_code=status.HTTP_200_OK)
async def getInitialStory(vocab_list: str, mode: str) -> str:
    if mode in ["creative", "test", "mixed"]:
        story = get_story_start(vocab_list=vocab_list, mode=mode)
        return Response(content=story, media_type="text/plain")
    else:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Error: Invalid mode provided")

@router.get("/get-story-continue", tags=['client'], status_code=status.HTTP_200_OK)
async def getStoryContinue(story: str, vocab_list: str, mode: str, conclude: bool) -> dict:
    if mode not in ["creative", "test", "mixed"]:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Error: Invalid mode provided")
    else:
        story = get_story_continue(story=story, vocab_list=vocab_list, mode=mode, conclude=conclude)
        return Response(content=story, media_type="text/plain")
    
@router.get("/explain-wrong", tags=['client'], status_code=status.HTTP_200_OK)
async def explainWrong(sentence: str, word: str) -> str:
    explanation = explain_why_wrong(sentence=sentence, word=word)
    return Response(content=explanation, media_type="text/plain")
    

@router.get("/get-sentence-options", tags=['client'], status_code=status.HTTP_200_OK)
async def getSentenceOptions(story: str, vocab_list: str, mode: str) -> SentenceChoices:
    if mode not in ["creative", "test", "mixed",""]:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Error: Invalid mode provided")
    try:
        sentence_options = get_sentence_options(story=story,vocab_list=vocab_list,mode=mode)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Error: Incorrect JSON format.")


    # # Return
    # c1 = SentenceResponse(
    #     sentence=sentence_options['option1'],
    #     isCorrect=True,
    # )

    # c2 = SentenceResponse(
    #     sentence=sentence_options['option2'],
    #     isCorrect=True,
    # )

    # c3 = SentenceResponse(
    #     sentence=sentence_options['option3'],
    #     isCorrect=True,
    # )

    # c4 = SentenceResponse(
    #     sentence=sentence_options['option4'],
    #     isCorrect=True,
    # )

    # ret = SentenceChoices(
    #     choice1=c1,
    #     choice2=c2,
    #     choice3=c3,
    #     choice4=c4,
    # )

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

@router.get("/get-audio", tags=['client'], status_code=status.HTTP_200_OK)
async def getAudio(audio_str: str):
    # Generate audio
    response = client.audio.speech.create(
        model="tts-1",
        voice="shimmer",
        input=audio_str,
    )

    return Response(content=response.content, media_type="audio/mpeg")