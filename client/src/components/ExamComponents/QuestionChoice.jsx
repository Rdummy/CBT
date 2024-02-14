import {
  Box,
  FormLabel,
  IconButton,
  InputLabel,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { HiOutlineArrowLeft } from "react-icons/hi";

const QuestionChoice = ({
  choice,
  index,
  selectedAnswer,
  onSelect,
  customKey,
  clearSelectedAnswer, // Add this prop
}) => {
  const isSelected = selectedAnswer === index;
  const letter = String.fromCharCode(65 + index);
  const [choiceText, setChoiceText] = useState("");
  const [bgChoice, setBgChoice] = useState("#E4E4E4");

  const handleOnSelect = () => {
    onSelect(index);

    if (selectedAnswer === index) {
      setBgChoice("white");
    } else {
      setBgChoice("primary.main");
    }
  };

  const getChoiceText = () => {
    let text = "";
    let size = Object.keys(choice).length;
    let index = 0;
    for (const [key, value] of Object.entries(choice)) {
      index++;
      if (index !== size) text += value;
    }
    return text;
  };

  useEffect(() => {
    setChoiceText(getChoiceText());
  }, [choice]);

  useEffect(() => {
    if (clearSelectedAnswer) {
      // Clear the selected choice when the prop is set
      setBgChoice("#E4E4E4");
    }
  }, [clearSelectedAnswer]);

  return (
    <Box
      key={customKey}
      borderRadius={0}
      padding={1}
      backgroundColor={bgChoice}
      marginBlockStart={"white"}
      boxShadow={2}
      color={isSelected ? "white" : "gray.700"}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onSelect(index)}
      onClick={() => handleOnSelect(index)}
      className="exam-question--choice"
    >
      <label className="letter-choice" color={"white"}>
        {letter}. {choiceText}
      </label>
    </Box>
  );
};

export default QuestionChoice;
