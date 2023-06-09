import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { PDFDownloadLink, BlobProvider } from '@react-pdf/renderer';

import BizProblem from './BizProblem';
import Architecture from './Architecture';
import QuestionModal from './QuestionModal';
import Iteration from './Iteration';
import Final from './Final';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  updateQuestions,
  updateBizProblem,
} from '../redux/slices/activeEntities';
import { useSelector } from 'react-redux';
import axios from 'axios';
import ProjectPDF from './FullReport';
import { project } from '../constants';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    button: {
      marginTop: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    actionsContainer: {
      marginBottom: theme.spacing(2),
    },
    resetContainer: {
      padding: theme.spacing(3),
    },
  })
);

function getSteps() {
  return [
    'Business Problem',
    'Get the Requiremtents',
    'Customize the Architecture',
    'Finalize the Architecture',
  ];
}

function getStepContent(step: number) {
  switch (step) {
    case 0:
      return <Step1Component />;
    case 1:
      return <Step2Component />;
    case 2:
      return <Step3Component />;
    case 3:
      return <Step4Component />;
    default:
      return 'Unknown step';
  }
}

const Step1Component = () => {
  const bizProblemNew = useAppSelector(
    (state) => state.activeEntities.bizProblem
  );
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        {bizProblemNew}
      </Typography>
    </div>
  );
};

const Step2Component = () => {
  return (
    <div>
      <QuestionModal />
    </div>
  );
};

const Step3Component = () => {
  return (
    <div>
      <Architecture />
    </div>
  );
};
const Step4Component = () => {
  return (
    <div>
      <Iteration />
    </div>
  );
};

export default function VerticalLinearStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [show, setShow] = React.useState(false);
  const { bizProblem } = useSelector((state: any) => state.activeEntities)
  const steps = getSteps();

  const handleNext = async () => {
    setShow(false);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    console.log('I WAS CLICKED')
    const res = await axios.post("https://api.cloudpilot.coursepanel.in/get-cloud-architecture", {
      prompt: bizProblem
    })
    await console.log(res.data)
  };

  const handleSubmit = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setShow(true);
  };

  const handleBack = () => {
    setShow(false);
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setShow(false);
    setActiveStep(0);
  };

  const handleStepClick = async (step: any) => {
    if (step > activeStep) {
      setShow(false)
      return;
    }
    setShow(false);
    setActiveStep(step);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel onClick={() => handleStepClick(index)}>
              {label}
            </StepLabel>
            <StepContent>
              {getStepContent(index)}
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button>
                  {activeStep === steps.length - 1 ? (
                    <>
                      <h1>Download PDF</h1>
                      <BlobProvider document={<ProjectPDF />}>
                        {({ blob, url, loading, error }) =>
                          false ? (
                            'Loading document...'
                          ) : (
                            <PDFDownloadLink
                              document={<ProjectPDF />}
                              fileName="project.pdf"
                            >
                              {({ blob, url, loading, error }) => (
                                <Button variant="contained" color="primary">
                                  Download PDF
                                </Button>
                              )}
                            </PDFDownloadLink>
                          )
                        }
                      </BlobProvider>
                    </>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      className={classes.button}
                    >
                      Next
                    </Button>
                  )}
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button
            variant="contained"
            onClick={handleReset}
            className={classes.button}
          >
            Reset
          </Button>
        </Paper>
      )}
      {show && <Final />}
    </div>
  );
}
