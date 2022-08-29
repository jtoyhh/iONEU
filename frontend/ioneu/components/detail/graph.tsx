import * as React from 'react';
import { Box, Paper, Stack, Grid, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import CheckIcon from '@mui/icons-material/Check';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import IosShareIcon from '@mui/icons-material/IosShare';

const Item0 = styled(Box)(({ theme }) => ({
  backgroundColor: '#F5711A',
  padding: theme.spacing(1),
  variant: "outlined",
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: '40px'
}));
const Item = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
  variant: "outlined",
  border: '1px solid grey',
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: '40px'
}));


export default function Graph() {
  return (
    <Stack spacing={2}
      style={{
        color: 'white',
        // backgroundColor: '#e91e63', 
        height: '200px'
      }}>
      <Item0>

        <Typography float="inline-block" variant="h6" fontWeight="bold" letterSpacing={-2} color='white'>
          <CheckIcon></CheckIcon>즉시지원
        </Typography></Item0>
      <Item>
        <Typography variant="h6" fontWeight="bold" letterSpacing={-2} color='#251D70'>
          <StarBorderIcon></StarBorderIcon>
          관심공고
        </Typography>
      </Item>
      <Item>
        <Typography variant="h6" fontWeight="bold" letterSpacing={-2} color='#251D70'>

          <LocalPrintshopIcon></LocalPrintshopIcon>인쇄하기
        </Typography>
      </Item>
      <Item>
        <Typography variant="h6" fontWeight="bold" letterSpacing={-2} color='#251D70'>
          <IosShareIcon></IosShareIcon>
          URL복사
        </Typography>
      </Item>
    </Stack>
  );
}