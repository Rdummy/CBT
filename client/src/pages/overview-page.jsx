import React, { useState, useEffect } from "react";
import {
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Pagination,
  TextField,
} from "@mui/material";
import axios from "axios";
import BarChartCustom from "../components/Overview/Bar";
import PieChartCustom from "../components/Overview/Pie";

function OverviewAdmin() {
  const [selectedBar, setSelectedBar] = useState(null);
  const [selectedPieSegment, setSelectedPieSegment] = useState(null);
  const [userData, setUserData] = useState([]);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const handleBarHover = (data) => {
    setSelectedBar(data);
  };

  const handlePieClick = (segment) => {
    setSelectedPieSegment(segment);
  };

  useEffect(() => {
    // Fetch data from your backend API using Axios
    axios
      .get("http://localhost:3001/overview/status")
      .then((response) => {
        // Update the state with the fetched data
        setUserData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []); // Empty dependency array ensures the effect runs once on component mount

  // Filter users based on search term
  const filteredUsers = userData.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedPieSegment ? user.status === selectedPieSegment : true)
  );

  // Determine the range of data to display based on the current page
  const rowsPerPage = 6;
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  return (
    <Card sx={{ m: 2, minWidth: "1000px" }}>
      <CardContent>
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
              <PieChartCustom
                selectedBar={selectedBar}
                onClick={handlePieClick}
              />
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
              <BarChartCustom onBarHover={handleBarHover} />
            </Paper>
          </Grid>
        </Grid>

        {/* Search Bar */}
        <TextField
          label="Search Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ marginTop: "40px", width: "466px" }}
        />

        {/* Material-UI Table */}
        <TableContainer component={Paper} style={{ marginTop: "10px" }}>
          <Table>
            <TableHead>
              <TableRow style={{ backgroundColor: "#e71e4a" }}>
                <TableCell style={{ color: "white" }}>Username</TableCell>
                <TableCell style={{ color: "white" }}>User Role</TableCell>
                <TableCell style={{ color: "white" }}>Department</TableCell>
                <TableCell style={{ color: "white" }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.slice(startIndex, endIndex).map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.user_role}</TableCell>
                  <TableCell>{user.department}</TableCell>
                  <TableCell>{user.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <Pagination
          count={Math.ceil(filteredUsers.length / rowsPerPage)}
          page={page}
          onChange={(event, value) => setPage(value)}
          style={{ marginTop: "20px", justifyContent: "center" }}
        />
      </CardContent>
    </Card>
  );
}

export default OverviewAdmin;
