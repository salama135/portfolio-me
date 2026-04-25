import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Linking from 'expo-linking';
import { StatusBar } from 'expo-status-bar';
import type { RootStackParamList } from './src/navigation/types';
import { FlagshipDemoScreen } from './src/screens/FlagshipDemoScreen';
import { HomeScreen } from './src/screens/HomeScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const linking = {
  prefixes: [Linking.createURL('/'), 'portfolio://'],
  config: {
    screens: {
      Home: '',
      FlagshipDemo: 'demo/:slug',
    },
  },
};

export default function App() {
  return (
    <NavigationContainer linking={linking}>
      <StatusBar style="dark" />
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerTitleStyle: { fontWeight: '600' },
          contentStyle: { backgroundColor: '#ffffff' },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
        <Stack.Screen name="FlagshipDemo" component={FlagshipDemoScreen} options={{ title: 'Flagship' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
