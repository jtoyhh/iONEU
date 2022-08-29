import { Container, Grid } from "@mui/material";
import Graph from "./graph";
import HashTag from "./hashtag";
import Searching from "./Search/index";

export default function Company() {
  return (
    <>
      <Container
        // style={{ color: 'white', backgroundColor: '#e91e63' }}
        >
        <Grid container spacing={5}>
          <Grid 
            item xs={5}

            >
            <HashTag />
          </Grid>
          <Grid item xs={7}>
            <Graph />
          </Grid>
        </Grid>
        <br />
        <br />
        <Grid sx={{
          height: "500px",
        }}>
          <Searching />
        </Grid>
      </Container>
    </>
  )
}