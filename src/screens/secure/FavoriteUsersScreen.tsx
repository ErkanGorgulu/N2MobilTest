import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {colors} from '../../../assets/colors';
import Text from '../../components/Text';
import CustomHeader from '../../components/CustomHeader';
import {DrawerScreenProps} from '@react-navigation/drawer';
import UserCard from '../../components/UserCard';
import {DrawerParamList} from '../../navigation/paramsList';
import {screenNames} from '../screenNames';
import favoritesStore from '../../stores/favoriteUsersStore';
import {observer} from 'mobx-react-lite';
import {User} from './UserListScreen';
import {useFocusEffect} from '@react-navigation/native';

type ScreenProps = DrawerScreenProps<
  DrawerParamList,
  typeof screenNames.FavoritesScreen
>;

const FavoritesScreen = observer((props: ScreenProps) => {
  const [searchText, setSearchText] = React.useState('');
  const [filteredUsers, setFilteredUsers] = React.useState(
    favoritesStore.favoriteUsers,
  );
  const {navigation} = props;

  useFocusEffect(
    React.useCallback(() => {
      setFilteredUsers(favoritesStore.favoriteUsers);
    }, []),
  );

  const searchUsers = (text: string) => {
    setFilteredUsers(
      favoritesStore.favoriteUsers.filter(user => {
        const searchLower = text.toLowerCase();
        const nameLower = user.name.toLowerCase();
        const emailLower = user.email.toLowerCase();
        return (
          nameLower.includes(searchLower) || emailLower.includes(searchLower)
        );
      }),
    );
  };

  const renderUser = ({item}: {item: User}) => {
    return (
      <UserCard
        key={item.id}
        name={item.name}
        email={item.email}
        phone={item.phone}
        image={item.image}
        userId={item.id}
      />
    );
  };

  return (
    <View style={styles.container}>
      <CustomHeader
        searchText={searchText}
        setSearchText={setSearchText}
        onProfilePress={() => {
          // NO-OP
        }}
        onMenuPress={() => {
          navigation.openDrawer();
        }}
        search={searchUsers}
      />
      {favoritesStore.favoriteUsers.length === 0 ? (
        <View style={styles.emptyStateContainer}>
          <Text style={styles.emptyStateText}>No favorite users yet</Text>
        </View>
      ) : (
        <FlatList
          contentContainerStyle={styles.listContentContainer}
          data={
            filteredUsers.length > 0 || searchText.length > 0
              ? filteredUsers
              : favoritesStore.favoriteUsers
          }
          renderItem={renderUser}
          keyExtractor={user => String(user.id)}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  listContentContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 18,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 18,
    color: colors.darkGray,
  },
});

export default FavoritesScreen;
