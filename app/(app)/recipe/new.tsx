import IngredientInput from '@/components/IngredientInput';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Text } from '@/components/ui/text';
import { Textarea } from '@/components/ui/textarea';
import { API } from '@/lib/api';
import AntDesign from '@expo/vector-icons/AntDesign';
import { TriggerRef } from '@rn-primitives/select';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import React from "react";
import { ActivityIndicator, Platform, View } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function New() {
  const router = useRouter()
  const [pageState, onPageStateChange] = React.useState({loading: false})
  const [recipeName, onRecipeNameChange] = React.useState('')
  const [isPublic, onChangePublic] = React.useState(false)
  
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

  function onSwitchLabelPress() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onChangePublic((prev) => !prev);
  }

  function onCheckedChange(checked: boolean) {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onChangePublic(checked);
  }


  const validateLetter = (x : string, cb : Function) => {
    cb(x.replace(/[^a-zA-Z\s]/g, ''))
  }

  const [ingredients, onIngredientsChange] = React.useState([{index: Number(1), value: {name: '', quantity: '', unit: ''}}])
  const [currIngredientIX, onCurrIngredientIXChange] = React.useState(1)
  const addIngredient = () => {
    const ix = currIngredientIX + 1
    onCurrIngredientIXChange(ix)
    onIngredientsChange([...ingredients, {index: ix, value: { name: '', quantity: '', unit: ''}}])
  }
  const removeIngredient = (ix : Number) => {
    const newIng = ingredients.filter((x) => ix != x.index)
    onIngredientsChange(newIng)
  }

  const setIngredient = (ix : Number, value: any) => {
    const newIng = ingredients.map((x) => {
      if (x.index == ix) {
        x.value = value
      }
      return x
    })
    console.log(newIng)
    onIngredientsChange(newIng)
  }

  const [steps, onStepsChange] = React.useState([{index: Number(1), step: ''}])
  const [currStepIX, onCurrStepIXChange] = React.useState(1)
  const addStep = () => {
    const ix = currStepIX + 1
    onCurrStepIXChange(ix)
    onStepsChange([...steps, {index: ix, step: ''}])
  }
  const removeStep = (ix : Number) => {
    const newIng = steps.filter((x) => ix != x.index)
    onStepsChange(newIng)
  }

  const setStep = (ix : Number, value: any) => {
    const newIng = steps.map((x) => {
      if (x.index == ix) {
        x.step = value
      }
      return x
    })
    onStepsChange(newIng)
  }

  const saveRecipe = async () => {
      const data = {
        recipeName,
        isPublic,
        steps: steps.map(x => x.step),
        ingredients: ingredients.map(x => x.value)
      }
      onPageStateChange({loading: true})
      API.POST("/recipe", data,
        (response : any) => {
          console.log("success: ", response)
          router.navigate("/recipe/" + response.recipeID)
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
          <CardTitle>Create Recipe</CardTitle>
        </CardHeader>
        <Separator />
        {pageState.loading ?
        <ActivityIndicator size="large" />
      : <CardContent>
          <View className="mb-2">
            <Label htmlFor="recipeName">Recipe name</Label> 
            <Input
              id="recipeName"
              className="my-2"
              keyboardType="default"
              placeholder="Recipe name..."
              onChangeText={(x) => validateLetter(x, onRecipeNameChange)}
              value={recipeName}
            />
          </View>
          <View className="grid grid-cols-5 items-center gap-2 mb-2">
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
                  "Your recipe will be public" :
                  "Your recipe will be private"
                }
              </Label>
            </View>
          </View>
          <Separator className="mb-4"/>
          <CardTitle>Ingredients</CardTitle>
          {ingredients.map((i, ix) => (
            <View className="mb-1" key={ix}>
              {
                ingredients.length == 1 ?
                <View>
                  <IngredientInput value={i.value} onValueChanged={(x) => { setIngredient(i.index, x)}}/>
                </View>
                :
                <View className='grid grid-cols-12'>
                  <View className='col-span-11'>
                    <IngredientInput value={i.value} onValueChanged={(x) => { setIngredient(i.index, x)}}/>
                  </View>
                  <View className="py-2">
                  <Button className='col-span-1' onPress={() => {removeIngredient(i.index)}}>
                    <AntDesign name='minus' color="white" size={24}></AntDesign>
                  </Button>
                  </View>
                </View>
              }
             
            </View>
          ))}
            
          <View
            className="w-full grid grid-cols-11 justify-items-center items-center gap-2 opacity-50 hover:opacity-100 transition-opacity block focus:ring-2 ring-0 cursor-pointer mb-4"
            onClick={addIngredient}>
            <View className="col-span-5 border border-b-2 rounded w-full" />
            <AntDesign name="plus-circle" size={24} color="black" className='col-span-1 mx-auto' />
            <View className="col-span-5 border border-b-2 rounded w-full" />
          </View>

          <Separator className="mb-4"/>
          <CardTitle className="mb-2">Steps</CardTitle>

          {steps.map((i, ix) => (
            <View className="mb-1 py-1" key={ix}>
              {
                steps.length == 1 ?
                <View className='grid grid-cols-12'>
                  {/* <TextArea value={i.value} onValueChanged={(x) => { setIngredient(i.index, x)}}/> */}
                  <Text className='col-span-1'>{ix + 1}).</Text>
                  <Textarea className='col-span-11' numberOfLines={4} placeholder="Type your step here." value={i.step} onChangeText={(x) => { setStep(i.index, x) }} />
                </View>
                :
                <View className='grid grid-cols-12'>
                  <Text className='col-span-1'>{ix + 1}).</Text>
                  <Textarea className='col-span-10' numberOfLines={4} placeholder="Type your step here." value={i.step} onChangeText={(x) => { setStep(i.index, x) }} />
                  <View className="py-2 col-span-1">
                    <Button className='col-span-1' onPress={() => {removeStep(i.index)}}>
                      <AntDesign name='minus' color="white" size={24}></AntDesign>
                    </Button>
                  </View>
                </View>
              }
             
            </View>
          ))}
            
          <View
            className="w-full grid grid-cols-11 justify-items-center items-center gap-2 opacity-50 hover:opacity-100 transition-opacity block focus:ring-2 ring-0 cursor-pointer mb-4"
            onClick={addStep}>
            <View className="col-span-5 border border-b-2 rounded w-full" />
            <AntDesign name="plus-circle" size={24} color="black" className='col-span-1 mx-auto' />
            <View className="col-span-5 border border-b-2 rounded w-full" />
          </View>


        </CardContent>}
        <Separator />
        <CardFooter>
          <View className="w-full mx-auto">
            <Button className="w-full" onPress={() => saveRecipe()}>
              <Text>Save Recipe</Text>
            </Button>
          </View>
        </CardFooter>
      </Card>
    </View>
  );
}


