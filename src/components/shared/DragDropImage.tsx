import React, { useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Box, Typography, Button } from "@mui/material";
import { FieldProps } from "formik";
import theme from "@/utils/theme";

interface DragDropImageProps extends FieldProps {
  setFieldValue: (field: string, value: any) => void;
}

const DragDropImage: React.FC<DragDropImageProps> = ({
  field,
  form: { setFieldValue },
}) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result as string;
          setFieldValue(field.name, base64String); // ใช้ Formik setFieldValue
        };
        reader.readAsDataURL(file);
      }
    },
    [setFieldValue, field.name]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
  });

  useEffect(() => {
    console.log(field.value)
  }, [field.value])

  return (
    <>
      <Typography
        variant="subtitle2"
        sx={{ mb: 1, color: theme.palette.text.primary }}
      >
        รูปภาพ (ไม่บังคับ)
      </Typography>
      <Box
        {...getRootProps()}
        sx={{
          border: "2px dashed #ccc",
          padding: "20px",
          textAlign: "center",
          cursor: "pointer",
          borderRadius: "8px",
        }}
      >
        <input {...getInputProps()} />
        <Typography>ลากและวางไฟล์ที่นี่ หรือคลิกเพื่ออัปโหลด</Typography>
        {field.value && (
          
          <Box mt={2}>
            <Typography variant="subtitle2">ตัวอย่างรูป:</Typography>
            <img
              src={field.value}
              alt="preview"
              style={{
                width: "100px",
                height: "100px",
                objectFit: "cover",
                marginTop: "10px",
              }}
            />
            <Button
              onClick={() => setFieldValue(field.name, "")}
              sx={{ display: "block", margin: "10px auto" }}
            >
              ลบรูปภาพ
            </Button>
          </Box>
        )}
      </Box>
    </>
  );
};

export default DragDropImage;
