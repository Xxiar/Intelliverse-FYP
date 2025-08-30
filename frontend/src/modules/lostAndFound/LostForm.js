// src/modules/lostAndFound/LostForm.js
import React, { useState } from "react";
import {
  TextField,
  MenuItem,
  Button,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { addItem } from "./lostAndFoundService";

const categories = ["electronics", "documents", "clothing", "books", "accessories", "other"];
const types = ["lost", "found"];

const LostForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    type: "lost",
    location: "",
    date: "",
    contactInfo: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newItem = {
      ...formData,
      reportedBy: "user123", // static user for now
      status: "active",
    };
    await addItem(newItem);
    setFormData({
      title: "",
      description: "",
      category: "",
      type: "lost",
      location: "",
      date: "",
      contactInfo: "",
    });
  };

  return (
    <Paper sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Report a Lost/Found Item
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField label="Title" name="title" fullWidth required value={formData.title} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Category" name="category" select fullWidth required value={formData.category} onChange={handleChange}>
              {categories.map((cat) => <MenuItem key={cat} value={cat}>{cat}</MenuItem>)}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Type" name="type" select fullWidth required value={formData.type} onChange={handleChange}>
              {types.map((type) => <MenuItem key={type} value={type}>{type}</MenuItem>)}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Date" name="date" type="date" fullWidth required InputLabelProps={{ shrink: true }} value={formData.date} onChange={handleChange} />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Location" name="location" fullWidth required value={formData.location} onChange={handleChange} />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Description" name="description" fullWidth multiline rows={3} value={formData.description} onChange={handleChange} />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Contact Info" name="contactInfo" fullWidth required value={formData.contactInfo} onChange={handleChange} />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained">Submit</Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default LostForm;
