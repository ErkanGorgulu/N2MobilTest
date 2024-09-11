import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {colors} from '../../assets/colors';
import Text from './Text';
import {SvgProps} from 'react-native-svg';
import ChevronRightIcon from '../../assets/icons/chevron-right.svg';

type DrawerButtonProps = {
  icon: React.FC<SvgProps>;
  text: string;
  isSelected: boolean;
  isLast?: boolean;
  onPress: () => void;
};

const DrawerButton = (props: DrawerButtonProps) => {
  const {icon: Icon, text, isSelected, isLast, onPress} = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        isSelected && styles.isSelected,
        isLast && styles.isLast,
      ]}>
      <Icon width={24} height={24} />
      <Text style={[styles.text, isSelected && styles.selectedText]}>
        {text}
      </Text>
      {!isSelected && <ChevronRightIcon width={24} height={24} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    borderColor: colors.cloudySilver,
    paddingVertical: 16,
    paddingHorizontal: 20.5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  isSelected: {
    backgroundColor: colors.purpleIndigo10,
  },
  isLast: {
    borderBottomWidth: 1,
  },
  text: {
    flex: 1,
    marginLeft: 20,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.25,
    fontWeight: '400',
    color: colors.purpleIndigo,
  },
  selectedText: {
    fontWeight: '600',
  },
});

export default DrawerButton;
