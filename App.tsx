import { StatusBar } from 'react-native';
import {List} from './src/screens/List';
import {GestureHandlerRootView} from 'react-native-gesture-handler';


export default function App() {
  return (
    <GestureHandlerRootView style={{flex:1}}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <List />
    </GestureHandlerRootView>
  );
}

