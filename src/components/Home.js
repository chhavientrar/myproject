import React, { useState } from "react";
import {
  Card,
  CardContent,
  Avatar,
  Typography,
  Grid,
  Box,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Autocomplete,
  TextField,
  IconButton,
} from "@mui/material";
import axios from "axios";
import { CloseOutlined } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";

const Home = ({ userdata }) => {
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
    <>
      <Card
        sx={{
          background: "#ffffff",
          borderRadius: 0,
          p: 2,
        }}
      >
        <CardContent sx={{ textAlign: "center" }}>
          <Avatar
            src="https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671132.jpg"
            alt="Chhavi Srivastav"
            sx={{ width: 100, height: 100, margin: "0 auto" }}
          />
          <Typography variant="h5" sx={{ marginTop: 1 }}>
            {userdata?.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {userdata?.studentId}
          </Typography>
          {/* <Typography variant="body2" color="text.secondary">
      Member since Aug 2022
    </Typography> */}
          <Typography variant="body2" color="text.secondary">
            Bengaluru, India
          </Typography>
        </CardContent>
        <Box sx={{ textAlign: "center" }}>
          {userdata?.skills?.map((skill, index) => (
            <Chip
              sx={{
                backgroundColor: "#DCDEE0",
                margin: "2px",
                fontSize: "12px",

                padding: "0 8px",
              }}
              variant="outlined"
              key={index}
              label={skill}
            />
          ))}
          <Chip
            icon={<AddIcon style={{ color: "#ffffff" }} />}
            onClick={handleClickOpen}
            label="Add Skills"
            variant="outlined"
            sx={{
              backgroundColor: "#6F6E71",
              color: "#ffffff",
              "&:hover": {
                backgroundColor: "#6F6E71",
                color: "#00000",
              },

              padding: "0 8px",
            }}
          />
        </Box>
      </Card>
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
                <Chip key={index} label={option} {...getTagProps({ index })} />
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
              width: "100px",
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
    </>
  );
};

export default Home;
