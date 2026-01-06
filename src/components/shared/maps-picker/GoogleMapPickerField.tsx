"use client";

import {
  GoogleMap,
  Marker,
  Autocomplete,
  useLoadScript,
} from "@react-google-maps/api";
import { Box, TextField, Typography } from "@mui/material";
import { FieldProps } from "formik";
import { useRef } from "react";

const libraries: ("places")[] = ["places"];

const defaultCenter = {
  lat: 13.756331,
  lng: 100.501762,
};

export default function MapPickerField({
  field,
  form: { setFieldValue },
}: FieldProps) {
  const autoCompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries,
  });

  const position =
    field.value?.latitude && field.value?.longitude
      ? {
          lat: field.value.latitude,
          lng: field.value.longitude,
        }
      : defaultCenter;

  if (!isLoaded) return null;

  return (
    <Box>
      <Typography variant="subtitle2" mb={1}>
        ที่ตั้งร้านค้า
      </Typography>

      {/* 🔍 Search Address */}
      <Autocomplete
        onLoad={(ac) => (autoCompleteRef.current = ac)}
        onPlaceChanged={() => {
          const place = autoCompleteRef.current?.getPlace();
          if (!place?.geometry?.location) return;

          setFieldValue("latitude", place.geometry.location.lat());
          setFieldValue("longitude", place.geometry.location.lng());
          setFieldValue("address", place.formatted_address);
          setFieldValue("placeId", place.place_id);
        }}
      >
        <TextField
          fullWidth
          label="ค้นหาที่อยู่"
          placeholder="พิมพ์ชื่อสถานที่หรือที่อยู่"
          sx={{ mb: 2 }}
        />
      </Autocomplete>

      {/* 🗺️ Map */}
      <GoogleMap
        center={position}
        zoom={15}
        mapContainerStyle={{
          width: "100%",
          height: "320px",
          borderRadius: 8,
        }}
        onClick={(e) => {
          if (!e.latLng) return;

          setFieldValue("latitude", e.latLng.lat());
          setFieldValue("longitude", e.latLng.lng());
        }}
      >
        <Marker
          position={position}
          draggable
          onDragEnd={(e) => {
            if (!e.latLng) return;
            setFieldValue("latitude", e.latLng.lat());
            setFieldValue("longitude", e.latLng.lng());
          }}
        />
      </GoogleMap>
    </Box>
  );
}
