import React, {useCallback, useRef} from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import SortIcon from '../../../assets/icons/sort.svg';
import FilterIcon from '../../../assets/icons/filter.svg';
import LocationIcon from '../../../assets/icons/location.svg';
import CompanyIcon from '../../../assets/icons/company.svg';
import WebsiteIcon from '../../../assets/icons/website.svg';
import {colors} from '../../../assets/colors';
import Text from '../../components/Text';
import CustomHeader from '../../components/CustomHeader';
import {DrawerScreenProps} from '@react-navigation/drawer';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import DetailCard from '../../components/DetailCard';
import UserCard from '../../components/UserCard';
import {DrawerParamList} from '../../navigation/paramsList';
import {screenNames} from '../screenNames';

interface Geo {
  lat?: string;
  lng?: string;
}

interface Address {
  street?: string;
  suite?: string;
  city?: string;
  zipcode?: string;
  geo?: Geo;
}

interface Company {
  name?: string;
  catchPhrase?: string;
  bs?: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address?: Address;
  phone?: string;
  website?: string;
  company?: Company;
  image?: string;
}

type ScreenProps = DrawerScreenProps<
  DrawerParamList,
  typeof screenNames.UserListScreen
>;

const UserListScreen = (props: ScreenProps) => {
  const [users, setUsers] = React.useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = React.useState<User[]>([]);
  const [searchText, setSearchText] = React.useState('');
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(true);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const {navigation} = props;

  React.useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(userData => {
        const tempData = userData.map((user: User) => {
          return {
            ...user,
            image: `https://randomuser.me/api/portraits/men/${user.id}.jpg`,
          };
        });
        setUsers(tempData);
        setLoading(false);
      });
  }, []);

  const userDetailPress = (user: User) => {
    setSelectedUser(user);
    bottomSheetRef.current?.expand();
  };

  const getSelectedUserAddress = () => {
    return `${selectedUser?.address?.street}, ${selectedUser?.address?.suite}, ${selectedUser?.address?.city}`;
  };

  const searchUsers = (text: string) => {
    setFilteredUsers(
      users.filter(user => {
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
        onDetailPress={() => userDetailPress(item)}
      />
    );
  };

  const renderBackdrop = useCallback(
    (backdropProps: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...backdropProps}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    [],
  );

  const renderFooter = () => {
    if (!loading) {
      return null;
    }
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={colors.slateGrey} />
      </View>
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
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.actionButton}>
          <SortIcon width={24} height={24} />
          <Text style={styles.sortAndFilterText}>Sırala</Text>
        </TouchableOpacity>
        <View style={styles.actionButtonSeparator} />
        <TouchableOpacity style={styles.actionButton}>
          <FilterIcon width={24} height={24} />
          <Text style={styles.sortAndFilterText}>Filtrele</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        contentContainerStyle={styles.listContentContainer}
        data={
          filteredUsers.length > 0 || searchText.length > 0
            ? filteredUsers
            : users
        }
        renderItem={renderUser}
        keyExtractor={user => String(user.id)}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={renderFooter}
      />
      <BottomSheet
        ref={bottomSheetRef}
        enableDynamicSizing
        handleComponent={null}
        index={-1}
        backdropComponent={renderBackdrop}>
        <BottomSheetView style={styles.bottomSheetContainer}>
          <Text style={styles.bottomSheetUserName}>{selectedUser?.name}</Text>
          <DetailCard
            icon={LocationIcon}
            title="Konum"
            description={getSelectedUserAddress()}
          />
          <DetailCard
            icon={CompanyIcon}
            title="Firma"
            description={selectedUser?.company?.name!}
          />
          <DetailCard
            icon={WebsiteIcon}
            title="Website"
            description={selectedUser?.website!}
          />
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    marginTop: 25,
    borderWidth: 1,
    borderColor: colors.cloudySilver,
    marginHorizontal: 20,
    borderRadius: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 5,
    justifyContent: 'center',
  },
  actionButtonSeparator: {
    width: 1,
    height: '100%',
    backgroundColor: colors.cloudySilver,
  },
  sortAndFilterText: {
    marginLeft: 15,
    color: colors.slateGrey,
  },
  listContentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  bottomSheetContainer: {
    backgroundColor: colors.white,
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 16,
  },
  bottomSheetUserName: {
    fontSize: 24,
    letterSpacing: 0.4,
    fontWeight: '600',
    color: colors.darkNavy,
  },
  loaderContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
});

export default UserListScreen;
