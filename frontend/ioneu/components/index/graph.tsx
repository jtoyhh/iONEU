import React from 'react';
import Chart from 'chart.js/auto';
import { BarController, PieController } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import { Typography, Grid } from '@mui/material';
export default function Graph() {

  Chart.register(BarController, PieController);

  const data1 = {
    labels: [
      '중소기업',
      '기타',
    ],

    datasets: [{
      label: 'My First Dataset',
      data: [99.9, 0.1],

      backgroundColor: [
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ],
    }]
  };

  const data2 = {
    labels: [
      '중소', '대기업',
    ],

    datasets: [{
      label: 'My First Dataset',
      data: [90, 10],

      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 205, 86)'
      ],
    }]
  };

  const config1 = {
    type: 'bar',
    data: data1,
  };

  const config2 = {
    type: 'pie',
    data: data2,
  };

  return (
    <>
      <Typography variant="h5">
        중소기업 재직 현황
      </Typography>
      <br />
      <Grid container spacing={10}>
        <Grid
          item xs={6}

        >
          <div >
            <Bar data={data1} style= {{ height: '300px'}}/>
          </div>          </Grid>
        <Grid item xs={6}>

          <div style={{ width: '15vw' }}>
            <Pie data={data2} />
          </div>          </Grid>
      </Grid>

    </>
  )
};
