import React from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import SortIcon from '../../../assets/icons/sort.svg';
import FilterIcon from '../../../assets/icons/filter.svg';
import {colors} from '../../../assets/colors';
import Text from '../../components/Text';
import CustomHeader from '../../components/CustomHeader';
import {DrawerScreenProps} from '@react-navigation/drawer';
import PostCard from '../../components/PostCard';
import {screenNames} from '../screenNames';
import {PostsStackParamList} from '../../navigation/paramsList';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

type ScreenProps = DrawerScreenProps<
  PostsStackParamList,
  typeof screenNames.PostsScreen
>;

const PostsScreen = (props: ScreenProps) => {
  const [posts, setPosts] = React.useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = React.useState<Post[]>([]);
  const [searchText, setSearchText] = React.useState('');
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [hasMore, setHasMore] = React.useState(true);
  const [initialLoading, setInitialLoading] = React.useState(true);
  const {navigation} = props;

  const fetchPosts = React.useCallback(() => {
    if (loading || !hasMore) {
      return;
    }
    setLoading(true);
    fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`)
      .then(response => response.json())
      .then(postData => {
        if (postData.length === 0) {
          setHasMore(false);
        } else {
          setPosts(prevPosts => [...prevPosts, ...postData]);
          setPage(prevPage => prevPage + 1);
        }
        setLoading(false);
        setInitialLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setInitialLoading(false);
      });
  }, [page, loading, hasMore]);

  React.useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const renderPost = ({item: post}: {item: Post}) => {
    return (
      <PostCard
        key={post.id}
        title={post.title}
        description={post.body}
        onSeeMorePress={() => {
          navigation.navigate(screenNames.PostDetailScreen, {postId: post.id});
        }}
      />
    );
  };

  const searchPosts = (text: string) => {
    setFilteredPosts(
      posts.filter(post => {
        const searchLower = text.toLowerCase();
        const titleLower = post.title.toLowerCase();
        return titleLower.includes(searchLower);
      }),
    );
  };

  const renderFooter = () => {
    if (!loading) {
      return null;
    }
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="small" color={colors.slateGrey} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <CustomHeader
        searchText={searchText}
        setSearchText={setSearchText}
        onProfilePress={() => {
          // NOT IMPLEMENTED
        }}
        onMenuPress={() => {
          navigation.openDrawer();
        }}
        search={searchPosts}
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
      {initialLoading ? (
        <View style={styles.initialLoadingContainer}>
          <ActivityIndicator size="large" color={colors.slateGrey} />
        </View>
      ) : (
        <FlatList
          contentContainerStyle={styles.listContentContainer}
          data={
            filteredPosts.length > 0 || searchText.length > 0
              ? filteredPosts
              : posts
          }
          renderItem={renderPost}
          keyExtractor={item => String(item.id)}
          showsVerticalScrollIndicator={false}
          onEndReached={fetchPosts}
          onEndReachedThreshold={0.1}
          ListFooterComponent={renderFooter}
        />
      )}
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
    backgroundColor: '#fff',
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
    gap: 10,
  },
  loaderContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  initialLoadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PostsScreen;
