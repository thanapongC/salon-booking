import React, { useCallback, useEffect } from "react";
import { ColorPicker, useColor } from "react-color-palette";
import { Box, Typography, Button } from "@mui/material";
import { FieldProps } from "formik";

import "react-color-palette/css";
import theme from "@/utils/theme";

interface ColorPickerProps extends FieldProps {
  setFieldValue: (field: string, value: any) => void;
}

const ColorPickerCustom: React.FC<ColorPickerProps> = ({
  field,
  form: { setFieldValue },
}) => {
  const [color, setColor] = useColor("cyan");

  useEffect(() => {
    setFieldValue(field.name, color.hex);
  }, [color]);

  useEffect(() => {

    console.log(field.value)
    if (!field?.value) return;

    let color: any = useColor(field.value);
    setColor(color);
  }, []);

  return (
    <>
      <Typography
        variant="subtitle2"
        sx={{ mb: 1, color: theme.palette.text.primary }}
      >
        สีประจำบริการ
      </Typography>
      <ColorPicker color={color} onChange={setColor} hideInput={true} hideAlpha={true}/>
    </>
  );
};

export default ColorPickerCustom;
