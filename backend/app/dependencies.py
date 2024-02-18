from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain.prompts import PromptTemplate, FewShotPromptTemplate
from langchain.schema import HumanMessage
from langchain.prompts.example_selector import LengthBasedExampleSelector
from langchain_core.output_parsers import StrOutputParser, JsonOutputParser
from langchain_core.pydantic_v1 import BaseModel, Field, validator
from models import VocabWord, VocabList, SentenceResponse
import json
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
    parser = JsonOutputParser(pydantic_object=SentenceOptions)

    # todo: change based on mode
    instructions = """
        You are a storyteller helping a first-grader learn vocabulary using a 
        choose-your-own-adventure story. Given the following story, come up with 
        four options for choices the character makes next. Ensure that:
        \n\n
        - Each option is one sentence.\n
        - Each option is written at a first-grade level.\n
        - Each option is interesting and an action choice.\n
        - Each option uses exactly one of the following vocab words: {vocab}\n
        - No two options use the same vocab word.\n
        Format Instructions: {format_instructions}
        Story: {story}
    """

    prompt = PromptTemplate(
        template=instructions,
        input_variables=["vocab","story"],
        partial_variables={"format_instructions": parser.get_format_instructions()},
    )

    str_output_parser = StrOutputParser()

    runnable = prompt | llm | parser
    output = runnable.invoke({"vocab": vocab_string, "story": story})

    if not _validate_options_json(output):
        raise ValueError("JSON data is not in the correct format")
    else:
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


# Validate the sentence options json
def _validate_options_json(options_json):
    """
    Validate if the JSON data is in the desired format.
    """
    # Define the expected format
    expected_keys = ["option1", "option2", "option3", "option4"]
    
    # Check if the JSON data has all the expected keys
    if all(key in options_json for key in expected_keys):
        return True
    else:
        return False


# function to change LLM output string to JSON (just for testing)
def _string_to_json(input_string):
    # Split the string into lines
    lines = input_string.split('\n')
    
    # Initialize an empty dictionary to store the result
    result = {}
    
    # Iterate over each line
    for line in lines:
        # Split each line by the first occurrence of a period
        parts = line.split('.', 1)
        if len(parts) == 2:
            option_number = parts[0].strip()
            text = parts[1].strip()
            # Add the option number and text to the result dictionary
            result[f"option{option_number}"] = text
    
    return json.dumps(result, indent=4)


# Tests
# vocab_list = ["nibbled","consequence","feast","annoy","enormous"]
# story_start = get_story_start(vocab_list)
# print(story_start)
# story_options = get_sentence_options(story=story_start, vocab_list=vocab_list)
# print(story_options)




