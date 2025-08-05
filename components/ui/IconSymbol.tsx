// Fallback for using MaterialIcons on Android and web.
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolWeight, SymbolViewProps } from 'expo-symbols';
import { ComponentProps } from 'react';
import { OpaqueColorValue, type StyleProp, type TextStyle } from 'react-native';
import { AntDesign, FontAwesome6 } from '@expo/vector-icons';

type MaterialIconMapping = Record<SymbolViewProps['name'], ComponentProps<typeof MaterialIcons>['name']>;
type AntDesignMapping = Record<SymbolViewProps['name'], ComponentProps<typeof AntDesign>['name']>;
type Awesome6Mapping = Record<SymbolViewProps['name'], ComponentProps<typeof FontAwesome6>['name']>;
type IconSymbolName = keyof typeof MAPPING;

/**
 * Add your SF Symbols to Material Icons mappings here.
 * - see Material Icons in the [Icons Directory](https://icons.expo.fyi).
 * - see SF Symbols in the [SF Symbols](https://developer.apple.com/sf-symbols/) app.
 */
const MAPPING = {
  'house.fill': 'home',
  'paperplane.fill': 'send',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',
} as MaterialIconMapping;


 const ANTMAPPING = {
  'plus.circle.fill': 'pluscircle'
 } as AntDesignMapping;

 const AWESOMEMAPPING = {
  'dumbbell':'dumbbell'
 } as Awesome6Mapping
/**
 * An icon component that uses native SF Symbols on iOS, and Material Icons on Android and web.
 * This ensures a consistent look across platforms, and optimal resource usage.
 * Icon `name`s are based on SF Symbols and require manual mapping to Material Icons.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
  weight,
}: 
{
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}){

  if (ANTMAPPING[name]){
  return <AntDesign color={color} size={size} name={ANTMAPPING[name]} style={style} weight={weight} />;
  }
  
  if ((MAPPING[name])){
  return <MaterialIcons color={color} size={size} name={MAPPING[name]} style={style} weight={weight} />;
  }

  if (AWESOMEMAPPING[name]){
    return <FontAwesome6 color={color} size={size} name={AWESOMEMAPPING[name]} style={style} weight={weight} />;
  }
}
