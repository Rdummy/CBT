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
  Box,
  TextField,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Menu,
  MenuItem,
  Button,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "../assets/styles/ExamRoutes.css";
import { Pagination } from "@mui/material";

const EmployeesAdmin = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuUserId, setMenuUserId] = useState(null); // Track which user's menu is open
  const rowsPerPage = 5;

  useEffect(() => {
    axios
      .get("http://localhost:3001/table/users")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleDelete = (userId) => {
    // Set user ID for deletion
    setDeleteUserId(userId);
    // Open delete dialog
    setDeleteDialogOpen(true);
    // Close the menu
    handleClose();
  };

  const handleDeleteConfirm = () => {
    axios
      .delete(`http://localhost:3001/table/users/${deleteUserId}`)
      .then((response) => {
        if (response.status === 200) {
          setData(data.filter((item) => item._id !== deleteUserId));
        }
        setDeleteDialogOpen(false);
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
        setDeleteDialogOpen(false);
      });
  };

  const handleDeleteCancel = () => {
    setDeleteUserId(null);
    setDeleteDialogOpen(false);
  };

  const handleClick = (event, userId) => {
    // Set the element that was clicked and the user ID for the menu actions
    setAnchorEl(event.currentTarget);
    setMenuUserId(userId);
  };

  const handleClose = () => {
    // Reset anchorEl and menuUserId when the menu is closed
    setAnchorEl(null);
    setMenuUserId(null);
  };
  const handleSetCoAdmin = () => {
    console.log("Setting user as co-admin:", deleteUserId);
    handleClose(true); // Close the menu after the action
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
    <div className="exam-details--wrapper">
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
                <TableRow style={{ backgroundColor: "#e71e4a" }}>
                  <TableCell style={{ color: "white" }}>ID</TableCell>
                  <TableCell style={{ color: "white" }}>Username</TableCell>
                  <TableCell align="left" style={{ color: "white" }}>
                    Email
                  </TableCell>
                  <TableCell style={{ color: "white" }}>User Role</TableCell>
                  <TableCell style={{ color: "white" }}>User Type</TableCell>
                  <TableCell align="center" style={{ color: "white" }}>
                    Actions
                  </TableCell>
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
                      <IconButton
                        aria-label="more"
                        aria-controls="action-menu"
                        aria-haspopup="true"
                        onClick={(event) => handleClick(event, row._id)}
                      >
                        <MoreVertIcon />
                      </IconButton>
                      <Menu
                        id={`action-menu-${row._id}`}
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl && menuUserId === row._id)}
                        onClose={handleClose}
                      >
                        <MenuItem onClick={() => handleSetCoAdmin(menuUserId)}>
                          Set to Co-admin
                        </MenuItem>
                        <MenuItem onClick={() => handleDelete(menuUserId)}>
                          Delete
                        </MenuItem>
                      </Menu>
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
    </div>
  );
};

export default EmployeesAdmin;
