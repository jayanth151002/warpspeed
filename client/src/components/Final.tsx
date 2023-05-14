import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  Container,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    padding: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  layer: {
    marginBottom: theme.spacing(4),
  },
  layerName: {
    marginBottom: theme.spacing(2),
  },
  listItem: {
    marginBottom: theme.spacing(2),
  },
  listItemText: {
    marginBottom: theme.spacing(1),
  },
  summary: {
    marginTop: theme.spacing(4),
  },
}));

const Final = () => {
  const classes = useStyles();

  // Dummy project data
  const project = {
    title: 'Name of the Project',
    introduction: 'Project introduction goes here...',
    layers: [
      {
        name: 'Name of Layer 1',
        services: ['Service 1', 'Service 2'],
        purpose: 'Purpose of Layer 1',
        key_features: [
          {
            feature: 'Feature 1',
            explanation: 'Explanation of Feature 1...',
          },
          {
            feature: 'Feature 2',
            explanation: 'Explanation of Feature 2...',
          },
        ],
      },
      // Add more layers as needed
    ],
    summary: 'Project summary goes here...',
  };

  return (
    <Paper elevation={3} className={classes.root}>
      <Container>
        <Typography variant="h4" gutterBottom>
          {project.title}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {project.introduction}
        </Typography>

        {project.layers.map((layer) => (
          <div key={layer.name} className={classes.layer}>
            <Typography variant="h5" className={classes.layerName}>
              Layer: {layer.name}
            </Typography>
            <Typography variant="body1" className={classes.listItemText}>
              <strong>Purpose:</strong> {layer.purpose}
            </Typography>
            <Typography variant="body1" className={classes.listItemText}>
              <strong>Services:</strong> {layer.services.join(', ')}
            </Typography>
            <Typography variant="body1" className={classes.listItemText}>
              <strong>Key Features:</strong>
            </Typography>
            <List dense>
              {layer.key_features.map((feature) => (
                <React.Fragment key={feature.feature}>
                  <ListItem className={classes.listItem}>
                    <ListItemText
                      primary={feature.feature}
                      secondary={feature.explanation}
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          </div>
        ))}

        <Typography variant="body1" className={classes.summary}>
          <strong>Summary:</strong> {project.summary}
        </Typography>
      </Container>
      <Container>
        {/* <Button>
            jsdfkg
        </Button> */}
      </Container>
    </Paper>
  );
};

export default Final;
