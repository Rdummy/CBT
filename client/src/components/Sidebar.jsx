import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";

import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useParams } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { IoIosPeople } from "react-icons/io";
import { SlFolderAlt, SlGraph } from "react-icons/sl";
import { CiSettings } from "react-icons/ci";

export default function Sidebar() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const handleSidebarClick = (text) => {
    switch (text) {
      case "Overview":
        navigate("/dashboard/overview");
        break;
      case "Create Content":
        navigate("/dashboard/create-content");
        break;
      case "Examinations":
        navigate("/dashboard");
        break;
      case "Employees":
        navigate("/dashboard/employees");
        break;
      default:
        break;
    }
  };

  const handleSettingsClick = () => {
    navigate(`/dashboard/settings`),
      {
        state: { userId: userId },
      };
  };

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <Drawer
        className="test"
        variant="permanent"
        sx={{
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: "calc(100vw/7)",
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box className="sidebar-box-wrapper" sx={{ overflow: "auto" }}>
          {/* <Typography
            style={{
              fontWeight: "700",
              fontFamily: "Inter",
              fontSize: " 1.4rem",
              marginTop: "0.8rem",
              marginBottom: "0.5rem",
              marginLeft: "1rem",
              color: "#0f398e",
            }}
          >
            Admin Dashboard
          </Typography> */}
          <Divider />
          <List>
            {["Overview", "Create Content", "Examinations", "Employees"].map(
              (text, index) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton onClick={() => handleSidebarClick(text)}>
                    <ListItemIcon className="sidebar--icons">
                      {index === 0 && <SlGraph size={"1.5rem"} />}
                      {index === 1 && <SlFolderAlt size={"1.5rem"} />}
                      {index === 2 && <MdDashboard size={"1.5rem"} />}
                      {index === 3 && <IoIosPeople size={"1.5rem"} />}
                    </ListItemIcon>
                    <ListItemText
                      primary={text}
                      style={{ fontWeight: "700" }}
                      className="sidebar--text"
                    />
                  </ListItemButton>
                </ListItem>
              )
            )}
          </List>
          <Divider />
          <List>
            {["Settings"].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton onClick={() => handleSettingsClick()}>
                  <ListItemIcon>
                    {index === 0 && <CiSettings size={"1.5rem"} />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}
