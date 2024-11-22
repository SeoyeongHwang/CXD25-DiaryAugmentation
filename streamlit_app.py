import streamlit as st
from langchain_openai import OpenAI

st.title('🦜🔗 LangChain과 Streamlit을 활용한 앱')

openai_api_key = st.sidebar.text_input('OpenAI API 키를 입력하세요', type='password')

def generate_response(input_text):
    llm = OpenAI(temperature=0.7, openai_api_key=openai_api_key)
    response = llm(input_text)
    st.info(response)

with st.form('my_form'):
    text = st.text_area('질문을 입력하세요:', '예: 코딩을 배우는 세 가지 핵심 조언은 무엇인가요?')
    submitted = st.form_submit_button('전송')

    if not openai_api_key:
        st.warning('OpenAI API 키를 입력해주세요!', icon='⚠️')
    if submitted and openai_api_key:
        generate_response(text)
