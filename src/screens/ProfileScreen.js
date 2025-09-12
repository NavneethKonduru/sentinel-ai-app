import React, { useState } from "react";
import { ScrollView, Switch, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  SafeAreaContainer,
  HeaderWithBack,
  BackButton,
  BackButtonText,
  Title,
  Card,
  CardTitle,
  CardText,
  Button,
  ButtonText,
  Divider,
} from "../components/StyledComponents";
import styled from "styled-components/native";

const ProfileHeader = styled.View`
  align-items: center;
  padding: 24px;
  background-color: ${(props) => props.theme.card};
  margin: 16px;
  border-radius: 16px;
`;

const ProfileAvatar = styled.View`
  background-color: ${(props) => props.theme.primary};
  width: 100px;
  height: 100px;
  border-radius: 50px;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
`;

const ProfileName = styled.Text`
  font-family: "Inter-Bold";
  font-size: 24px;
  color: ${(props) => props.theme.textPrimary};
  margin-bottom: 8px;
`;

const ProfileEmail = styled.Text`
  font-family: "Inter-Regular";
  font-size: 16px;
  color: ${(props) => props.theme.textSecondary};
  margin-bottom: 16px;
`;

const StatsRow = styled.View`
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
`;

const StatItem = styled.View`
  align-items: center;
`;

const StatNumber = styled.Text`
  font-family: "Inter-Bold";
  font-size: 20px;
  color: ${(props) => props.theme.primary};
`;

const StatLabel = styled.Text`
  font-family: "Inter-Regular";
  font-size: 12px;
  color: ${(props) => props.theme.textSecondary};
  margin-top: 4px;
`;

const SettingItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
`;

const SettingLeft = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1;
`;

const SettingIcon = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${(props) => props.color || props.theme.primary};
  align-items: center;
  justify-content: center;
  margin-right: 16px;
`;

const SettingText = styled.Text`
  font-family: "Inter-Medium";
  font-size: 16px;
  color: ${(props) => props.theme.textPrimary};
  flex: 1;
`;

const ToggleRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
`;

const ToggleLabel = styled.Text`
  font-family: "Inter-Medium";
  font-size: 16px;
  color: ${(props) => props.theme.textPrimary};
  flex: 1;
`;

export default function ProfileScreen({ navigation }) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationSharing, setLocationSharing] = useState(true);
  const [emergencyAlerts, setEmergencyAlerts] = useState(true);

  const handleEditProfile = () => {
    Alert.alert("Edit Profile", "Profile editing feature coming soon!");
  };

  const handleEmergencyContacts = () => {
    Alert.alert("Emergency Contacts", "Manage your emergency contacts feature coming soon!");
  };

  const handlePrivacySettings = () => {
    Alert.alert("Privacy Settings", "Advanced privacy settings coming soon!");
  };

  const handleHelpSupport = () => {
    Alert.alert("Help & Support", "Contact support or view help documentation.");
  };

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Logout", 
          style: "destructive",
          onPress: () => Alert.alert("Logged Out", "You have been logged out successfully.")
        }
      ]
    );
  };

  return (
    <SafeAreaContainer>
      <HeaderWithBack>
        <BackButton onPress={() => navigation.goBack()}>
          <BackButtonText>← Back</BackButtonText>
        </BackButton>
        <Title>Profile</Title>
        <BackButton style={{ opacity: 0 }}>
          <BackButtonText>Back</BackButtonText>
        </BackButton>
      </HeaderWithBack>

      <ScrollView>
        {/* Profile Header */}
        <ProfileHeader>
          <ProfileAvatar>
            <Ionicons name="person" size={40} color="#FFFFFF" />
          </ProfileAvatar>
          
          <ProfileName>Sarah Johnson</ProfileName>
          <ProfileEmail>sarah.johnson@email.com</ProfileEmail>
          
          <StatsRow>
            <StatItem>
              <StatNumber>47</StatNumber>
              <StatLabel>Safe Trips</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>12</StatNumber>
              <StatLabel>Reports Made</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>4.9</StatNumber>
              <StatLabel>Safety Rating</StatLabel>
            </StatItem>
          </StatsRow>
        </ProfileHeader>

        {/* Account Settings */}
        <Card>
          <CardTitle>Account Settings</CardTitle>
          
          <SettingItem onPress={handleEditProfile}>
            <SettingLeft>
              <SettingIcon color="#1993F5">
                <Ionicons name="person-circle" size={20} color="#FFFFFF" />
              </SettingIcon>
              <SettingText>Edit Profile</SettingText>
            </SettingLeft>
            <Ionicons name="chevron-forward" size={20} color="#7C8491" />
          </SettingItem>
          
          <Divider />
          
          <SettingItem onPress={handleEmergencyContacts}>
            <SettingLeft>
              <SettingIcon color="#FF3B46">
                <Ionicons name="call" size={20} color="#FFFFFF" />
              </SettingIcon>
              <SettingText>Emergency Contacts</SettingText>
            </SettingLeft>
            <Ionicons name="chevron-forward" size={20} color="#7C8491" />
          </SettingItem>
          
          <Divider />
          
          <SettingItem onPress={handlePrivacySettings}>
            <SettingLeft>
              <SettingIcon color="#1FC667">
                <Ionicons name="shield-checkmark" size={20} color="#FFFFFF" />
              </SettingIcon>
              <SettingText>Privacy & Security</SettingText>
            </SettingLeft>
            <Ionicons name="chevron-forward" size={20} color="#7C8491" />
          </SettingItem>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardTitle>Notification Settings</CardTitle>
          
          <ToggleRow>
            <ToggleLabel>Push Notifications</ToggleLabel>
            <Switch
              trackColor={{ false: "#7C8491", true: "#1993F5" }}
              thumbColor="#FFFFFF"
              onValueChange={setNotificationsEnabled}
              value={notificationsEnabled}
            />
          </ToggleRow>
          
          <Divider />
          
          <ToggleRow>
            <ToggleLabel>Location Sharing</ToggleLabel>
            <Switch
              trackColor={{ false: "#7C8491", true: "#1993F5" }}
              thumbColor="#FFFFFF"
              onValueChange={setLocationSharing}
              value={locationSharing}
            />
          </ToggleRow>
          
          <Divider />
          
          <ToggleRow>
            <ToggleLabel>Emergency Alerts</ToggleLabel>
            <Switch
              trackColor={{ false: "#7C8491", true: "#1993F5" }}
              thumbColor="#FFFFFF"
              onValueChange={setEmergencyAlerts}
              value={emergencyAlerts}
            />
          </ToggleRow>
        </Card>

        {/* Support */}
        <Card>
          <CardTitle>Support & Information</CardTitle>
          
          <SettingItem onPress={handleHelpSupport}>
            <SettingLeft>
              <SettingIcon color="#FDBA1D">
                <Ionicons name="help-circle" size={20} color="#FFFFFF" />
              </SettingIcon>
              <SettingText>Help & Support</SettingText>
            </SettingLeft>
            <Ionicons name="chevron-forward" size={20} color="#7C8491" />
          </SettingItem>
          
          <Divider />
          
          <SettingItem onPress={() => Alert.alert("About", "Sentinel AI v1.0.0\nBuilt with ❤️ for your safety")}>
            <SettingLeft>
              <SettingIcon color="#7C8491">
                <Ionicons name="information-circle" size={20} color="#FFFFFF" />
              </SettingIcon>
              <SettingText>About Sentinel AI</SettingText>
            </SettingLeft>
            <Ionicons name="chevron-forward" size={20} color="#7C8491" />
          </SettingItem>
        </Card>

        {/* Logout */}
        <Card>
          <Button selected={false} onPress={handleLogout}>
            <ButtonText selected={false} style={{ color: "#FF3B46" }}>
              <Ionicons name="log-out" size={18} color="#FF3B46" /> Logout
            </ButtonText>
          </Button>
        </Card>

        {/* App Version */}
        <Card>
          <CardText style={{ textAlign: "center", fontSize: 12 }}>
            Sentinel AI v1.0.0{"\n"}
            © 2024 Sentinel Technologies
          </CardText>
        </Card>
      </ScrollView>
    </SafeAreaContainer>
  );
}