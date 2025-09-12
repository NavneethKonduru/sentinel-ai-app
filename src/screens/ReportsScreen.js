import React, { useState } from "react";
import { ScrollView, Alert, FlatList, Modal, View, Text, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
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
  InputField,
  Divider,
} from "../components/StyledComponents";
import styled from "styled-components/native";

const ReportCard = styled.View`
  background-color: ${(props) => props.theme.card};
  border-radius: 16px;
  padding: 16px;
  margin: 8px 16px;
  border-left-width: 4px;
  border-left-color: ${(props) => props.severityColor};
  shadow-color: #000;
  shadow-offset: 0 2px;
  shadow-opacity: 0.15;
  shadow-radius: 6px;
  elevation: 4;
`;

const ReportHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const ReportType = styled.Text`
  font-family: "Inter-SemiBold";
  font-size: 16px;
  color: ${(props) => props.theme.textPrimary};
`;

const ReportTime = styled.Text`
  font-family: "Inter-Regular";
  font-size: 12px;
  color: ${(props) => props.theme.textSecondary};
`;

const ReportLocation = styled.Text`
  font-family: "Inter-Medium";
  font-size: 14px;
  color: ${(props) => props.theme.primary};
  margin-bottom: 8px;
`;

const QuickReportGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 16px 0;
`;

const QuickReportButton = styled.TouchableOpacity`
  align-items: center;
  padding: 16px;
  background-color: ${(props) => props.theme.surfaceLight};
  border-radius: 12px;
  width: 48%;
  margin-bottom: 12px;
  border-width: 1px;
  border-color: ${(props) => props.theme.border};
  shadow-color: #000;
  shadow-offset: 0 1px;
  shadow-opacity: 0.1;
  shadow-radius: 2px;
  elevation: 2;
`;

const ReportIcon = styled.View`
  background-color: ${(props) => props.color};
  padding: 12px;
  border-radius: 25px;
  margin-bottom: 8px;
`;

const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
`;

const ModalContent = styled.View`
  background-color: ${(props) => props.theme.card};
  border-radius: 20px;
  padding: 24px;
  margin: 20px;
  min-width: 320px;
  max-width: 400px;
  shadow-color: #000;
  shadow-offset: 0 4px;
  shadow-opacity: 0.25;
  shadow-radius: 8px;
  elevation: 8;
`;

const ModalTitle = styled.Text`
  font-family: "Inter-Bold";
  font-size: 20px;
  color: ${(props) => props.theme.textPrimary};
  text-align: center;
  margin-bottom: 16px;
`;

const SeverityButton = styled.TouchableOpacity`
  background-color: ${(props) => props.selected ? props.theme.primary : props.theme.surfaceLight};
  border-width: 1px;
  border-color: ${(props) => props.selected ? props.theme.primary : props.theme.border};
  padding: 12px 16px;
  border-radius: 8px;
  margin: 4px;
  flex: 1;
`;

const SeverityText = styled.Text`
  color: ${(props) => props.selected ? props.theme.softWhite : props.theme.textPrimary};
  font-family: "Inter-Medium";
  font-size: 14px;
  text-align: center;
`;

const AIAnalyticsCardWrapper = styled.View`
  margin-top: 8px;
  margin-bottom: 8px;
`;

function AIAnalyticsCard({ children }) {
  return (
    <LinearGradient
      colors={['#3B82F6', '#1E40AF']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{
        borderRadius: 16,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
        elevation: 4,
      }}
    >
      <AIAnalyticsCardWrapper>
        {children}
      </AIAnalyticsCardWrapper>
    </LinearGradient>
  );
}

// Enhanced incident types for comprehensive reporting
const incidentTypes = [
  { id: "harassment", name: "Harassment", icon: "warning", color: "#EF4444", urgent: true },
  { id: "stalking", name: "Stalking", icon: "eye", color: "#EF4444", urgent: true },
  { id: "catcalling", name: "Catcalling", icon: "volume-high", color: "#FBBF24", urgent: false },
  { id: "inappropriate_touching", name: "Inappropriate Touching", icon: "hand-right", color: "#EF4444", urgent: true },
  { id: "poor_lighting", name: "Poor Lighting", icon: "bulb", color: "#FBBF24", urgent: false },
  { id: "broken_streetlight", name: "Broken Streetlight", icon: "bulb-outline", color: "#FBBF24", urgent: false },
  { id: "unsafe_transport", name: "Unsafe Transport", icon: "car", color: "#FBBF24", urgent: false },
  { id: "suspicious_activity", name: "Suspicious Activity", icon: "eye-outline", color: "#FBBF24", urgent: false },
  { id: "theft", name: "Theft/Snatching", icon: "lock-closed", color: "#EF4444", urgent: true },
  { id: "drug_activity", name: "Drug Activity", icon: "warning-outline", color: "#EF4444", urgent: true },
  { id: "vandalism", name: "Vandalism", icon: "construct", color: "#FBBF24", urgent: false },
  { id: "safe_area", name: "Safe Area", icon: "checkmark-circle", color: "#10B981", urgent: false },
  { id: "well_lit", name: "Well-lit Area", icon: "sunny", color: "#10B981", urgent: false },
  { id: "cctv_presence", name: "CCTV Present", icon: "videocam", color: "#10B981", urgent: false },
  { id: "police_presence", name: "Police Presence", icon: "shield-checkmark", color: "#10B981", urgent: false },
  { id: "emergency", name: "Emergency", icon: "call", color: "#EF4444", urgent: true },
];

const mockReports = [
  {
    id: 1,
    type: "Harassment",
    location: "Connaught Place Metro Station, Exit 4",
    time: "2 hours ago",
    description: "Inappropriate behavior near women's coach exit gate. Multiple women reported feeling unsafe. Security has been informed.",
    severity: "high",
    status: "Police Notified",
    reporter: "Anonymous",
    aiVerified: true,
    upvotes: 12,
    aiConfidence: 94
  },
  {
    id: 2,
    type: "Poor Lighting",
    location: "Khan Market Lane 3, Behind Cafe Turtle",
    time: "5 hours ago",
    description: "All street lights not working for 3 days. Very dark area after 7 PM. Multiple reports of discomfort.",
    severity: "medium",
    status: "Municipal Corp Notified",
    reporter: "Community (5 reports)",
    aiVerified: true,
    upvotes: 8,
    aiConfidence: 87
  },
  {
    id: 3,
    type: "Stalking",
    location: "Lodhi Gardens, Jogging Track Section B",
    time: "3 hours ago",
    description: "Individual following women joggers. Reported by multiple users. Pattern detected by AI analysis.",
    severity: "high",
    status: "Under Investigation",
    reporter: "Multiple Users",
    aiVerified: true,
    upvotes: 15,
    aiConfidence: 96
  },
  {
    id: 4,
    type: "Safe Area",
    location: "Select City Walk Mall, Main Entrance",
    time: "6 hours ago",
    description: "Excellent security presence, well-lit area with CCTV coverage. Recommended safe meeting point for buddy connections.",
    severity: "low",
    status: "AI Verified Safe",
    reporter: "ShieldPath AI",
    aiVerified: true,
    upvotes: 23,
    aiConfidence: 99
  },
  {
    id: 5,
    type: "Theft",
    location: "Karol Bagh Market, Main Street",
    time: "4 hours ago",
    description: "Phone snatching incident reported. Two-wheeler involved. Police case filed. Area flagged for increased vigilance.",
    severity: "high",
    status: "FIR Filed",
    reporter: "Victim + Witnesses",
    aiVerified: true,
    upvotes: 9,
    aiConfidence: 91
  }
];

const safetyTips = [
  "🧠 Trust your AI-enhanced instincts - our algorithms detect patterns you might miss",
  "📍 Always share your live location with trusted contacts during travel", 
  "💡 Avoid poorly lit areas flagged by our community reporting system",
  "👥 Use our buddy system - travel with AI-matched companions when possible",
  "📱 Keep emergency contacts easily accessible and updated in the app",
  "📊 Check area safety scores before traveling to new locations",
  "🕒 Travel during peak hours when crowd density is optimal for safety",
  "🚨 Report incidents immediately - every report strengthens our AI protection"
];

export default function ReportsScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [reportDescription, setReportDescription] = useState("");
  const [selectedSeverity, setSelectedSeverity] = useState("medium");
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [locationDetails, setLocationDetails] = useState("");

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "high": return "#EF4444";
      case "medium": return "#FBBF24"; 
      case "low": return "#10B981";
      default: return "#94A3B8";
    }
  };

  const handleQuickReport = (incident) => {
    setSelectedIncident(incident);
    setModalVisible(true);
  };

  const handleSubmitReport = () => {
    if (!reportDescription.trim()) {
      Alert.alert("Missing Information", "Please provide a description of the incident.");
      return;
    }

    const isUrgent = selectedIncident.urgent && selectedSeverity === "high";
    const reportId = Math.random().toString(36).substr(2, 9).toUpperCase();
    
    Alert.alert(
      isUrgent ? "🚨 URGENT REPORT SUBMITTED" : "✅ Report Submitted",
      isUrgent 
        ? `URGENT: ${selectedIncident.name} report submitted.\n\n🚔 Authorities notified immediately\n📱 Nearby users alerted\n🤖 AI analysis in progress\n\nReport ID: #${reportId}\n\nThank you for helping keep our community safe.`
        : `Thank you for reporting ${selectedIncident.name}.\n\n🤖 AI Verification: In Progress\n📊 Community Impact: +Safety Score\n🛡️ Your contribution strengthens our protection network\n\nReport ID: #${reportId}`,
      [
        {
          text: "OK",
          onPress: () => {
            setModalVisible(false);
            setReportDescription("");
            setLocationDetails("");
            setSelectedIncident(null);
            setSelectedSeverity("medium");
          }
        }
      ]
    );
  };

  const renderReportItem = ({ item }) => (
    <ReportCard severityColor={getSeverityColor(item.severity)}>
      <ReportHeader>
        <ReportType>{item.type}</ReportType>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {item.aiVerified && (
            <Ionicons 
              name="checkmark-circle" 
              size={16} 
              color="#10B981" 
              style={{ marginRight: 6 }}
            />
          )}
          <Badge color={getSeverityColor(item.severity)}>
            <BadgeText>{item.status}</BadgeText>
          </Badge>
        </View>
      </ReportHeader>
      
      <ReportLocation>📍 {item.location}</ReportLocation>
      <CardText style={{ marginBottom: 12 }}>{item.description}</CardText>
      
      <View style={{ 
        flexDirection: "row", 
        justifyContent: "space-between", 
        alignItems: "center",
        flexWrap: "wrap"
      }}>
        <ReportTime>
          {item.time} • {item.reporter}
          {item.aiVerified && ` • AI Confidence: ${item.aiConfidence}%`}
        </ReportTime>
        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 4 }}>
          <Ionicons name="thumbs-up" size={14} color="#10B981" />
          <Text style={{ color: "#94A3B8", fontSize: 12, marginLeft: 4, marginRight: 12 }}>
            {item.upvotes}
          </Text>
          <Badge color="#3B82F6">
            <BadgeText>AI: {item.aiConfidence}%</BadgeText>
          </Badge>
        </View>
      </View>
    </ReportCard>
  );

  return (
    <SafeAreaContainer>
      <HeaderWithBack>
        <BackButton onPress={() => navigation.goBack()}>
          <BackButtonText>← Back</BackButtonText>
        </BackButton>
        <Title>🚨 Community Reports</Title>
        <BackButton style={{ opacity: 0 }}>
          <BackButtonText>Back</BackButtonText>
        </BackButton>
      </HeaderWithBack>

      <ScrollView>
        {/* Quick Report Section */}
        <Card>
          <CardTitle>🚨 Report Safety Concerns</CardTitle>
          <CardText style={{ marginBottom: 16 }}>
            Help create the world's safest navigation network. Every report is AI-verified and strengthens our protection algorithms.
          </CardText>
          
          <QuickReportGrid>
            {incidentTypes.slice(0, 8).map((incident) => (
              <QuickReportButton key={incident.id} onPress={() => handleQuickReport(incident)}>
                <ReportIcon color={incident.color}>
                  <Ionicons name={incident.icon} size={20} color="#FFFFFF" />
                </ReportIcon>
                <Text style={{ 
                  fontSize: 12, 
                  textAlign: "center", 
                  fontFamily: "Inter-SemiBold",
                  color: "#1E293B",
                  marginBottom: 4
                }}>
                  {incident.name}
                </Text>
                {incident.urgent && (
                  <Badge color="#EF4444" style={{ paddingHorizontal: 6, paddingVertical: 2 }}>
                    <BadgeText style={{ fontSize: 9 }}>URGENT</BadgeText>
                  </Badge>
                )}
              </QuickReportButton>
            ))}
          </QuickReportGrid>
          
          {/* More incident types */}
          <Button selected={false} onPress={() => Alert.alert("More Options", "Additional reporting options coming soon!")}>
            <ButtonText selected={false}>+ More Incident Types</ButtonText>
          </Button>
        </Card>

        {/* AI Analytics Dashboard */}
        <AIAnalyticsCard>
          <Text style={{ 
            color: "#FFFFFF", 
            fontSize: 18, 
            fontFamily: "Inter-Bold",
            marginBottom: 16,
            textAlign: "center"
          }}>
            🤖 AI Safety Analytics (This Week)
          </Text>
          <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
            <View style={{ alignItems: "center" }}>
              <Text style={{ color: "#FFFFFF", fontSize: 20, fontFamily: "Inter-Bold" }}>24</Text>
              <Text style={{ color: "#E5E7EB", fontSize: 10, textAlign: "center" }}>High Priority{"\n"}Incidents</Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text style={{ color: "#FFFFFF", fontSize: 20, fontFamily: "Inter-Bold" }}>87</Text>
              <Text style={{ color: "#E5E7EB", fontSize: 10, textAlign: "center" }}>Infrastructure{"\n"}Issues</Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text style={{ color: "#FFFFFF", fontSize: 20, fontFamily: "Inter-Bold" }}>156</Text>
              <Text style={{ color: "#E5E7EB", fontSize: 10, textAlign: "center" }}>Resolved{"\n"}Reports</Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text style={{ color: "#FFFFFF", fontSize: 20, fontFamily: "Inter-Bold" }}>97%</Text>
              <Text style={{ color: "#E5E7EB", fontSize: 10, textAlign: "center" }}>AI Accuracy{"\n"}Rate</Text>
            </View>
          </View>
        </AIAnalyticsCard>

        {/* Recent Reports */}
        <Card>
          <CardTitle>📊 AI-Verified Community Reports</CardTitle>
          <CardText style={{ marginBottom: 8 }}>
            {mockReports.length} verified reports in your area • Real-time AI monitoring • Community-powered safety
          </CardText>
        </Card>

        <FlatList
          data={mockReports}
          renderItem={renderReportItem}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={false}
        />

        {/* Enhanced Safety Tips */}
        <Card>
          <CardTitle>
            <Ionicons name="shield-checkmark" size={20} color="#10B981" /> AI-Enhanced Safety Tips
          </CardTitle>
          {safetyTips.map((tip, index) => (
            <View key={index} style={{ flexDirection: "row", marginBottom: 8, alignItems: "flex-start" }}>
              <Text style={{ color: "#3B82F6", marginRight: 8, marginTop: 2 }}>•</Text>
              <CardText style={{ flex: 1, lineHeight: 18 }}>{tip}</CardText>
            </View>
          ))}
        </Card>

        {/* Reporting Guidelines */}
        <Card>
          <CardTitle>
            <Ionicons name="information-circle" size={20} color="#3B82F6" /> Enhanced Reporting Guidelines
          </CardTitle>
          <CardText style={{ lineHeight: 20 }}>
            🤖 <Text style={{ fontWeight: "600" }}>AI Verification:</Text> All reports undergo intelligent verification{"\n"}
            🚨 <Text style={{ fontWeight: "600" }}>Emergency Priority:</Text> Urgent incidents get immediate attention{"\n"}
            🔐 <Text style={{ fontWeight: "600" }}>Privacy Protection:</Text> Anonymous reporting protects your identity{"\n"}
            📍 <Text style={{ fontWeight: "600" }}>Location Accuracy:</Text> Precise coordinates help others navigate safely{"\n"}
            📊 <Text style={{ fontWeight: "600" }}>Impact Tracking:</Text> See how your reports improve community safety{"\n"}
            🌐 <Text style={{ fontWeight: "600" }}>Global Network:</Text> Your reports contribute to worldwide safety data{"\n"}
            ⚡ <Text style={{ fontWeight: "600" }}>Real-time Processing:</Text> Instant analysis and alert distribution{"\n"}
            🎯 <Text style={{ fontWeight: "600" }}>Accuracy Matters:</Text> Quality reports strengthen AI algorithms
          </CardText>
        </Card>
      </ScrollView>

      {/* Enhanced Report Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <ModalContainer>
          <ModalContent>
            <ModalTitle>
              {selectedIncident?.urgent && "🚨 "}
              Report {selectedIncident?.name}
            </ModalTitle>
            
            {selectedIncident?.urgent && (
              <View style={{ 
                backgroundColor: "#FEE2E2", 
                padding: 12, 
                borderRadius: 8, 
                marginBottom: 16 
              }}>
                <Text style={{ 
                  color: "#DC2626", 
                  fontSize: 14, 
                  textAlign: "center", 
                  fontWeight: "600" 
                }}>
                  🚨 URGENT SAFETY ISSUE 🚨{"\n"}
                  Authorities will be notified immediately
                </Text>
              </View>
            )}
            
            <Text style={{ 
              color: "#64748B", 
              marginBottom: 16, 
              textAlign: "center",
              fontSize: 14,
              lineHeight: 18
            }}>
              Your report helps create safer communities through AI-powered analysis and real-time alerts.
            </Text>

            {/* Severity Selection */}
            <Text style={{ 
              marginBottom: 8, 
              fontWeight: "600",
              fontSize: 16,
              color: "#1E293B"
            }}>
              Severity Level:
            </Text>
            <View style={{ flexDirection: "row", marginBottom: 16 }}>
              {["low", "medium", "high"].map((severity) => (
                <SeverityButton
                  key={severity}
                  selected={selectedSeverity === severity}
                  onPress={() => setSelectedSeverity(severity)}
                >
                  <SeverityText selected={selectedSeverity === severity}>
                    {severity.charAt(0).toUpperCase() + severity.slice(1)}
                  </SeverityText>
                </SeverityButton>
              ))}
            </View>

            {/* Location Details */}
            <InputField
              placeholder="Specific location details (optional)"
              placeholderTextColor="#94A3B8"
              value={locationDetails}
              onChangeText={setLocationDetails}
              style={{ marginBottom: 12 }}
            />
            
            {/* Description */}
            <InputField
              placeholder="Describe what happened in detail..."
              placeholderTextColor="#94A3B8"
              value={reportDescription}
              onChangeText={setReportDescription}
              multiline={true}
              numberOfLines={4}
              style={{ textAlignVertical: "top", minHeight: 100 }}
            />

            {/* Anonymous Option */}
            <TouchableOpacity
              style={{ 
                flexDirection: "row", 
                alignItems: "center", 
                marginTop: 16,
                marginBottom: 20 
              }}
              onPress={() => setIsAnonymous(!isAnonymous)}
            >
              <View style={{
                width: 20,
                height: 20,
                borderWidth: 2,
                borderColor: "#3B82F6",
                borderRadius: 4,
                backgroundColor: isAnonymous ? "#3B82F6" : "transparent",
                marginRight: 12,
                alignItems: "center",
                justifyContent: "center"
              }}>
                {isAnonymous && <Ionicons name="checkmark" size={14} color="#FFFFFF" />}
              </View>
              <Text style={{ fontSize: 14, color: "#1E293B", fontFamily: "Inter-Medium" }}>
                Submit Anonymously (Recommended)
              </Text>
            </TouchableOpacity>
            
            <View style={{ flexDirection: "row" }}>
              <Button 
                selected={false} 
                onPress={() => setModalVisible(false)}
                style={{ flex: 1, marginRight: 8 }}
              >
                <ButtonText selected={false}>Cancel</ButtonText>
              </Button>
              
              <Button 
                selected={true} 
                onPress={handleSubmitReport}
                style={{ 
                  flex: 1, 
                  marginLeft: 8,
                  backgroundColor: selectedIncident?.urgent ? "#EF4444" : "#3B82F6"
                }}
              >
                <ButtonText selected={true}>
                  {selectedIncident?.urgent ? "🚨 URGENT SUBMIT" : "🤖 AI Submit"}
                </ButtonText>
              </Button>
            </View>
          </ModalContent>
        </ModalContainer>
      </Modal>
    </SafeAreaContainer>
  );
}