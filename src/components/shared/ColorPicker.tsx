import React, { useCallback, useEffect } from "react";
import { ColorPicker, useColor } from "react-color-palette";
import { Box, Typography, Button } from "@mui/material";
import { FieldProps } from "formik";

import "react-color-palette/css";

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
    if (!field?.value) return;

    let color: any = useColor(field.value);
    setColor(color);
  }, []);

  return <ColorPicker color={color} onChange={setColor} />;
};

export default ColorPickerCustom;
