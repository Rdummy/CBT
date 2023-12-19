import { TextField } from "@mui/material";

function OpenEndedTextField({ value, onChange }) {
    return (
      <TextField
        id="open-ended-answer"
        multiline
        rows={4}
        value={value}
        onChange={onChange}
      />
    );
  }export default OpenEndedTextField