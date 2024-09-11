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
import {screenNames} from '../screenNames';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {DrawerParamList} from '../../navigation/paramsList';
import TaskCard from '../../components/TaskCard';

export type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

type ScreenProps = DrawerScreenProps<
  DrawerParamList,
  typeof screenNames.TasksScreen
>;

const TasksScreen = (props: ScreenProps) => {
  const {navigation} = props;
  const [tasks, setTasks] = React.useState<Todo[]>([]);
  const [filteredTasks, setFilteredTasks] = React.useState<Todo[]>([]);
  const [searchText, setSearchText] = React.useState('');
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [hasMore, setHasMore] = React.useState(true);
  const [initialLoading, setInitialLoading] = React.useState(true);

  const fetchTasks = React.useCallback(() => {
    if (loading || !hasMore) {
      return;
    }
    setLoading(true);
    fetch(`https://jsonplaceholder.typicode.com/todos?_page=${page}&_limit=30`)
      .then(response => response.json())
      .then(taskData => {
        if (taskData.length === 0) {
          setHasMore(false);
        } else {
          setTasks(prevTasks => [...prevTasks, ...taskData]);
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
    fetchTasks();
  }, [fetchTasks]);

  const renderTask = ({item: task}: {item: Todo}) => {
    return (
      <TaskCard
        key={task.id}
        id={task.id}
        title={task.title}
        completed={task.completed}
      />
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
        search={text => {
          const filtered = tasks.filter(task =>
            task.title.toLowerCase().includes(text.toLowerCase()),
          );
          setFilteredTasks(filtered);
        }}
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
            filteredTasks.length > 0 || searchText.length > 0
              ? filteredTasks
              : tasks
          }
          renderItem={renderTask}
          keyExtractor={item => String(item.id)}
          showsVerticalScrollIndicator={false}
          onEndReached={fetchTasks}
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
    gap: 13,
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

export default TasksScreen;
