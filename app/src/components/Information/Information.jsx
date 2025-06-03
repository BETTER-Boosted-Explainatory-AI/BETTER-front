import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";


const Information = ({ text, iconSize = 20 }) => (
  <Tooltip
    title={<span style={{ whiteSpace: "pre-line" }}>{text}</span>}
    placement="top"
    arrow
  >
    <IconButton
      sx={{ padding: 0, color: "#222831", position: "relative", top: "-7px" }}
      size="small"
      tabIndex={0}
    >
      <InfoOutlinedIcon fontSize="inherit" sx={{ fontSize: iconSize }} />
    </IconButton>
  </Tooltip>
);

export default Information;