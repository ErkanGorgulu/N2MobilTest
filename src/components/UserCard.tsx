import React from 'react';
import {View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import MoreIcon from '../../assets/icons/more.svg';
import UncheckedFavoriteIcon from '../../assets/icons/unchecked-favorite.svg';
import CheckedFavoriteIcon from '../../assets/icons/checked-favorite.svg';
import {colors} from '../../assets/colors';
import Text from '../components/Text';
import favoritesStore from '../stores/favoriteUsersStore';
import {observer} from 'mobx-react-lite';

type UserCardProps = {
  image?: string;
  name: string;
  email: string;
  phone?: string;
  onDetailPress?: () => void;
  userId: number;
};

const UserCard = observer((props: UserCardProps) => {
  const {image, name, email, phone, onDetailPress, userId} = props;

  const handleFavoritePress = () => {
    if (favoritesStore.isFavorite(userId)) {
      favoritesStore.removeFavorite(userId);
    } else {
      favoritesStore.addFavorite({
        id: userId,
        name,
        email,
        phone,
        image,
        username: name,
      });
    }
  };

  return (
    <View style={styles.userCard}>
      <View style={styles.userImageContainer}>
        <Image
          source={
            image
              ? {uri: image}
              : require('../../assets/images/placeholder.png')
          }
          style={[styles.userImage, !image && styles.placeHolderImage]}
        />
      </View>
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{name}</Text>
        <Text style={styles.userEmail}>{email}</Text>
        <Text style={styles.userPhone}>{phone}</Text>
      </View>
      <TouchableOpacity
        style={styles.favoriteButton}
        onPress={handleFavoritePress}>
        {favoritesStore.isFavorite(userId) ? (
          <CheckedFavoriteIcon width={24} height={24} />
        ) : (
          <UncheckedFavoriteIcon width={24} height={24} />
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.userDetailButton}
        onPress={() => {
          onDetailPress && onDetailPress();
        }}>
        <MoreIcon width={24} height={24} />
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  userCard: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.cloudySilver,
  },
  userImageContainer: {
    width: 68,
    height: 68,
    borderRadius: 4,
    marginRight: 12,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userImage: {
    width: 68,
    height: 68,
  },
  placeHolderImage: {
    height: 40,
    width: 40,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    color: colors.darkNavy,
    lineHeight: 20,
    letterSpacing: 0.25,
    fontWeight: '400',
  },
  userEmail: {
    fontSize: 10,
    color: colors.darkGray,
    lineHeight: 16,
    letterSpacing: 0.4,
    fontWeight: '400',
  },
  userPhone: {
    marginTop: 14,
    fontSize: 12,
    color: colors.darkGray,
    lineHeight: 16,
    letterSpacing: 0.4,
    fontWeight: '300',
  },
  favoriteButton: {
    padding: 5,
    marginRight: 5,
    alignSelf: 'flex-start',
  },
  userDetailButton: {
    padding: 5,
    alignSelf: 'flex-start',
  },
});

export default UserCard;
