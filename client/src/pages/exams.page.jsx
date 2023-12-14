import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Pagination,
  Stack,
  Toolbar,
  Button,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

import exams from "../models/exam-data";
import ExamCard from "../components/ExamCard";
import "../assets/styles/dashboard.css";
import { Link, useNavigate } from "react-router-dom";

function ExamPage() {

  //Pagination
  const [page, setPage] = useState(1);
  const examsPerPage = 4;

  const displayedExams = exams.slice(
    (page - 1) * examsPerPage,
    page * examsPerPage
  );
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };


  return (
    <Container maxWidth="xxl">
      <Toolbar className="exams-category--header">
        <Typography className="exams-category--header--text">
          Examinations
        </Typography>
      </Toolbar>
      <Grid
        container
        style={{ gridAutoFlow: "column", backgroundColor: "#d4d4d4" }}
        sx={{ py: 2, px: 1 }}
      >
        {displayedExams.map((exam, index) => (
          <Grid item xs={3} key={exam.id}>
            <div className="grid-item--wrapper" style={{minHeight:"100%"}}>
              <ExamCard key={exam.id} exam={exam} />
            </div>
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={Math.ceil(exams.length / examsPerPage)}
        page={page}
        onChange={handlePageChange}
        sx={{
          "& ul li button ": {
            color: "#4a4a4a",
          },
          "& ul li button svg": {
            fill: "#4a4a4a",
          },
          py: 1,
          display: "flex",
          justifyContent: "flex-end",
          backgroundColor: "#fff",
          boxShadow: "10px 5px 5px rgba(0, 0, 0, 0.1)",
        }}
      />
    </Container>
  );
}

export default ExamPage;
