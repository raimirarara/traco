import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import { IconButton } from "@mui/material";

export default function MessageField() {
  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { mt: 1, width: "100%" },
      }}
      noValidate
      autoComplete="off"
    >
      <div className="flex">
        <TextField
          id="filled-basic"
          label="メッセージを入力"
          variant="filled"
          fullWidth
          value={"aa"}
        />
        <IconButton color={"primary"}>
          <SendIcon />
        </IconButton>
      </div>
    </Box>
  );
}
