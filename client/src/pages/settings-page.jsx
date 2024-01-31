import React, { useEffect, useState } from "react";
import axios from "axios";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import IconButton from "@mui/joy/IconButton";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions";
import CardOverflow from "@mui/joy/CardOverflow";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";

import "../assets/styles/settings.css";

export default function Settings() {
  const [userData, setUserData] = useState({
    username: "",
    user_type: "",
    user_role: "",
    email: "",
    department: "",
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    // Fetch user data using axios
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("Token not found");
        }

        const response = await axios.get(
          "http://localhost:3001/settings/profile",
          {
            headers: { Authorization: token },
          }
        );

        const { username, user_type, user_role, email, department } =
          response.data;

        setUserData({ username, user_type, user_role, email, department });
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []); // Empty dependency array means this effect runs only once on mount

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Token not found");
      }

      const response = await axios.put(
        "http://localhost:3001/settings/updateUserData",
        userData,
        {
          headers: { Authorization: token },
        }
      );

      console.log("User data updated successfully:", response.data);

      // Open the snackbar on successful submission
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box
      className="settings-container"
      sx={{ width: "100%", height: "50vh", marginTop: "6rem" }}
    >
      <Stack
        className="settings-stack"
        spacing={4}
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 2,
          my: 4,
        }}
      >
        <Card
          sx={{
            width: "60vw",
            height: "100vh",
            display: "flex",
          }}
        >
          <Box sx={{ mb: 1 }}>
            <Typography
              level="title-md"
              style={{ fontWeight: "bold" }}
              size="lg"
            >
              Personal info
            </Typography>
            <Typography level="body-sm">
              Customize how your profile information will appear to the
              networks.
            </Typography>
          </Box>
          <Divider />
          <Stack
            direction="row"
            spacing={3}
            sx={{ display: { xs: "none", md: "flex" }, my: 1 }}
          >
            <Stack direction="column" spacing={1}>
              <AspectRatio
                ratio="1"
                maxHeight={200}
                sx={{ flex: 1, minWidth: 120, borderRadius: "100%" }}
              >
                <img src="" srcSet="" loading="lazy" alt="" />
              </AspectRatio>
              <IconButton
                aria-label="upload new picture"
                size="sm"
                variant="outlined"
                color="neutral"
                sx={{
                  bgcolor: "background.body",
                  position: "absolute",
                  zIndex: 2,
                  borderRadius: "50%",
                  left: 100,
                  top: 170,
                  boxShadow: "sm",
                }}
              >
                <EditRoundedIcon />
              </IconButton>
            </Stack>
            <Stack spacing={2} sx={{ flexGrow: 1 }}>
              <Stack spacing={1}>
                <FormControl sx={{ display: { sm: "contents" } }}>
                  <FormLabel>Username</FormLabel>
                  <Input
                    size="lg"
                    type="text"
                    value={userData.username}
                    onChange={(e) =>
                      setUserData({ ...userData, username: e.target.value })
                    }
                  />
                </FormControl>
              </Stack>
              <Stack direction="row" spacing={2}>
                <FormControl>
                  <FormLabel>Role</FormLabel>
                  <Input
                    size="lg"
                    type="text"
                    value={userData.user_role}
                    onChange={(e) =>
                      setUserData({ ...userData, user_role: e.target.value })
                    }
                  />
                </FormControl>
                <FormControl sx={{ flexGrow: 1 }}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    size="lg"
                    type="email"
                    startDecorator={<EmailRoundedIcon />}
                    value={userData.email}
                    onChange={(e) =>
                      setUserData({ ...userData, email: e.target.value })
                    }
                  />
                </FormControl>
              </Stack>
              <div>
                <FormControl sx={{ display: { sm: "contents" } }}>
                  <FormLabel>User Type</FormLabel>
                  <Input
                    size="lg"
                    type="text"
                    readOnly
                    value={userData.user_type}
                  />
                </FormControl>
              </div>
              <div>
                <FormControl sx={{ display: { sm: "contents" } }}>
                  <FormLabel>Department</FormLabel>
                  <Input
                    size="lg"
                    type="text"
                    readOnly
                    value={userData.department}
                  />
                </FormControl>
              </div>
            </Stack>
          </Stack>
          <Stack
            direction="column"
            spacing={2}
            sx={{ display: { xs: "flex", md: "none" }, my: 1 }}
          ></Stack>
          <CardOverflow sx={{ borderTop: "1px solid", borderColor: "divider" }}>
            <CardActions sx={{ alignSelf: "flex-end", pt: 2 }}>
              <Button size="sm" variant="outlined" color="neutral">
                Cancel
              </Button>
              <Button size="sm" variant="solid" onClick={handleSubmit}>
                Submit
              </Button>
            </CardActions>
          </CardOverflow>
        </Card>
      </Stack>

      {/* Snackbar for showing success message */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          User data updated successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
}
