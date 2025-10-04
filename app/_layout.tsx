import { PortalHost } from "@rn-primitives/portal";
import { Stack } from "expo-router";

import { ThemeProvider } from "@react-navigation/native";
import { NAV_THEME } from 'lib/theme';
import React from "react";
import { StatusBar } from "react-native";
import "../global.css";

export default function RootLayout() {
  const colorScheme = 'light'
  return (
     <ThemeProvider value={NAV_THEME[colorScheme]}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      <Stack />
      <PortalHost />
    </ThemeProvider>
  )
}
