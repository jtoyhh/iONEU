import React, { useEffect, useState } from 'react';
import { Container, TextField, Typography, Stack } from "@mui/material";
import axios from 'axios';


export default function List() {
  const [userInfo, setUserInfo] = useState('');

  useEffect(()=> {
    axios
      .get(
        `http://127.0.0.1:8000/ioneu/main/wealfare/${'h2'}`, 
      )
      .then((response) => {
        // console.log(response.data)
        setUserInfo(response.data)
      })
      .catch((e) => {
        console.log(e);
      });
  }, [])

  
  return (
      <>
      <Container>
        <Typography variant="h5">
          회사목록

        </Typography>
        <>
        {userInfo}
        </>
        
      </Container>
      </>
    );
  };
