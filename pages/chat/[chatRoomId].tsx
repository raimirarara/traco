import { Box, Typography } from "@mui/material";
import MessageField from "../../components/atoms/MessageField";

export default function ChatRoomId() {
  return (
    <Box>
      <Typography color={"primary"} align="center" variant="h5" mt={2}>
        ← 相手の名前
      </Typography>
      <div className="absolute inset-x-0 bottom-0">
        <MessageField />
      </div>
    </Box>
  );
}
