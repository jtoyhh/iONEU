import * as React from 'react';
import { Box, Grid } from "@mui/material"
import HashTag from './hashtag';
import Graph from './graph';
import Searching from './searching';


export default function Mybox () {
  return (
    <>
    <Grid container spacing={5}>
      
      <Grid 
        item xs={9.5}
        >
        <HashTag />
      </Grid>
      <Grid item xs={2.5}>
        <Graph />
      </Grid>
    </Grid>
    <br />
    <br />
    <Grid>
      <Searching />
    </Grid>
    </>
  );
};

