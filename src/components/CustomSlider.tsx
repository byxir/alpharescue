/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import React from "react";
import { Slider } from "@mui/material";
import { alpha } from "@mui/system";
import { styled } from "@mui/system";

// Custom styles for the slider
const CustomSlider = styled(Slider, {
  shouldForwardProp: (prop) => prop !== "color",
})(({ theme }) => ({
  color: "#FFFFFF",
  height: 2,
  padding: "15px 0",
  "& .MuiSlider-rail": {
    height: 2,
    opacity: 0.5,
    backgroundColor: "#FFFFFF",
  },
  "& .MuiSlider-track": {
    height: 2,
  },
  "& .MuiSlider-thumb": {
    height: 14,
    width: 14,
    backgroundColor: "#FFFFFF",
    border: "none",
    "&:hover, &.Mui-focusVisible": {
      boxShadow: `0px 0px 0px 8px ${alpha(theme.palette.primary.main, 0.16)}`,
    },
    "&.Mui-active": {
      boxShadow: `0px 0px 0px 14px ${alpha(theme.palette.primary.main, 0.16)}`,
    },
  },
}));

interface CustomColorSliderProps {
  customColor?: string;
}

const CustomColorSlider: React.FC<CustomColorSliderProps> = ({
  customColor,
}) => {
  return (
    <CustomSlider defaultValue={30} aria-labelledby="custom-color-slider" />
  );
};

export default CustomColorSlider;
