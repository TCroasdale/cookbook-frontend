
import { useSession } from "@/contexts/AuthContext";
import { NAV_THEME } from "@/lib/theme";
import { ThemeProvider } from "@react-navigation/native";
import { PortalHost } from "@rn-primitives/portal";
import { Redirect, Stack } from "expo-router";
import React from "react";
import { StatusBar, Text } from "react-native";
import "../../global.css";

export default function AppLayout() {
  const { session, isLoading } = useSession();
  const colorScheme = 'light'

  // You can keep the splash screen open, or render a loading screen like we do here.
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!session) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/sign-in" />;
  }

  // This layout can be deferred because it's not the root layout.
  return (
     <ThemeProvider value={NAV_THEME[colorScheme]}>
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
        {/* <SafeAreaProvider>
          <SafeAreaView className='flex h-screen' edges={['top']}> */}
            {/* <ScrollView> */}
              <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              </Stack>
              {/* <Slot /> */}
            {/* </ScrollView> */}
          {/* </SafeAreaView>
        </SafeAreaProvider> */}
        <PortalHost />
    </ThemeProvider>
  )
}
