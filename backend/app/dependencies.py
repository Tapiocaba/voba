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
from typing import List
from openai import OpenAI

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
client = OpenAI()
llm = ChatOpenAI(temperature=1, model_name='gpt-4-1106-preview')


# Data structure for sentence option outputs
class SentenceOptions(BaseModel):
    option1: str = Field(description="first option to continue the story")
    option2: str = Field(description="second option to continue the story")
    option3: str = Field(description="third option to continue the story")
    option4: str = Field(description="fourth option to continue the story")

    # todo: add validation logic
    # @validator("setup")
    # def question_ends_with_question_mark(cls, field):
    #     if field[-1] != "?":
    #         raise ValueError("Badly formed question!")
    #     return field


# Get the start of a new story, depending on vocab list
def get_story_start(vocab_list: str, mode: str = "creative"):

    instructions = """
        You are a storyteller that kids LOVE to listen to helping a young elementary schooler learn vocabulary. Think of 
        an interesting story plot that is likely to later use the following vocabulary words: 
        \n\n
        {vocab}
        \n\n
        Now, write an introduction to the story. Make sure to do the following in
        the introduction:
        \n\n
        - Do not actually use the vocabulary words.\n
        - Stop at a point where it would make sense to have options for
        what happens next or what choice is made next. Do not actually give any options. \n
        - Write it at a level that a young elementary schooler would understand.\n
        - Make it interesting and fun, so the young elementary schooler wants to keep reading.\n
        - Make it about 2 sentences.
    """

    prompt = PromptTemplate.from_template(instructions)
    output_parser = StrOutputParser()

    runnable = prompt | llm | output_parser
    output = runnable.invoke({"vocab": vocab_list})

    return output

def get_story_continue(story: str, vocab_list: str, conclude: bool, mode: str = "creative"):

    if conclude:
        instructions = """
            You are a storyteller that kids LOVE to listen to helping a young elementary schooler learn reading. 
            Conclude the following story.
            \n\n
            Make sure to do the following in the conclusion:
            \n\n
            - Write it at a level that a young elementary schooler would understand.\n
            - Make it interesting and fun.\n
            - The conclusion should make sense in the context of the entire story,
            but it should especially follow from the last two sentences of the story.\n
            - Make it about 3 sentences.\n\n

            Here is the story I want you to conclude:

            {story}
        """

    else:
        instructions = """
            You are a storyteller that kids LOVE to listen to helping a young elementary schooler learn vocabulary. Continue
            the following story that is likely to later use the following vocabulary words: 
            \n\n
            {vocab}
            \n\n
            Make sure to do the following in the continuation:
            \n\n
            - Do not actually use the vocabulary words.\n
            - Stop at a point where it would make sense to have options for
            what happens next or what choice is made next. Do not actually give any options. \n
            - Write it at a level that a young elementary schooler would understand.\n
            - Make it interesting and fun, so the young elementary schooler wants to keep reading.\n
            - The continuation should make sense in the context of the entire story.\n
            - Make it about 2 sentences.\n\n

            Here is the story I want you to the continue:

            {story}
            
        """

    prompt = PromptTemplate.from_template(instructions)
    output_parser = StrOutputParser()


    runnable = prompt | llm | output_parser
    output = runnable.invoke({"vocab": vocab_list, "story": story})


    return output


def get_sentence_options(story: str, vocab_list: str, mode: str = "creative"):
    # Set up pydantic output parser
    # parser = JsonOutputParser(pydantic_object=SentenceOptions)

    # todo: change based on mode
    instructions = """
        You are a storyteller that kids LOVE to listen to helping a young elementary schooler learn vocabulary using a 
        choose-your-own-adventure story. Given the following story, come up with 
        four options for how the story can continue. Ensure that:
        \n\n
        - Each option is one sentence.\n
        - Each option is written at a first-grade level.\n
        - Each option is interesting and makes sense in the story context.\n
        - The options present significantly different choices for the reader, so they 
        feel like their choices impact the story.\n
        - The options should be written in an active voice, without modal verbs.\n
        - Each option uses exactly one of the following vocab words: {vocab}\n
        - None of the options use the same vocab word.\n
        - {mode_specific_instruction}

       The output should be a json object with the following key value pairs\n

        "option1": "The first option to continue the story",
        "option2": "The second option to continue the story",
        "option3": "The third option to continue the story",
        "option4": "The fourth option to continue the story"
        
       \n
        Story: {story}
    """

    if mode == "creative":
        mode_specific_instruction = "IMPORTANT: Make sure each option correctly uses the vocab word and makes sense in the context of the story."
    elif mode == "test":
        mode_specific_instruction = "IMPORTANT: ONLY option1 should be grammatically correct and use the vocab word correctly. The next three options should use the vocab word completely incorrectly so that the sentence doesn't make sense."
    elif mode == "mixed":
        mode_specific_instruction = "IMPORTANT: ONLY option1 and option2 should be grammatically correct and make sense in the context of the story. The next two options should use the vocab word completely incorrectly so that the sentence doesn't make sense."

    prompt = PromptTemplate.from_template(instructions)

    output_parser = StrOutputParser()

    runnable = prompt | llm | output_parser
    
    output = runnable.invoke({"vocab": vocab_list, "story": story, "mode_specific_instruction": mode_specific_instruction})
    
    print(output)
    # slice from first bracket to last bracket.
    start_index = output.find('{')
    end_index = output.rfind('}') + 1
    output = output[start_index:end_index]

    # convert output to dict
    output = json.loads(output)

    # ensure options are in the correct format & each have at least one vocab word
    # options = output.values()

    # if not _validate_options_json(output):
    #     raise ValueError("JSON data is not in the correct format")
    # elif not all([_check_vocab_in_string(option, vocab_list) for option in options]):
    #     raise ValueError("Not every option has a vocab word")

    return output

def explain_why_wrong(sentence: str, word: str):
    instructions = """
        You are a teacher helping a young elementary schooler learn vocabulary. The student used the word {word}
        wrong in the following sentence. Explain to the student in simple terms why the word was used wrong in 2 sentences or less.
        \n\n
      
        Here is the sentence the student wrote:
        \n\n
        {sentence}
        \n\n
        The vocabulary word the student used incorrectly is: {word}
    """

    prompt = PromptTemplate.from_template(instructions)
    output_parser = StrOutputParser()

    runnable = prompt | llm | output_parser
    output = runnable.invoke({"sentence": sentence, "word": word})

    return output

# Ensures vocab is not in the story
def _check_no_vocab_in_string(string: str, vocab_list: List[int]):
    for word in vocab_list:
        if word in string:
            return False
    return True


# Ensures vocab is in each story option
def _check_vocab_in_string(string: str, vocab_list: List[int]):
    word_found = []
    for word in vocab_list:
        if word in string:
            word_found.append(True)
        else:
            word_found.append(False)
    return any(word_found)


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





