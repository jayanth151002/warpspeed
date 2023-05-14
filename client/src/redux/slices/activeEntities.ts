import Architecture from '@/components/Architecture';
import { createSlice } from '@reduxjs/toolkit';

interface key_features {
  feature: string;
  explanation: string;
}
interface Layer {
  name: string;
  services: string[];
  purpose: string;
  key_features: key_features[];
}
interface Architecture {
  title: string;
  introduction: string;
  layers: Layer[];
  summary: string;
}
interface activeEntitiesState {
  bizProblem: string;
  questions: string[];
  answers: string[];
  architecture: Architecture;
}

const initialState: activeEntitiesState = {
  bizProblem: '',
  questions: [],
  answers: [],
  architecture: {} as Architecture,
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
    },
  },
});

export const {
  updateQuestions,
  updateBizProblem,
  updateAnswers,
  updateArchitecture,
} = exampleSlice.actions;
export default exampleSlice.reducer;
