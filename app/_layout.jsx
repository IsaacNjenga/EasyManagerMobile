import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { View } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Simulate loading or load assets
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
        await SplashScreen.hideAsync(); // ✅ Move here to guarantee it runs
      }
    }

    prepare();
  }, []);

  if (!appIsReady) {
    return null; // keep splash screen visible
  }

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <View style={{ flex: 1 }}>
        <Stack />
      </View>
    </ApplicationProvider>
  );
}
