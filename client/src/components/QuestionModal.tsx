// @ts-nocheck

import React, { useState, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  Button,
  Modal,
  Typography,
  FormControl,
  RadioGroup,
  TextField,
  InputAdornment,
  FormControlLabel,
  Radio,
} from '@material-ui/core';

import axios from 'axios';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modalContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    modalContent: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(3),
      outline: 'none',
      width: 400,
    },
  })
);

interface Question {
  id: number;
  question: string;
  options: string[];
}

const gernericQuestions: Question[] = [
  {
    id: 1,
    question: 'Question 1',
    options: ['Option 1', 'Option 2'],
  },
  {
    id: 2,
    question: 'Question 2',
    options: ['Option 1', 'Option 2'],
  },
  {
    id: 3,
    question: 'Question 3',
    options: ['Option 1', 'Option 2'],
  },
];

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { updateQuestions, updateAnswers } from '../redux/slices/activeEntities';

const QuestionModal: React.FC = () => {

  const backendUrl = 'http://localhost:5000';
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [prompt, setPrompt] = useState('');

  const questionsNew = useAppSelector(
    (state) => state.activeEntities.questionsNew
  );

  let queLength = 0;
  if (questionsNew) {
    queLength = questionsNew.length;
  }
  const answersNew = useAppSelector((state) => state.activeEntities.answers);
  const dispatch = useAppDispatch();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentQuestion(0);
    setAnswers({});
  };

  const handleNextQuestion = () => {
    setCurrentQuestion((prevQuestion) => prevQuestion + 1);
  };

  const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(currentQuestion);
    setAnswers((prevAnswers) => [...prevAnswers, event.target.value]);
    if (currentQuestion < queLength + 3 - 1) {
      handleNextQuestion();
    } else {
      handleSubmit();
    }
  };

  const handleAnswerSubmit = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(currentQuestion);
    setAnswers((prevAnswers) => [...prevAnswers, prompt]);
    setPrompt('');
    if (currentQuestion < queLength + 3 - 1) {
      handleNextQuestion();
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    console.log('Answers:', answers);
    dispatch(updateQuestions(answers));

    axios
      .post(
        `${backendUrl}/prompts/generateQuestions`,
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
      })
      .catch((err) => {
        console.log(err);
      });
    setAnswers([]);
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleOpen} variant="contained">
        Click here to enter requirements
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        className={classes.modalContainer}
      >
        <div className={classes.modalContent}>
          {/* <Typography variant="body1" gutterBottom>
            {currentQuestionObj.question}
          </Typography> */}

          <FormControl component="fieldset">
            {currentQuestion < 3 ? (
              <>
                {/* for the gernericQuestions */}
                <Typography variant="h6" component="h2" gutterBottom>
                  {gernericQuestions[currentQuestion].question}
                </Typography>
                <RadioGroup
                  name="answer"
                  value={answers[currentQuestion] || ''}
                  onChange={handleAnswerChange}
                >
                  {gernericQuestions[currentQuestion].options.map(
                    (option, index) => (
                      <FormControlLabel
                        key={index}
                        value={option}
                        control={<Radio />}
                        label={option}
                      />
                    )
                  )}
                </RadioGroup>
                <TextField
                  label="Send the prompt"
                  onChange={(e) => setPrompt(e.target.value)}
                  fullWidth
                  variant="outlined"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                          onClick={handleAnswerSubmit}
                        >
                          Submit
                        </Button>
                      </InputAdornment>
                    ),
                  }}
                />
              </>
            ) : currentQuestion < questionsNew.length - 1 ? (
              <>
                <Typography variant="h6" component="h2" gutterBottom>
                  {questionsNew[currentQuestion - 3]}
                </Typography>
                <TextField
                  label="Send the prompt"
                  onChange={(e) => setPrompt(e.target.value)}
                  fullWidth
                  variant="outlined"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                          onSubmit={handleAnswerSubmit}
                        >
                          Next
                        </Button>
                      </InputAdornment>
                    ),
                  }}
                />
              </>
            ) : (
              <>
                <Typography variant="h6" component="h2" gutterBottom>
                  {questionsNew[currentQuestion - 3]}
                </Typography>
                <TextField
                  label="Send the prompt"
                  onChange={(e) => setPrompt(e.target.value)}
                  fullWidth
                  variant="outlined"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                          onSubmit={handleSubmit}
                        >
                          Next
                        </Button>
                      </InputAdornment>
                    ),
                  }}
                />
              </>
            )}
          </FormControl>
          {/* {currentQuestion < questionsNew.length - 1 ? (
            <Button
              variant="contained"
              color="primary"
              onClick={handleNextQuestion}
            >
              Next
            </Button>
          ) : (
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Submit
            </Button>
          )} */}
        </div>
      </Modal>
    </div>
  );
};

export default QuestionModal;
