import { Box, IconButton, Typography } from "@mui/material";
import { HiOutlineArrowLeft } from "react-icons/hi";

const QuestionChoice = ({ choice, index, selectedAnswer, onSelect }) => {
    const isSelected = selectedAnswer === index;
    const letter = String.fromCharCode(65 + index);
  
    return (
      <Box
        borderRadius={0}
        padding={1}
        backgroundColor={isSelected ? "primary.main" : "#E4E4E4"}
        boxShadow={2}
        color={isSelected ? "white" : "gray.700"}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && onSelect(index)}
        onClick={() => onSelect(index)}
        className="exam-question--choice"
      >
        <Typography
          className="letter-choice"
          color={isSelected ? "white" : "#8a8a8a"}
        >
          {letter}
        </Typography>
        <Typography variant="button" textTransform={"none"}>
          {choice}
        </Typography>
        {isSelected && (
          <IconButton color={"#347634"} size="small">
           <HiOutlineArrowLeft color="#FFF"/>
          </IconButton>
        )}
      </Box>
    );
  };
 export default QuestionChoice 