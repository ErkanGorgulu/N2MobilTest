import React from 'react';
import {
  Text as RNText,
  TextProps as RNTextProps,
  StyleSheet,
} from 'react-native';

export default function Text(props: RNTextProps) {
  return (
    <RNText style={[styles.text, props.style]} {...props}>
      {props.children}
    </RNText>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Roboto-Regular',
  },
});
