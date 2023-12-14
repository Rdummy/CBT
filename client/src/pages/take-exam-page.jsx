import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// Import UI components
import {
  Card,
  CardContent,
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Radio,
  TextField,
  Checkbox,
} from "@mui/material";

function TakeExamPage() {
  const { examId } = useParams();
  const selectedExam = exams.find((exam) => exam.id === examId);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    // Initialize answers object with empty values
    const initialAnswers = {};
    exam.questions.forEach((question) => {
      initialAnswers[question.id] = "";
    });
    setAnswers(initialAnswers);
  }, [exam]);

  const handleSubmitAnswer = () => {
    // Update answer for current question
    const answer = getAnswerForQuestion(exam.questions[currentQuestionIndex]);
    setAnswers({
      ...answers,
      [exam.questions[currentQuestionIndex].id]: answer,
    });

    // Check if this is the last question
    if (currentQuestionIndex === exam.questions.length - 1) {
      // Submit the exam and navigate to results page
      console.log("Submit answers:", answers);
      // TODO: Implement actual exam submission logic
      // navigate("/dashboard/exams/${examId}/results");
    } else {
      // Go to the next question
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const getAnswerForQuestion = (question) => {
    switch (question.type) {
      case "multipleChoice":
        return document.querySelector('input[name="question-choice"]:checked')
          .value;
      case "openEnded":
        return document.getElementById("open-ended-answer").value;
      case "trueFalse":
        return document.getElementById("true-false-answer").checked;
      default:
        return "";
    }
  };

  if (!exam) {
    return <p>Exam not found</p>;
  }

  const currentQuestion = exam.questions[currentQuestionIndex];

  return (
    <div>
      <h1>Take Exam: {exam.title}</h1>
      <Card>
        <CardContent>
          <Box>
            <Typography variant="h5">{currentQuestion.question}</Typography>
            {currentQuestion.type === "generalTips" && (
              <Typography>{currentQuestion.content}</Typography>
            )}
            {currentQuestion.type === "multipleChoice" && (
              <List>
                {currentQuestion.choices.map((choice, index) => (
                  <ListItem key={index}>
                    <Radio
                      name="question-choice"
                      value={index}
                      checked={answers[currentQuestion.id] === index}
                    />
                    <ListItemText>{choice}</ListItemText>
                  </ListItem>
                ))}
              </List>
            )}
            {currentQuestion.type === "openEnded" && (
              <TextField
                id="open-ended-answer"
                multiline
                rows={4}
                value={answers[currentQuestion.id]}
                onChange={(event) =>
                  setAnswers({
                    ...answers,
                    [currentQuestion.id]: event.target.value,
                  })
                }
              />
            )}
            {currentQuestion.type === "trueFalse" && (
              <>
                <Checkbox
                  id="true-false-answer"
                  checked={answers[currentQuestion.id]}
                  onChange={(event) =>
                    setAnswers({
                      ...answers,
                      [currentQuestion.id]: event.target.checked,
                    })
                  }
                />
                <label htmlFor="true-false-answer">True</label>
              </>
            )}
          </Box>
          <Box sx={{ mt: 3 }}>
            <Button variant="contained" onClick={handleSubmitAnswer}>
              {currentQuestionIndex === exam.questions.length - 1
                ? "Submit Exam"
                : "Next Question"}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
}export default TakeExamPage
