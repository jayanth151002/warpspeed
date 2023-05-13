from aws_langchain.kendra_index_retriever import KendraIndexRetriever
from langchain.chains import ConversationalRetrievalChain
from langchain.prompts import PromptTemplate
from langchain import OpenAI
import sys
import os
from dotenv import load_dotenv

load_dotenv()

MAX_HISTORY_LENGTH = 6

def build_chain():
    region = os.environ["AWS_REGION"]
    kendra_index_id = os.environ["KENDRA_INDEX_ID"]

    llm = OpenAI(model_name="gpt-4",
                 temperature=0, max_tokens=4000)

    retriever = KendraIndexRetriever(
        kendraindex=kendra_index_id,
        awsregion=region,
        k=6,
        return_source_documents=True
    )

    prompt_template = """
      The following is a conversation with a software cloud architecture expert AI agent and a user. The user submits the following context to get suggestions on cloud architecture:  
      {context}
      Instruction: Based on the above documents, provide a detailed answer for, {question} Answer "don't know" if not present in the document. Solution:
      """
    PROMPT = PromptTemplate(
        template=prompt_template, input_variables=["context", "question"]
    )

    return ConversationalRetrievalChain.from_llm(llm=llm, retriever=retriever, qa_prompt=PROMPT, return_source_documents=True)


def run_chain(chain, prompt: str, history=[]):
    return chain({"question": prompt, "chat_history": history})


def get_cloud_architecture():
    qa = build_chain()
    chat_history = []
    for query in sys.stdin:
        if (query.strip().lower().startswith("new search:")):
            query = query.strip().lower().replace("new search:", "")
            chat_history = []
        elif (len(chat_history) == MAX_HISTORY_LENGTH):
            chat_history.pop(0)
        result = run_chain(qa, query, chat_history)
        chat_history.append((query, result["answer"]))
        print(result["answer"],result['source_documents'])
        # print(bcolors.OKGREEN + result['answer'] + bcolors.ENDC)
        if 'source_documents' in result:
            # print(bcolors.OKGREEN + 'Sources:')
            for d in result['source_documents']:
                print(d.metadata['source'])
        return result
