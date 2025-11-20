import { View } from "react-native";

import FeedEvent from "@/components/FeedEvent";
import { Text } from '@/components/ui/text';
import { useSession } from "@/contexts/AuthContext";
import { API } from "@/lib/api";
import { verifyInstallation } from 'nativewind';
import React, { useEffect, useState } from "react";

export default function Index() {
  const {signOut} = useSession();
  const [feedResponse, onFeedResponseChange] = useState({events: [{type: '', postID: '', posterID: '', interacterID: ''}], users: {}, posts: {}})
  const [hasData, onHasDataChange] = useState(false)
  verifyInstallation();

  useEffect(() => {
    API.GET('/feed',
      (response : any) => {
        console.log(response)
        onFeedResponseChange(response)
        onHasDataChange(true)
      },
      (response : any) => {console.log(response)},
      (error : Error) => {console.error(error)},
    )
  }, [])

  function hasKey<O extends Object>(obj: O, key: keyof any): key is keyof O {
    return key in obj
  }


  const getPost = (id : string) => {
    if (hasKey(feedResponse.posts, id)) {
      return feedResponse.posts[id]
    }
    return undefined
  }

  const getProfile = (id : string) => {
    if (hasKey(feedResponse.users, id)) {
      return feedResponse.users[id]
    }
    return undefined
  }

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

      {hasData ? 
        <View>
          { feedResponse.events.map((event, ix) => (
            <FeedEvent type={event.type} post={getPost(event.postID)} poster={getProfile(event.posterID)} interactor={getProfile(event.interacterID)}/>
          )) 
          }
        </View>
        : <View></View>
      }

      {/* <FloatingActionButton /> */}
    </View>
  );
}
