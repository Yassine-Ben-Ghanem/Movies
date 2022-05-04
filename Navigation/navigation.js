import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Search from "../components/search";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FavoritesFilm from "../components/favoritesFilm";
import Icon from "react-native-vector-icons/AntDesign";
// import Icon from "react-native-vector-icons/MaterialIcons";
// import Icon from "react-native-vector-icons/Entypo";
import Test from "../components/test";
import filmDetails from "../components/filmDetails";
import News from "../components/News";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="search" component={Search} />
      <Stack.Screen name="Details" component={filmDetails} />
    </Stack.Navigator>
  );
};

const Favorites = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Favorite films" component={FavoritesFilm} />
      <Stack.Screen name="Details" component={filmDetails} />
    </Stack.Navigator>
  );
};

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Favorites films") {
              iconName = "heart";
            } else if (route.name === "Search") {
              iconName = "search1";
            } else if (route.name === "news") {
              iconName = "new";
            }

            // You can return any component that you like here!
            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen
          name="Search"
          options={{ headerShown: false, tabBarShowLabel: false }}
          component={Navigation}
        />
        <Tab.Screen
          name="Favorites films"
          component={Favorites}
          options={{ tabBarShowLabel: false, headerShown: false }}
        />
        <Tab.Screen
          name="news"
          component={News}
          options={{ tabBarShowLabel: false, headerShown: false }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
