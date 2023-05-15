import React, { useState } from 'react';
import router from 'next/router';

import axios from 'axios';

import {
  Typography,
  Button,
  TextField,
  InputAdornment,
  Container,
  Grid,
} from '@material-ui/core'; // Importing from Material-UI v4

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  updateQuestions,
  updateBizProblem,
} from '../redux/slices/activeEntities';
import { API_URL } from '../constants';

export default function BizProblem() {
  const questionsNew = useAppSelector(
    (state) => state.activeEntities.questions
  );

  const [bizProblem, setBizProblem] = useState('');
  const bizProblemNew = useAppSelector(
    (state) => state.activeEntities.bizProblem
  );

  const dispatch = useAppDispatch();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('submit');
    dispatch(updateBizProblem({ bizProblem: bizProblem }));

    axios
      .post(
        `${API_URL}/prompts/generateQuestions`,
        {
          bizProb: bizProblemNew,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        dispatch(updateQuestions({ questions: res.data.questions }));
        router.push('/generate');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form onSubmit={handleSubmit} noValidate autoComplete="off">
      <TextField
        label="Send the Business Problem"
        onChange={(e) => setBizProblem(e.target.value)} // dispatching the action to update the state
        fullWidth
        variant="outlined"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Button variant="contained" color="primary" type="submit">
                Submit
              </Button>
            </InputAdornment>
          ),
        }}
      />
    </form>
  );
}
