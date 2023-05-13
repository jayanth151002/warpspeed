mport Head from 'next/head';
import * as React from 'react';
import { useState } from 'react';
import Image from 'next/image';
import styles from '@/styles/Home.module.css';
import Appbar from '@/components/Appbar';
import {
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Container,
  Grid,
} from '@mui/material';

export default function Home() {
  const [prompt, setPrompt] = useState<string>('');
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('submit');
    console.log(prompt);

    // axios
    //   .post(
    //     `http://localhost:5000/image`,
    //     {

    //     },
    //     {
    //       headers: {
    //         // 'Content-Type': 'multipart/form-data',
    //         'Content-Type': 'application/json',
    //       },
    //     }
    //   )
    //   .then((res) => {
    //     console.log(res.data);

    //   });
  };

  return (
    <>
      <Head>
        <title>Sky Bot</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Appbar />
        <Container maxWidth="sm">
          <Box
            sx={{
              minHeight: '100vh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h4" align="center">
                  Let's Build something cool today!
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <form onSubmit={handleSubmit} noValidate autoComplete="off">
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
                          >
                            Submit
                          </Button>
                        </InputAdornment>
                      ),
                    }}
                  />
                </form>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </main>
    </>
  );
}
