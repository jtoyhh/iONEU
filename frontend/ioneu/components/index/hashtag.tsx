import React, { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import { Button, Grid, Paper } from '@mui/material';
import Typography from '@mui/material/Typography';
import Link from "next/link";
import AcUnitIcon from '@mui/icons-material/AcUnit';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function SimplePaper() {


  const hashtags = ['역량성장', '열린문화',
  '건강한삶', '성과보상']

    const [tag, setTag] = useState('');

    const onClick = (hashtag : any) => {
      setTag(hashtag)
    } 

  return (
    <>
    <Typography variant="h5">
        맞춤기업 해시태그
      </Typography>
    <br />
      <Grid container spacing={2}>
      {hashtags.map((hashtag) => (
        <Grid item xs={6}>
        <Button
        onClick={() => onClick(hashtag)}
        key={hashtag}
        variant="outlined"
        sx={{
          width: "200px",
          height: '100px',
          ':hover': {
            bgcolor: 'primary.main', 
            color: 'white',
          },
        }}
        >
          <AcUnitIcon></AcUnitIcon>
          <br></br>
          <Link href={{ pathname: 'list', query: { id: hashtag } }}>
            <a style={{
            textDecoration : 'none',
          }}>
            #{hashtag}
            </a>
          </Link>
        </Button>
        </Grid>
      )
      )}
      </Grid>
    </>
  );
}