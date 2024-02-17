from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain.prompts import PromptTemplate, FewShotPromptTemplate
from langchain.schema import HumanMessage
from langchain.prompts.example_selector import LengthBasedExampleSelector
from langchain_core.output_parsers import StrOutputParser
from models import VocabWord, VocabList, SentenceResponse
import os

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")


# Get the start of a new story, depending on vocab list
def get_story_start(vocab_list: VocabList, mode: str = "creative"):
    llm = ChatOpenAI(temperature=1, model_name='gpt-4-1106-preview', openai_api_key=OPENAI_API_KEY)
    vocab_string = ", ".join(vocab_list)

    instructions = """
        You are a storyteller helping a first-grader learn vocabulary. Think of 
        a story plot that is likely to later use the following vocabulary words: 
        \n\n
        {vocab_string}
        \n\n
        Now, write an introduction to the story. Make sure to do the following in
        the introduction:
        \n\n
        - Do not actually use the vocabulary words.\n
        - Stop at a point where it would make sense to have options for
        what happens next or what choice is made next. Do not actually give any options. \n
        - Write it at a level that a first-grader would understand.\n
        - Make it interesting and fun, so the first-grader wants to keep reading.\n
        - Make it about 100 words.
    """

    prompt = PromptTemplate.from_template(instructions)
    output_parser = StrOutputParser()

    runnable = prompt | llm | output_parser
    output = runnable.invoke({"vocab_string": vocab_string})

    return output


# Ensures vocab is not in the story
def _check_no_vocab_in_string(string, words_list):
    for word in words_list:
        if word in string:
            return False
    return True


# Ensures vocab is in the story
def _check_vocab_in_string():
    return False


vocab_list = ["nibbled","consequence","feast","annoy","enormous"]
print(get_story_start(vocab_list))




