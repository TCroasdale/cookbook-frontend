import PermissionInput from '@/components/PermissionInput';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Text } from '@/components/ui/text';
import { Textarea } from '@/components/ui/textarea';
import { API } from '@/lib/api';
import { TriggerRef } from '@rn-primitives/select';
import { useRouter } from 'expo-router';
import React from "react";
import { ActivityIndicator, Platform, View } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function New() {
  const router = useRouter()
  const [pageState, onPageStateChange] = React.useState({loading: false})
  const [postText, onPostTextChange] = React.useState('')
  const [viewPerms, onViewPermsChange] = React.useState('friends')
  const [cmtPerms, onCmtPermsChange] = React.useState('friends')
  const [sharePerms, onSharePermsChange] = React.useState('friends')
  
  //=== for select group ===
  const ref = React.useRef<TriggerRef>(null);
 
  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: Platform.select({ ios: insets.bottom, android: insets.bottom + 24 }),
    left: 12,
    right: 12,
  };
 
  // Workaround for rn-primitives/select not opening on mobile
  function onTouchStart() {
    ref.current?.open();
  }
  // === === ===

  const allPerms = [
    {label: 'Everyone', value: 'strangers'},
    {label: 'Friends', value: 'friends'},
    {label: 'No-One', value: 'nobody'},
  ]
  const derivedPerms = () => {
    switch (viewPerms) {
      case 'nobody':
        if (cmtPerms == 'friends' || cmtPerms == 'strangers') onCmtPermsChange('nobody')
        if (sharePerms == 'friends' || sharePerms == 'strangers') onSharePermsChange('nobody')
        return allPerms.filter(x => x.value == 'nobody')
      case 'friends':
        if (cmtPerms == 'strangers') onCmtPermsChange('friends')
        if (sharePerms == 'strangers') onSharePermsChange('friends')
        return allPerms.filter(x => x.value == 'nobody' || x.value == 'friends')
      case 'strangers':
        return allPerms
    }
  }

  const validateLetter = (x : string, cb : Function) => {
    cb(x.replace(/[^a-zA-Z\s1-9!@#$%^&*()-=_+[]{};':\",.\/\<\>\?]/g, ''))
  }

  const publishPost = async () => {
    console.log()
      const data = {
      text: postText,
      cp: cmtPerms,
      vp: viewPerms,
      sp: sharePerms
    }
    onPageStateChange({loading: true})
    API.POST("/post", data,
      (response : any) => {
        console.log("success: ", response)
        router.navigate("/post/" + response.id)
        onPageStateChange({loading: false})
      },
      (json : any) => {
        console.log("failure: ", json)
        onPageStateChange({loading: false})
      },
      (error : Error) => {
        console.error(error);
        onPageStateChange({loading: false})
      })
    }

  return (
    <View>
      <Card className="w-full max-w-sm mx-auto my-5">
        <CardHeader>
          <CardTitle>Create Post</CardTitle>
        </CardHeader>
        <Separator />
        {pageState.loading ?
        <ActivityIndicator size="large" />
      : <CardContent>
          <CardTitle className="mb-2">Post Text</CardTitle>
          <Textarea className='col-span-10' numberOfLines={4} placeholder="Type your step here." onChangeText={(x) => validateLetter(x, onPostTextChange)} />
        
          <Accordion type='single' collapsible>
            <AccordionItem value='item-1'>
              <AccordionTrigger>
                <Text>Privacy Permissions</Text>
              </AccordionTrigger>
              <AccordionContent>
                <View className="grid grid-cols-4 place-items-center">
                  <View className="col-span-2 w-full">
                    <Text className="text-sm w-full">Who can view this post</Text>
                  </View>
                  <View className="w-full col-span-2">
                    <PermissionInput
                      inputLabel="View Permissions"
                      placeholder="Not set..."
                      value={viewPerms}
                      onValueChanged={onViewPermsChange}
                      ls={allPerms}></PermissionInput>
                  </View>
                  </View>
                  <View className="grid grid-cols-4 place-items-center">
                  <View className="col-span-2">
                    <Text className="text-sm w-full">Who can comment on this post</Text>
                  </View>
                  <View className="w-full col-span-2">
                    <PermissionInput
                      inputLabel="Comment Permissions"
                      placeholder="Not set..."
                      value={cmtPerms}
                      onValueChanged={onCmtPermsChange}
                      ls={derivedPerms()}></PermissionInput>
                  </View>
                  </View>
                  <View className="grid grid-cols-4 place-items-center">
                    <View className="col-span-2 w-full">
                      <Text className="text-sm w-full">Who can share this post</Text>
                    </View>
                    <View className="w-full col-span-2">
                      <PermissionInput
                        inputLabel="Share Permissions"
                        placeholder="Not set..."
                        value={sharePerms}
                        onValueChanged={onSharePermsChange}
                        ls={derivedPerms()}></PermissionInput>
                    </View>
                  </View>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>}
        <CardFooter>
          <View className="w-full mx-auto">
            <Button className="w-full" onPress={() => publishPost()}>
              <Text>Publish Post</Text>
            </Button>
          </View>
        </CardFooter>
      </Card>
    </View>
  );
}


