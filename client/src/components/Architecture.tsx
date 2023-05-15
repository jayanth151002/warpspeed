import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { project } from '../constants'
import CodeDisplay from './Code';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  layer: {
    marginTop: theme.spacing(2),
  },
  layerTitle: {
    marginBottom: theme.spacing(1),
  },
  features: {
    marginLeft: theme.spacing(1),
  },
  expansionPanel: {
    marginTop: theme.spacing(1),
  },
}));

const Architecture = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Card>
        <CardContent>
          <Typography variant="h4" className={classes.title}>
            {project.title}
          </Typography>
          <img width="300px" src="https://cloudpilot-systems-design-diagrams.s3.amazonaws.com/diagrams/8f69a890100960d2.png" />
          <Typography variant="body1">{project.introduction}</Typography>
          {project.layers.map((layer, index) => (
            <div key={index} className={classes.layer}>
              <Typography variant="h6" className={classes.layerTitle}>
                {layer.title}
              </Typography>
              <Typography variant="subtitle1">Purpose: {layer.purpose}</Typography>
              <Typography variant="subtitle1">Services:</Typography>
              <List dense>
                {layer.services.map((service, idx) => (
                  <ListItem key={idx}>
                    <ListItemText primary={service} />
                  </ListItem>
                ))}
              </List>
              <Typography variant="subtitle1">Key Features:</Typography>
              <List dense className={classes.features}>
                {layer.key_features.map((feature, idx) => (
                  <ExpansionPanel key={idx} className={classes.expansionPanel}>
                    <ExpansionPanelSummary
                      expandIcon={<ExpandMoreIcon />}
                    >
                      <Typography>{feature.feature}</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <Typography>{feature.explanation}</Typography>
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                ))}
              </List>
            </div>
          ))}
          <Divider />
          <Typography variant="h6" className={classes.title}>
            Source Documents
          </Typography>
          <List dense>
            {project.source_docs.map((doc, idx) => (
              <ListItem key={idx}>
                <ListItemText primary={doc.title} secondary={doc.source} />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
      <CodeDisplay />
    </div>
  );
};

export default Architecture;