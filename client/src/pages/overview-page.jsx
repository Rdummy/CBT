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
  const [exams, setExams] = useState([]);
  const [selectedExam, setSelectedExam] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBar, setSelectedBar] = useState(null);
  const [statusUpdated, setStatusUpdated] = useState(false);
  const [data, setData] = useState([]);

 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/overview/barchart"
        );
        setExams(response.data);
        
        
       
      } catch (error) {
        console.error("Error fetching exams data:", error);
      }
    };
    fetchData();
  }, [statusUpdated]);

 
  const updateStatus = () => {
    setStatusUpdated(true);
  };

  const fetchUsersByExam = async (examId, assignedDepartment) => {
    try {
      const url = `http://localhost:3001/overview/usersByExam/${examId}`;
      const response = await axios.get(url);
      const users = response.data;

      const departmentFilteredUsers =
        assignedDepartment === "General"
          ? users
          : users.filter((user) => user.department === assignedDepartment);

      setFilteredUsers(departmentFilteredUsers);
    } catch (error) {
      console.error("Error fetching users for exam", error);
    }
  };

  const onExamBarClick = async (data) => {
    if (data && data.activeLabel) {
      const clickedExam = exams.find(
        (exam) => exam.examTitle === data.activeLabel
      );

      
     

      setSelectedExam(clickedExam);
      if (clickedExam && clickedExam._id) {
        await fetchUsersByExam(clickedExam._id, clickedExam.assignedDepartment);
      } else {
        console.error("Clicked exam does not have a MongoDB _id:", clickedExam);
      }
    }
  };

  const rowsPerPage = 6;
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const displayedUsers = searchTerm
    ? filteredUsers.filter((user) =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : filteredUsers;
  const handleBarHover = (data) => {
    setSelectedBar(data);
  };
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
                marginTop: "10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="h6"></Typography>
              <PieChartCustom selectedBar={selectedBar} />
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper
              elevation={3}
              style={{
                padding: "10px",
                height: "100%",
                marginTop: "10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="h6"></Typography>
              <BarChartCustom
                data={exams} 
                onBarHover={handleBarHover}
                onBarClick={onExamBarClick}
              />
            </Paper>
          </Grid>
        </Grid>

        <TextField
          label="Search Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ marginTop: "40px", width: "466px" }}
        />

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
              {displayedUsers.slice(startIndex, endIndex).map((user, index) => (
                <TableRow key={user._id || index}>
                  {" "}
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.user_role}</TableCell>
                  <TableCell>{user.department}</TableCell>
                  <TableCell>
                    {user.usersExams.find(
                      (exam) => exam.examId === selectedExam?._id
                    )?.status || "Incomplete"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

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
