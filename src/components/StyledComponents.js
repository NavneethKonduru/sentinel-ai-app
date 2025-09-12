import { SafeAreaView } from 'react-native-safe-area-context';
import styled from "styled-components/native";

// UPDATED SAFE AREA CONTAINER
export const SafeAreaContainer = styled(SafeAreaView)`
  flex: 1;
  background-color: ${(props) => props.theme.background};
`;

// HEADER
export const Header = styled.View`
  height: 60px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-left: 20px;
  padding-right: 20px;
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.border};
`;

export const HeaderWithBack = styled.View`
  height: 60px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-left: 20px;
  padding-right: 20px;
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.border};
`;

export const LogoImage = styled.Image`
  width: 140px;
  height: 40px;
`;

export const Title = styled.Text`
  font-family: "Inter-SemiBold";
  font-size: 20px;
  color: ${(props) => props.theme.textPrimary};
  text-align: center;
`;

export const BackButton = styled.TouchableOpacity`
  padding: 8px;
`;

export const BackButtonText = styled.Text`
  font-family: "Inter-Medium";
  font-size: 16px;
  color: ${(props) => props.theme.primary};
`;

// MAP CONTAINER
export const MapContainer = styled.View`
  flex: 1;
  margin: 16px;
  border-radius: 16px;
  overflow: hidden;
  border-width: 1px;
  border-color: ${(props) => props.theme.border};
`;

// SOS BUTTON WITH ENHANCED STYLING
export const SOSButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 20px;
  align-self: center;
  background-color: ${(props) => props.theme.danger};
  width: 72px;
  height: 72px;
  border-radius: 36px;
  align-items: center;
  justify-content: center;
  shadow-color: ${(props) => props.theme.danger};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.3;
  shadow-radius: 8px;
  elevation: 8;
  z-index: 100;
`;

export const SOSButtonText = styled.Text`
  color: ${(props) => props.theme.softWhite};
  font-family: "Inter-Bold";
  font-size: 14px;
`;

// NOTIFICATION WIDGETS
export const NotificationWidget = styled.View`
  position: absolute;
  top: 80px;
  left: 16px;
  right: 16px;
  background-color: ${(props) => props.theme.card};
  border-radius: 12px;
  padding: 12px 16px;
  flex-direction: row;
  align-items: center;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.15;
  shadow-radius: 6px;
  elevation: 4;
  z-index: 50;
`;

export const CheckInTimer = styled.View`
  position: absolute;
  top: 20px;
  left: 20px;
  background-color: ${(props) => props.theme.primary};
  padding: 8px 12px;
  border-radius: 20px;
  flex-direction: row;
  align-items: center;
`;

export const CheckInText = styled.Text`
  color: ${(props) => props.theme.softWhite};
  font-family: "Inter-Medium";
  font-size: 12px;
  margin-left: 4px;
`;

// ENHANCED QUICK ACCESS ROW - FIXED LAYOUT
export const QuickAccessRow = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-top: 16px;
  margin-bottom: 16px;
  margin-left: 20px;
  margin-right: 20px;
  padding: 16px;
  background-color: ${(props) => props.theme.card};
  border-radius: 16px;
`;

export const QuickIconButton = styled.TouchableOpacity`
  align-items: center;
  flex: 1;
  max-width: 80px;
`;

export const QuickIconCircle = styled.View`
  background-color: ${(props) => props.theme.primary};
  width: 48px;
  height: 48px;
  border-radius: 24px;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
`;

export const QuickIconLabel = styled.Text`
  font-size: 11px;
  color: ${(props) => props.theme.textPrimary};
  font-family: "Inter-Medium";
  text-align: center;
  line-height: 14px;
`;

// SAFETY STATS ROW - PROPER FLEXBOX LAYOUT
export const SafetyStatsRow = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-horizontal: 20px;
  margin-vertical: 8px;
  padding: 12px;
  background-color: ${(props) => props.theme.surfaceLight};
  border-radius: 12px;
`;

export const StatItem = styled.View`
  align-items: center;
  flex: 1;
`;

export const StatIcon = styled.View`
  margin-bottom: 4px;
`;

export const StatText = styled.Text`
  color: ${(props) => props.theme.textSecondary};
  font-size: 10px;
  font-family: "Inter-Medium";
  text-align: center;
`;

// ROUTE SELECTOR
export const RouteSelector = styled.View`
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: ${(props) => props.theme.card};
  border-radius: 12px;
  padding: 8px;
  min-width: 120px;
`;

export const RouteOption = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 8px;
  border-radius: 8px;
  margin: 2px 0;
  background-color: ${(props) => props.selected ? props.theme.primary : 'transparent'};
`;

export const RouteColorDot = styled.View`
  width: 12px;
  height: 12px;
  border-radius: 6px;
  background-color: ${(props) => props.color};
  margin-right: 8px;
`;

export const RouteOptionText = styled.Text`
  font-family: "Inter-Medium";
  font-size: 12px;
  color: ${(props) => props.selected ? props.theme.softWhite : props.theme.textPrimary};
`;

// RISK BAR
export const RiskBarContainer = styled.View`
  position: absolute;
  bottom: 100px;
  right: 20px;
  flex-direction: row;
  background-color: ${(props) => props.theme.card};
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 12px;
  padding-right: 12px;
  border-radius: 20px;
`;

export const RiskSegment = styled.View`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  margin-left: 2px;
  margin-right: 2px;
  background-color: ${(props) => props.color};
`;

export const RiskText = styled.Text`
  font-family: "Inter-Medium";
  font-size: 12px;
  color: ${(props) => props.theme.textSecondary};
  margin-left: 8px;
`;

// GOOGLE MAPS INTEGRATION BUTTON
export const GoogleMapsButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 20px;
  right: 20px;
  background-color: ${(props) => props.theme.success};
  padding: 12px;
  border-radius: 25px;
  flex-direction: row;
  align-items: center;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.2;
  shadow-radius: 4px;
  elevation: 4;
`;

export const GoogleMapsText = styled.Text`
  color: ${(props) => props.theme.softWhite};
  font-family: "Inter-SemiBold";
  font-size: 12px;
  margin-left: 4px;
`;

// INPUT COMPONENTS
export const InputField = styled.TextInput`
  border-width: 1px;
  border-color: ${(props) => props.theme.border};
  border-radius: 12px;
  padding: 16px;
  margin-top: 8px;
  margin-bottom: 8px;
  color: ${(props) => props.theme.textPrimary};
  font-size: 16px;
  font-family: "Inter-Regular";
  background-color: ${(props) => props.theme.card};
`;

export const Button = styled.TouchableOpacity`
  background-color: ${(props) => props.selected ? props.theme.primary : props.theme.card};
  padding-top: 16px;
  padding-bottom: 16px;
  padding-left: 24px;
  padding-right: 24px;
  border-radius: 12px;
  margin: 8px;
  border-width: 1px;
  border-color: ${(props) => props.selected ? props.theme.primary : props.theme.border};
`;

export const ButtonText = styled.Text`
  color: ${(props) => props.selected ? props.theme.softWhite : props.theme.textPrimary};
  font-family: "Inter-SemiBold";
  font-size: 16px;
  text-align: center;
`;

// CARD COMPONENTS
export const Card = styled.View`
  background-color: ${(props) => props.theme.card};
  border-radius: 16px;
  padding: 16px;
  margin-top: 8px;
  margin-bottom: 8px;
  margin-left: 16px;
  margin-right: 16px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 3;
`;

export const CardTitle = styled.Text`
  font-family: "Inter-SemiBold";
  font-size: 18px;
  color: ${(props) => props.theme.textPrimary};
  margin-bottom: 8px;
`;

export const CardText = styled.Text`
  font-family: "Inter-Regular";
  font-size: 14px;
  color: ${(props) => props.theme.textSecondary};
  line-height: 20px;
`;

export const Badge = styled.View`
  background-color: ${(props) => props.color || props.theme.primary};
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 12px;
  padding-right: 12px;
  border-radius: 12px;
  align-self: flex-start;
`;

export const BadgeText = styled.Text`
  font-family: "Inter-Medium";
  font-size: 12px;
  color: ${(props) => props.theme.softWhite};
`;

export const Divider = styled.View`
  height: 1px;
  background-color: ${(props) => props.theme.border};
  margin-top: 16px;
  margin-bottom: 16px;
`;