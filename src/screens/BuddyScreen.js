import React, { useState } from "react";
import { ScrollView, Alert, FlatList, View, Text, Switch, TouchableOpacity } from "react-native";
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
  Badge,
  BadgeText,
  Divider,
} from "../components/StyledComponents";
import styled from "styled-components/native";

const BuddyCard = styled.View`
  background-color: ${(props) => props.theme.card};
  border-radius: 16px;
  padding: 16px;
  margin: 8px;
  flex-direction: row;
  align-items: center;
  shadow-color: #000;
  shadow-offset: 0 2px;
  shadow-opacity: 0.15;
  shadow-radius: 6px;
  elevation: 4;
  border-left-width: 4px;
  border-left-color: ${(props) => props.online ? "#10B981" : "#94A3B8"};
`;

const BuddyAvatar = styled.View`
  background-color: ${(props) => props.online ? "#EC4899" : "#94A3B8"};
  width: 60px;
  height: 60px;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
`;

const BuddyInfo = styled.View`
  flex: 1;
`;

const BuddyName = styled.Text`
  font-family: "Inter-SemiBold";
  font-size: 16px;
  color: ${(props) => props.theme.textPrimary};
  margin-bottom: 4px;
`;

const BuddyStatus = styled.Text`
  font-family: "Inter-Regular";
  font-size: 14px;
  color: ${(props) => props.theme.textSecondary};
  margin-bottom: 8px;
`;

const SafetyScoreCircle = styled.View`
  width: 36px;
  height: 36px;
  border-radius: 18px;
  background-color: ${(props) => props.color};
  align-items: center;
  justify-content: center;
  margin-left: 8px;
`;

const SafetyScoreText = styled.Text`
  color: #FFFFFF;
  font-family: "Inter-Bold";
  font-size: 12px;
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

const WomenSafetyFeature = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 12px;
  background-color: ${(props) => props.theme.surfaceLight};
  border-radius: 12px;
  margin: 4px 0;
`;

const FeatureIcon = styled.View`
  background-color: ${(props) => props.color};
  padding: 8px;
  border-radius: 20px;
  margin-right: 12px;
`;

const FeatureInfo = styled.View`
  flex: 1;
`;

const FeatureTitle = styled.Text`
  font-family: "Inter-SemiBold";
  font-size: 14px;
  color: ${(props) => props.theme.textPrimary};
  margin-bottom: 2px;
`;

const FeatureDescription = styled.Text`
  font-family: "Inter-Regular";
  font-size: 12px;
  color: ${(props) => props.theme.textSecondary};
  line-height: 16px;
`;

// Enhanced mock data with comprehensive safety features
const mockBuddies = [
  {
    id: 1,
    name: "Priya Sharma",
    status: "Online • Same route • 200m away",
    isOnline: true,
    distance: "200m",
    safetyRating: 4.9,
    commonRoutes: 5,
    travelTime: "Evening commuter (6-8 PM)",
    verificationStatus: "ID + Phone Verified",
    lastSeen: "Active now",
    safetyScore: 95,
    trustLevel: "high"
  },
  {
    id: 2,
    name: "Arjun Patel", 
    status: "Traveling • Connaught Place → Karol Bagh",
    isOnline: true,
    distance: "500m",
    safetyRating: 4.8,
    commonRoutes: 3,
    travelTime: "Regular commuter",
    verificationStatus: "Full Profile Verified",
    lastSeen: "2 min ago",
    safetyScore: 88,
    trustLevel: "high"
  },
  {
    id: 3,
    name: "Kavya Desai",
    status: "Available • Metro Line 2",
    isOnline: true,
    distance: "1.2km",
    safetyRating: 4.7,
    commonRoutes: 7,
    travelTime: "Night shift worker (8 PM - 2 AM)",
    verificationStatus: "AI Verified Profile",
    lastSeen: "5 min ago", 
    safetyScore: 92,
    trustLevel: "high"
  },
  {
    id: 4,
    name: "Rohit Singh",
    status: "Offline • Last seen 45 min ago",
    isOnline: false,
    distance: "2.1km",
    safetyRating: 4.6,
    commonRoutes: 2,
    travelTime: "Weekend traveler",
    verificationStatus: "Basic Verification",
    lastSeen: "45 min ago",
    safetyScore: 82,
    trustLevel: "medium"
  }
];

const womenSafetyFeatures = [
  {
    id: 1,
    title: "Women-Only Groups",
    description: "Join verified women-only buddy groups for enhanced safety",
    icon: "woman",
    color: "#EC4899",
    enabled: true
  },
  {
    id: 2,
    title: "Emergency Contact Sharing", 
    description: "Automatically share emergency contacts with matched buddies",
    icon: "call",
    color: "#EF4444",
    enabled: true
  },
  {
    id: 3,
    title: "Real-time Check-ins",
    description: "Automatic safety check-ins every 15 minutes during travel",
    icon: "checkmark-circle",
    color: "#10B981",
    enabled: true
  },
  {
    id: 4,
    title: "Route Verification",
    description: "AI verifies buddy routes for maximum safety alignment",
    icon: "shield-checkmark",
    color: "#3B82F6",
    enabled: true
  },
  {
    id: 5,
    title: "Harassment Detection",
    description: "AI monitors for potential harassment situations",
    icon: "eye",
    color: "#FBBF24",
    enabled: true
  },
  {
    id: 6,
    title: "Safe Meeting Points",
    description: "Suggests well-lit, public meeting locations",
    icon: "location",
    color: "#10B981",
    enabled: true
  }
];

export default function BuddyScreen({ navigation }) {
  const [shareLocation, setShareLocation] = useState(true);
  const [autoMatch, setAutoMatch] = useState(false);
  const [notifyBuddies, setNotifyBuddies] = useState(true);
  const [womenOnlyMode, setWomenOnlyMode] = useState(true);
  const [emergencySharing, setEmergencySharing] = useState(true);
  const [realTimeCheckins, setRealTimeCheckins] = useState(true);
  const [harassmentDetection, setHarassmentDetection] = useState(true);

  const handleConnect = (buddy) => {
    Alert.alert(
      "🤝 Connect with Buddy",
      `Send a travel buddy request to ${buddy.name}?\n\n` +
      `✅ ${buddy.verificationStatus}\n` +
      `📍 Distance: ${buddy.distance}\n` +
      `⭐ Safety Rating: ${buddy.safetyRating}/5\n` +
      `🛡️ Safety Score: ${buddy.safetyScore}/100\n` +
      `🕒 Travel Time: ${buddy.travelTime}`,
      [
        { text: "View Profile", style: "default" },
        { text: "Cancel", style: "cancel" },
        { 
          text: "Send Request", 
          onPress: () => Alert.alert(
            "✅ Request Sent", 
            `Buddy request sent to ${buddy.name}!\n\nThey will be notified and can accept to start sharing safety information.\n\nEstimated response time: 2-5 minutes`
          )
        }
      ]
    );
  };

  const handleFindBuddies = () => {
    Alert.alert(
      "🔍 AI Buddy Matching",
      "ShieldPath AI is searching for compatible travel buddies...\n\n" +
      "🤖 Matching criteria:\n" +
      "• Similar routes and timings\n" +
      "• High safety ratings (4.5+)\n" +
      "• Verified profiles only\n" +
      (womenOnlyMode ? "• Women-only results\n" : "") +
      "• Real-time availability\n" +
      "• AI compatibility analysis",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Start Advanced Search", onPress: () => {
          setTimeout(() => {
            Alert.alert("🎯 Matches Found!", "3 new highly compatible buddies found in your area!\n\n✨ AI Confidence: 94%");
          }, 2000);
        }}
      ]
    );
  };

  const getSafetyScoreColor = (score) => {
    if (score >= 90) return "#10B981";
    if (score >= 75) return "#FBBF24"; 
    return "#EF4444";
  };

  const renderBuddyItem = ({ item }) => (
    <BuddyCard online={item.isOnline}>
      <BuddyAvatar online={item.isOnline}>
        <Ionicons 
          name={item.isOnline ? "person" : "person-outline"} 
          size={24} 
          color="#FFFFFF" 
        />
      </BuddyAvatar>
      
      <BuddyInfo>
        <BuddyName>{item.name}</BuddyName>
        <BuddyStatus>{item.status}</BuddyStatus>
        
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
          <Badge color="#10B981" style={{ marginRight: 6 }}>
            <BadgeText>⭐ {item.safetyRating}</BadgeText>
          </Badge>
          <Badge color="#3B82F6" style={{ marginRight: 6 }}>
            <BadgeText>{item.commonRoutes} routes</BadgeText>
          </Badge>
          {item.verificationStatus.includes("Verified") && (
            <Badge color="#EC4899">
              <BadgeText>✓ Verified</BadgeText>
            </Badge>
          )}
        </View>
        
        <Text style={{ 
          color: "#94A3B8", 
          fontSize: 11, 
          fontFamily: "Inter-Regular" 
        }}>
          {item.travelTime} • Trust Level: {item.trustLevel}
        </Text>
      </BuddyInfo>
      
      <View style={{ alignItems: "center" }}>
        <SafetyScoreCircle color={getSafetyScoreColor(item.safetyScore)}>
          <SafetyScoreText>{item.safetyScore}</SafetyScoreText>
        </SafetyScoreCircle>
        
        <Button 
          selected={item.isOnline} 
          onPress={() => handleConnect(item)}
          style={{ 
            minWidth: 80, 
            marginTop: 8,
            backgroundColor: item.isOnline ? "#EC4899" : "#94A3B8",
            paddingVertical: 8,
            paddingHorizontal: 12
          }}
        >
          <ButtonText selected={true} style={{ fontSize: 12 }}>
            {item.isOnline ? "Connect" : "Request"}
          </ButtonText>
        </Button>
      </View>
    </BuddyCard>
  );

  return (
    <SafeAreaContainer>
      <HeaderWithBack>
        <BackButton onPress={() => navigation.goBack()}>
          <BackButtonText>← Back</BackButtonText>
        </BackButton>
        <Title>🤝 Travel Buddies</Title>
        <BackButton style={{ opacity: 0 }}>
          <BackButtonText>Back</BackButtonText>
        </BackButton>
      </HeaderWithBack>

      <ScrollView>
        {/* AI Buddy Finder */}
        <Card>
          <CardTitle>🤖 AI-Powered Buddy Matching</CardTitle>
          <CardText style={{ marginBottom: 16 }}>
            ShieldPath AI finds compatible travel companions based on routes, safety preferences, real-time availability, and behavioral patterns.
          </CardText>
          
          <Button selected={true} onPress={handleFindBuddies}>
            <ButtonText selected={true}>
              <Ionicons name="search" size={18} color="#FFFFFF" /> Find Compatible Buddies
            </ButtonText>
          </Button>
        </Card>

        {/* Women Safety Settings */}
        <Card>
          <CardTitle>👩 Women Safety Features</CardTitle>
          
          <ToggleRow>
            <ToggleLabel>Women-only buddy matching</ToggleLabel>
            <Switch
              trackColor={{ false: "#94A3B8", true: "#EC4899" }}
              thumbColor="#FFFFFF"
              onValueChange={setWomenOnlyMode}
              value={womenOnlyMode}
            />
          </ToggleRow>
          
          <Divider />
          
          <ToggleRow>
            <ToggleLabel>Share location with buddies</ToggleLabel>
            <Switch
              trackColor={{ false: "#94A3B8", true: "#3B82F6" }}
              thumbColor="#FFFFFF"
              onValueChange={setShareLocation}
              value={shareLocation}
            />
          </ToggleRow>
          
          <Divider />
          
          <ToggleRow>
            <ToggleLabel>Real-time safety check-ins</ToggleLabel>
            <Switch
              trackColor={{ false: "#94A3B8", true: "#10B981" }}
              thumbColor="#FFFFFF"
              onValueChange={setRealTimeCheckins}
              value={realTimeCheckins}
            />
          </ToggleRow>
          
          <Divider />
          
          <ToggleRow>
            <ToggleLabel>AI harassment detection</ToggleLabel>
            <Switch
              trackColor={{ false: "#94A3B8", true: "#FBBF24" }}
              thumbColor="#FFFFFF"
              onValueChange={setHarassmentDetection}
              value={harassmentDetection}
            />
          </ToggleRow>
          
          <Divider />
          
          <ToggleRow>
            <ToggleLabel>Auto-match with nearby travelers</ToggleLabel>
            <Switch
              trackColor={{ false: "#94A3B8", true: "#3B82F6" }}
              thumbColor="#FFFFFF"
              onValueChange={setAutoMatch}
              value={autoMatch}
            />
          </ToggleRow>
          
          <Divider />
          
          <ToggleRow>
            <ToggleLabel>Share emergency contacts with buddies</ToggleLabel>
            <Switch
              trackColor={{ false: "#94A3B8", true: "#EF4444" }}
              thumbColor="#FFFFFF"
              onValueChange={setEmergencySharing}
              value={emergencySharing}
            />
          </ToggleRow>
        </Card>

        {/* Available Buddies Statistics */}
        <Card>
          <CardTitle>📊 Available Buddies Near You</CardTitle>
          <View style={{ flexDirection: "row", justifyContent: "space-around", marginTop: 12 }}>
            <View style={{ alignItems: "center" }}>
              <Badge color="#EC4899">
                <BadgeText>12</BadgeText>
              </Badge>
              <CardText style={{ marginTop: 4, fontSize: 11, textAlign: "center" }}>
                Women{"\n"}Online
              </CardText>
            </View>
            <View style={{ alignItems: "center" }}>
              <Badge color="#3B82F6">
                <BadgeText>8</BadgeText>
              </Badge>
              <CardText style={{ marginTop: 4, fontSize: 11, textAlign: "center" }}>
                Same{"\n"}Route
              </CardText>
            </View>
            <View style={{ alignItems: "center" }}>
              <Badge color="#10B981">
                <BadgeText>95%</BadgeText>
              </Badge>
              <CardText style={{ marginTop: 4, fontSize: 11, textAlign: "center" }}>
                Verified{"\n"}Profiles
              </CardText>
            </View>
            <View style={{ alignItems: "center" }}>
              <Badge color="#FBBF24">
                <BadgeText>4.8★</BadgeText>
              </Badge>
              <CardText style={{ marginTop: 4, fontSize: 11, textAlign: "center" }}>
                Avg Safety{"\n"}Rating
              </CardText>
            </View>
          </View>
        </Card>

        {/* Enhanced Women Safety Features */}
        <Card>
          <CardTitle>
            <Ionicons name="shield-checkmark" size={20} color="#EC4899" /> Advanced Women Safety Features
          </CardTitle>
          {womenSafetyFeatures.map((feature) => (
            <WomenSafetyFeature key={feature.id}>
              <FeatureIcon color={feature.color}>
                <Ionicons name={feature.icon} size={16} color="#FFFFFF" />
              </FeatureIcon>
              <FeatureInfo>
                <FeatureTitle>{feature.title}</FeatureTitle>
                <FeatureDescription>{feature.description}</FeatureDescription>
              </FeatureInfo>
              <Badge color={feature.enabled ? "#10B981" : "#94A3B8"}>
                <BadgeText>{feature.enabled ? "ACTIVE" : "OFF"}</BadgeText>
              </Badge>
            </WomenSafetyFeature>
          ))}
        </Card>

        {/* Buddy List */}
        <Card>
          <CardTitle>
            {womenOnlyMode ? "👩 Women" : "👥 All"} Buddies Available
          </CardTitle>
          <CardText style={{ marginBottom: 8 }}>
            {mockBuddies.filter(b => b.isOnline).length} buddies online • 
            AI-verified safety scores • Real-time location sharing
          </CardText>
        </Card>

        <FlatList
          data={mockBuddies}
          renderItem={renderBuddyItem}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={false}
          contentContainerStyle={{ paddingHorizontal: 8 }}
        />

        {/* Enhanced Safety Guidelines */}
        <Card>
          <CardTitle>
            <Ionicons name="information-circle" size={20} color="#3B82F6" /> Enhanced Buddy Safety Guidelines
          </CardTitle>
          <CardText style={{ lineHeight: 20 }}>
            🔐 <Text style={{ fontWeight: "600" }}>AI Profile Verification:</Text> Only connect with AI-verified users{"\n"}
            📍 <Text style={{ fontWeight: "600" }}>Smart Meeting Points:</Text> AI suggests safest public meeting locations{"\n"}
            📱 <Text style={{ fontWeight: "600" }}>Emergency Integration:</Text> Buddy details auto-shared with trusted contacts{"\n"}
            🚨 <Text style={{ fontWeight: "600" }}>Panic Mode:</Text> One-tap alert sends location to all buddies{"\n"}
            💬 <Text style={{ fontWeight: "600" }}>Encrypted Messaging:</Text> Secure in-app communication only{"\n"}
            🤖 <Text style={{ fontWeight: "600" }}>AI Behavior Monitoring:</Text> Continuous safety pattern analysis{"\n"}
            🛡️ <Text style={{ fontWeight: "600" }}>Trust Scoring:</Text> Dynamic trust levels based on interactions{"\n"}
            📊 <Text style={{ fontWeight: "600" }}>Community Feedback:</Text> Peer safety ratings and reviews
          </CardText>
        </Card>
      </ScrollView>
    </SafeAreaContainer>
  );
}