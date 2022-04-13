import { Box, Button, Typography } from "@mui/material";
import SimpleBottomNavigation from "../components/organizms/BottomNavigation";

export default function Talk() {
  return (
    <Box>
      <Box height={680}>
        <Typography color={"primary"} align="center" variant="h5" pt={2}>
          Talk
        </Typography>
        {/* <Button
        className="absolute inset-x-0 bottom-0"
        fullWidth
        variant="outlined"
        href="/"
      >
        Home
      </Button> */}
      </Box>
      <SimpleBottomNavigation />
    </Box>
  );
}
