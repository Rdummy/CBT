import React from "react";
import { ButtonGroup, Button, Box } from "@mui/material";

function TrueFalseButtons({ onAnswerSelect, selectedAnswer }) {
  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      <Button
        variant="contained"
        size="large"
        sx={{
          backgroundColor:
            selectedAnswer === "true" ? "#E71E4A" : "#FFF",
          color: selectedAnswer === "true" ? "#FFFFFF" : "#4E4E4E",
          "&.Mui-selected": {
            backgroundColor: "#000",
            color: "#FFF",
          },
        }}
        onClick={() => onAnswerSelect("true")}
      >
        True
      </Button>
      <Button
        variant="contained"
        size="large"
        sx={{
          backgroundColor:
            selectedAnswer === "false" ? "primary.main" : "#E71E4A",
          color: selectedAnswer === "false" ? "default.main" : "#fff",
          "&.Mui-selected": {
            backgroundColor: "primary.main",
            color: "default.main",
          },
        }}
        onClick={() => onAnswerSelect("false")}
      >
        False
      </Button>
    </Box>
  );
}
export default TrueFalseButtons;
