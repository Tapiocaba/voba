from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain.prompts import PromptTemplate, FewShotPromptTemplate
from langchain.schema import HumanMessage
from langchain.prompts.example_selector import LengthBasedExampleSelector
from langchain_core.output_parsers import StrOutputParser
from langchain.output_parsers import PydanticOutputParser
from langchain_core.pydantic_v1 import BaseModel, Field, validator
from models import VocabWord, VocabList, SentenceResponse
import os

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")


# Data structure for sentence option outputs
class SentenceOptions(BaseModel):
    option1: str = Field(description="first option to continue the story")
    option2: str = Field(description="second option to continue the story")
    option3: str = Field(description="third option to continue the story")

    # todo: add validation logic
    # @validator("setup")
    # def question_ends_with_question_mark(cls, field):
    #     if field[-1] != "?":
    #         raise ValueError("Badly formed question!")
    #     return field


# Get the start of a new story, depending on vocab list
def get_story_start(vocab_list: VocabList, mode: str = "creative"):
    llm = ChatOpenAI(temperature=1, model_name='gpt-4-1106-preview', openai_api_key=OPENAI_API_KEY)
    vocab_string = ", ".join(vocab_list)

    instructions = """
        You are a storyteller helping a first-grader learn vocabulary. Think of 
        a story plot that is likely to later use the following vocabulary words: 
        \n\n
        {vocab}
        \n\n
        Now, write an introduction to the story. Make sure to do the following in
        the introduction:
        \n\n
        - Do not actually use the vocabulary words.\n
        - Stop at a point where it would make sense to have options for
        what happens next or what choice is made next. Do not actually give any options. \n
        - Write it at a level that a first-grader would understand.\n
        - Make it interesting and fun, so the first-grader wants to keep reading.\n
        - Make it about 50 words.
    """

    prompt = PromptTemplate.from_template(instructions)
    output_parser = StrOutputParser()

    runnable = prompt | llm | output_parser
    output = runnable.invoke({"vocab": vocab_string})

    return output


def get_sentence_options(story: str, vocab_list: VocabList, mode: str = "creative"):
    llm = ChatOpenAI(temperature=1, model_name='gpt-4-1106-preview', openai_api_key=OPENAI_API_KEY)
    vocab_string = ", ".join(vocab_list)

    # Set up pydantic output parser
    pydantic_parser = PydanticOutputParser(pydantic_object=SentenceOptions)

    # todo: change based on mode
    instructions = """
        You are a storyteller helping a first-grader learn vocabulary using a 
        choose-your-own-adventure story. Given the following story, come up with 
        three options for choices the character makes next. Ensure that:
        \n\n
        - Each option is one sentence.\n
        - Each option is written at a first-grade level.\n
        - Each option is interesting and an action choice.\n
        - Each option uses exactly one of the following vocab words: {vocab}\n
        - No two options use the same vocab word.
        \n\n
        Story: {story}
    """

    prompt = PromptTemplate(
        template=instructions,
        input_variables=["vocab","story"],
        partial_variables={"format_instructions": pydantic_parser.get_format_instructions()},
    )
    output_parser = StrOutputParser()

    runnable = prompt | llm | output_parser
    output = runnable.invoke({"vocab": vocab_string, "story": story})

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

# Tests
vocab_list = ["nibbled","consequence","feast","annoy","enormous"]
story_start = get_story_start(vocab_list)
print(story_start)
story_options = get_sentence_options(story=story_start, vocab_list=vocab_list)
print(story_options)




