import { useState, useEffect } from "react";
import * as Font from "expo-font";

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        // Load fonts
        await Font.loadAsync({
          "Inter-Regular": require("../../assets/fonts/Inter-Regular.ttf"),
          "Inter-Medium": require("../../assets/fonts/Inter-Medium.ttf"),
          "Inter-SemiBold": require("../../assets/fonts/Inter-SemiBold.ttf"),
          "Inter-Bold": require("../../assets/fonts/Inter-Bold.ttf"),
        });
      } catch (e) {
        console.warn("Error loading fonts:", e);
      } finally {
        setLoadingComplete(true);
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}