from flask import Flask, request, jsonify
import pandas as pd
import numpy as np
import ast
import openai
import py2neo
import os
from flask_cors import CORS
from scripts.get_cloud_architecture import get_cloud_architecture
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)
# TODO - Apply CORS properly else openai will be fucked
# CORS(app, origins=["http://localhost:3000", "https://example.com"])

app.config["OPENAI_API_KEY"] = os.environ.get("OPENAI_API_KEY")
OPENAI_API_KEY=os.environ.get("OPENAI_API_KEY")
# Set up OpenAI API key
openai.api_key = OPENAI_API_KEY

# @app.route('/similar_courses/<course_id>')
# def return_similar_courses(course_id):
#     df = pd.read_csv('https://testbucket1841.s3.ap-south-1.amazonaws.com/csv-dump/embedded_data.csv')
#     embeddings = df['ada_embedding']
#     course_idx = df.loc[df['id'] == course_id].index[0]
#     sims = find_similar_courses(course_idx, embeddings)
#     # Convert the array of tuples into a list of dictionaries
#     dict_list = [{'index': t[0], 'similarity': t[1]} for t in sims[:5]]
#     key_to_extract = 'index'
#     # Extract the indices from the list of dictionaries
#     indices = [d[key_to_extract] for d in dict_list]
#     # Use the indices to get the corresponding course data rows from the dataframe df
#     # Convert the list of dictionaries into a JSON string
#     similar_courses_dict_list = df.iloc[indices].drop(['ada_embedding','courseContent','text','tags'], axis=1).to_dict('records')
#     similar_courses = jsonify(similar_courses_dict_list)
#     return similar_courses

# @app.route('/hey-pinecone', methods=['GET'])
# def hey_pinecone():
#     list = pinecone.list_indexes()
#     # Return the query result as JSON
#     return jsonify(list)


@app.route('/get-cloud-architecture', methods=['POST'])
def cloud_archi_generate():
    data = request.get_json()
    prompt = data.get('prompt')

    if not prompt:
        return jsonify({'error': 'Statement is missing'}), 400
    
    # Return the query result as JSON
    result = get_cloud_architecture(prompt)
    return jsonify({'data':result}), 200

if __name__ == '__main__':
    app.run(debug=True, use_reloader=True)