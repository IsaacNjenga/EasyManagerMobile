import SafeScreen from "@/components/SafeScreen";
import { useAuthStore } from "@/providers/AuthStore";
import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";
import { SplashScreen, Stack, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();

  const { checkAuth, user, token } = useAuthStore();
  const [authChecked, setAuthChecked] = useState(false);

  const [fontsLoaded] = useFonts({
    "JetBrainsMono-Medium": require("../assets/fonts/JetBrainsMono-Medium.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    (async () => {
      await checkAuth();
      setAuthChecked(true);
    })();
  }, []);

  useEffect(() => {
    if (!authChecked || segments.length === 0) return;
    const inAuthScreen = segments[0] === "(auth)";
    const isSignedIn = user && token;

    if (!isSignedIn && !inAuthScreen) router.replace("/(auth)");
    else if (isSignedIn && inAuthScreen) router.replace("/(home)");
  }, [user, token, segments, authChecked]);

  if (!authChecked) return null;

  console.log("segments", segments);

  return (
    <SafeAreaProvider>
      <SafeScreen>
        <ApplicationProvider {...eva} theme={eva.light}>
          <Stack screenOptions={{ headerShown: false }} />
        </ApplicationProvider>
      </SafeScreen>
    </SafeAreaProvider>
  );
}
