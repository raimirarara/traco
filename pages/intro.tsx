import { Typography } from "@mui/material";
import { Box } from "@mui/system";

export default function Intro() {
  return (
    <Box>
      <Typography color={"primary"} align="center" variant="h5" pt={2}>
        はじめに
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 16,
        }}
      >
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/9ssk2CeZCqU"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </Box>
    </Box>
  );
}
