import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import CheckedIcon from '../../assets/icons/checked.svg';
import UncheckedIcon from '../../assets/icons/unchecked.svg';
import Text from './Text';

type TaskCardProps = {
  id: number;
  completed: boolean;
  title: string;
};

const TaskCard = (props: TaskCardProps) => {
  const {completed, title} = props;
  const [isChecked, setIsChecked] = React.useState(completed);

  const onTogglePress = () => {
    //send a request to toggle the task
    //setting it here instead of TasksScreen prevents re-rendering of other cards
    setIsChecked(!isChecked);
  };

  return (
    <TouchableOpacity style={styles.taskCard} onPress={onTogglePress}>
      {isChecked ? (
        <CheckedIcon width={24} height={24} />
      ) : (
        <UncheckedIcon width={24} height={24} />
      )}
      <Text style={styles.taskTitle}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  taskCard: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskTitle: {
    flex: 1,
    marginLeft: 8,
  },
});

export default TaskCard;
