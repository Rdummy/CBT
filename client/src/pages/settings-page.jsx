import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/auth-context"; // Adjust the import path as necessary
// Other imports remain unchanged

export default function Settings() {
  const { token, user, setUser, setUserType } = useAuth(); // Assuming setUser is implemented to update user in your AuthProvider
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  // Initialize userData from the user context or set defaults
  const [userData, setUserData] = useState({
    username: user?.username || "",
    user_type: user?.user_type || "",
    user_role: user?.user_role || "",
    email: user?.email || "",
    department: user?.department || "",
    imageUrl: user?.imageUrl || "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      if (!token) {
        console.error("Token not found");
        return;
      }
      try {
        const response = await axios.get(
          "http://localhost:3001/settings/profile",
          {
            headers: { Authorization: token },
          }
        );
        setUserData(response.data);
        // Update user in context to reflect fetched data
        setUser(response.data);
        setUserType(response.data.user_type); // Update userType in context for role-based UI elements
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, [token, setUser, setUserType]); // Added setUserType to dependency array

  const handleSubmit = async () => {
    if (!token) {
      console.error("Token not found");
      return;
    }
    try {
      await axios.put(
        "http://localhost:3001/settings/updateUserData",
        userData,
        {
          headers: { Authorization: token },
        }
      );
      setOpenSnackbar(true);
      // Update user in context to reflect updated data
      setUser(userData);
      setUserType(userData.user_type); // Ensure userType in context is updated
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file && token) {
      setSelectedFile(file);
      const formData = new FormData();
      formData.append("image", file);

      try {
        const response = await axios.post(
          `http://localhost:3001/settings/uploadProfileImage`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: token,
            },
          }
        );
        console.log("File uploaded successfully:", response.data);
        // Update user image URL in context to reflect new image
        setUser((prev) => ({ ...prev, imageUrl: response.data.imageUrl }));
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box
      className="settings-container"
      sx={{ width: "100%", height: "50vh", marginTop: "8rem" }}
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
          <Box>
            <ReturnDashboard />
          </Box>
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
                {userData.imageUrl && (
                  <img src={userData.imageUrl} loading="lazy" alt="Profile" />
                )}
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
                onClick={() => document.getElementById("file-upload").click()}
              >
                <EditRoundedIcon />
              </IconButton>
              <input
                type="file"
                id="file-upload"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
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
                    sx={{
                      color: "black",
                    }}
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
                    sx={{
                      color: "black",
                    }}
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
                    sx={{
                      color: "black",
                    }}
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
                    sx={{
                      color: "black",
                    }}
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
