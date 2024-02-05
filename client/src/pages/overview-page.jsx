import React from "react";
import {
  Button,
  Grid,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Bar from "../components/Overview/Bar";
import Pie from "../components/Overview/Pie";
import { Card } from "@mui/material";

function OverviewAdmin() {
  return (
    <>
      <div>
        <Card sx={{ height: "80vh" }}>
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
                <Bar />
              </Paper>
            </Grid>
          </Grid>

          {/* MUI Table */}
          <Table aria-label="simple table" sx={{ marginTop: "40px" }}>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Username</TableCell>
                <TableCell align="left">User Role</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">
                  1
                </TableCell>
                <TableCell>Raineheart</TableCell>
                <TableCell align="left">Junior Developer</TableCell>
                <TableCell>Technology</TableCell>
                <TableCell>Completed</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Card>
      </div>
    </>
  );
}

export default OverviewAdmin;
