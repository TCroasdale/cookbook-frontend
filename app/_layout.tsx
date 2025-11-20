
import { SessionProvider } from "@/contexts/AuthContext";
import { Slot } from "expo-router";
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import "../global.css";

export default function RootLayout() {

  return (
     <SessionProvider>
        <SafeAreaProvider>
          <SafeAreaView className='flex h-screen' edges={['top']}>
            <Slot />
          </SafeAreaView>
        </SafeAreaProvider>
    </SessionProvider>
  )
}
