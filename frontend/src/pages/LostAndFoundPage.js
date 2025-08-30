
import React from "react";
import { Container, Typography, Divider } from "@mui/material";
import LostForm from "../modules/lostAndFound/LostForm";
import LostAndFoundList from "../modules/lostAndFound/LostAndFoundList";

const LostAndFoundPage = () => {
  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Lost & Found
      </Typography>
      <LostForm />
      <Divider sx={{ my: 4 }} />
      <LostAndFoundList />
    </Container>
  );
};

export default LostAndFoundPage;
