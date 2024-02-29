import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { CiClock1 } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

function ContentCard({ exam, displayedExams }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/dashboard/create-content/${exam._id}/`);
  };

  function timeSince(date) {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    let interval = seconds / 31536000;

    if (interval > 1) {
      return Math.floor(interval) + " year(s) ago";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " month(s) ago";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " day(s) ago";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hour(s) ago";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minute(s) ago";
    }
    return Math.floor(seconds) + " second(s) ago";
  }

  return (
    <Button style={{ textTransform: "none" }} onClick={handleCardClick}>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "350px",
          maxHeight: "100% !important",
          mx: 1,
        }}
      >
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              pb: 3,
            }}
          ></Box>

          <Typography align="center" gutterBottom variant="h5">
            {exam.title}
          </Typography>
          <Typography align="center" variant="body1">
            {exam.description}
          </Typography>
        </CardContent>
        <Box sx={{ flexGrow: 1 }} />
        <Divider />
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          spacing={2}
          sx={{ p: 2 }}
        >
          <Stack alignItems="center" direction="row" spacing={1}>
            <SvgIcon color="action" fontSize="small">
              <CiClock1 />
            </SvgIcon>
            <Typography color="text.secondary" display="inline" variant="body2">
              Updated {timeSince(exam.updatedAt)}
            </Typography>
          </Stack>
          <Stack alignItems="center" direction="row" spacing={1}>
            <Typography
              color="text.secondary"
              display="inline"
              variant="body2"
              style={{ textTransform: "capitalize" }}
            >
              Department: {exam.assignedDepartment}
            </Typography>
          </Stack>
        </Stack>
      </Card>
    </Button>
  );
}

export default ContentCard;
