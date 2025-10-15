import { Input } from '@/components/ui/input';
import { NativeSelectScrollView, Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Units } from '@/lib/units';
import { TriggerRef } from '@rn-primitives/select';
import React from "react";
import { Platform, View } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function IngredientInput({ value, onValueChanged }) {
  const [ingredient, onIngredientChange] = React.useState(value.ingredient)
  React.useEffect(() => { onIngredientChange(value.ingredient) }, [value]);
  const [quantity, onQuantityChange] = React.useState(value.quantity)
  React.useEffect(() => { onQuantityChange(value.quantity) }, [value]);
  const [unit, onUnitChange] = React.useState(value.unit)
  React.useEffect(() => { onUnitChange(value.unit) }, [value]);
  
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



  const validateNumber = (x : string) => {
    return x.replace(/[^0-9\.\/]/g, '')
  }

  const validateLetter = (x : string) => {
    return x.replace(/[^a-zA-Z\s]/g, '')
  }

  const onIngredientInput = (x: any) => {
    const x_new = validateLetter(x)
    onIngredientChange(x_new)

    onValueChanged({ingredient: x_new, quantity, unit})
  }

  const onQuantityInput= (x: any) => {
    const x_new = validateNumber(x)
    onQuantityChange(x_new)

    onValueChanged({ingredient, quantity: x_new, unit})
  }

  const onUnitInput = (x: any) => {
    const x_new = x//validation(x)
    onUnitChange(x_new)

    onValueChanged({ingredient, quantity, unit: x_new.value})
  }

  return (
    <View className="grid grid-cols-6 gap-1">
      <View className="col-span-3">
        <Input
          id="ingredient"
          className="my-2"
          keyboardType="default"
          placeholder="Ingredient"
          onChangeText={onIngredientInput}
          value={ingredient}
        />
        </View>
      <View className="col-span-1">
        <Input
          id="quantity"
          className="my-2"
          keyboardType="numeric"
          placeholder="0"
          onChangeText={onQuantityInput}
          value={quantity}
        />
      </View>
      <View className="col-span-2 py-2">
        <Select className="w-full" onValueChange={onUnitInput}>
          <SelectTrigger className='w-full' ref={ref} onTouchStart={onTouchStart} >
            <SelectValue placeholder="unit" />
          </SelectTrigger>
          <SelectContent insets={contentInsets} className='w-full'>
            <NativeSelectScrollView>
              <SelectGroup>
                {Units.map((unitgroup) => {
                  return (
                    <View key={unitgroup.type}>
                      <SelectLabel>{unitgroup.type}</SelectLabel>
                      {unitgroup.units.map((unit) => (
                        <SelectItem key={unit.value} label={unit.label} value={unit.value}>
                          {unit.label}
                        </SelectItem>
                      ))}
                      <SelectSeparator />
                    </View>
                  )
                })}
              </SelectGroup>
            </NativeSelectScrollView>
          </SelectContent>
        </Select>
      </View>
    </View>
  );
}


