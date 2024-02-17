from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain.prompts import PromptTemplate, FewShotPromptTemplate
from langchain.schema import HumanMessage
from langchain.prompts.example_selector import LengthBasedExampleSelector
from models import VocabWord, VocabList, SentenceResponse
import os

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

def get_story_start(vocab_list: VocabList):
    llm = ChatOpenAI(temperature=0, model_name='gpt-4-turbo')
    instructions = f"""
        You are a storyteller helping a first-grader learn vocabulary through 
        a choose-your-own-adventure story. Think of a story plot that is likely to use
        the following vocabulary words: 
        \n\n
        {", ".join(vocab_list)}
        \n\n
        Now, write the introduction to the story, but do not use the vocabulary words.
        Additionally, stop at a point where it would make sense to have options for
        what happens next or what choice is made next.
    """
    



