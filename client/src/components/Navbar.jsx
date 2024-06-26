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
import axios from "axios"; 

export default function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { user, isAuthenticated, logout, token } = useAuth(); 
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  useEffect(() => {
    
    if (isAuthenticated && token) {
      axios
        .get("http://localhost:3001/auth/username", {
          
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          
          setUsername(response.data.username);
        })
        .catch((error) => {
          console.error("Fetching username failed:", error);
          
        });
    }
  }, [isAuthenticated, token]); 
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
    <Box sx={{ width: "4rem", marginBottom: "3rem" }}>
      <AppBar
        className="navbar--wrapper"
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
                  {username || "User Name"} 
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
