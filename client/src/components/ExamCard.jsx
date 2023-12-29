import { CiClock1 } from "react-icons/ci";

import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ExamCard = (props) => {
  const { exam } = props;

  // Navigation
  const navigate = useNavigate();
  const [shouldNavigate, setShouldNavigate] = useState(false);

  // useEffect(() => {
  //   if (shouldNavigate) {
  //     navigate(`/dashboard/exams/${exam.id}/`);
  //     setShouldNavigate(false);
  //   }
  // }, [shouldNavigate]);
  const handleCardClick = () => {
    navigate(`/dashboard/exams/${exam.id}/`);
  };

  return (
    <Button style={{ textTransform: "none" }} onClick={handleCardClick}>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "20rem !important",
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
          >
            {/* <img src={exam.logo} variant="square" alt="" /> */}
          </Box>
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
              Updated 2hr ago
            </Typography>
          </Stack>
          <Stack alignItems="center" direction="row" spacing={1}>
            <Typography
              color="text.secondary"
              display="inline"
              variant="body2"
              style={{ textTransform: "capitalize" }}
            >
              Status: {exam.status}
            </Typography>
          </Stack>
        </Stack>
      </Card>
    </Button>
  );
};
export default ExamCard;
