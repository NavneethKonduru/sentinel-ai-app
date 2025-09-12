import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import BottomTabs from "./src/navigation/BottomTabs";
import useCachedResources from "./src/hooks/useCachedResources";
import { ThemeProvider } from "styled-components/native";
import { darkTheme } from "./src/theme/colors";

export default function App() {
  const loaded = useCachedResources();
  
  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <NavigationContainer>
        <StatusBar style="light" backgroundColor="#0B1623" />
        <BottomTabs />
      </NavigationContainer>
    </ThemeProvider>
  );
}