import { Box, Typography } from "@mui/material";

function QuestionCard({ question }) {
    return (
      <Box>
        <Typography variant="h5">{question.question}</Typography>
        {question.type === "generalTips" && <Typography>{question.content}</Typography>}
      </Box>
    );
  }export default QuestionCard;