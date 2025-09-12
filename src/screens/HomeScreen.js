import React, { useState, useEffect } from "react";
import { View, Text, Alert, Vibration, Linking, Dimensions } from "react-native";
import MapView, { Polyline, Circle, Marker, Polygon } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import {
  SafeAreaContainer,
  Header,
  LogoImage,
  MapContainer,
  SOSButton,
  SOSButtonText,
  QuickAccessRow,
  QuickIconButton,
  QuickIconCircle,
  QuickIconLabel,
  SafetyStatsRow,
  StatItem,
  StatIcon,
  StatText,
  RouteSelector,
  RouteOption,
  RouteColorDot,
  RouteOptionText,
  RiskBarContainer,
  RiskSegment,
  RiskText,
  GoogleMapsButton,
  GoogleMapsText,
  NotificationWidget,
  CheckInTimer,
  CheckInText,
} from "../components/StyledComponents";
import { mapStyles } from "../theme/colors";

const sentinelLogoUri = require("../../assets/Sentinel-AI-Logo.png");

// Enhanced mock safety data with multiple routes and comprehensive safety information
const mockSafetyData = {
  currentLocation: { latitude: 28.6139, longitude: 77.209 },
  
  // Three different AI-optimized routes
  routes: {
    safest: {
      coordinates: [
        { latitude: 28.6139, longitude: 77.209 },
        { latitude: 28.6129, longitude: 77.215 },
        { latitude: 28.6169, longitude: 77.225 },
        { latitude: 28.6189, longitude: 77.231 },
        { latitude: 28.6239, longitude: 77.229 },
      ],
      color: "#10B981",
      distance: "6.8 km",
      duration: "22 min",
      safetyScore: 95,
      name: "Safest"
    },
    balanced: {
      coordinates: [
        { latitude: 28.6139, longitude: 77.209 },
        { latitude: 28.6159, longitude: 77.214 },
        { latitude: 28.6189, longitude: 77.219 },
        { latitude: 28.6219, longitude: 77.224 },
        { latitude: 28.6239, longitude: 77.229 },
      ],
      color: "#FBBF24",
      distance: "5.8 km", 
      duration: "18 min",
      safetyScore: 85,
      name: "Balanced"
    },
    fastest: {
      coordinates: [
        { latitude: 28.6139, longitude: 77.209 },
        { latitude: 28.6179, longitude: 77.211 },
        { latitude: 28.6199, longitude: 77.215 },
        { latitude: 28.6229, longitude: 77.221 },
        { latitude: 28.6239, longitude: 77.229 },
      ],
      color: "#3B82F6",
      distance: "4.9 km",
      duration: "14 min", 
      safetyScore: 72,
      name: "Fastest"
    }
  },

  selectedRoute: "balanced",
  riskLevel: "medium",

  // Enhanced incident data with precise locations
  incidents: [
    { 
      latitude: 28.6159, 
      longitude: 77.214, 
      type: "harassment",
      severity: "high",
      time: "2 hours ago",
      description: "Inappropriate behavior reported"
    },
    { 
      latitude: 28.6219, 
      longitude: 77.224, 
      type: "poor_lighting",
      severity: "medium",
      time: "1 day ago",
      description: "Street lights not functioning"
    },
    { 
      latitude: 28.6189, 
      longitude: 77.216, 
      type: "theft",
      severity: "high",
      time: "3 hours ago",
      description: "Phone snatching incident"
    }
  ],

  // Well-lit areas as polygons/zones
  wellLitAreas: [
    {
      id: 1,
      coordinates: [
        { latitude: 28.6125, longitude: 77.208 },
        { latitude: 28.6145, longitude: 77.208 },
        { latitude: 28.6145, longitude: 77.218 },
        { latitude: 28.6125, longitude: 77.218 },
      ]
    },
    {
      id: 2,
      coordinates: [
        { latitude: 28.6175, longitude: 77.220 },
        { latitude: 28.6195, longitude: 77.220 },
        { latitude: 28.6195, longitude: 77.230 },
        { latitude: 28.6175, longitude: 77.230 },
      ]
    }
  ],

  // Safety infrastructure points
  safetyPoints: [
    { latitude: 28.6179, longitude: 77.217, type: "police", name: "Police Station", description: "24/7 Active" },
    { latitude: 28.6199, longitude: 77.222, type: "safe_zone", name: "Well-lit Shopping Area", description: "CCTV Coverage: 95%" },
    { latitude: 28.6149, longitude: 77.211, type: "hospital", name: "City Hospital", description: "Emergency Services" },
    { latitude: 28.6229, longitude: 77.226, type: "metro", name: "Metro Station", description: "High Security Zone" }
  ],

  // Current safety features
  safetyFeatures: {
    cctvCoverage: 85,
    lighting: 70,
    policePresence: 60,
    crowdDensity: "moderate"
  },

  // Nearby buddies
  nearbyBuddies: [
    { latitude: 28.6149, longitude: 77.210, name: "Priya S.", distance: "200m", status: "active" },
    { latitude: 28.6229, longitude: 77.225, name: "Arjun P.", distance: "800m", status: "active" }
  ],

  // Nearest safe point (dynamic)
  nearestSafePoint: { latitude: 28.6179, longitude: 77.217, type: "police", distance: "300m" }
};

export default function HomeScreen({ navigation }) {
  const [isSOSPressed, setIsSOSPressed] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState("balanced");
  const [checkInTimer, setCheckInTimer] = useState(900); // 15 minutes in seconds
  const [showRouteSelector, setShowRouteSelector] = useState(false);
  const [currentNotification, setCurrentNotification] = useState(null);

  // Check-in timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setCheckInTimer(prev => {
        if (prev <= 0) {
          handleAutomaticCheckIn();
          return 900; // Reset to 15 minutes
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSOSPress = () => {
    Vibration.vibrate([0, 500, 200, 500]);
    setIsSOSPressed(true);
    
    Alert.alert(
      "🚨 EMERGENCY ALERT",
      "Send immediate SOS to emergency contacts and nearby authorities?",
      [
        { 
          text: "Cancel", 
          style: "cancel",
          onPress: () => setIsSOSPressed(false)
        },
        { 
          text: "SEND SOS", 
          style: "destructive",
          onPress: () => {
            sendSOSAlert();
            Alert.alert(
              "🚨 SOS SENT", 
              "✅ Emergency contacts notified\n📍 Location shared with trusted contacts\n🚔 Nearby authorities alerted\n👥 Buddy network activated",
              [{ text: "OK", onPress: () => setIsSOSPressed(false) }]
            );
          }
        },
      ]
    );
  };

  const sendSOSAlert = () => {
    // Implementation for SOS functionality
    console.log("SOS Alert sent to emergency contacts and authorities");
    setCurrentNotification({
      type: "sos",
      message: "SOS sent successfully. Help is on the way.",
      timestamp: new Date()
    });
  };

  const handleAutomaticCheckIn = () => {
    setCurrentNotification({
      type: "checkin",
      message: "Automatic safety check-in completed. You're doing great!",
      timestamp: new Date()
    });
  };

  const handleQuickReport = () => {
    Alert.alert(
      "🚨 Quick Report",
      "What would you like to report?",
      [
        { text: "Harassment", onPress: () => reportIncident("harassment") },
        { text: "Poor Lighting", onPress: () => reportIncident("lighting") },
        { text: "Suspicious Activity", onPress: () => reportIncident("suspicious") },
        { text: "Safe Area", onPress: () => reportIncident("safe") },
        { text: "Infrastructure Issue", onPress: () => reportIncident("infrastructure") },
        { text: "Cancel", style: "cancel" }
      ]
    );
  };

  const reportIncident = (type) => {
    Alert.alert(
      "✅ Report Submitted", 
      `Thank you for reporting ${type}. This helps keep our community safe!\n\nReport ID: #${Math.random().toString(36).substr(2, 9).toUpperCase()}`
    );
    setCurrentNotification({
      type: "report",
      message: `Your ${type} report has been submitted and verified by AI.`,
      timestamp: new Date()
    });
  };

  const handleRouteSelect = (routeType) => {
    setSelectedRoute(routeType);
    setShowRouteSelector(false);
    setCurrentNotification({
      type: "route",
      message: `Switched to ${routeType} route. Navigation updated.`,
      timestamp: new Date()
    });
  };

  const openInGoogleMaps = () => {
    const route = mockSafetyData.routes[selectedRoute];
    const waypoints = route.coordinates
      .slice(1, -1)
      .map(coord => `${coord.latitude},${coord.longitude}`)
      .join('|');
    
    const origin = `${route.coordinates[0].latitude},${route.coordinates[0].longitude}`;
    const destination = `${route.coordinates[route.coordinates.length - 1].latitude},${route.coordinates[route.coordinates.length - 1].longitude}`;
    
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&waypoints=${waypoints}&travelmode=walking`;
    
    Alert.alert(
      "🗺️ Open in Google Maps",
      `Open your ${selectedRoute} AI-optimized route in Google Maps?`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Open", onPress: () => Linking.openURL(googleMapsUrl) }
      ]
    );
  };

  const getRiskColor = () => {
    switch (mockSafetyData.riskLevel) {
      case "safe": return "#10B981";
      case "medium": return "#FBBF24";
      case "high": return "#EF4444";
      default: return "#94A3B8";
    }
  };

  const getRiskText = () => {
    switch (mockSafetyData.riskLevel) {
      case "safe": return "Safe Zone";
      case "medium": return "Moderate Risk";
      case "high": return "High Risk";
      default: return "Unknown";
    }
  };

  const getIncidentIcon = (type) => {
    switch (type) {
      case "harassment": return "warning";
      case "theft": return "lock-closed";
      case "poor_lighting": return "bulb-outline";
      default: return "alert-circle";
    }
  };

  const getSafetyPointIcon = (type) => {
    switch (type) {
      case "police": return "shield-checkmark";
      case "hospital": return "medical";
      case "metro": return "train";
      case "safe_zone": return "checkmark-circle";
      default: return "location";
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <SafeAreaContainer>
      <Header>
        <LogoImage source={sentinelLogoUri} resizeMode="contain" />
      </Header>
      
      <MapContainer>
        <MapView
          style={{ flex: 1 }}
          customMapStyle={mapStyles.dark}
          initialRegion={{
            latitude: mockSafetyData.currentLocation.latitude,
            longitude: mockSafetyData.currentLocation.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
          showsUserLocation={true}
          showsMyLocationButton={false}
        >
          {/* Display all three routes simultaneously */}
          {Object.entries(mockSafetyData.routes).map(([key, route]) => (
            <Polyline
              key={key}
              coordinates={route.coordinates}
              strokeColor={route.color}
              strokeWidth={selectedRoute === key ? 6 : 4}
              strokePattern={selectedRoute === key ? undefined : [10, 5]}
            />
          ))}

          {/* Well-lit areas as polygons */}
          {mockSafetyData.wellLitAreas.map((area) => (
            <Polygon
              key={area.id}
              coordinates={area.coordinates}
              fillColor="rgba(16, 185, 129, 0.2)"
              strokeColor="#10B981"
              strokeWidth={2}
            />
          ))}

          {/* Current location with safety circle */}
          <Circle
            center={mockSafetyData.currentLocation}
            radius={200}
            fillColor={`${getRiskColor()}20`}
            strokeColor={getRiskColor()}
            strokeWidth={2}
          />

          {/* Incident markers */}
          {mockSafetyData.incidents.map((incident, index) => (
            <Marker
              key={`incident-${index}`}
              coordinate={incident}
              title={incident.type.replace('_', ' ').toUpperCase()}
              description={`${incident.severity} • ${incident.time} • ${incident.description}`}
            >
              <View style={{
                backgroundColor: incident.severity === 'high' ? '#EF4444' : '#FBBF24',
                padding: 8,
                borderRadius: 20,
              }}>
                <Ionicons 
                  name={getIncidentIcon(incident.type)} 
                  size={16} 
                  color="#FFFFFF" 
                />
              </View>
            </Marker>
          ))}

          {/* Safety points markers */}
          {mockSafetyData.safetyPoints.map((point, index) => (
            <Marker
              key={`safety-${index}`}
              coordinate={point}
              title={point.name}
              description={point.description}
            >
              <View style={{
                backgroundColor: '#10B981',
                padding: 8,
                borderRadius: 20,
              }}>
                <Ionicons 
                  name={getSafetyPointIcon(point.type)} 
                  size={16} 
                  color="#FFFFFF" 
                />
              </View>
            </Marker>
          ))}

          {/* Nearby buddies */}
          {mockSafetyData.nearbyBuddies.map((buddy, index) => (
            <Marker
              key={`buddy-${index}`}
              coordinate={buddy}
              title={`Buddy: ${buddy.name}`}
              description={`Distance: ${buddy.distance} • Status: ${buddy.status}`}
            >
              <View style={{
                backgroundColor: '#EC4899',
                padding: 8,
                borderRadius: 20,
              }}>
                <Ionicons name="person" size={16} color="#FFFFFF" />
              </View>
            </Marker>
          ))}

          {/* Nearest safe point highlight */}
          <Circle
            center={mockSafetyData.nearestSafePoint}
            radius={100}
            fillColor="rgba(16, 185, 129, 0.3)"
            strokeColor="#10B981"
            strokeWidth={3}
            strokePattern={[5, 5]}
          />
        </MapView>

        {/* Check-in timer widget */}
        <CheckInTimer>
          <Ionicons name="timer-outline" size={16} color="#FFFFFF" />
          <CheckInText>Next check-in: {formatTime(checkInTimer)}</CheckInText>
        </CheckInTimer>

        {/* Route selector */}
        <RouteSelector>
          <RouteOption onPress={() => setShowRouteSelector(!showRouteSelector)}>
            <RouteColorDot color={mockSafetyData.routes[selectedRoute].color} />
            <RouteOptionText selected={false}>
              {mockSafetyData.routes[selectedRoute].name} Route
            </RouteOptionText>
          </RouteOption>
          
          {showRouteSelector && (
            <>
              {Object.entries(mockSafetyData.routes).map(([key, route]) => (
                <RouteOption 
                  key={key}
                  selected={selectedRoute === key}
                  onPress={() => handleRouteSelect(key)}
                >
                  <RouteColorDot color={route.color} />
                  <RouteOptionText selected={selectedRoute === key}>
                    {route.name} ({route.duration})
                  </RouteOptionText>
                </RouteOption>
              ))}
            </>
          )}
        </RouteSelector>

        {/* Risk indicator */}
        <RiskBarContainer>
          <RiskSegment color={getRiskColor()} />
          <RiskSegment color={mockSafetyData.riskLevel !== "safe" ? getRiskColor() : "#64748B"} />
          <RiskSegment color={mockSafetyData.riskLevel === "high" ? getRiskColor() : "#64748B"} />
          <RiskText>{getRiskText()}</RiskText>
        </RiskBarContainer>

        {/* SOS Button */}
        <SOSButton 
          onPress={handleSOSPress}
          style={{ 
            backgroundColor: isSOSPressed ? "#DC2626" : "#EF4444",
            transform: isSOSPressed ? [{ scale: 1.1 }] : [{ scale: 1 }]
          }}
        >
          <SOSButtonText>SOS</SOSButtonText>
        </SOSButton>

        {/* Google Maps integration button */}
        <GoogleMapsButton onPress={openInGoogleMaps}>
          <Ionicons name="map" size={16} color="#FFFFFF" />
          <GoogleMapsText>Google Maps</GoogleMapsText>
        </GoogleMapsButton>

        {/* Notification widget */}
        {currentNotification && (
          <NotificationWidget>
            <Ionicons 
              name={
                currentNotification.type === 'sos' ? 'alert-circle' :
                currentNotification.type === 'checkin' ? 'checkmark-circle' :
                currentNotification.type === 'route' ? 'map' : 'information-circle'
              } 
              size={20} 
              color="#3B82F6" 
            />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={{ 
                fontFamily: 'Inter-SemiBold', 
                fontSize: 14, 
                color: '#1E293B' 
              }}>
                {currentNotification.message}
              </Text>
            </View>
            <Text style={{ 
              fontSize: 12, 
              color: '#64748B',
              fontFamily: 'Inter-Regular'
            }}>
              {formatTime((new Date() - currentNotification.timestamp) / 1000)}s ago
            </Text>
          </NotificationWidget>
        )}
      </MapContainer>

      {/* Enhanced Quick Access Menu */}
      <QuickAccessRow>
        <QuickIconButton onPress={() => navigation.navigate("SafeRoute")}>
          <QuickIconCircle>
            <Ionicons name="map" size={24} color="#FFFFFF" />
          </QuickIconCircle>
          <QuickIconLabel>AI Safe Route</QuickIconLabel>
        </QuickIconButton>

        <QuickIconButton onPress={() => navigation.navigate("Buddy")}>
          <QuickIconCircle style={{ backgroundColor: "#EC4899" }}>
            <Ionicons name="people" size={24} color="#FFFFFF" />
          </QuickIconCircle>
          <QuickIconLabel>Find Buddy</QuickIconLabel>
        </QuickIconButton>

        <QuickIconButton onPress={handleQuickReport}>
          <QuickIconCircle style={{ backgroundColor: "#FBBF24" }}>
            <Ionicons name="alert-circle" size={24} color="#FFFFFF" />
          </QuickIconCircle>
          <QuickIconLabel>Quick Report</QuickIconLabel>
        </QuickIconButton>

        <QuickIconButton onPress={handleSOSPress}>
          <QuickIconCircle style={{ backgroundColor: "#EF4444" }}>
            <Ionicons name="call" size={24} color="#FFFFFF" />
          </QuickIconCircle>
          <QuickIconLabel>Emergency</QuickIconLabel>
        </QuickIconButton>
      </QuickAccessRow>

      {/* Enhanced Safety Stats Row - Proper Layout */}
      <SafetyStatsRow>
        <StatItem>
          <StatIcon>
            <Ionicons name="videocam" size={16} color="#10B981" />
          </StatIcon>
          <StatText>CCTV: {mockSafetyData.safetyFeatures.cctvCoverage}%</StatText>
        </StatItem>
        
        <StatItem>
          <StatIcon>
            <Ionicons name="bulb" size={16} color="#FBBF24" />
          </StatIcon>
          <StatText>Lighting: {mockSafetyData.safetyFeatures.lighting}%</StatText>
        </StatItem>
        
        <StatItem>
          <StatIcon>
            <Ionicons name="shield-checkmark" size={16} color="#3B82F6" />
          </StatIcon>
          <StatText>Police: {mockSafetyData.safetyFeatures.policePresence}%</StatText>
        </StatItem>
        
        <StatItem>
          <StatIcon>
            <Ionicons name="people" size={16} color="#EC4899" />
          </StatIcon>
          <StatText>Crowd: {mockSafetyData.safetyFeatures.crowdDensity}</StatText>
        </StatItem>
      </SafetyStatsRow>
    </SafeAreaContainer>
  );
}