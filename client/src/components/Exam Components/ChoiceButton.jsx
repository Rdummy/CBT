import React from "react";
import Button from "@mui/material/Button";

const ChoiceButton = ({ choice, chosenLabel, onAnswerSelect, isSelected }) => {
  const handleClick = () => {
    onAnswerSelect(); // Trigger answer selection handler
  };

  return (
    <Button
      variant="outlined"
      sx={{ margin: 1 }}
      color={isSelected ? "primary" : "default"}
      onClick={handleClick}
    >
      {choice} {isSelected && `(${chosenLabel})`}
    </Button>
  );
};

export default ChoiceButton;