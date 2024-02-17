from pydantic import BaseModel

# Models
class VocabWord(BaseModel):
    word: str
    frequency: int

class VocabList(BaseModel):
    words: list[VocabWord]

class SentenceResponse(BaseModel):
    sentence1: str
    sentence2: str 
    sentence3: str
    sentence4: str
    audio1: str
    audio2: str
    audio3: str
    audio4: str
