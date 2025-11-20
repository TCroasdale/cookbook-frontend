import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Text } from '@/components/ui/text';
import { API } from '@/lib/api';
import { GetProfileResponse } from '@/lib/model/profile';
import React, { useState } from 'react';
import { View } from 'react-native';

export default function ProfileSelf() {
  const [profileData, onProfileDataChanged] = useState(new GetProfileResponse())
  const [hasData, onHasDataChanged] = useState(false)
  const [tabValue, onTabValueChanged] = useState('feed')

  React.useEffect(() => {
    API.GET('/profile', (data: GetProfileResponse) => {
        onProfileDataChanged(data)
        onHasDataChanged(true)
        console.log(data)
    },
    (failure: any) => {
        console.log(failure)
    },
    (error: any) => {
        console.error(error)
    })
  }, [])

  return (
    <View className='flex justify-center items-center'>
      {hasData ? 
        <View className='grid grid-rows-4 grid-cols-1 h-screen w-full max-w-sm'>
          {/* START Profile View Headers */}
            <View className='w-full row-span-1 my-1'>
              <View className="mt-2 grid grid-cols-5 mb-2 gap-1 max-w-sm mx-2 h-auto">
                <View className="col-span-1 w-full aspect-square">
                  <Avatar alt="Your Avatar" className="mx-auto w-full h-full aspect-square shadow-sm" >
                    <AvatarImage source={{ uri: profileData.photo?.full}} />
                  </Avatar>
                  </View>
                  <View className="col-span-4 justify-center items-center">
                    <Text className="mb-0">{profileData.name} (@{profileData.username})</Text>
                    <View className="grid grid-cols-2 justify-left gap-4 w-3/4">
                      <Text className='w-full'>{profileData.meta?.followers} Followers</Text>
                      <Text className='w-full'>{profileData.meta?.following} Following</Text>
                    </View>
                    <View className="grid grid-cols-2 justify-left gap-4 w-3/4">
                      <Text className='w-full'>{profileData.meta?.posts} Posts</Text>
                      <Text className='w-full'>{profileData.meta?.recipes} Recipes</Text>
                    </View>
                  </View>
                </View>
                { profileData.relational?.isu ?
                  <View className='w-3/4 justify-center block mx-auto py-1'>
                    <Button variant='outline' className='text-white w-full block'><Text>Edit Profile</Text></Button>
                  </View>
                  :
                  <View className='w-3/4 justify-center block mx-auto'>
                    { profileData.relational?.ifu && !profileData.relational.ifbu ?
                      <CardDescription className='inline-block text-center w-full'>{profileData.name} follow's you!</CardDescription>
                      :
                      <View />
                    }
                    { profileData.relational?.ifu && profileData.relational.ifbu ?
                      <CardDescription className='inline-block text-center w-full'>You both follow each other!</CardDescription>
                      :
                      <View />
                    }
                    { profileData.relational?.ifbu ?
                      <Button variant='outline' className='text-white w-full'><Text>Unfollow!</Text></Button>
                      :
                      <Button className='text-white w-full'><Text>Follow!</Text></Button>
                    }
                    
                  </View>
                }
              </View>
              {/* END Profile View Headers
                  START tabs views*/}
              <Tabs value={tabValue} onValueChange={onTabValueChanged} className="w-full max-w-sm block mx-auto">
                <TabsList  className='w-full grid grid-cols-4 gap-2 px-2'>
                  <TabsTrigger value="feed"><Text>Feed</Text></TabsTrigger>
                  <TabsTrigger value="posts"><Text>Posts</Text></TabsTrigger>
                  <TabsTrigger value="recipes"><Text>Recipes</Text></TabsTrigger>
                  <TabsTrigger value="saved"><Text>Saved</Text></TabsTrigger>
                </TabsList>
                <View className='pt-4 pb-1 px-2'>
                  <TabsContent value="feed">Make changes to your account here.</TabsContent>
                  <TabsContent value="posts">Change your password here.</TabsContent>
                  <TabsContent value="recipes">Change your password here.</TabsContent>
                  <TabsContent value="saved">Change your password here.</TabsContent>
                </View>
              </Tabs>
              {/* END tab views */}
          </View>
      : <View />}
    </View>
  );
}