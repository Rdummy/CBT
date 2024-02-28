import * as React from "react";
import Axios from "axios";
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
import axios from "axios";
import { useCustomContext } from "../main";

export default function Navbar() {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [username, setUsername] = React.useState("");
  const navigate = useNavigate();
  const { examId } = useCustomContext();

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
    // Perform logout actions...
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("userData");
    } catch (error) {
      console.error("Error during logout:", error);
    }

    // For the example, let's update the state to simulate logout
    setAuth(false);
    setAnchorEl(null); // Close the menu after logout
    navigate("/"); // Redirect to your login page
  };

  React.useEffect(() => {
    // Fetch user information when the component mounts
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("Token not found");
        }

        const response = await Axios.get(
          "http://localhost:3001/auth/username",
          {
            headers: { Authorization: token },
          }
        );

        setUsername(response.data.username);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []); // Empty dependency array means this effect runs only once on mount

  React.useEffect(() => {
    console.log(examId, "examId in navbar");
  }, [examId]);

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
                  {username || "User Name"}
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
