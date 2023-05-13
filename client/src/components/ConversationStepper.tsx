import React, { useState } from 'react';
import { MobileStepper, Typography, makeStyles, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 400,
    margin: 'auto',
    marginBottom: theme.spacing(3),
  },
  chatBubble: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(1),
    borderRadius: theme.spacing(1),
    boxShadow: theme.shadows[1],
  },
  userBubble: {
    backgroundColor: '#e1f5fe',
  },
  botBubble: {
    backgroundColor: '#f5f5f5',
  },
}));

interface ConversationMessage {
  role: string;
  content: string;
}

interface ConversationStepperProps {
  conversation: ConversationMessage[];
}

const ConversationStepper: React.FC<ConversationStepperProps> = ({ conversation }) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  let maxSteps =  conversation?.length;
 

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div className={classes.root}>
      <MobileStepper
        variant="text"
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
            Next
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            Back
          </Button>
        }
      />
      <div
        key={activeStep}
        className={`${classes.chatBubble} ${
          conversation[activeStep].role === 'user' ? classes.userBubble : classes.botBubble
        }`}
      >
        <Typography variant="body1">{conversation[activeStep].content}</Typography>
      </div>
    </div>
  );
};

export default ConversationStepper;
