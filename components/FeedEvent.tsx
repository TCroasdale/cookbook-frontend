import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Link } from 'expo-router';
import React from "react";
import { View } from "react-native";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';

export default function FeedEvent(props : any) {

  const renderTitle = (type: string) => {
    switch (type) {
      case "POST":
        return (<CardTitle>{ props.poster.name } posted!</CardTitle>)
      case "COMMENT":
        return (<CardTitle>{ props.interactor.name } commented on {props.poster.name}'s post!</CardTitle>)
      case "SHARE":
        return (<CardTitle>{ props.interactor.name } shared {props.poster.name}'s post!</CardTitle>)
      case "LIKE":
        return (<CardTitle>{ props.interactor.name } liked {props.poster.name}'s post!</CardTitle>)
    }
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="flex-row">
        <View className="flex-1 gap-1.5">
          <Link href={'/post/' + props.post.id}>{renderTitle(props.type)}</Link>
        </View>
      </CardHeader>
      <Separator/>
      <CardContent>
        <Text className="w-full justify-center gap-4">
          {props.post.text}
        </Text>
      </CardContent>
      <Separator/>
      <CardFooter className="grid grid-cols-3 p-0 ">
        <Button variant="outline" className="w-full">
          <Text>Like</Text>
        </Button>
        <Button variant="outline" className="w-full">
          <Text>Comment</Text>
        </Button>
        <Button variant="outline" className="w-full">
          <Text>Share</Text>
        </Button>
      </CardFooter>
    </Card>
  );
}


