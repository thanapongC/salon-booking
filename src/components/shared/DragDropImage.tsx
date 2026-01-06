"use client"

import type React from "react"
import { useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Box, Typography, IconButton, useTheme } from "@mui/material"
import type { FieldProps } from "formik"
import DeleteIcon from "@mui/icons-material/Delete"
import CloudUploadIcon from "@mui/icons-material/CloudUpload"

interface DragDropImageProps extends FieldProps {
  setFieldValue: (field: string, value: any) => void
}

const DragDropImage: React.FC<DragDropImageProps> = ({ field, form: { setFieldValue } }) => {
  const theme = useTheme()

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]
      if (file) {
        const reader = new FileReader()
        reader.onloadend = () => {
          const base64String = reader.result as string
          setFieldValue(field.name, base64String)
        }
        reader.readAsDataURL(file)
      }
    },
    [setFieldValue, field.name],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
  })

  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      {field.value ? (
        // Show full-size preview with delete button
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: "300px",
            borderRadius: 2,
            overflow: "hidden",
            border: `2px solid ${theme.palette.divider}`,
          }}
        >
          <Box
            component="img"
            src={field.value}
            alt="preview"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          <IconButton
            onClick={() => setFieldValue(field.name, "")}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              bgcolor: "rgba(0, 0, 0, 0.6)",
              color: "white",
              "&:hover": {
                bgcolor: "rgba(0, 0, 0, 0.8)",
              },
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ) : (
        // Show dropzone when no image
        <Box
          {...getRootProps()}
          sx={{
            border: `2px dashed ${isDragActive ? theme.palette.primary.main : theme.palette.divider}`,
            borderRadius: 2,
            padding: 4,
            textAlign: "center",
            cursor: "pointer",
            transition: "all 0.3s ease",
            bgcolor: isDragActive ? theme.palette.action.hover : "transparent",
            "&:hover": {
              borderColor: theme.palette.primary.main,
              bgcolor: theme.palette.action.hover,
            },
            minHeight: "300px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <input {...getInputProps()} />
          <CloudUploadIcon
            sx={{
              fontSize: 64,
              color: theme.palette.text.secondary,
              mb: 2,
            }}
          />
          <Typography variant="body1" sx={{ color: theme.palette.text.primary, mb: 1 }}>
            {isDragActive ? "วางรูปภาพที่นี่..." : "ลากและวางรูปภาพที่นี่"}
          </Typography>
          <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
            หรือคลิกเพื่อเลือกไฟล์
          </Typography>
        </Box>
      )}
    </Box>
  )
}

export default DragDropImage
