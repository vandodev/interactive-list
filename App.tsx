import { StatusBar } from 'react-native';
import {List} from './src/screens/List'

export default function App() {
  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <List />
    </>
  );
}

