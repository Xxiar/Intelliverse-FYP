// src/modules/lostAndFound/LostAndFoundList.js
import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import LostItemCard from "./LostItemCard";
import { getItems } from "./lostAndFoundService";

const LostAndFoundList = () => {
  const [items, setItems] = useState([]);

  const loadItems = async () => {
    const data = await getItems();
    setItems(data);
  };

  useEffect(() => {
    loadItems();
  }, []);

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Reported Items
      </Typography>
      {items.map((item) => (
        <LostItemCard key={item.id} item={item} onClaimed={loadItems} />
      ))}
    </>
  );
};

export default LostAndFoundList;
