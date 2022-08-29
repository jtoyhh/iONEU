import Link from "next/link";
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Zoom from '@mui/material/Zoom';
import Box from '@mui/material/Box';
import { SxProps } from '@mui/system';
import { Button, Card, CardActionArea, CardContent, CardMedia, Stack } from '@mui/material';
import Modal from '@mui/material/Modal';
import React, { useEffect, useState } from 'react';
import axios from 'axios';


const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};



interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}


function a11yProps(index: any) {
  return {
    id: `action-tab-${index}`,
    'aria-controls': `action-tabpanel-${index}`,
  };
}

const fabStyle = {
  position: 'absolute',
};

export default function Searching() {
  const theme = useTheme();

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  // 맨처음 화면 불러올 때 들어오는 데이터
  useEffect(() => {
    axios
      .get(
        // 금융 일반 정책
        `http://127.0.0.1:8000/ioneu/main/financePolicy`,
      )
      .then((response) => {
        setRows1(response.data)

      })
      .catch((e) => {
        console.log(e);
      });

    axios
      .get(
        // 청년정책 일반 기업
        `http://127.0.0.1:8000/ioneu/main/youth/basic`,
      )
      .then((response) => {
        setRows2(response.data)

      })
      .catch((e) => {
        console.log(e);
      });
  }, [])

  const [rows1, setRows1] = useState([]);
  const [rows2, setRows2] = useState([]);

  const [value, setValue] = React.useState(0);

  // 탭 눌렀을 때, 
  const handleChange = (event: unknown, newValue: number) => {
    setValue(newValue);
  };

  const fabs = [
    {
      exc: ['금융', '창업', '기술', '인력', '수출', '내수', '기타'],
      sx: fabStyle as SxProps,
      label: 'Add',
      r: rows1,
    },

    {
      exc: ['서울', '부산', '대구', '인천', '광주', '대전', '울산', '경기', '강원', '충북', '충남', '전북', '전남', '경남', '경북', '제주'],
      sx: fabStyle as SxProps,
      label: 'Edit',
      r: rows2,
    },
  ];
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onClick = (hashtag: any) => {
    if (value == 0){
      axios
      .get(
        // 금융 일반 정책
        `http://127.0.0.1:8000/ioneu/main/Policy/${hashtag}`,
      )
      .then((response) => {
        setRows1(response.data)
      })
      .catch((e) => {
        console.log(e);
      });
    }
    else{
    axios
      .get(
        // 청년 정책
        `http://127.0.0.1:8000/ioneu/main/youth/${hashtag}`,
      )
      .then((response) => {
        setRows2(response.data)
      })
      .catch((e) => {
        console.log(e);
      });
    }
  }

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
      <>
        <Typography variant="h5">
          유형별 맞춤정책 찾아보기
        </Typography>
        <br />
      </>

      <Box
        sx={{
          bgcolor: 'background.paper',
          position: 'relative',
          minHeight: 200,
        }}
      >
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="action tabs example"
          >
            <Tab
            label="중소기업"  
            aria-label="중소기업" 
            {...a11yProps(0)} 
            />
            <Tab 
            label="청년정책"
            aria-label="청년정책"
             
            {...a11yProps(1)} 
            />
          </Tabs>
        </AppBar>
        <br />

        {fabs.map((fab, index) => (
          <Zoom
            key={fab.label}
            in={value === index}
            timeout={transitionDuration}
            unmountOnExit
          >
            <Box sx={fab.sx}>
              {fab.exc.map((exc) => (
                <Button
                  onClick={() => onClick(exc)}>
                  {exc}
                </Button>
              ))}

              <Stack direction="row">
                {fab.r.map((row, exc) => (
                  <Card
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
                        <>
                        {
                          value == 0
                          ? <Typography gutterBottom variant="h5" component="div">{row[1]}</Typography>
                          : <Typography gutterBottom variant="h5" component="div">{row[0]}</Typography>
                        } 
                        </>
                        <Typography variant="body2" color="text.secondary">
                          {row[2]}
                      </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                ))}
              </Stack>
            </Box>
          </Zoom>
        ))}
      </Box>
    </>
  );
}