import React from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import Text from './Text';
import {colors} from '../../assets/colors';
import {SvgProps} from 'react-native-svg';

type Detail = {
  icon?: React.FC<SvgProps>;
  title: string;
  description: string;
  containerStyle?: StyleProp<ViewStyle>;
};

const DetailCard = (props: Detail) => {
  const {icon: Icon, title, description} = props;
  return (
    <View style={[styles.container, props.containerStyle]}>
      <View style={styles.iconAndTitleContainer}>
        {Icon && <Icon style={styles.icon} height={24} width={24} />}
        <Text style={styles.title}>{title}</Text>
      </View>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: colors.cloudySilver,
  },
  iconAndTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    minHeight: 24,
  },
  icon: {
    marginRight: 12,
  },
  title: {
    color: colors.darkNavy,
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0.1,
  },
  description: {
    color: colors.darkGray,
    fontSize: 14,
    fontWeight: '300',
    letterSpacing: 0.1,
    lineHeight: 20,
  },
});

export default DetailCard;
