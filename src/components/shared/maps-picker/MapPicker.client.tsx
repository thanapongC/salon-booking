"use client";

import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import { Box, Typography } from "@mui/material";
import { FieldProps } from "formik";

// fix leaflet icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const defaultPosition: [number, number] = [13.756331, 100.501762];

function LocationMarker({ setFieldValue, value }: any) {
  useMapEvents({
    click(e) {
      setFieldValue("latitude", e.latlng.lat);
      setFieldValue("longitude", e.latlng.lng);
    },
  });

  if (!value?.latitude || !value?.longitude) return null;

  return (
    <Marker
      position={[value.latitude, value.longitude]}
      draggable
      eventHandlers={{
        dragend: (e) => {
          const pos = e.target.getLatLng();
          setFieldValue("latitude", pos.lat);
          setFieldValue("longitude", pos.lng);
        },
      }}
    />
  );
}

export default function MapPickerClient({
  field,
  form: { setFieldValue },
}: FieldProps) {

  // console.log(field.value.latitude)
  // console.log(field.value.longitude)

  const position: [number, number] =
    field.value?.latitude && field.value?.longitude
      ? [field.value.latitude, field.value.longitude]
      : defaultPosition;

  return (
    <Box>
      <Typography variant="subtitle2" mb={1}>
        ปักหมุดที่ตั้งร้านค้า
      </Typography>

      <MapContainer
        // center={position}
        // zoom={15}
        // style={{ height: 320, width: "100%", borderRadius: 8 }}
      >
        <TileLayer
          attribution="© OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <LocationMarker
          setFieldValue={setFieldValue}
          value={field.value}
        />
      </MapContainer>
    </Box>
  );
}
