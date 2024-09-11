import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {colors} from '../../assets/colors';
import Text from '../components/Text';
import ArrowRight from '../../assets/icons/arrow-right.svg';

type PostCardProps = {
  title: string;
  description: string;
  onSeeMorePress: () => void;
};

const PostCard = (props: PostCardProps) => {
  const {title, description, onSeeMorePress} = props;
  return (
    <View style={styles.postCard}>
      <Text style={styles.postTitle}>{title}</Text>
      <Text
        style={styles.postDescription}
        numberOfLines={4}
        ellipsizeMode="tail">
        {description}
      </Text>
      <TouchableOpacity
        style={styles.postCardFooterContainer}
        onPress={onSeeMorePress}>
        <Text style={styles.seeMoreText}>See More</Text>
        <ArrowRight width={32} height={32} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  postCard: {
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.cloudySilver,
  },
  postTitle: {
    fontSize: 16,
    color: colors.darkNavy,
    lineHeight: 16,
    letterSpacing: 0.4,
    fontWeight: '600',
  },
  postDescription: {
    marginTop: 16,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
  },
  postCardFooterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    alignSelf: 'flex-end',
  },
  seeMoreText: {
    color: colors.darkNavy,
    marginRight: 24,
  },
});

export default PostCard;
