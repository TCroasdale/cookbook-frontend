import { NativeSelectScrollView, Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TriggerRef } from '@rn-primitives/select';
import React from "react";
import { Platform, View } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function PermissionInput({ value, placeholder, onValueChanged, inputLabel, className, ls }) {
  const [permission, onPermissionChange] = React.useState(value)
 
  React.useEffect(() => { onPermissionChange(value) }, [value]);
  
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

  const onUnitInput = (x: any) => {
    const x_new = x//validation(x)
    onPermissionChange(x_new)

    if (onValueChanged) onValueChanged(x_new.value)
  }

  return (
    <View className={"grid grid-cols-1 " + className}>
      <View className="col-span-1 py-2">
        <Select className="w-full" onValueChange={onUnitInput}>
          <SelectTrigger className='w-full' ref={ref} onTouchStart={onTouchStart} >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent insets={contentInsets} className='w-full'>
            <NativeSelectScrollView>
              <SelectGroup>
                <SelectLabel>{inputLabel}</SelectLabel>
                  {ls.map((x, ix) => {
                    return (<SelectItem key={ix} label={x.label} value={x.value}>
                      {x.label}
                    </SelectItem>)
                  })}
              </SelectGroup>
            </NativeSelectScrollView>
          </SelectContent>
        </Select>
      </View>
    </View>
  );
}


