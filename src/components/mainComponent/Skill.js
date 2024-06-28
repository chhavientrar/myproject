import React, { useState } from "react";
import {
  Box,
  Typography,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Autocomplete,
  IconButton,
  Card,
  Grid,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { AddCircleOutline, CloseOutlined } from "@mui/icons-material";
import axios from "axios";

function Skillset({ userdata }) {
  const [open, setOpen] = useState(false);
  const [skills, setSkills] = useState(["JavaScript", "React", "Node.js"]);
  const [inputValue, setInputValue] = useState("");
  const [selectedSkills, setSelectedSkills] = useState(userdata.skills || []);
  const [customSkill, setCustomSkill] = useState("");
  const [showCustomSkillField, setShowCustomSkillField] = useState(false);

  const handleClickOpen = () => {
    setSelectedSkills(userdata.skills || []);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setShowCustomSkillField(false);
    setCustomSkill("");
  };

  const handleAddCustomSkill = () => {
    if (customSkill && !skills.includes(customSkill)) {
      const updatedSkills = [...selectedSkills, customSkill];
      setSkills([...skills, customSkill]);
      setSelectedSkills(updatedSkills);
      updateSkillsOnServer(updatedSkills);
    }
    setShowCustomSkillField(false);
    setCustomSkill("");
  };

  const updateSkillsOnServer = async (updatedSkills) => {
    try {
      const response = await axios.put(
        "/users/skills",
        { skills: updatedSkills },
        {
          headers: {
            "auth-token": window.localStorage.getItem("auth-token"),
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status !== 200) {
        throw new Error("Failed to update skills");
      }
    } catch (error) {
      console.error("Error updating skills:", error);
    }
  };

  const handleSkillsChange = (event, newValue) => {
    if (newValue.includes("Others")) {
      setShowCustomSkillField(true);
      newValue = newValue.filter((skill) => skill !== "Others");
    }
    setSelectedSkills(newValue);
  };

  const handleAddSkills = () => {
    updateSkillsOnServer(selectedSkills);
    handleClose();
  };

  return (
    <Card sx={{ borderRadius: 0 }}>
      <Box sx={{ padding: 2 }}>
        <Box sx={{ marginBottom: 2 }}>
          <Grid
            sx={{
              display: "flex",
              p: 2,
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h6">Skills</Typography>
            <IconButton onClick={handleClickOpen}>
              <AddCircleOutline onClick={handleClickOpen} />
            </IconButton>
          </Grid>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {userdata?.skills?.length === 0 ? (
            <Grid
              item
              md={12}
              xs={12}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Typography>There is no any data !</Typography>
            </Grid>
          ) : (
            <>
              {userdata?.skills?.map((skill, index) => (
                <Chip
                  variant="outlined"
                  key={index}
                  label={skill}
                  sx={{
                    backgroundColor: "#240079",
                    color: "#fff",
                    borderRadius: "16px",
                    padding: "8px 12px",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                />
              ))}
            </>
          )}
        </Box>

        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
          <DialogTitle>Select or Add Skills</DialogTitle>
          <DialogContent>
            <Autocomplete
              multiple
              value={selectedSkills}
              onChange={handleSkillsChange}
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
              }}
              options={[...skills, "Others"]}
              renderInput={(params) => (
                <TextField {...params} label="Skills" variant="outlined" />
              )}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    key={index}
                    label={option}
                    {...getTagProps({ index })}
                  />
                ))
              }
            />
            {showCustomSkillField && (
              <Box sx={{ marginTop: 2 }}>
                <TextField
                  label="Enter custom skill"
                  variant="outlined"
                  fullWidth
                  value={customSkill}
                  onChange={(e) => setCustomSkill(e.target.value)}
                />
                <Button
                  sx={{ marginTop: 1 }}
                  variant="contained"
                  onClick={handleAddCustomSkill}
                >
                  Add Custom Skill
                </Button>
              </Box>
            )}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 2,
              }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddSkills}
              >
                Add Skills
              </Button>
              <IconButton onClick={handleClose} color="secondary">
                <CloseOutlined />
              </IconButton>
            </Box>
          </DialogContent>
        </Dialog>
      </Box>
    </Card>
  );
}

export default Skillset;
