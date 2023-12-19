import React from
 
"react";
import CardContent from
 
"@mui/material/CardContent";
import Typography from
 
"@mui/material/Typography";

const QuestionCard = ({ question }) => {
  const renderQuestionText = () => {
    switch (question.type) {
      case "multipleChoice":
        return <Typography variant="h5">{question.content}</Typography>;
      default:
        return <Typography variant="h5">{question.content}</Typography>;
    }
  };

  return (
    <CardContent>
      {renderQuestionText()}
      {question.image && <img src={question.image} alt="Question image" />}
    </CardContent>
  );
};

export default QuestionCard;