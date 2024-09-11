import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {colors} from '../../assets/colors';
import Text from '../components/Text';
import DrawerButton from '../components/DrawerButton';
import TasksIcon from '../../assets/icons/tasks.svg';
import PostsIcon from '../../assets/icons/posts.svg';
import UsersIcon from '../../assets/icons/profile.svg';
import AlbumIcon from '../../assets/icons/album.svg';
import {screenNames} from '../screens/screenNames';
import {DrawerContentComponentProps} from '@react-navigation/drawer';

const DrawerContent = (props: DrawerContentComponentProps) => {
  const {navigation, state} = props;

  const buttons = [
    {
      text: 'Kullanıcılar',
      icon: UsersIcon,
      onPress: () => navigation.navigate(screenNames.UserListScreen),
    },
    {
      text: 'Gönderiler',
      icon: PostsIcon,
      onPress: () => navigation.navigate(screenNames.PostsStack),
    },
    {
      text: 'Görevler',
      icon: TasksIcon,
      onPress: () => navigation.navigate(screenNames.TasksScreen),
    },
    {
      text: 'Albüm',
      icon: AlbumIcon,
      onPress: () => {},
    },
  ];
  return (
    <View style={styles.container}>
      <View style={styles.userImageContainer}>
        <Image
          source={{
            uri: 'https://randomuser.me/api/portraits/men/1.jpg',
          }}
          height={68}
          width={68}
          borderRadius={34}
        />
        <View style={styles.nameAndEmailContainer}>
          <Text style={styles.nameText}>Erkan Görgülü</Text>
          <Text style={styles.emailText}>erkangorgulu@gmail.com</Text>
        </View>
      </View>
      <View style={styles.drawerButtonsContainer}>
        {buttons.map((button, index) => (
          <DrawerButton
            key={index}
            text={button.text}
            icon={button.icon}
            isSelected={index === state.index}
            isLast={index === buttons.length - 1}
            onPress={button.onPress}
          />
        ))}
      </View>
      <View>
        <Image
          source={require('../../assets/images/company-logo.png')}
          style={styles.companyImage}
        />
        <Text style={styles.footerText}>2023 All Right Reserved N2Mobil</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    flex: 1,
  },
  userImageContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: colors.cloudySilver,
    paddingBottom: 10,
    alignItems: 'center',
    marginLeft: 14,
  },
  nameAndEmailContainer: {
    marginLeft: 14,
  },
  nameText: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '500',
    color: colors.darkNavy,
  },
  emailText: {
    fontSize: 14,
    lineHeight: 28,
    fontWeight: '300',
    color: colors.darkGray,
  },
  drawerButtonsContainer: {
    marginTop: 74,
    flex: 1,
  },
  companyImage: {
    width: 150,
    height: 40,
  },
  footerText: {
    marginTop: 10,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.5,
    fontWeight: '500',
    color: colors.deepSpaceSparkle,
  },
});

export default DrawerContent;
