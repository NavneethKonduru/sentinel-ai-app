import React, { useState } from "react";
import { ScrollView, Alert, View, Text } from "react-native";
import MapView, { Polyline, Marker } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import {
  SafeAreaContainer,
  HeaderWithBack,
  BackButton,
  BackButtonText,
  Title,
  InputField,
  Button,
  ButtonText,
  MapContainer,
  Card,
  CardTitle,
  CardText,
  Badge,
  BadgeText,
  Divider,
} from "../components/StyledComponents";
import { mapStyles } from "../theme/colors";

const routeOptions = ["Fastest", "Safest", "Balanced"];

const mockRoutes = {
  fastest: {
    coordinates: [
      { latitude: 28.6139, longitude: 77.209 },
      { latitude: 28.6189, longitude: 77.219 },
      { latitude: 28.6239, longitude: 77.229 },
    ],
    distance: "5.2 km",
    duration: "12 min",
    safetyScore: 75,
    features: ["Well-lit streets", "CCTV coverage", "Moderate traffic"],
  },
  safest: {
    coordinates: [
      { latitude: 28.6139, longitude: 77.209 },
      { latitude: 28.6109, longitude: 77.215 },
      { latitude: 28.6169, longitude: 77.225 },
      { latitude: 28.6239, longitude: 77.229 },
    ],
    distance: "6.8 km",
    duration: "18 min",
    safetyScore: 95,
    features: ["Maximum CCTV coverage", "Police patrol routes", "Emergency services nearby"],
  },
  balanced: {
    coordinates: [
      { latitude: 28.6139, longitude: 77.209 },
      { latitude: 28.6159, longitude: 77.214 },
      { latitude: 28.6209, longitude: 77.224 },
      { latitude: 28.6239, longitude: 77.229 },
    ],
    distance: "5.8 km",
    duration: "15 min",
    safetyScore: 85,
    features: ["Good lighting", "Regular security presence", "Balanced route"],
  },
};

export default function SafeRouteScreen({ navigation }) {
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [selectedRoute, setSelectedRoute] = useState("balanced");

  const handleStartNavigation = () => {
    if (!fromLocation || !toLocation) {
      Alert.alert("Missing Information", "Please enter both pickup and destination locations.");
      return;
    }
    
    Alert.alert(
      "Start Navigation",
      `Starting ${selectedRoute} route navigation.\nFrom: ${fromLocation}\nTo: ${toLocation}`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Start", onPress: () => console.log("Navigation started") }
      ]
    );
  };

  const getSafetyColor = (score) => {
    if (score >= 90) return "#1FC667";
    else if (score >= 75) return "#FDBA1D";
    else return "#FF3B46";
  };

  const currentRoute = mockRoutes[selectedRoute];

  return (
    <SafeAreaContainer>
      <HeaderWithBack>
        <BackButton onPress={() => navigation.goBack()}>
          <BackButtonText>← Back</BackButtonText>
        </BackButton>
        <Title>Safe Route Planner</Title>
        <BackButton style={{ opacity: 0 }}>
          <BackButtonText>Back</BackButtonText>
        </BackButton>
      </HeaderWithBack>

      <ScrollView>
        {/* Location Inputs */}
        <Card>
          <CardTitle>Plan Your Journey</CardTitle>
          <InputField
            placeholder="From (Current location)"
            placeholderTextColor="#7C8491"
            value={fromLocation}
            onChangeText={setFromLocation}
          />
          <InputField
            placeholder="To (Destination)"
            placeholderTextColor="#7C8491"
            value={toLocation}
            onChangeText={setToLocation}
          />
        </Card>

        {/* Route Options */}
        <Card>
          <CardTitle>Route Preferences</CardTitle>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {routeOptions.map((option) => (
              <Button
                key={option}
                selected={selectedRoute === option.toLowerCase()}
                onPress={() => setSelectedRoute(option.toLowerCase())}
              >
                <ButtonText selected={selectedRoute === option.toLowerCase()}>
                  {option}
                </ButtonText>
              </Button>
            ))}
          </ScrollView>
        </Card>

        {/* Map with Route */}
        <MapContainer style={{ height: 300, margin: 16 }}>
          <MapView
            style={{ flex: 1 }}
            customMapStyle={mapStyles.dark}
            initialRegion={{
              latitude: 28.6189,
              longitude: 77.219,
              latitudeDelta: 0.02,
              longitudeDelta: 0.02,
            }}
          >
            <Polyline
              coordinates={currentRoute.coordinates}
              strokeColor="#1993F5"
              strokeWidth={4}
            />
            <Marker
              coordinate={currentRoute.coordinates[0]}
              title="Start"
              pinColor="#1FC667"
            />
            <Marker
              coordinate={currentRoute.coordinates[currentRoute.coordinates.length - 1]}
              title="Destination"
              pinColor="#FF3B46"
            />
          </MapView>
        </MapContainer>

        {/* Route Details */}
        <Card>
          <CardTitle>Route Information</CardTitle>
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 12 }}>
            <CardText>Distance: {currentRoute.distance}</CardText>
            <CardText>Duration: {currentRoute.duration}</CardText>
          </View>
          
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}>
            <CardText>Safety Score: </CardText>
            <Badge color={getSafetyColor(currentRoute.safetyScore)}>
              <BadgeText>{currentRoute.safetyScore}/100</BadgeText>
            </Badge>
          </View>

          <Divider />
          
          <CardTitle style={{ fontSize: 16, marginBottom: 8 }}>Safety Features:</CardTitle>
          {currentRoute.features.map((feature, index) => (
            <View key={index} style={{ flexDirection: "row", alignItems: "center", marginBottom: 4 }}>
              <Ionicons name="checkmark-circle" size={16} color="#1FC667" style={{ marginRight: 8 }} />
              <CardText>{feature}</CardText>
            </View>
          ))}
        </Card>

        {/* Action Buttons */}
        <Card>
          <Button selected={true} onPress={handleStartNavigation}>
            <ButtonText selected={true}>
              <Ionicons name="navigation" size={18} color="#FFFFFF" /> Start Navigation
            </ButtonText>
          </Button>
          
          <Button selected={false} onPress={() => Alert.alert("Feature Coming Soon", "Share route functionality will be available soon!")}>
            <ButtonText selected={false}>
              <Ionicons name="share" size={18} color="#1993F5" /> Share Route
            </ButtonText>
          </Button>
        </Card>
      </ScrollView>
    </SafeAreaContainer>
  );
}