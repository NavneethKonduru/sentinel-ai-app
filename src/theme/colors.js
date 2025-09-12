export const lightTheme = {
  background: "#F8FAFC",
  primary: "#2563EB",
  secondary: "#1E293B",
  danger: "#EF4444",
  success: "#10B981",
  warning: "#F59E0B",
  textPrimary: "#1E293B",
  textSecondary: "#64748B",
  inputBorder: "#E2E8F0",
  card: "#FFFFFF",
  toggleOn: "#2563EB",
  toggleOff: "#94A3B8",
  softWhite: "#F1F5F9",
  riskSafe: "#10B981",
  riskWarning: "#F59E0B",
  riskDanger: "#EF4444",
  surfaceLight: "#F8FAFC",
  border: "#E2E8F0",
  accent: "#F472B6", // Soft pink accent for women-specific features
  womenAccent: "#EC4899", // Deeper pink for women-focused elements
};

export const darkTheme = {
  background: "#0F172A",
  primary: "#3B82F6",
  secondary: "#334155",
  danger: "#F87171",
  success: "#34D399",
  warning: "#FBBF24",
  textPrimary: "#F1F5F9",
  textSecondary: "#94A3B8",
  inputBorder: "#475569",
  card: "#1E293B",
  toggleOn: "#3B82F6",
  toggleOff: "#64748B",
  softWhite: "#F1F5F9",
  riskSafe: "#34D399",
  riskWarning: "#FBBF24",
  riskDanger: "#F87171",
  surfaceLight: "#334155",
  border: "#475569",
  accent: "#F472B6", // Soft pink accent
  womenAccent: "#EC4899", // Women-focused pink
};

export const mapStyles = {
  dark: [
    {
      elementType: "geometry",
      stylers: [{ color: "#0F172A" }],
    },
    {
      elementType: "labels.text.fill",
      stylers: [{ color: "#F1F5F9" }],
    },
    {
      elementType: "labels.text.stroke",
      stylers: [{ color: "#0F172A" }],
    },
    {
      featureType: "administrative.locality",
      elementType: "labels.text.fill",
      stylers: [{ color: "#94A3B8" }],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [{ color: "#94A3B8" }],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [{ color: "#1E293B" }],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#334155" }],
    },
    {
      featureType: "road",
      elementType: "geometry.stroke",
      stylers: [{ color: "#1E293B" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [{ color: "#475569" }],
    },
    {
      featureType: "transit",
      elementType: "geometry",
      stylers: [{ color: "#334155" }],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#1E293B" }],
    },
  ],
  light: [
    {
      elementType: "geometry",
      stylers: [{ color: "#F8FAFC" }],
    },
    {
      elementType: "labels.text.fill",
      stylers: [{ color: "#1E293B" }],
    },
    {
      elementType: "labels.text.stroke",
      stylers: [{ color: "#FFFFFF" }],
    },
    {
      featureType: "administrative.locality",
      elementType: "labels.text.fill",
      stylers: [{ color: "#64748B" }],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [{ color: "#64748B" }],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [{ color: "#10B981" }],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#E2E8F0" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [{ color: "#CBD5E1" }],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#3B82F6" }],
    },
  ],
};