import { Badge } from '@/components/ui/badge';
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
import { Text } from '@/components/ui/text';
import { useSession } from '@/contexts/AuthContext';
import { API } from '@/lib/api';
import { Link, useRouter } from 'expo-router';
import React from "react";
import { View } from "react-native";

export default function New() {
  const router = useRouter()
  const { signIn } = useSession();
  const [username, onChangeUName] = React.useState('')
  const [email, onChangeEmail] = React.useState('')
  const [password, onChangePassword] = React.useState('')
  const [confPass, onChangeConfPass] = React.useState('')
  const [validation, onValidationChange] = React.useState({
    username: {valid: true, reason: ""},
    password: {valid: true, reason: ""}
  })

  const [pageState, onPageStateChange] = React.useState({loading: false})

  const makeReturnAccountRequest = async () => { 
    onPageStateChange({loading: true})
    API.POST("/users/login", { aid: username, pass: password },
      (response : any) => {
        console.log("success: ", response)
        signIn(response.token)
        getProfileRequest()
      },
      (json : any) => {
        console.log("failure: ", json)
        const tmp = { username: {valid: true, reason: ""}, password: {valid: true, reason: ""}}
        Object.assign(tmp, (json.username ? {username: json.username} : {username: {valid: true, reason: ""}}))
        Object.assign(tmp, (json.password ? {password: json.password} : {password: {valid: true, reason: ""}}))
        onValidationChange(tmp)
        onPageStateChange({loading: false})
      },
      (error : Error) => {
        console.error(error);
        onPageStateChange({loading: false})
      })
  }

  const getProfileRequest = async () => {
    API.GET("/profile",
      (response : any) => {
        console.log("success: ", response)
        onPageStateChange({loading: false})
        router.navigate(response.isSetup ? "/" : "/account/setup")
      },
      (json : any) => {
        console.log("failure: ", json)
        const tmp = { username: {valid: true, reason: ""}, password: {valid: true, reason: ""}}
        Object.assign(tmp, (json.username ? {username: json.username} : {username: {valid: true, reason: ""}}))
        Object.assign(tmp, (json.password ? {password: json.password} : {password: {valid: true, reason: ""}}))
        onValidationChange(tmp)
        onPageStateChange({loading: false})
      },
      (error : Error) => {
        console.error(error);
        onPageStateChange({loading: false})
      })

  }

  const validatePassword = (a : string) => {
    const tmp = { username: validation.username, password: {valid: true, reason: ""}}
    Object.assign(tmp, {password: {valid: true, reason: ""}})
    onValidationChange(tmp)
  }

  const resetUNameValidation = () => {
    const tmp = { username: validation.username, password: validation.password}
    Object.assign(tmp, {username: {valid: true, reason: ""}})
    onValidationChange(tmp)
  }

  return (
    <View>
      <Card className="w-full max-w-sm mx-auto my-5">
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
          <CardDescription>Sign in to save recipes, and add your friends</CardDescription>
        </CardHeader>
        <Separator />
       <CardContent>
          <View className="mb-2">
            {validation.username.valid ? <Label htmlFor="username">Your username or email</Label> :
            <Badge className="text-white text-sm" variant="destructive"><Text>{validation.username.reason}</Text></Badge> }
            <Input
              id="username"
              className="my-2"
              keyboardType="default"
              textContentType="username"
              autoComplete="username"
              placeholder="Your username or email..."
              onChangeText={(x) => { onChangeUName(x); resetUNameValidation()}}
              value={username}
            />
          </View>

          <View className="mb-2">
            {validation.password.valid ? <Label htmlFor="password">Your password</Label> :
            <Badge className="text-white text-sm" variant="destructive"><Text>{validation.password.reason}</Text></Badge> }
            <Input
              id="password"
              className="my-2"
              keyboardType="default"
              textContentType="newPassword"
              autoComplete="password"
              placeholder="Your password..."
              passwordRules="minlength: 8; maxlength: 70; required: lower; required: upper; required: digit; required: [-];"
              onChangeText={(x) => { onChangePassword(x); validatePassword(x); }}
              value={password}
              secureTextEntry={true}
            />
            
          </View>
        </CardContent>
        <Separator />
        <CardFooter>
          <View className="w-full mx-auto">
            <Button className="w-full" onPress={() => makeReturnAccountRequest()}>
              <Text>Sign in</Text>
            </Button>
            <CardDescription className="mx-auto">Looking to make an account? <Link href="/account/new">Create Account</Link></CardDescription>
          </View>
        </CardFooter>
      </Card>
    </View>
  );
}


