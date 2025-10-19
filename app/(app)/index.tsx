import { Text, View } from "react-native";

import FloatingActionButton from "@/components/FloatingActionButton";
import { useSession } from "@/contexts/AuthContext";
import { verifyInstallation } from 'nativewind';
import React from "react";

export default function Index() {
  const {signOut} = useSession();
  verifyInstallation();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "100px",
      }}
    >

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text
          onPress={() => {
            // The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
            signOut();
          }}>
          Sign Out
        </Text>
      </View>

      <Text className="text-xl font-bold text-blue-500">Edit app/index.tsx to edit this screen.</Text>
      <FloatingActionButton />
    </View>
  );
}
