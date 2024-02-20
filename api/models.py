from pydantic import BaseModel

# Models
class VocabWord(BaseModel):
    word: str
    frequency: int

class VocabList(BaseModel):
    words: list[VocabWord]

class SentenceResponse(BaseModel):
    sentence: str
    isCorrect: bool

class SentenceChoices(BaseModel):
    choice1: SentenceResponse
    choice2: SentenceResponse
    choice3: SentenceResponse
    choice4: SentenceResponse
