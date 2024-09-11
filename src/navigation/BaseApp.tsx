import * as React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import UserListScreen from '../screens/secure/UserListScreen';
import {screenNames} from '../screens/screenNames';
import PostsScreen from '../screens/secure/PostsScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PostDetailScreen from '../screens/secure/PostDetailScreen';
import {DrawerParamList, PostsStackParamList} from './paramsList';
import TasksScreen from '../screens/secure/TasksScreen';
import DrawerContent from './DrawerContent';
import FavoritesScreen from '../screens/secure/FavoriteUsersScreen';

const Drawer = createDrawerNavigator<DrawerParamList>();
const Stack = createNativeStackNavigator<PostsStackParamList>();

const PostStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={screenNames.PostsScreen}>
      <Stack.Screen name={screenNames.PostsScreen} component={PostsScreen} />
      <Stack.Screen
        name={screenNames.PostDetailScreen}
        component={PostDetailScreen}
      />
    </Stack.Navigator>
  );
};

const renderDrawerContent = (props: DrawerContentComponentProps) => {
  return <DrawerContent {...props} />;
};

function App() {
  return (
    <GestureHandlerRootView>
      <NavigationContainer>
        <Drawer.Navigator
          drawerContent={renderDrawerContent}
          screenOptions={{
            headerShown: false,
            drawerStyle: {
              borderTopRightRadius: 40,
              borderBottomRightRadius: 40,
              padding: 22,
              width: '85%',
            },
          }}
          defaultStatus="closed"
          initialRouteName={screenNames.UserListScreen}>
          <Drawer.Screen
            name={screenNames.UserListScreen}
            component={UserListScreen}
          />
          <Drawer.Screen name={screenNames.PostsStack} component={PostStack} />
          <Drawer.Screen
            name={screenNames.TasksScreen}
            component={TasksScreen}
          />
          <Drawer.Screen
            name={screenNames.FavoritesScreen}
            component={FavoritesScreen}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default App;
