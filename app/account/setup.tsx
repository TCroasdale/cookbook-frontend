import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Switch } from '@/components/ui/switch';
import { Text } from '@/components/ui/text';
import { API } from '@/lib/api';
import * as Haptics from 'expo-haptics';
import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

export default function New() {
  const [name, onChangeName] = React.useState('')
  const [isPublic, onChangePublic] = React.useState(false)
  const [validation, onValidationChange] = React.useState({
    username: {valid: true, reason: ""},
    email: {valid: true, reason: ""}, 
    password: {valid: true, reason: ""}
  })
  const [pageState, onPageStateChange] = React.useState({loading: false})
  const [hasData, onHasDataChange] = React.useState(false)
  const [userData, onUserDataChange] = React.useState({email: "", userName: ""})

  const makeSaveProfileRequest = () => {
    onPageStateChange({loading: true})
    API.PATCH("/profile", {name, isPublic}, 
      (response : any) => {
        console.log("finished")
        onPageStateChange({loading: false})
      },
      (response : any) => {
        console.log("validation errors")
        onPageStateChange({loading: false})
      },
      (error : Error) => {
        console.error(error)
        onPageStateChange({loading: false})
      }
    )
  }

  function onSwitchLabelPress() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onChangePublic((prev) => !prev);
  }
 
  function onCheckedChange(checked: boolean) {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onChangePublic(checked);
  }

  useEffect(() => {
    API.GET('/users/self',
      (response : any) => {
        console.log(response)
        onUserDataChange(response)
        onHasDataChange(true)
      },
      (response : any) => {console.log(response)},
      (error : Error) => {console.error(error)},
    )
  }, [])

  return (
    <View>
      <Card className="w-full max-w-sm mx-auto my-5">
        <CardHeader>
          <CardTitle>Setup Profile</CardTitle>
          <CardDescription>Setup your profile with some basic data.</CardDescription>
        </CardHeader>
        <Separator />
        {pageState.loading ?
        <ActivityIndicator size="large" />
      : <CardContent>
          <View className="grid grid-cols-5 mb-2 gap-2">
            <View className="col-span-1 w-full aspect-square  ">
              {hasData ?
              <Avatar alt="Your Avatar" className="mx-auto w-full h-full aspect-square">
                <AvatarImage source={{ uri: 'https://github.com/mrzachnugent.png' }} />
                <AvatarFallback>
                  <Text>ZN</Text>
                </AvatarFallback>
              </Avatar>
              :
              <Skeleton className="mx-auto w-full h-full aspect-square rounded-full" />}
            </View>
            {hasData ?
            <View className="col-span-4">
              <CardDescription className="mb-0">@{userData.userName}</CardDescription>
              <Input
                id="name"
                className=""
                keyboardType="default"
                textContentType="name"
                autoComplete="name"
                placeholder="Your name..."
                onChangeText={onChangeName}
                value={name}
              />
            </View>
            :
            <View className="col-span-4 grid grid-rows-2 place-items-center">
              <Skeleton className="h-2 w-full row-span-1"></Skeleton>
              <Skeleton className="h-2 w-full row-span-1"></Skeleton>
            </View>}
          </View>
          { hasData ?
          <View className="grid grid-cols-5 items-center gap-2">
            <Switch
              checked={isPublic}
              onCheckedChange={onCheckedChange}
              id="isPublicSwitch"
              nativeID="isPublicSwitch"
              className="col-span-1 mx-auto"
            />
            <View className="col-span-4">
              <Label nativeID="isPublicSwitch" htmlFor="isPublicSwitch" onPress={onSwitchLabelPress}>
                {
                  isPublic ?
                  "Your profile will be public" :
                  "Your profile will be hidden"
                }
              </Label>
            </View>
          </View>
          :
          <Skeleton className="h-2 mx-auto mt-2 w-3/4"></Skeleton>
          }
            
        </CardContent>}
        <Separator />
        <CardFooter>
          <View className="w-full mx-auto">
            <Button className="w-full" onPress={() => makeSaveProfileRequest()}>
              <Text>Save Profile</Text>
            </Button>
          </View>
        </CardFooter>
      </Card>
    </View>
  );
}


