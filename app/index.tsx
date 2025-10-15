import { Text, View } from "react-native";

import FloatingActionButton from "@/components/FloatingActionButton";
import { verifyInstallation } from 'nativewind';
import React from "react";

export default function Index() {

  verifyInstallation();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="text-xl font-bold text-blue-500">Edit app/index.tsx to edit this screen.</Text>
      <FloatingActionButton />
    </View>
  );
}
