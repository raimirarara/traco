import { Box, Button, Typography } from "@mui/material";

export default function Favorite() {
  return (
    <Box>
      <Typography color={"primary"} align="center" variant="h5" mt={2}>
        お気に入り
      </Typography>
      <Button
        className="absolute inset-x-0 bottom-0"
        fullWidth
        variant="outlined"
        href="/"
      >
        Home
      </Button>
    </Box>
  );
}
