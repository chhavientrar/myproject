import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { CardContent, CardActions, Chip, Collapse } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ShareOutlined, MoreVertIcon } from "@mui/icons-material";
import {
  WhatsappShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappIcon,
  LinkedinIcon,
  TwitterIcon,
} from "react-share";

export default function ProjectCards({ data }) {
  const [expanded, setExpanded] = React.useState(false);
  const [shareMenuOpen, setShareMenuOpen] = React.useState(false);
  const [viewDetails, setViewDetails] = React.useState(false);
  const [details, setDetails] = React.useState([]);

  const handleOpenViewDetails = (data) => {
    setDetails(data);
    setViewDetails(true);
  };

  const handleBack = () => {
    setViewDetails(false);
  };

  const handleShareClick = () => {
    setShareMenuOpen(!shareMenuOpen);
  };

  const shareUrl = "https://yourwebsite.com"; // Replace with your website URL
  const title = data?.title;

  return (
    <>
      {viewDetails ? (
        <Card
          sx={{
            maxWidth: 350,
            flex: "1 1 calc(50% - 16px)",
            mb: 2,
            borderRadius: "20",
          }}
        >
          <CardHeader
            avatar={
              <Avatar
                src="https://media.licdn.com/dms/image/D5612AQFJ-aNtL0ODJw/article-cover_image-shrink_600_2000/0/1679422597271?e=2147483647&v=beta&t=BQVHkjmUhUBaY-rvHIVrQ8AZqolbed4GKB_r4qCJwmE"
                aria-label="recipe"
              />
            }
            title={title}
            subheader="September 14, 2016"
          />
          <CardContent>
            <Typography paragraph>{details}</Typography>
            <IconButton onClick={handleBack} aria-label="back">
              <Chip
                icon={<ArrowBackIcon style={{ color: "#ffffff" }} />}
                label="Back"
                variant="outlined"
                sx={{
                  backgroundColor: "#6F6E71",
                  color: "#ffffff",
                  "&:hover": {
                    backgroundColor: "#333333",
                  },
                  padding: "0 8px",
                }}
              />
            </IconButton>
          </CardContent>
        </Card>
      ) : (
        <Card
          sx={{
            maxWidth: 350,
            borderRadius: "10px",
            flex: "1 1 calc(50% - 16px)",
            mb: 2,
            boxShadow:
              "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
          }}
        >
          <CardHeader
            avatar={
              <Avatar
                src="https://media.licdn.com/dms/image/D5612AQFJ-aNtL0ODJw/article-cover_image-shrink_600_2000/0/1679422597271?e=2147483647&v=beta&t=BQVHkjmUhUBaY-rvHIVrQ8AZqolbed4GKB_r4qCJwmE"
                aria-label="recipe"
              />
            }
            title={title}
            subheader="September 14, 2016"
          />
          <img
            src="https://cdn.sanity.io/images/tlr8oxjg/production/d63904e726e42ae2491c29106065e9762dbcccde-1456x816.png?w=3840&q=80&fit=clip&auto=format"
            height="100px"
            alt="img"
          />
          <CardActions disableSpacing>
            <IconButton aria-label="share" onClick={handleShareClick}>
              <ShareOutlined style={{ color: "#0A6B28" }} />
            </IconButton>
            {shareMenuOpen && (
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
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
              onClick={() => handleOpenViewDetails(data?.description)}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <Chip
                variant="outlined"
                sx={{
                  backgroundColor: "#6F6E71",
                  color: "#ffffff",
                  "&:hover": {
                    backgroundColor: "#333333",
                  },
                  padding: "0 8px",
                }}
                label="View Details"
              />
            </IconButton>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>{data?.description}</Typography>
            </CardContent>
          </Collapse>
        </Card>
      )}
    </>
  );
}
