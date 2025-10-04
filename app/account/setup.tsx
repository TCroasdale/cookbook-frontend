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
import { Link } from 'expo-router';
import React from "react";
import { ActivityIndicator, View } from "react-native";

export default function New() {
  const [username, onChangeUName] = React.useState('')
  const [email, onChangeEmail] = React.useState('')
  const [password, onChangePassword] = React.useState('')
  const [confPass, onChangeConfPass] = React.useState('')
  const [validation, onValidationChange] = React.useState({
    username: {valid: true, reason: ""},
    email: {valid: true, reason: ""}, 
    password: {valid: true, reason: ""}
  })

  const [pageState, onPageStateChange] = React.useState({loading: false})

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
          <View className="mb-2">
            {validation.username.valid ? <Label htmlFor="username">Your username</Label> :
            <Badge className="text-white text-sm" variant="destructive"><Text>{validation.username.reason}</Text></Badge> }
            <Input
              id="username"
              className="my-2"
              keyboardType="default"
              textContentType="username"
              autoComplete="username"
              placeholder="Your username..."
              onChangeText={(x) => { onChangeUName(x); resetUNameValidation()}}
              value={username}
            />
            <CardDescription className="text-sm">username must only contain letters and numbers and be less than 16 characters </CardDescription>
          </View>
            
        </CardContent>}
        <Separator />
        <CardFooter>
          <View className="w-full mx-auto">
            <Button className="w-full" onPress={() => makeCreateAccountRequest()}>
              <Text>Create Account</Text>
            </Button>
            <CardDescription className="mx-auto">Already have an account? <Link href="/account/signin">Sign In</Link></CardDescription>
          </View>
        </CardFooter>
      </Card>
    </View>
  );
}


