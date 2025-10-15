import { PortalHost } from "@rn-primitives/portal";
import { Stack } from "expo-router";

import { ThemeProvider } from "@react-navigation/native";
import { NAV_THEME } from 'lib/theme';
import React from "react";
import { ScrollView, StatusBar } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import "../global.css";

export default function RootLayout() {
  const colorScheme = 'light'

  return (
     <ThemeProvider value={NAV_THEME[colorScheme]}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      <SafeAreaProvider>
        <SafeAreaView className='flex h-screen' edges={['top']}>
          <ScrollView>
            <Stack />
          </ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
      <PortalHost />
    </ThemeProvider>
  )
}
