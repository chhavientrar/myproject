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
  Button,
  Chip,
  IconButton,
  Divider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { CloseOutlined } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import ProjectDetailsCard from "./ProjectDetailCard";

const ProofofWork = () => {
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
      setSkills([...skills, customSkill]);
      setSelectedSkills([...selectedSkills, customSkill]);
    }
    setShowCustomSkillField(false);
    setCustomSkill("");
  };
  const addedskills = [
    "Python",
    "JavaScript",
    "React",
    "Node.js",
    "Java",
    "C++",
    "C#",
    "Go",
    "Ruby",
    "Swift",
    "Kotlin",
    "PHP",
    "TypeScript",
    "C",
    "MongoDb",
    "DSA",
  ];

  return (
    <>
      <Grid item md={12} xs={12} mt={2}>
        <Card>
          <CardContent>
            <Grid
              item
              md={12}
              xs={12}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography variant="h6" sx={{ fontWeight: 500 }}>
                Proof Of Work{" "}
              </Typography>
              {/* <IconButton>
                <EditIcon />
              </IconButton> */}
            </Grid>
            <Divider />
            {/* <div
              style={{
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
                padding: "5px",
              }}
            >
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsr0TB8tGKoNKEeS0hfcYy6I-fPySOsR4P3CuPgAM_aRj_s0i1-PjVKvxPVxi4gIeTKv4&usqp=CAU"
                alt="image"
                height="100px"
                width="100px"
                style={{ cursor: "pointer" }}
                onClick={handleClickOpen}
              />
            </div> */}
            <Grid container spacing={1} mt={1}>
              <Grid item md={4} xs={12} lg={4}>
                <ProjectDetailsCard />
              </Grid>
              <Grid item md={4} xs={12} lg={4}>
                <ProjectDetailsCard />
              </Grid>
              <Grid item md={4} xs={12} lg={4}>
                <ProjectDetailsCard />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};

export default ProofofWork;
