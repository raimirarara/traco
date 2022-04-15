import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import { IconButton } from "@mui/material";

type Props = {
  roomId: string;
  name: string;
  sendText: (roomId: string, name: string, content: string) => Promise<void>;
};

export default function MessageField(props: Props) {
  const [value, setValue] = React.useState<string>("");

  const inputText = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValue(e.target.value);
  };

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { width: "100%" },
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
          value={value}
          onChange={(e) => inputText(e)}
        />
        <IconButton
          color={"primary"}
          onClick={() => props.sendText(props.roomId, props.name, value)}
        >
          <SendIcon />
        </IconButton>
      </div>
    </Box>
  );
}
