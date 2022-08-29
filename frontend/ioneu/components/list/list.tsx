import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Container, Typography} from "@mui/material";
import Link from "next/link";


function createData(
  name: string,
  business : string,
  industry: string,
  wealfare: string,
) {
  return { name, business, industry, wealfare };
}

export default function BasicTable() {

  const [rows, setRows] = useState([]);
  useEffect(()=> {
      const params = new URLSearchParams(location.search);
      let id = params.get("id");
      console.log(id)
      axios
        .get(
          `http://127.0.0.1:8000/ioneu/main/wealfare/${id}`, 
        )
        .then((response) => {
          console.log(response.data)
          setRows(response.data)
          // console.log(response.data[0])

        })
        .catch((e) => {
          console.log(e);
        });
    }, [])



  return (
    <div>
      <Container>
          <Typography variant="h5">
            회사목록
          </Typography>
          <br />
        <TableContainer component={Paper}>
          <Table 
          sx={{ minWidth: 250 }} aria-label="simple table"
          >
              <TableHead
              sx={{
                bgcolor : "#E9E9E9",
              }}
              >
              <TableRow >
                  <TableCell sx={{
                                  fontWeight: 'bold',
                                  fontSize: 16
                  }}>기업명</TableCell>
                  <TableCell sx={{
                                  fontWeight: 'bold',
                                  fontSize: 16
                  }}>주요사업</TableCell>
                  <TableCell sx={{
                                  fontWeight: 'bold',
                                  fontSize: 16
                  }}>산업1</TableCell>
                  <TableCell sx={{
                                  fontWeight: 'bold',
                                  fontSize: 16
                  }}>산업2</TableCell>
                                    <TableCell sx={{
                                  fontWeight: 'bold',
                                  fontSize: 16
                  }}>성과보상</TableCell>
                                    <TableCell sx={{
                                  fontWeight: 'bold',
                                  fontSize: 16
                  }}>열린문화</TableCell>
                                    <TableCell sx={{
                                  fontWeight: 'bold',
                                  fontSize: 16
                  }}>건강한삶</TableCell>
                                    <TableCell sx={{
                                  fontWeight: 'bold',
                                  fontSize: 16
                  }}>역량성장</TableCell>
              </TableRow>
              </TableHead>
              <TableBody>
              
              {rows.map((row) => (
                  <TableRow
                  key={row[0]}
                  sx={{
                    ':hover': {
                      bgcolor: 'primary.main', 
                      color: 'white',
                    },
                  }}
                  >
                  <Link href={{ pathname: 'detail', query: { id: row[0] } }}>
                      <TableCell>
                          <a>
                          {row[0]}
                          </a>
                      </TableCell>
                      </Link>
                  <TableCell>{row[1]}</TableCell>
                  <TableCell>{row[2]}</TableCell>
                  <TableCell>{row[3]}</TableCell>
                  <TableCell>{row[4]}</TableCell>
                  <TableCell>{row[5]}</TableCell>
                  <TableCell>{row[6]}</TableCell>
                  <TableCell>{row[7]}</TableCell>
                  </TableRow>
              ))}
              </TableBody>
          </Table>
          </TableContainer>
      </Container>
    </div>
  );
}
