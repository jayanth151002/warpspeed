import { createSlice } from '@reduxjs/toolkit';

interface activeEntitiesState {
  bizProblem: string;
  questions: string[];
  answers: string[];
  architecture: string;
}

const initialState: activeEntitiesState = {
  bizProblem: '',
  questions: [],
  answers: [],
  architecture: '',
};

const exampleSlice = createSlice({
  name: 'activeEntities',
  initialState,
  reducers: {
    updateQuestions: (state, action) => {
      state.questions.concat(action.payload.questions);
    },
    updateBizProblem: (state, action) => {
      state.bizProblem = action.payload.bizProblem;
    },
    updateAnswers: (state, action) => {
      state.answers.concat(action.payload.answers);
    },
    updateArchitecture: (state, action) => {
      state.architecture = action.payload.architecture;
    }
    
  },
});

export const { updateQuestions, updateBizProblem , updateAnswers, updateArchitecture} = exampleSlice.actions;
export default exampleSlice.reducer;
