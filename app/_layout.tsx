
import { SessionProvider } from "@/contexts/AuthContext";
import { Slot } from "expo-router";
import React from "react";
import "../global.css";

export default function RootLayout() {

  return (
     <SessionProvider>
        <Slot />
    </SessionProvider>
  )
}
