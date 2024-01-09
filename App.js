import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Dimensions } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
const Tab = createBottomTabNavigator();
import News from './screens/News';
import { NavigationContainer } from "@react-navigation/native";
import Profile from "./screens/Profile.jsx";
import Home from "./screens/Home.jsx";
import Setting from "./screens/Setting.jsx";


function BottomTabs() {
  const windowWidth = Dimensions.get('window').width;
  const widthPercentage = 90; // 80% of the screen width
  const width = (windowWidth * widthPercentage) / 100;
  return (
    <Tab.Navigator screenOptions={{tabBarStyle:{  display:"flex",borderRadius:10, width:width,marginLeft:"auto",marginRight:"auto",marginBottom:10}}} >
      <Tab.Screen
        name="News"
        component={News}
        initialParams={{
          pagesize: 15,
          country: "in",
          category: "general",
        }}
        options={{
          tabBarShowLabel:false,
          headerShown: false,
          tabBarIcon: ({ focused }) => 
            focused ? (
                <Entypo name="home" size={28} color="#FF007F" />
            ) : (
                <AntDesign name="home" size={28} color="#FF007F" />
            ),
        }}
      />
      
      {/* Location  */}
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarShowLabel:false,
          headerShown: false,
          tabBarIcon: ({ focused }) => 
            focused ? (
              <Entypo name="location-pin" size={34} color="#FF007F" />
            ) : (
              <EvilIcons name="location" size={34} color="#FF007F" />
            ),
        }}
      /> 
      
      {/* contact */}
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarShowLabel:false,
          headerShown: false,
          tabBarIcon: ({ focused }) => 
            focused ? (
              <MaterialCommunityIcons name="contacts" size={28} color="#FF007F" />
            ) : (
              <MaterialCommunityIcons name="contacts-outline" size={28} color="#FF007F" />
            ),
        }}
      />

      {/* profile */}
      
      <Tab.Screen
        name="Setting"
        component={Setting}
        options={{  
          tabBarShowLabel:false,
          headerShown: false,
          tabBarIcon: ({ focused }) => 
            focused ? (
              <Ionicons name="person" size={28} color="#FF007F" />
            ) : (
              <Ionicons name="person-outline" size={28} color="#FF007F" />
            ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const Stack = createNativeStackNavigator();
  const apikey="75c7fbc663db4439b83cdadb0ddf531c"
  const pagesize=15;
  return (
      <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen
          name="main"
          component={BottomTabs}
          options={{ headerShown: false}}
      />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


