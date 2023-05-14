// @ts-nocheck

import React, { useState } from 'react';
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

const questions: Question[] = [
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

const QuestionModal: React.FC = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  
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
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [currentQuestion]: event.target.value,
    }));
   
    if(currentQuestion < questions.length - 1){
      handleNextQuestion();
    }
    else{
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    console.log('Answers:', answers);
    handleClose();
  };

  const currentQuestionObj = questions[currentQuestion];

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
          <Typography variant="h6" component="h2" gutterBottom>
            {currentQuestionObj.question}
          </Typography>
          {/* <Typography variant="body1" gutterBottom>
            {currentQuestionObj.question}
          </Typography> */}
          <FormControl component="fieldset">
            <RadioGroup
              name="answer"
              value={answers[currentQuestion] || ''}
              onChange={handleAnswerChange}
            >
              {currentQuestionObj.options.map((option, index) => (
                <FormControlLabel
                  key={index}
                  value={option}
                  control={<Radio />}
                  label={option}
                />
              ))}
            </RadioGroup>
            <TextField
              label="Send the prompt"
              onChange={(e) => setPrompt(e.target.value)}
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
          </FormControl>
          {currentQuestion < questions.length - 1 ? (
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
          )}
        </div>
      </Modal>
    </div>
  );
};

export default QuestionModal;
