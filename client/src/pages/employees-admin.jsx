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
  DialogTitle,
  IconButton,
  Menu,
  MenuItem,
  Button,
  FormGroup,
  FormControlLabel,
  Switch,
  DialogContentText,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "../assets/styles/ExamRoutes.css";
import { Pagination } from "@mui/material";
import { useAuth } from "../contexts/auth-context"; // Make sure this path is correct

const EmployeesAdmin = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuUserId, setMenuUserId] = useState(null);
  const [isAccessModalOpen, setAccessModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const { accessFeatures, updateAccessFeatures } = useAuth(); // Use accessFeatures and updateAccessFeatures from AuthContext
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
    setDeleteUserId(userId);
    setDeleteDialogOpen(true);
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

  const handleSavePermissions = () => {
    const permissionsToUpdate = {
      allowEditContent: accessFeatures.allowEditContent,
      allowDeleteExam: accessFeatures.allowDeleteExam,
      allowAddCreateExam: accessFeatures.allowAddCreateExam,
      allowCreateContent: accessFeatures.allowCreateContent,
    };

    axios
      .put(`http://localhost:3001/auth/users/${selectedUserId}/update`, {
        user_type: "co-admin",
        permissions: permissionsToUpdate,
      })
      .then((response) => {
        console.log("User and permissions updated:", response.data);
        // Update your data state or context here as necessary
        setData(
          data.map((user) =>
            user._id === selectedUserId
              ? {
                  ...user,
                  user_type: "co-admin",
                  permissions: permissionsToUpdate,
                }
              : user
          )
        );
        setAccessModalOpen(false); // Close the modal after successful update
        setSelectedUserId(null); // Reset selected user ID
        setAnchorEl(null); // Close the menu
      })
      .catch((error) => {
        console.error("Error updating user and permissions:", error);
      });
  };

  const handleOpenAccessModal = (userId) => {
    setSelectedUserId(userId); // Store the selected user's ID
    setAccessModalOpen(true); // Open the modal
  };

  const handleDeleteCancel = () => {
    setDeleteUserId(null);
    setDeleteDialogOpen(false);
  };

  const handleClick = (event, userId) => {
    setAnchorEl(event.currentTarget);
    setMenuUserId(userId);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setMenuUserId(null);
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
                        <MenuItem
                          onClick={() => handleOpenAccessModal(row._id)}
                        >
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

        <Dialog
          open={isAccessModalOpen}
          onClose={() => setAccessModalOpen(false)}
        >
          <DialogTitle>Set Co-Admin Access Features</DialogTitle>
          <DialogContent>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={accessFeatures.allowEditContent}
                    onChange={(event) => {
                      updateAccessFeatures({
                        ...accessFeatures,
                        allowEditContent: event.target.checked,
                      });
                    }}
                  />
                }
                label="Allow edit content"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={accessFeatures.allowDeleteExam}
                    onChange={(event) => {
                      updateAccessFeatures({
                        ...accessFeatures,
                        allowDeleteExam: event.target.checked,
                      });
                    }}
                  />
                }
                label="Allow delete exam"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={accessFeatures.allowAddCreateExam}
                    onChange={(event) => {
                      updateAccessFeatures({
                        ...accessFeatures,
                        allowAddCreateExam: event.target.checked,
                      });
                    }}
                  />
                }
                label="Allow add/create exam"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={accessFeatures.allowCreateContent}
                    onChange={(event) => {
                      updateAccessFeatures({
                        ...accessFeatures,
                        allowCreateContent: event.target.checked,
                      });
                    }}
                  />
                }
                label="Allow create content"
              />
            </FormGroup>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setAccessModalOpen(false)}>Cancel</Button>
            <Button onClick={handleSavePermissions}>Save</Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </div>
  );
};

export default EmployeesAdmin;
