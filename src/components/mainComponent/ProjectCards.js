import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CardContent, Chip } from "@mui/material";
import {
  WhatsappShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappIcon,
  LinkedinIcon,
  TwitterIcon,
} from "react-share";
import { ShareOutlined } from "@mui/icons-material";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function ProjectCards({ data }) {
  const [expanded, setExpanded] = React.useState(false);
  const [shareMenuOpen, setShareMenuOpen] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleShareClick = () => {
    setShareMenuOpen(!shareMenuOpen);
  };

  const shareUrl = "https://yourwebsite.com"; // Replace with your website URL
  const title = data?.title;

  return (
    <Card sx={{ maxWidth: 300, flex: "1 1 calc(50% - 16px)", mb: 2 }}>
      <CardHeader
        avatar={
          <Avatar
            src="https://media.licdn.com/dms/image/D5612AQFJ-aNtL0ODJw/article-cover_image-shrink_600_2000/0/1679422597271?e=2147483647&v=beta&t=BQVHkjmUhUBaY-rvHIVrQ8AZqolbed4GKB_r4qCJwmE"
            aria-label="recipe"
          />
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={title}
        subheader="September 14, 2016"
      />
      <CardMedia
        component="img"
        height="194"
        src="https://media.licdn.com/dms/image/D5612AQFJ-aNtL0ODJw/article-cover_image-shrink_600_2000/0/1679422597271?e=2147483647&v=beta&t=BQVHkjmUhUBaY-rvHIVrQ8AZqolbed4GKB_r4qCJwmE"
        alt="Paella dish"
      />
      <CardActions disableSpacing>
        <IconButton aria-label="share" onClick={handleShareClick}>
          <ShareOutlined />
        </IconButton>
        {shareMenuOpen && (
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <WhatsappShareButton url={shareUrl} title={title}>
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
            <LinkedinShareButton url={shareUrl} title={title}>
              <LinkedinIcon size={32} round />
            </LinkedinShareButton>
            <TwitterShareButton url={shareUrl} title={title}>
              <TwitterIcon size={32} round />
            </TwitterShareButton>
          </div>
        )}
        <IconButton
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <Chip label="view Details" />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>{data?.description}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
