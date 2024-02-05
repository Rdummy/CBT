import React from "react";
import { Grid, Paper, Typography } from "@mui/material";
import Bar from "../components/Overview/Bar";
import Pie from "../components/Overview/Pie";
import "../assets/styles/overview-page.css";
function OverviewAdmin() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Paper className="paper-pie" elevation={3}>
          <Typography variant="h6"></Typography>
          <Pie />
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper className="paper-bar" elevation={3}>
          <Typography variant="h6"></Typography>
          <Bar />
        </Paper>
      </Grid>
    </Grid>
  );
}

export default OverviewAdmin;
