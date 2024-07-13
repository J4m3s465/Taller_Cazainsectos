import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "../screens/LoginScreen";
import RegistroScreen from "../screens/RegistroScreen";
import HomeScreen from "../screens/HomeScreen";
import HighScoreScreen from "../screens/HighScoreScreen";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import GameOverScreen from "../screens/GameOverScreen";

const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();

function MyStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Registro" component={RegistroScreen} />
      <Stack.Screen name="Tabs" component={MyTabs} />
      <Stack.Screen name="GameOver" component={GameOverScreen} />
    </Stack.Navigator>
  );
}

function MyTabs() {
  return (
    <Tabs.Navigator>
      <Tabs.Screen name="Game" component={HomeScreen} />
      <Tabs.Screen name="Scores" component={HighScoreScreen} />
    </Tabs.Navigator>
  );
}

export default function MainNavigator() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
