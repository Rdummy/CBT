import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  TextField,
  Grid,
} from "@mui/material";
import { Pagination } from "@mui/material";

const SimpleTable = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const rowsPerPage = 7;

  useEffect(() => {
    // Fetch data from the database using Axios
    axios
      .get("http://localhost:3001/table/users")
      .then((response) => {
        setData(response.data); // Update state with fetched data
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleEdit = (id) => {
    // Implement edit functionality here
    console.log(`Editing item with id ${id}`);
  };

  const handleDelete = (id) => {
    // Implement delete functionality here
    setData(data.filter((item) => item.id !== id));
  };

  const filteredData = data.filter((row) =>
    row.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastRow = page * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <TextField
          label="Search by name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          variant="outlined"
          style={{ margin: "1px", width: "100%" }}
        />
      </Grid>
      <Grid item style={{ overflow: "hidden" }}>
        <TableContainer
          component={Paper}
          style={{
            maxHeight: "calc(100vh - 128px)",
            overflowY: "auto",
          }}
        >
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Username</TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell>User Role</TableCell>
                <TableCell>User Type</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentRows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell>{row.username}</TableCell>
                  <TableCell align="left">{row.email}</TableCell>
                  <TableCell>{row.user_role}</TableCell>
                  <TableCell>{row.user_type}</TableCell>
                  <TableCell align="right">
                    <Box display="flex" justifyContent="flex-end" gap={1}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleEdit(row.id)}
                      >
                        Edit
                      </Button>

                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDelete(row.id)}
                      >
                        Delete
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box display="flex" justifyContent="center" mt={2}>
          <Pagination
            count={Math.ceil(filteredData.length / rowsPerPage)}
            page={page}
            onChange={handleChangePage}
            color="primary"
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default SimpleTable;
