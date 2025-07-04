import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

const Information = ({ text, iconSize = 20 }) => (
  <Tooltip
    title={
      <span style={{ whiteSpace: "pre-line", fontSize: "0.9rem" }}>{text}</span>
    }
    placement="top"
    arrow
  >
    <IconButton
      sx={{
        padding: 0,
        color: "#222831",
        position: "relative",
        top: "-7px",
        width: iconSize,
        height: iconSize,
      }}
      size="small"
      tabIndex={0}
    >
      <InfoOutlinedIcon fontSize="inherit" sx={{ fontSize: iconSize }} />
    </IconButton>
  </Tooltip>
);

export default Information;
