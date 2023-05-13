import Head from 'next/head';
import * as React from 'react';
import { useState } from 'react';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import Appbar from '@/components/Appbar';
import { Box } from '@mui/material';
import { Typography } from '@mui/material';
import { Button } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import CircularProgress from '@mui/material/CircularProgress';

export default function Home() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('submit');

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

  const handleChange = (event: SelectChangeEvent) => {
    // setCompany(event.target.value as string);
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
        <Box>
          <Appbar />
        </Box>
      </main>
    </>
  );
}