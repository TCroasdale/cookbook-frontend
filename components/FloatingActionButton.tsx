import { Text } from '@/components/ui/text';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Link, useRouter } from 'expo-router';
import React from "react";
import { TouchableOpacity, View } from "react-native";

export default function FloatingActionButton() {
  const router = useRouter()
  const [openState, openStateChanged] = React.useState(false)

  const FabClass = () => {
    let c = 'block w-16 h-16 mr-0 ml-auto rounded-full bg-blue-500 shadow-lg grid grid-cols-1 grid-rows-1 place-items-center transition-transform '
    if (openState) {
      c += 'rotate-45'
    } else {
      c += 'rotate-0'
    }
    return c
  }

  const toggleOpen = () => {
    openStateChanged(!openState)
  }
  
  const links = [
    { id: 0, label: 'Create Recipe', value: '/recipe/new', icon: 'chef-hat' },
    { id: 1, label: 'Create Post', value: '/post/new',  icon: 'post-outline' }
  ]

  return (
    <View className="fixed bottom-4 right-4">
        <View>
          {links.map((x) => (
            <Link href={x.value} className={"grid grid-cols-5 p-2 mb-2 place-items-center transition " + (openState ? 'opacity-100' : 'opacity-0')}>
              <Text className="text-right text-black col-span-4 w-full pr-2">{x.label}</Text>
              <TouchableOpacity key={x.id} className="p-2 aspect-square h-12 col-span-1 rounded-full bg-blue-500 shadow-lg grid grid-cols-1 grid-rows-1 place-items-center">
                <MaterialCommunityIcons name={x.icon} size={32} color="white"></MaterialCommunityIcons>
              </TouchableOpacity>
            </Link>
          ))}
        </View>
        <TouchableOpacity className={FabClass()} onPress={toggleOpen}>
            <AntDesign name="plus" size={48} color="white" className=""/>
        </TouchableOpacity>
    </View>
  );
}


