import React, { useState } from "react";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Autocomplete,
  Chip,
  IconButton,
  Divider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { CloseOutlined } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";

const SkillCard = ({ userdata }) => {
  const [open, setOpen] = useState(false);
  const [skills, setSkills] = useState(["JavaScript", "React", "Node.js"]);
  const [inputValue, setInputValue] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [customSkill, setCustomSkill] = useState("");
  const [showCustomSkillField, setShowCustomSkillField] = useState(false);

  const handleClickOpen = () => {
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

  const updateSkillsOnServer = async () => {
    try {
      const response = await axios.put(
        "/users/skills",
        {
          skills: selectedSkills,
        },
        {
          headers: {
            "auth-token": `${window.localStorage.getItem("auth-token")}`,
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
    // updateSkillsOnServer(newValue);
  };

  return (
    <>
      <Grid item md={12} xs={12}>
        <Card>
          <CardContent>
            <Grid
              item
              md={12}
              xs={12}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography variant="h6" sx={{ fontWeight: 500 }}>
                Skills{" "}
              </Typography>
              {/* <IconButton onClick={handleClickOpen}>
                <EditIcon />
              </IconButton> */}
            </Grid>
            <Divider />
            {userdata?.skills?.length === 0 ? (
              <>
                <div
                  style={{
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "center",
                    padding: "5px",
                  }}
                >
                  <img
                    src="https://cdn.iconscout.com/icon/premium/png-256-thumb/additional-skills-2-957891.png"
                    alt="image"
                    height="100px"
                    width="100px"
                    style={{ cursor: "pointer" }}
                    onClick={handleClickOpen}
                  />
                </div>
              </>
            ) : (
              <Grid container spacing={1} p={1}>
                {userdata?.skills?.map((skill, index) => (
                  <Grid item key={index}>
                    <Chip label={skill} variant="outlined" />
                  </Grid>
                ))}
              </Grid>
            )}
          </CardContent>
        </Card>
      </Grid>
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
            <div style={{ marginTop: "16px" }}>
              <TextField
                label="Enter custom skill"
                variant="outlined"
                fullWidth
                value={customSkill}
                onChange={(e) => setCustomSkill(e.target.value)}
              />
              {/* <IconButton
                onClick={handleAddCustomSkill}
                color="primary"
                variant="contained"
                style={{ marginTop: "8px" }}
              >
                <AddIcon />
              </IconButton> */}
            </div>
          )}
          <Grid
            item
            md={12}
            xs={12}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <IconButton
              onClick={handleAddCustomSkill}
              color="primary"
              variant="contained"
              style={{ marginTop: "8px" }}
            >
              <AddIcon />
            </IconButton>
            <IconButton
              onClick={handleClose}
              color="primary"
              variant="contained"
              style={{ marginTop: "16px" }}
            >
              <CloseOutlined />
            </IconButton>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SkillCard;
