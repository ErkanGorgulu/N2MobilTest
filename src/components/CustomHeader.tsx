import React from 'react';
import {View, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import MenuIcon from '../../assets/icons/menu.svg';
import ProfileIcon from '../../assets/icons/profile.svg';
import MagnifyingGlassIcon from '../../assets/icons/magnifying-glass.svg';
import {colors} from '../../assets/colors';
import {useRoute} from '@react-navigation/native';
import {screenNames} from '../screens/screenNames';
import useDebounce from '../utils/debounce';

type HeaderProps = {
  searchText?: string;
  setSearchText: (text: string) => void;
  onProfilePress: () => void;
  onMenuPress: () => void;
  search?: (text: string) => void;
};

const Header = (props: HeaderProps) => {
  const {searchText, setSearchText, onProfilePress, onMenuPress, search} =
    props;
  const route = useRoute();
  const currentRouteName = route.name;

  const handleDebouncedChange = (_value: string) => {
    search && search(_value);
  };

  const debouncedChangeHandler = useDebounce(handleDebouncedChange, 500);

  const handleChange = (text: string) => {
    setSearchText(text);
    debouncedChangeHandler(text);
  };

  const getPlaceholderText = () => {
    switch (currentRouteName) {
      case screenNames.UserListScreen:
        return 'Kullanıcı ara';
      case screenNames.PostsScreen:
        return 'Post ara';
      case screenNames.TasksScreen:
        return 'Görev ara';
      case screenNames.FavoritesScreen:
        return 'Favori ara';
      default:
        return 'ara';
    }
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.menuAndProfileIconContainer}
        onPress={onMenuPress}>
        <MenuIcon width={28} height={28} />
      </TouchableOpacity>
      <View style={styles.searchContainer}>
        <MagnifyingGlassIcon width={20} height={20} />
        <TextInput
          style={styles.searchInput}
          placeholder={getPlaceholderText()}
          placeholderTextColor={colors.slateGrey}
          value={searchText}
          onChangeText={handleChange}
        />
      </View>

      <TouchableOpacity
        onPress={onProfilePress}
        style={styles.menuAndProfileIconContainer}>
        <ProfileIcon width={28} height={28} stroke={colors.steelGray} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderColor: colors.cloudySilver,
    backgroundColor: colors.white,
  },
  searchInput: {
    flex: 1,
    color: colors.slateGrey,
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
    letterSpacing: 0.4,
    paddingVertical: 0,
    fontFamily: 'Roboto-Regular',
  },
  menuAndProfileIconContainer: {
    height: 48,
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f3f5',
    borderRadius: 10,
    padding: 10,
    flex: 1,
    marginHorizontal: 10,
    height: 40,
  },
});

const CustomHeader = (props: HeaderProps) => <Header {...props} />;

export default CustomHeader;
