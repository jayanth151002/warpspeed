import React, { useState } from 'react';

import axios from 'axios';

import {
  Typography,
  Button,
  TextField,
  InputAdornment,
  Container,
  Grid,
} from '@material-ui/core'; // Importing from Material-UI v4

export default function BizProblem({}) {
  const backendUrl = 'http://localhost:5000';
  const [bizProb, setBizProb] = useState('');
  const [questions, setQuestions] = useState({});

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('submit');
    console.log(bizProb);

    axios
      .post(
        `${backendUrl}/prompts/generateQuestions`,
        {
          bizProb: bizProb,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setQuestions(res.data);
      });
  };

  return (
    <form onSubmit={handleSubmit} noValidate autoComplete="off">
      <TextField
        label="Send the Business Problem"
        onChange={(e) => setBizProb(e.target.value)}
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
