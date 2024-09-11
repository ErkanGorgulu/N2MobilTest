//generate a react native scren

import React, {useEffect} from 'react';
import {FlatList, Image, StyleSheet, View} from 'react-native';
import Text from '../../components/Text';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {PostsStackParamList} from '../../navigation/paramsList';
import {screenNames} from '../screenNames';
import ArrowLeft from '../../../assets/icons/arrow-left.svg';
import MoreIcon from '../../../assets/icons/more.svg';
import {colors} from '../../../assets/colors';

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

type Comment = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
  image: string;
};

type ScreenProps = NativeStackScreenProps<
  PostsStackParamList,
  typeof screenNames.PostDetailScreen
>;
const PostDetailScreen = ({navigation, route}: ScreenProps) => {
  const {params} = route;
  const {postId} = params;
  const [postDetail, setPostDetail] = React.useState<Post>();
  const [commentsData, setCommentsData] = React.useState<Comment[]>([]);
  const [imageError, setImageError] = React.useState(false);
  console.log(postId);

  useEffect(() => {
    Promise.all([
      fetch('https://jsonplaceholder.typicode.com/posts/' + postId),
      fetch(
        'https://jsonplaceholder.typicode.com/posts/' + postId + '/comments',
      ),
    ]).then(([post, comments]) => {
      const postJson: Promise<Post> = post.json();
      const commentsJson: Promise<Comment[]> = comments.json();
      Promise.all([postJson, commentsJson]).then(
        ([postResponse, commentsResponse]) => {
          setPostDetail(postResponse);
          const tempComments = commentsResponse.map(comment => {
            return {
              ...comment,
              image: `https://randomuser.me/api/portraits/women/${comment.id}.jpg`,
            };
          });
          setCommentsData(tempComments);
        },
      );
    });
  }, [postId]);

  const renderPostHeader = () => {
    return (
      <View>
        <Text style={styles.postTitle}>{postDetail?.title}</Text>
        <Text style={styles.postBody}>{postDetail?.body}</Text>
        <Text style={styles.commentsText}>Comments</Text>
      </View>
    );
  };

  const renderComment = ({item}: {item: Comment}) => {
    return (
      <View style={styles.commentContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={
              !imageError && item.image
                ? {uri: item.image}
                : require('../../../assets/images/placeholder.png')
            }
            style={[styles.image, imageError && styles.placeHolderImage]}
            onError={() => setImageError(true)}
          />
        </View>
        <View style={styles.commentTitleAndBodyContainer}>
          <Text style={styles.commentTitle}>{item.name}</Text>
          <Text style={styles.commentBody} numberOfLines={5}>
            {item.body}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* This header could be a custom component like the other*/}
      <View style={styles.headerContainer}>
        <View style={styles.headerIconsContainer}>
          <ArrowLeft
            width={24}
            height={24}
            onPress={() => navigation.goBack()}
          />
        </View>
        <Text style={styles.headerTitle}>Post Detail</Text>
        <View style={styles.headerIconsContainer}>
          <MoreIcon width={24} height={24} stroke={colors.slateGrey} />
        </View>
      </View>

      <FlatList
        ListHeaderComponent={renderPostHeader}
        data={commentsData}
        renderItem={renderComment}
        contentContainerStyle={styles.flatListContentContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    height: 64,
    borderBottomWidth: 1,
    borderColor: colors.cloudySilver,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  headerIconsContainer: {
    height: 48,
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    flex: 1,
    marginLeft: 12,
    color: colors.darkNavy,
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.5,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.4,
    lineHeight: 16,
    color: colors.darkNavy,
  },
  postBody: {
    marginTop: 20,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.2,
    fontWeight: '400',
    color: colors.darkNavy,
  },
  commentsText: {
    marginTop: 20,
    fontSize: 20,
    lineHeight: 30,
    color: colors.darkNavy,
    fontWeight: '600',
  },
  commentContainer: {
    borderWidth: 1,
    borderColor: colors.cloudySilver,
    borderRadius: 8,
    padding: 10,
    flexDirection: 'row',
  },
  commentTitleAndBodyContainer: {
    marginLeft: 16,
    flex: 1,
  },
  commentTitle: {
    fontSize: 14,
    lineHeight: 14,
    letterSpacing: 0.2,
    fontWeight: '500',
    color: colors.darkNavy,
  },
  commentBody: {
    marginTop: 12,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
    color: colors.darkGray,
  },
  imageContainer: {
    width: 48,
    height: 48,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
  },
  image: {
    width: 48,
    height: 48,
  },
  placeHolderImage: {
    height: 24,
    width: 24,
  },
  flatListContentContainer: {
    gap: 20,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
});

export default PostDetailScreen;
