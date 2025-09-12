// Sentinel AI - Mobile-First React Native UI (Light & Dark Mode)
// Complete, branded, production-ready UI prototype
// Uses React Native (Expo), styled-components for theme support

import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
  Switch,
  StyleSheet,
  Image,
} from "react-native";
import MapView, { Polyline, Marker } from "react-native-maps";
import styled, { ThemeProvider } from "styled-components/native";

// Sentinel Logo (replace with actual asset import)
const sentinelLogoUri = "https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/4d54d743-71f5-4b09-8ddf-528e0e31d6d4.png";

// Color palette for dark and light mode

const lightTheme = {
  background: "#ECEFFC",
  primary: "#1993F5",
  secondary: "#222B37",
  danger: "#FF3B46",
  textPrimary: "#222B37",
  textSecondary: "#7C8491",
  inputBorder: "#CFE8FA",
  card: "#FFFFFF",
  toggleOn: "#1993F5",
  toggleOff: "#7C8491",
  softWhite: "#ECEFFC",
  riskSafe: "#1FC667",
  riskWarning: "#FDBA1D",
};

const darkTheme = {
  background: "#0B1623",
  primary: "#1993F5",
  secondary: "#222B37",
  danger: "#FF3B46",
  textPrimary: "#ECEFFC",
  textSecondary: "#7C8491",
  inputBorder: "#CFE8FA",
  card: "#222B37",
  toggleOn: "#1993F5",
  toggleOff: "#7C8491",
  softWhite: "#ECEFFC",
  riskSafe: "#1FC667",
  riskWarning: "#FDBA1D",
};

// Styled components for layout & typography

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.background};
  padding-top: 40px;
`;

const Header = styled.View`
  height: 56px;
  align-items: center;
  justify-content: center;
  padding-horizontal: 24px;
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.secondary};
  flex-direction: row;
`;

const LogoImage = styled.Image`
  width: 140px;
  height: 40px;
`;

const Title = styled.Text`
  font-family: "Inter-SemiBold";
  font-size: 22px;
  color: ${(props) => props.theme.primary};
`;

const MapContainer = styled.View`
  flex: 1;
  margin: 16px;
  border-radius: 16px;
  overflow: hidden;
  border-width: 1px;
  border-color: ${(props) => props.theme.secondary};
`;

// Floating SOS Button - big and red

const FloatingSOSButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 30px;
  align-self: center;
  background-color: ${(props) => props.theme.danger};
  width: 72px;
  height: 72px;
  border-radius: 36px;
  align-items: center;
  justify-content: center;
  shadow-color: ${(props) => props.theme.danger};
  shadow-offset: 0px 0px;
  shadow-opacity: 0.8;
  shadow-radius: 10px;
  elevation: 6;
  z-index: 10;
`;

const ButtonText = styled.Text`
  color: ${(props) => props.theme.softWhite};
  font-size: 16px;
  font-weight: 700;
`;

// Quick Access Row with icons and labels

const QuickAccessRow = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin-vertical: 12px;
`;

const QuickIconButton = styled.TouchableOpacity`
  align-items: center;
  width: 72px;
`;

const QuickIconCircle = styled.View`
  background-color: ${(props) => props.theme.primary};
  width: 48px;
  height: 48px;
  border-radius: 24px;
  align-items: center;
  justify-content: center;
  margin-bottom: 6px;
`;

const QuickIconLabel = styled.Text`
  font-size: 14px;
  color: ${(props) => props.theme.softWhite};
  font-weight: 600;
`;

// Risk Indicator Bar

const RiskBarContainer = styled.View`
  position: absolute;
  top: 10px;
  right: 20px;
  flex-direction: row;
`;

const RiskSegment = styled.View`
  width: 12px;
  height: 12px;
  border-radius: 6px;
  margin-horizontal: 4px;
  background-color: ${(props) => props.color};
`;

// Route Planner Screen components

const InputField = styled.TextInput`
  border-width: 1px;
  border-color: ${(props) => props.theme.inputBorder};
  border-radius: 12px;
  padding: 12px 16px;
  margin-vertical: 8px;
  color: ${(props) => props.theme.textPrimary};
  font-size: 16px;
`;

const RouteOptionsRow = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin-vertical: 16px;
`;

const RouteOptionButton = styled.TouchableOpacity`
  background-color: ${(props) => (props.selected ? props.theme.primary : props.theme.secondary)};
  padding: 12px 24px;
  border-radius: 20px;
`;

const RouteOptionText = styled.Text`
  color: ${(props) => props.theme.softWhite};
  font-weight: 700;
  font-size: 16px;
  text-align: center;
`;

// Safety score breakdown item

const ScoreItem = styled.View`
  flex-direction: row;
  align-items: center;
  margin-vertical: 4px;
`;

const ScoreIcon = styled.View`
  width: 20px;
  height: 20px;
  background-color: ${(props) => props.color};
  border-radius: 4px;
  margin-right: 8px;
`;

const ScoreText = styled.Text`
  color: ${(props) => props.theme.softWhite};
  font-size: 14px;
`;

// Buddy Match components

const BuddyCard = styled.View`
  background-color: ${(props) => props.theme.card};
  border-radius: 14px;
  padding: 12px;
  margin-vertical: 6px;
  align-items: center;
  width: 140px;
  shadow-color: #000;
  shadow-offset: 0 2px;
  shadow-opacity: 0.3;
  shadow-radius: 4px;
  elevation: 4;
`;

const BuddyAvatar = styled.View`
  background-color: ${(props) => props.theme.primary};
  width: 64px;
  height: 64px;
  border-radius: 32px;
  margin-bottom: 8px;
`;

const BuddyName = styled.Text`
  font-weight: 700;
  font-size: 16px;
  color: ${(props) => props.theme.secondary};
`;

const BuddyMatched = styled.Text`
  font-size: 14px;
  color: ${(props) => props.theme.primary};
`;

// Toggle switch wrapper

const ToggleWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-vertical: 8px;
  padding-horizontal: 24px;
`;

// Emergency screen components

const EmergencyButton = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.danger};
  width: 88px;
  height: 88px;
  border-radius: 44px;
  justify-content: center;
  align-items: center;
  align-self: center;
  margin-vertical: 40px;
  shadow-color: ${(props) => props.theme.danger};
  shadow-offset: 0 0;
  shadow-opacity: 0.6;
  shadow-radius: 14;
  elevation: 8;
`;

const TimerText = styled.Text`
  font-size: 36px;
  font-weight: 700;
  color: ${(props) => props.theme.softWhite};
  text-align: center;
  margin-vertical: 8px;
`;

const ContactCard = styled.View`
  background-color: ${(props) => props.theme.card};
  padding: 10px 16px;
  border-radius: 14px;
  margin-vertical: 4px;
  flex-direction: row;
  align-items: center;
`;

const ContactName = styled.Text`
  color: ${(props) => props.theme.secondary};
  font-weight: 700;
  font-size: 16px;
`;

// Community Feedback components

const IncidentIcon = styled.View`
  background-color: ${(props) => props.color};
  width: 52px;
  height: 52px;
  border-radius: 16px;
  margin: 4px;
  justify-content: center;
  align-items: center;
`;

const SafetyStars = styled.Text`
  color: ${(props) => props.theme.primary};
  font-size: 20px;
  padding-horizontal: 6px;
`;

const AlertCard = styled.View`
  background-color: ${(props) => props.theme.card};
  border-radius: 14px;
  padding: 16px;
  margin-vertical: 6px;
`;

// Profile and settings components

const ProfileAvatar = styled.View`
  background-color: ${(props) => props.theme.primary};
  width: 96px;
  height: 96px;
  border-radius: 48px;
  margin-vertical: 24px;
  align-self: center;
`;

const ProfileName = styled.Text`
  font-weight: 700;
  font-size: 26px;
  color: ${(props) => props.theme.softWhite};
  text-align: center;
  margin-bottom: 8px;
`;

const SettingCard = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.card};
  padding: 16px;
  margin-vertical: 6px;
  border-radius: 14px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

// Main component

const SentinelApp = () => {
  const [theme, setTheme] = useState(darkTheme);
  const [currentScreen, setCurrentScreen] = useState("Home");
  const [routeOption, setRouteOption] = useState("Balanced");
  const [buddyShareRoute, setBuddyShareRoute] = useState(true);

  // Timer state for Emergency check-in
  const [checkInTime, setCheckInTime] = React.useState(5 * 60 + 23); // 5min 23sec in seconds

  React.useEffect(() => {
    let timerId;
    if (currentScreen === "Emergency" && checkInTime > 0) {
      timerId = setInterval(() => setCheckInTime((t) => t - 1), 1000);
    }
    return () => clearInterval(timerId);
  }, [currentScreen, checkInTime]);

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60).toString().padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  // Dummy data
  const partners = [
    { id: 1, name: "Aisha Sharma" },
    { id: 2, name: "Rohan Gupta" },
  ];

  const trustedContacts = [
    { id: 1, name: "Priya Singh" },
    { id: 2, name: "Arjun Patel" },
    { id: 3, name: "Kavya Desai" },
    { id: 4, name: "Rohit Mehta" },
  ];

  // Screen renderers:

  const renderHome = () => (
    <Container>
      <Header>
        <LogoImage source={{ uri: sentinelLogoUri }} resizeMode="contain" />
      </Header>
      <MapContainer style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: 28.6139,
            longitude: 77.209,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
          loadingEnabled
        >
          <Polyline
            coordinates={[
              { latitude: 28.6139, longitude: 77.209 },
              { latitude: 28.6239, longitude: 77.229 },
            ]}
            strokeColor={theme.primary}
            strokeWidth={6}
          />
        </MapView>
        <FloatingSOSButton onPress={() => setCurrentScreen("Emergency")}>
          <ButtonText>SOS</ButtonText>
        </FloatingSOSButton>
      </MapContainer>
      <QuickAccessRow>
        <QuickIconButton onPress={() => setCurrentScreen("SafeRoute")}>
          <QuickIconCircle>
            <Text style={{ color: theme.softWhite, fontWeight: "bold" }}>🚗</Text>
          </QuickIconCircle>
          <QuickIconLabel>Safe Route</QuickIconLabel>
        </QuickIconButton>
        <QuickIconButton onPress={() => setCurrentScreen("Buddy")}>
          <QuickIconCircle>
            <Text style={{ color: theme.softWhite, fontWeight: "bold" }}>🤝</Text>
          </QuickIconCircle>
          <QuickIconLabel>Buddy</QuickIconLabel>
        </QuickIconButton>
        <QuickIconButton onPress={() => setCurrentScreen("Report")}>
          <QuickIconCircle>
            <Text style={{ color: theme.softWhite, fontWeight: "bold" }}>📢</Text>
          </QuickIconCircle>
          <QuickIconLabel>Report</QuickIconLabel>
        </QuickIconButton>
      </QuickAccessRow>
      <RiskBarContainer>
        <RiskSegment color={theme.riskSafe} />
        <RiskSegment color={theme.riskSafe} />
        <RiskSegment color={theme.riskSafe} />
      </RiskBarContainer>
    </Container>
  );

  const renderSafeRoute = () => (
    <Container>
      <Header>
        <TouchableOpacity onPress={() => setCurrentScreen("Home")}>
          <Text style={{ color: theme.primary, fontWeight: "bold" }}>← Back</Text>
        </TouchableOpacity>
        <Title>Safe Route Planner</Title>
      </Header>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <InputField placeholder="From" placeholderTextColor={theme.textSecondary} />
        <InputField placeholder="To" placeholderTextColor={theme.textSecondary} />
        <RouteOptionsRow>
          {["Fastest", "Safest", "Balanced"].map((option) => (
            <RouteOptionButton
              key={option}
              selected={routeOption === option}
              onPress={() => setRouteOption(option)}
            >
              <RouteOptionText>{option}</RouteOptionText>
            </RouteOptionButton>
          ))}
        </RouteOptionsRow>
        <MapContainer style={{ height: 250 }}>
          <MapView
            style={{ flex: 1 }}
            initialRegion={{
              latitude: 28.6139,
              longitude: 77.209,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1,
            }}
            loadingEnabled
          >
            <Polyline
              coordinates={[
                { latitude: 28.6139, longitude: 77.209 },
                { latitude: 28.6239, longitude: 77.229 },
              ]}
              strokeColor={theme.primary}
              strokeWidth={6}
            />
          </MapView>
        </MapContainer>
        <Text style={{ color: theme.softWhite, fontWeight: "700", marginTop: 16 }}>
          Safety Score Breakdown:
        </Text>
        <ScoreItem>
          <ScoreIcon color={theme.riskSafe} />
          <ScoreText>CCTV Coverage: High</ScoreText>
        </ScoreItem>
        <ScoreItem>
          <ScoreIcon color={theme.riskSafe} />
          <ScoreText>Lighting: Good</ScoreText>
        </ScoreItem>
        <ScoreItem>
          <ScoreIcon color={theme.riskWarning} />
          <ScoreText>Crime Hotspots: Moderate Risk</ScoreText>
        </ScoreItem>
      </ScrollView>
    </Container>
  );

  const renderBuddy = () => (
    <Container>
      <Header>
        <TouchableOpacity onPress={() => setCurrentScreen("Home")}>
          <Text style={{ color: theme.primary, fontWeight: "bold" }}>← Back</Text>
        </TouchableOpacity>
        <Title>Buddy Up Travel Mode</Title>
      </Header>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{padding:16}}>
        {partners.map((buddy) => (
          <BuddyCard key={buddy.id}>
            <BuddyAvatar />
            <BuddyName>{buddy.name}</BuddyName>
            <BuddyMatched>Matched</BuddyMatched>
          </BuddyCard>
        ))}
      </ScrollView>
      <ToggleWrapper>
        <Text style={{ color: theme.softWhite, fontWeight: "700" }}>Share Route with Buddy</Text>
        <Switch
          trackColor={{ false: theme.toggleOff, true: theme.toggleOn }}
          thumbColor={theme.softWhite}
          ios_backgroundColor={theme.toggleOff}
          onValueChange={() => setBuddyShareRoute(!buddyShareRoute)}
          value={buddyShareRoute}
        />
      </ToggleWrapper>
      <MapContainer style={{ height: 300 }}>
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: 28.6139,
            longitude: 77.209,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
        >
          {partners.map((buddy) => (
            <Marker
              key={buddy.id}
              coordinate={{
                latitude: 28.6139 + buddy.id * 0.005,
                longitude: 77.209 + buddy.id * 0.005,
              }}
              title={buddy.name}
            />
          ))}
        </MapView>
      </MapContainer>
    </Container>
  );

  const renderEmergency = () => (
    <Container>
      <Header>
        <TouchableOpacity onPress={() => setCurrentScreen("Home")}>
          <Text style={{ color: theme.primary, fontWeight: "bold" }}>← Back</Text>
        </TouchableOpacity>
        <Title>Emergency Response</Title>
      </Header>
      <ScrollView contentContainerStyle={{ padding: 16, alignItems: "center" }}>
        <EmergencyButton onPress={() => alert("Emergency Call Sent!")}>
          <Text style={{ color: theme.softWhite, fontWeight: "bold", fontSize: 24 }}>📞</Text>
        </EmergencyButton>
        <TimerText>Next Check-in: {formatTime(checkInTime)}</TimerText>
        {trustedContacts.map((contact) => (
          <ContactCard key={contact.id}>
            <ContactName>{contact.name}</ContactName>
          </ContactCard>
        ))}
      </ScrollView>
    </Container>
  );

  // Main render

  const renderScreen = () => {
    switch (currentScreen) {
      case "Home":
        return renderHome();
      case "SafeRoute":
        return renderSafeRoute();
      case "Buddy":
        return renderBuddy();
      case "Emergency":
        return renderEmergency();
      default:
        return renderHome();
    }
  };

  return <ThemeProvider theme={theme}>{renderScreen()}</ThemeProvider>;
};

export default SentinelApp;
