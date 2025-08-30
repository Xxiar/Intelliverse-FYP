// src/modules/lostAndFound/LostItemCard.js
import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
import { claimItem } from "./lostAndFoundService";

const LostItemCard = ({ item, onClaimed }) => {
  const handleClaim = async () => {
    await claimItem(item.id, "user123"); // static user
    onClaimed();
  };

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6">{item.title} ({item.type})</Typography>
        <Typography variant="body2" color="text.secondary">{item.category} | {item.date}</Typography>
        <Typography variant="body1" sx={{ my: 1 }}>{item.description}</Typography>
        <Typography variant="body2">Location: {item.location}</Typography>
        <Typography variant="body2">Contact: {item.contactInfo}</Typography>
        {item.status === "active" && (
          <Button variant="outlined" sx={{ mt: 1 }} onClick={handleClaim}>
            Claim
          </Button>
        )}
        {item.status === "claimed" && (
          <Typography color="primary" sx={{ mt: 1 }}>Claimed</Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default LostItemCard;
