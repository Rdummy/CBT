import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import NTS_Logo from "../assets/images/NTS_Logo.png";
import { useNavigate } from "react-router-dom";
import { MdAccountCircle } from "react-icons/md";
import { useAuth } from "../contexts/auth-context";
import axios from "axios"; // Make sure to import axios

export default function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { user, isAuthenticated, logout, token } = useAuth(); // Assuming 'token' is made available in useAuth
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Fetch the username only if the user is authenticated
    if (isAuthenticated && token) {
      axios
        .get("http://localhost:3001/auth/username", {
          // Make sure the URL is correct according to your API's baseURL
          headers: {
            Authorization: token, // Assuming the token is in a suitable format; adjust as necessary
          },
        })
        .then((response) => {
          // Assuming the API responds with { username: "User's Name" }
          setUsername(response.data.username);
        })
        .catch((error) => {
          console.error("Fetching username failed:", error);
          // Handle error appropriately (show message, log out user, etc.)
        });
    }
  }, [isAuthenticated, token]); // Dependency array: Fetch username when these values change

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = () => {
    setAnchorEl(null);
    navigate("/dashboard/settings");
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Box sx={{ flexGrow: 1, marginBottom: "3rem" }}>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <img src={NTS_Logo} className="logo" alt="NTS Logo" />
          <Typography
            variant="h5"
            component="div"
            sx={{ flexGrow: 1, ml: "1rem" }}
          >
            nLearning
          </Typography>
          {isAuthenticated && (
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
                  {username || "User Name"} {/* Display the fetched username */}
                </Typography>
              </div>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                keepMounted
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClick}>My account</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
