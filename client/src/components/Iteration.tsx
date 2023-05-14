import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Paper, TextField, Button } from '@material-ui/core';

import ConversationStepper from './ConversationStepper';

interface Message {
  role: string;
  content: string;
}

interface IterationProps {
  initialConversation: Message[];
  initialCostDetail: string | null;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    padding: theme.spacing(3),
  },
  chatContainer: {
    overflowY: 'auto',
    marginBottom: theme.spacing(2),
    maxHeight: 'calc(100vh - 200px)',
  },
  chatBubble: {
    display: 'flex',
    alignItems: 'flex-start',
    marginBottom: theme.spacing(1),
  },
  userBubble: {
    marginLeft: 'auto',
    background: '#F5F5F5',
  },
  botBubble: {
    marginRight: 'auto',
    background: '#DCF8C6',
  },
  inputContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
  },
  inputField: {
    flexGrow: 1,
    marginRight: theme.spacing(2),
  },
  button: {
    flexShrink: 0,
  },
}));

const Iteration: React.FC<IterationProps> = () => {
  const initialConversation: Message[] = [
    {
      role: 'bot',
      content: 'Welcome to the chat bot! Type a prompt to get started.',
    },
  ];
  const initialCostDetail: string | null = null;

  const classes = useStyles();
  const [conversation, setConversation] =
    useState<Message[]>(initialConversation);
  const [input, setInput] = useState('');
  const [costDetail, setCostDetail] = useState<string | null>(
    initialCostDetail
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleEnterKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
    if (input.trim() !== '') {
      const newMessage: Message = { role: 'user', content: input };
      setConversation([...conversation, newMessage]);
      setInput('');
      fetchCostDetail(input);
    }
  };

  const fetchCostDetail = (prompt: string) => {
    // Perform an API call or any other logic to fetch the updated cost detail based on the prompt
    // Replace the code below with your actual implementation
    const updatedCostDetail = `Cost detail for "${prompt}" goes here...`;
    const newMessage: Message = { role: 'bot', content: updatedCostDetail };
    setCostDetail(updatedCostDetail);
    setConversation([...conversation, newMessage]);
  };

  return (
    <Paper elevation={3} className={classes.root}>
      <div className={classes.chatContainer}>
        {/* {conversation.map((message, index) => (
          <div
            key={index}
            className={`${classes.chatBubble} ${
              message.role === 'user' ? classes.userBubble : classes.botBubble
            }`}
          >
            <Typography variant="body1">{message.content}</Typography>
          </div>
        ))} */}
        <ConversationStepper conversation={conversation} />
      </div>

      <div className={classes.inputContainer}>
        <TextField
          label="Type a prompt"
          variant="outlined"
          className={classes.inputField}
          value={input}
          onChange={handleInputChange}
          onKeyPress={handleEnterKeyPress}
        />

        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={handleSendMessage}
        >
          Send
        </Button>
      </div>

      {/* {costDetail && (
        <Typography variant="body1" gutterBottom>
          Updated Cost Detail: {costDetail}
        </Typography>
      )} */}
    </Paper>
  );
};

export default Iteration;
