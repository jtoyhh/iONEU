import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from "next/link";

export default function Searching() {
  const [companyName, setCompanyName] = useState('');

  // useEffect(()=> {
  //   const params = new URLSearchParams(location.search);
  //   let id = params.get("id");
  //   console.log(id)
  //   axios
  //     .get(
  //       `http://127.0.0.1:8000/ioneu/main/detail`, 
  //     )
  //     .then((response) => {
  //       console.log(response.data)
  //       // setCompanyName(response.data)
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // }, [])

  return (
      <Stack spacing={2}
      // style={{ color: 'white', backgroundColor: '#e91e63', 
      // height: '300px'}}
      >
        {/* <Card
                    onClick={handleOpen}
                    sx={{
                      m: 3,
                      maxWidth: 345
                    }}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="100"
                        image="/images/ci.png"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {row}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card> */}

        <img src={'/images/1.png'} />
        <img src={'/images/2.png'} />
        <img src={'/images/3.csv'} />
    </Stack>
  );
}