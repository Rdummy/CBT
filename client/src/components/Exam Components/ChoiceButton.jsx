import { Button } from "@mui/material";

function ChoiceButton({ choice, onAnswerSelect, isSelected }) {
    return (
      <Button
        variant="contained"
        onClick={() => onAnswerSelect(choice)}
        selected={isSelected}
      >
        {choice}
      </Button>
    );
  }export default ChoiceButton;