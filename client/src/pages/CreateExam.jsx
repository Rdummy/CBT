import React, { useState } from "react";
import { FiTrash2, FiEdit } from "react-icons/fi";
import "../assets/styles/create-exam.css";

const CreateExam = () => {
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
        setQuestions([...questions, { question: newQuestion, choices }]);
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
    <div className="create-exam-container">
      <h1>Create Exam</h1>
      <h2>_________________</h2>
      <button onClick={handleAddQuestion}>Add Question</button>
      {showInput && (
        <div className="question-input">
          <div class="input-div">
            <input
              className="input-effect"
              type="text"
              value={newQuestion}
              onChange={handleQuestionChange}
              placeholder="Type your question..."
            />
            <span class="focus-border"></span>
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
                    <div class="input-div">
                      <input
                        className="input-effect"
                        type="text"
                        value={editingChoiceText}
                        onChange={handleChoiceChange}
                        placeholder="Type a choice..."
                      />
                      <span class="focus-border"></span>
                    </div>

                    <button className="edit-trashbtn">
                      <FiTrash2 onClick={() => handleDeleteChoice(index)} />
                    </button>

                    {/* <FiEdit onClick={() => handleEditChoice(index)} /> */}
                    <button onClick={handleAddChoice} className="edit-editbtn">
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
                    <FiEdit onClick={() => handleEditChoice(index)} />
                    <FiTrash2 onClick={() => handleDeleteChoice(index)} />
                  </div>
                )}
              </div>
            ))}
          </div>
          <div class="input-div">
            <input
              className="input-effect"
              type="text"
              value={newChoice}
              onChange={(e) => setNewChoice(e.target.value)}
              placeholder="Type a choice..."
            />
            <span class="focus-border"></span>
          </div>

          <button onClick={handleAddChoice} disabled={newChoice.trim() === ""}>
            Add Choice
          </button>
          {errorMessage && (
            <p className="error-message" style={{ color: "red" }}>
              {errorMessage}
            </p>
          )}
          {editingIndex !== null ? (
            <div className="edit-questionbtn">
              <button onClick={handleUpdateQuestion}>Update Question</button>
              <button onClick={() => handleDeleteQuestion(editingIndex)}>
                Delete Question
              </button>
              <button onClick={handleCancelEdit}>Cancel</button>
            </div>
          ) : (
            <button
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
                <button onClick={() => handleEditQuestion(index)}>Edit</button>
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
                  backgroundColor: selectedChoice === i ? "#e0e0e0" : "white",
                }}
              >
                {choice.isCorrect && (
                  <span style={{ color: "green", marginRight: "5px" }}>
                    Correct
                  </span>
                )}
                {editingIndex !== null && editingChoiceIndex === i ? (
                  <div>
                    <div class="input-div">
                      <input
                        className="input-effect"
                        type="text"
                        value={editingChoiceText}
                        onChange={handleChoiceChange}
                        placeholder="Type a choice..."
                      />
                      <span class="focus-border"></span>
                    </div>

                    <button onClick={handleAddChoice}>
                      {editingChoiceIndex !== null ? "Update" : "Add"} Choice
                    </button>
                    <button onClick={handleDeleteChoice}>Delete</button>
                    <button onClick={handleCancelEditChoice}>Ca ncel</button>
                  </div>
                ) : (
                  <label htmlFor={`choice-${i}`}>{choice.text}</label>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreateExam;
