import React from "react";
import { Grid, Paper, Typography } from "@mui/material";
import Bar from "../components/Overview/Bar";
import Pie from "../components/Overview/Pie";

function OverviewAdmin() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Paper
          elevation={3}
          style={{
            padding: "10px",
            height: "100%",
            marginTop: "30px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h6"></Typography>
          <Pie />
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper
          elevation={3}
          style={{
            padding: "10px",
            height: "100%",
            marginTop: "30px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h6"></Typography>
          <Bar />
        </Paper>
      </Grid>
    </Grid>
  );
}

export default OverviewAdmin;
