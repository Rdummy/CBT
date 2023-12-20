import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import NTS_Logo from "../assets/images/NTS_Logo.png";
import { useNavigate } from "react-router-dom";
import { MdAccountCircle } from "react-icons/md";

export default function Navbar() {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Clear authentication data when logging out
    window.localStorage.removeItem("userID");
    window.localStorage.removeItem("userName");
    // Clear cookies or any other stored authentication data if present

    // Perform any additional logout-related actions (e.g., redirect to login page)
    // For example, you might want to redirect users to the login page after logout
    navigate("/"); // Redirect to your login page

    // For the example, let's update the state to simulate logout
    setAuth(false);
    setAnchorEl(null); // Close the menu after logout
  };

  return (
    <Box sx={{ width: "30rem", marginBottom: "3rem"}}>
      {/* <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={auth}
              onChange={handleChange}
              aria-label="login switch"
            />
          }
          label={auth ? "Logout" : "Login"}
        />
      </FormGroup> */}

      <AppBar
        className="navbar--wrapper"
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <img src={NTS_Logo} className="logo"></img>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, ml: "1rem" }}
          >
            CBT Examination
          </Typography>
          {auth && (
            <div>
              <div className="user-details--wrapper" onClick={handleMenu}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                >
                  <MdAccountCircle />
                </IconButton>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    flexGrow: 1,
                    ml: "1rem",
                    display: "flex",
                    alignSelf: "center",
                  }}
                >
                  User Name
                </Typography>
              </div>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
