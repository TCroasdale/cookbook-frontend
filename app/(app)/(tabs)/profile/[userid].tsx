import React, { useState } from 'react';
import { View } from 'react-native';

export default function ProfileOther() {
  const [profileData, onProfileDataChanged] = useState({})
  const [hasData, onHasDataChanged] = useState(false)

  React.useEffect(() => {
    
  }, [])

  return (
    <View className='flex justify-center items-center'>
      {hasData ? 
        <View className='grid grid-rows-3 grid-cols-1'></View>
      : <View />}
    </View>
  );
}