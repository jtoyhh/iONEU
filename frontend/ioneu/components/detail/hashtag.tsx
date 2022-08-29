import * as React from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { Box, Grid } from '@mui/material';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import CorporateFareOutlinedIcon from '@mui/icons-material/CorporateFareOutlined';

const Item1 = styled(Paper)(({ theme }) => ({
  backgroundColor: '#859BE4',
  padding: theme.spacing(1),
  // textAlign: 'center',
  color: theme.palette.text.secondary,
  height: '200px'
}));

const Item2 = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
  height: '250px'
}));

export default function SimplePaper() {
  return (
    <Stack
      style={{
        color: 'white', 
        height: '450px'
      }}>
      <Item1>
        <>
          <Grid container spacing={5}>
            <Grid
              item xs={9.5}
            >
              <Typography variant="h4" fontWeight={500} letterSpacing={-2} color='white' padding={3}>
                동물용 체외의약품(진단키트) 품질보증팀 정규직 모집
              </Typography>
            </Grid>
            <Grid item xs={2.5}>
              <QueryBuilderIcon
                sx={{
                  color: "white",
                  width: "100px",
                  height: "150px",
                }}
              ></QueryBuilderIcon>
            </Grid>
          </Grid>
        </>
        <Typography fontWeight={500} letterSpacing={-2} color='white' pl={3}>
          (주)베트올
        </Typography>
      </Item1>
      <Item2>
      <Grid container spacing={5}>
            <Grid
              item xs={4}
            >
              <Typography variant="h6" fontWeight={500} color="darkblue" letterSpacing={-2} padding={3}>
                <ClassOutlinedIcon></ClassOutlinedIcon>
                근무조건
              </Typography>
              <Box pl={3}>
              정규직<br/>
              급여 면접후 결정<br/>
              주 5일 | 오전 8시 30분~오후 5시 30분<br/>
              경기 고양시 덕양구, 서울 은평구<br/>
              지하철 서울3호선 삼송역<br/>
              </Box>
            </Grid>
            <Grid
              item xs={4}
            >
              <Typography variant="h6" fontWeight={500} color="darkblue" letterSpacing={-2} padding={3}>
                <EventNoteOutlinedIcon></EventNoteOutlinedIcon>지원자격
              </Typography>
              <Box pl={3}>
              신입, 경력 무관, 경력무관<br />
              대학교(4년)
              </Box>
            </Grid>
            <Grid
              item xs={4}
            >
              <Typography variant="h6" fontWeight={500} color="darkblue" letterSpacing={-2} padding={3}>
                <CorporateFareOutlinedIcon></CorporateFareOutlinedIcon>기업정보
              </Typography>
              <Box pl={3}>
              2006년 설립(업력 17년)<br />
              사원 41명<br />
비상장 벤처기업<br />
              </Box>
            </Grid>
          </Grid>
      </Item2>
    </Stack>

  );
}