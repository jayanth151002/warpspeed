import { createSlice } from '@reduxjs/toolkit'

interface activeEntitiesState{
	questions:string[];
    answers:string[];
    bizProblem:string;
}

const initialState:activeEntitiesState={
	questions:[],
    answers:[],
    bizProblem:''
}

const exampleSlice = createSlice({
	name:'activeEntities',
	initialState,
	reducers:{
		updateQuestions:(state,action)=>{
            state.questions.concat(action.payload.questions)
        }
	}
})

export const { join } = exampleSlice.actions
export default exampleSlice.reducer