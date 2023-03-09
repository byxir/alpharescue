import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";

export const RangeSlider = styled(Slider)(({ theme }) => ({
  color: "#E2E2E2",
  height: 3,
  padding: "13px 0",
  "& .MuiSlider-thumb": {
    height: 27,
    width: 27,
    backgroundColor: "#fff",
    border: "1px solid currentColor",
    "&:hover": {
      boxShadow: "0 0 0 8px rgba(58, 133, 137, 0.16)",
    },
    "& .airbnb-bar": {
      height: 9,
      width: 1,
      backgroundColor: "currentColor",
      marginLeft: 1,
      marginRight: 1,
    },
  },
  "& .MuiSlider-track": {
    height: 3,
  },
  "& .MuiSlider-rail": {
    color: theme.palette.mode === "dark" ? "#3A3A3A" : "#3A3A3A",
    opacity: theme.palette.mode === "dark" ? undefined : 1,
    height: 3,
  },
}));
