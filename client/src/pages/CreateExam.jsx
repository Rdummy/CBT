import React, { useState } from "react";
import { FiTrash2, FiEdit } from "react-icons/fi";
import { Card, Button, CardContent } from "@mui/material";
import "../assets/styles/create-exam.css";
import { useParams } from "react-router-dom";
import axios from "axios";

const CreateExam = () => {
  const { examId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [newChoice, setNewChoice] = useState("");
  const [choices, setChoices] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingChoiceIndex, setEditingChoiceIndex] = useState(null);
  const [editingChoiceText, setEditingChoiceText] = useState("");

  const handleAddQuestion = () => {
    setShowInput(true);
  };

  const handleSaveExamToDatabase = async () => {
    try {
      const backendApiUrl = `http://localhost:3001/content/create-exam/${examId}/questions`;

      // Convert choices to an array of objects before sending to the backend
      const formattedQuestions = questions.map((q) => ({
        ...q,
        choices: q.choices.map((choice) => ({
          text: choice.text,
          isCorrect: choice.isCorrect,
        })),
      }));

      const response = await axios.post(backendApiUrl, {
        questions: formattedQuestions,
      });

      console.log("Exam saved successfully:", response.data);
      // You can add any further actions upon successful save here
    } catch (error) {
      console.error("Error saving exam:", error);
      // Handle error here (e.g., show an error message to the user)
    }
  };
  const handleQuestionChange = (e) => {
    setNewQuestion(e.target.value);
  };

  const handleChoiceChange = (e) => {
    setEditingChoiceText(e.target.value);
    setErrorMessage(""); // Clear error message when typing
  };

  const handleAddChoice = () => {
    if (editingChoiceIndex !== null) {
      // If editing, update the existing choice
      const updatedChoices = choices.map((choice, index) =>
        index === editingChoiceIndex
          ? { ...choice, text: editingChoiceText }
          : choice
      );

      setChoices(updatedChoices);
      setEditingChoiceIndex(null);
      setEditingChoiceText("");
    } else if (newChoice.trim() !== "") {
      // If not editing, add a new choice
      setChoices([...choices, { text: newChoice, isCorrect: false }]);
      setNewChoice("");
    }
  };

  const handleSaveQuestion = () => {
    if (newQuestion.trim() !== "" && choices.length > 0) {
      const hasCorrectChoice = choices.some((choice) => choice.isCorrect);

      if (hasCorrectChoice) {
        setQuestions([
          ...questions,
          {
            question: newQuestion,
            choices,
            correctAnswer: getCorrectAnswerIndex(choices),
          },
        ]);
        setNewQuestion("");
        setChoices([]);
        setShowInput(false);
        setSelectedChoice(null);
        setErrorMessage(""); // Clear error message when saving
      } else {
        setErrorMessage(
          "Please mark at least one choice as correct before saving."
        );
      }
    } else {
      setErrorMessage("Please enter a choice before saving.");
    }
  };

  // Helper function to get the index of the correct answer
  const getCorrectAnswerIndex = (choices) => {
    for (let i = 0; i < choices.length; i++) {
      if (choices[i].isCorrect) {
        return i;
      }
    }
    return -1; // Return -1 or handle the case when no correct answer is found
  };

  const handleSelectChoice = (index) => {
    setSelectedChoice(index);
  };

  const handleMarkAsCorrect = (index) => {
    const updatedChoices = choices.map((choice, i) => ({
      ...choice,
      isCorrect: i === index,
    }));
    setChoices(updatedChoices);
  };

  const handleEditQuestion = (index) => {
    setEditingIndex(index);
    setShowInput(true);
    setNewQuestion(questions[index].question);
    setChoices([...questions[index].choices]);
  };

  const handleUpdateQuestion = () => {
    if (newQuestion.trim() !== "" && choices.length > 0) {
      const hasCorrectChoice = choices.some((choice) => choice.isCorrect);

      if (hasCorrectChoice) {
        const updatedQuestions = [...questions];
        updatedQuestions[editingIndex] = { question: newQuestion, choices };
        setQuestions(updatedQuestions);

        setNewQuestion("");
        setChoices([]);
        setShowInput(false);
        setSelectedChoice(null);
        setEditingIndex(null);
        setErrorMessage(""); // Clear error message when updating
      } else {
        setErrorMessage(
          "Please mark at least one choice as correct before updating."
        );
      }
    } else {
      setErrorMessage("Please enter a choice before updating.");
    }
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setShowInput(false);
    setNewQuestion("");
    setChoices([]);
    setErrorMessage("");
  };

  const handleEditChoice = (index) => {
    setEditingChoiceIndex(index);
    setEditingChoiceText(choices[index].text); // Set the current text for editing
  };

  const handleDeleteChoice = (index) => {
    const updatedChoices = choices.filter((choice, i) => i !== index);
    setChoices(updatedChoices);
    setEditingChoiceIndex(null);
    setEditingChoiceText("");
  };

  const handleCancelEditChoice = () => {
    setEditingChoiceIndex(null);
    setEditingChoiceText("");
  };

  const handleDeleteQuestion = (index) => {
    const updatedQuestions = questions.filter((q, i) => i !== index);
    setQuestions(updatedQuestions);
    setEditingIndex(null);
    setShowInput(false);
    setNewQuestion("");
    setChoices([]);
    setSelectedChoice(null);
    setErrorMessage("");
  };

  return (
    <Card sx={{ m: 5, width: "800px" }}>
      <CardContent>
        <div className="create-exam-container">
          <h1 className="create-exam-title">Create Exam</h1>

          <button onClick={handleAddQuestion} className="exam-button">
            Add Question
          </button>
          {showInput && (
            <div className="question-input">
              <div className="input-div">
                <input
                  className="input-effect"
                  type="text"
                  value={newQuestion}
                  onChange={handleQuestionChange}
                  placeholder="Type your question..."
                />
                <span className="focus-border"></span>
              </div>

              <div className="choices-container">
                {choices.map((choice, index) => (
                  <div
                    key={index}
                    onClick={() => handleSelectChoice(index)}
                    className={`choice-item ${
                      selectedChoice === index ? "selected" : ""
                    }`}
                  >
                    {editingChoiceIndex === index ? (
                      <div>
                        <p className="editingText">editing...</p>
                        <div className="input-div">
                          <input
                            className="input-effect"
                            type="text"
                            value={editingChoiceText}
                            onChange={handleChoiceChange}
                            placeholder="Type a choice..."
                          />
                          <span className="focus-border"></span>
                        </div>

                        <button className="exam-button">
                          <FiTrash2 onClick={() => handleDeleteChoice(index)} />
                        </button>

                        {/* <FiEdit onClick={() => handleEditChoice(index)} /> */}
                        <button
                          onClick={handleAddChoice}
                          className="exam-button"
                        >
                          {editingChoiceIndex !== null ? <FiEdit /> : "Add"}
                        </button>
                        <button onClick={handleCancelEditChoice}>Cancel</button>
                      </div>
                    ) : (
                      <div>
                        <input
                          type="checkbox"
                          checked={choice.isCorrect}
                          onChange={() => handleMarkAsCorrect(index)}
                        />
                        <label htmlFor={`choice-${index}`}>{choice.text}</label>
                        <FiEdit
                          onClick={() => handleEditChoice(index)}
                          style={{ m: 2 }}
                        />
                        <FiTrash2 onClick={() => handleDeleteChoice(index)} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="input-div">
                <input
                  className="input-effect"
                  type="text"
                  value={newChoice}
                  onChange={(e) => setNewChoice(e.target.value)}
                  placeholder="Type a choice..."
                />
                <span className="focus-border"></span>
              </div>

              <button
                className="exam-button"
                onClick={handleAddChoice}
                disabled={newChoice.trim() === ""}
              >
                Add Choice
              </button>
              {errorMessage && (
                <p className="error-message" style={{ color: "red" }}>
                  {errorMessage}
                </p>
              )}
              {editingIndex !== null ? (
                <div className="edit-questionbtn">
                  <button
                    className="exam-button"
                    onClick={handleUpdateQuestion}
                  >
                    Update Question
                  </button>
                  <button
                    className="exam-button"
                    onClick={() => handleDeleteQuestion(editingIndex)}
                  >
                    Delete Question
                  </button>
                  <button onClick={handleCancelEdit}>Cancel</button>
                </div>
              ) : (
                <button
                  className="exam-button"
                  onClick={handleSaveQuestion}
                  disabled={newQuestion.trim() === "" && choices.length === 0}
                >
                  Save Question
                </button>
              )}
            </div>
          )}
          <div className="display-questions">
            <h3>Questions:</h3>
            {questions.map((q, index) => (
              <div key={index}>
                <strong>{q.question}</strong>
                {editingIndex === null && (
                  <div>
                    <button onClick={() => handleEditQuestion(index)}>
                      Edit
                    </button>
                    <button onClick={() => handleDeleteQuestion(index)}>
                      Delete
                    </button>
                  </div>
                )}
                {q.choices.map((choice, i) => (
                  <div
                    key={i}
                    onClick={() => handleSelectChoice(i)}
                    style={{
                      border: "1px solid #ccc",
                      padding: "10px",
                      marginBottom: "5px",
                      backgroundColor:
                        selectedChoice === i ? "#e0e0e0" : "white",
                    }}
                  >
                    {choice.isCorrect && (
                      <span style={{ color: "green", marginRight: "5px" }}>
                        Correct
                      </span>
                    )}
                    {editingIndex !== null && editingChoiceIndex === i ? (
                      <div>
                        <div className="input-div">
                          <input
                            className="input-effect"
                            type="text"
                            value={editingChoiceText}
                            onChange={handleChoiceChange}
                            placeholder="Type a choice..."
                          />
                          <span className="focus-border"></span>
                        </div>

                        <button onClick={handleAddChoice}>
                          {editingChoiceIndex !== null ? "Update" : "Add"}{" "}
                          Choice
                        </button>
                        <button
                          className="exam-button"
                          onClick={handleDeleteChoice}
                        >
                          Delete
                        </button>
                        <button
                          className="exam-button"
                          onClick={handleCancelEditChoice}
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <label htmlFor={`choice-${i}`}>{choice.text}</label>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>

          <Button
            variant="contained"
            style={{
              backgroundColor: "#e71e4a",
              color: "white",
            }}
            onClick={() => handleSaveExamToDatabase()}
          >
            Save Exam
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CreateExam;
