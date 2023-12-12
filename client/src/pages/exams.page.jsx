import React, { useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Pagination,
  Stack,
  Toolbar,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

// Import the exams constant from the external file
import exams from "../models/exam-data";

function ExamCard({ title, description }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card sx={{ marginBottom: 1 }}>
      <CardContent>
        <Typography variant="h5" sx={{ marginBottom: 1 }}>
          {title}
        </Typography>
        {expanded ? <Typography variant="body2">{description}</Typography> : ""}
        <Stack direction="row" justifyContent="flex-end" alignItems="center">
          <Typography
            variant="subtitle2"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Hide Description" : "Show Description"}
          </Typography>
          <ExpandMore sx={{ fontSize: 20, marginLeft: 1 }} />
        </Stack>
      </CardContent>
    </Card>
  );
}

function ExamPage() {
  const [page, setPage] = useState(1);
  const examsPerPage = 9;

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const displayedExams = exams.slice(
    (page - 1) * examsPerPage,
    page * examsPerPage
  );

  return (
    <Container maxWidth="lg">
      <Toolbar
        style={{
          backgroundColor: "#0070d1",
          marginBottom: "1rem",
          color: "#fff",
        }}
      >
        <Typography variant="h5">Exams to Take</Typography>
      </Toolbar>
      <Grid container spacing={2}>
        {/* Display exams in a 3x3 grid */}
        {displayedExams.map((exam, index) => (
          <Grid item xs={4} key={index}>
            <ExamCard title={exam.title} description={exam.description} />
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={Math.ceil(exams.length / examsPerPage)}
        page={page}
        onChange={handlePageChange}
        sx={{
          "& ul li button ": {
            color: "#fff",
          },
          "& ul li button svg": {
            fill: "#fff",
          },
          marginTop: 2,
          display: "flex",
          justifyContent: "flex-end",
          backgroundColor: "#0070d1",
        }}
      />
    </Container>
  );
}

export default ExamPage;
