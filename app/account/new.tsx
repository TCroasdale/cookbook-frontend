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

  const makeCreateAccountRequest = async () => {

    onPageStateChange({loading: true})
    try {
      const response = await fetch('http://localhost:8080/api/v1/users', {
        method: 'POST',
        body: JSON.stringify({
            username: username,
            password: password,
            email: email
        })
      });
      const json = await response.json();

      if (response.status === 400) {
        const tmp = { username: {valid: true, reason: ""}, email: {valid: true, reason: ""}, password: {valid: true, reason: ""}}
        Object.assign(tmp, (json.username ? {username: json.username} : {username: {valid: true, reason: ""}}))
        Object.assign(tmp, (json.email ? {email: json.email} : {email: {valid: true, reason: ""}}))
        Object.assign(tmp, (json.password ? {password: json.password} : {password: {valid: true, reason: ""}}))
        onValidationChange(tmp)
      }
    } catch (error) {
      console.error(error);
    } finally {
      onPageStateChange({loading: false})
    }
  }

  const validatePassword = (a : string, b : string) => {
    if (a != b) {
      const tmp = { username: validation.username, email: validation.email, password: {valid: true, reason: ""}}
      Object.assign(tmp, {password: {valid: false, reason: "passwords must match"}})
      onValidationChange(tmp)
      return
    }
    const tmp = { username: validation.username, email: validation.email, password: {valid: true, reason: ""}}
    Object.assign(tmp, {password: {valid: true, reason: ""}})
    onValidationChange(tmp)
  }

  const resetUNameValidation = () => {
    const tmp = { username: validation.username, email: validation.email, password: validation.password}
    Object.assign(tmp, {username: {valid: true, reason: ""}})
    onValidationChange(tmp)
  }

  const resetEmailValidation = () => {
    const tmp = { username: validation.username, email: validation.email, password: validation.password}
    Object.assign(tmp, {email: {valid: true, reason: ""}})
    onValidationChange(tmp)
  }

  return (
    <View>
      <Card className="w-full max-w-sm mx-auto my-5">
        <CardHeader>
          <CardTitle>Create Account</CardTitle>
          <CardDescription>Sign up to save recipes, and add your friends</CardDescription>
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

          <View className="mb-2">
            {validation.email.valid ? <Label htmlFor="email">Your email</Label> :
            <Badge className="text-white text-sm" variant="destructive"><Text>{validation.email.reason}</Text></Badge> }
            <Input
              id="email"
              className="my-2"
              keyboardType="email-address"
              textContentType="emailAddress"
              autoComplete="email"
              placeholder="Your email..."
              onChangeText={(x) => { onChangeEmail(x); resetEmailValidation(); }}
              value={email}
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
              onChangeText={(x) => { onChangePassword(x); validatePassword(x, confPass); }}
              value={password}
              secureTextEntry={true}
            />

            <Input
              id="confPass"
              className="my-2"
              keyboardType="default"
              textContentType="newPassword"
              autoComplete="password"
              placeholder="Confirm password..."
              passwordRules="minlength: 8; maxlength: 70; required: lower; required: upper; required: digit; required: [-];"
              onChangeText={(x) => { onChangeConfPass(x); validatePassword(password, x); }}
              value={confPass}
              secureTextEntry={true}
            />
            <CardDescription>password must be 8 characters long, and contain</CardDescription>
            <CardDescription>1 upper case letter</CardDescription>
            <CardDescription>1 lower case letter</CardDescription>
            <CardDescription>1 number</CardDescription>
            
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


