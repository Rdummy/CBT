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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Pagination } from "@mui/material";

const EmployeesAdmin = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const rowsPerPage = 5;

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

  const handleDelete = (_id) => {
    setDeleteUserId(_id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    // Use Axios to send a DELETE request to the backend
    axios
      .delete(`http://localhost:3001/table/users/${deleteUserId}`)
      .then((response) => {
        // Update state only if the deletion is successful
        if (response.status === 200) {
          setData(data.filter((item) => item._id !== deleteUserId));
        }
        // Close the dialog
        setDeleteDialogOpen(false);
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
        // Close the dialog even if there's an error
        setDeleteDialogOpen(false);
      });
  };

  const handleDeleteCancel = () => {
    // Close the dialog without deleting
    setDeleteUserId(null);
    setDeleteDialogOpen(false);
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
    <Grid
      container
      direction="column"
      spacing={2}
      style={{ marginTop: "10px" }}
    >
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
                <TableRow key={row._id}>
                  <TableCell component="th" scope="row">
                    {row._id}
                  </TableCell>
                  <TableCell>{row.username}</TableCell>
                  <TableCell align="left">{row.email}</TableCell>
                  <TableCell>{row.user_role}</TableCell>
                  <TableCell>{row.user_type}</TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDelete(row._id)}
                    >
                      Delete
                    </Button>
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
      {/* Delete Confirmation Dialog */}
      <Dialog
        open={isDeleteDialogOpen}
        onClose={handleDeleteCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete User</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this user?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default EmployeesAdmin;
