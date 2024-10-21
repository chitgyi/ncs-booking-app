import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import {
  SafeAreaView,
  Text,
  Button,
  FlatList,
  View,
  TouchableOpacity,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { roomStore } from '../../stores/RoomListStore';
import { styles } from './RoomListScreen.styles';
import { Room } from '../../types/Room';
import { SortDialog } from '../../components/dialogs/SortDialog';

interface RoomListScreenProps {
  navigation: any;
}

export const RoomListScreen: React.FC<RoomListScreenProps> = observer(() => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [showSortDialog, setShowSortDialog] = useState(false);

  useEffect(() => {
    roomStore.fetchRooms();
  }, []);

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);

  const showTimePicker = () => setTimePickerVisibility(true);
  const hideTimePicker = () => setTimePickerVisibility(false);

  const handleConfirmDate = (date: Date) => {
    roomStore.setDate(date);
    hideDatePicker();
  };

  const handleConfirmTime = (time: Date) => {
    roomStore.setTime(time);
    hideTimePicker();
  };

  const handleSort = (criteria: 'capacity' | 'availability' | 'level') => {
    roomStore.setSortCriteria(criteria);
    setShowSortDialog(false);
  };

  const renderRoomItem = ({ item }: { item: Room }) => (
    <View style={styles.roomCard}>
      <View style={styles.row}>
        <Text style={styles.roomName}>{item.name}</Text>
        <Text
          style={
            roomStore.checkAvailability(item) === 1
              ? styles.available
              : styles.notAvailable
          }
        >
          {roomStore.checkAvailability(item) === 1 ? 'Available' : 'Not Available'}
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.roomLevel}>Level {item.level}</Text>
        <Text style={styles.roomCapacity}>{item.capacity} Pax</Text>
      </View>
    </View>
  );

  if (roomStore.isLoading) {
    return <Text>Loading rooms...</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Date Selection */}
      <TouchableOpacity onPress={showDatePicker}>
        <Text style={styles.label}>Date</Text>
        <Text style={styles.value}>{roomStore.selectedDate.toDateString()}</Text>
      </TouchableOpacity>

      {/* Time Selection */}
      <TouchableOpacity onPress={showTimePicker}>
        <Text style={styles.label}>Timeslot</Text>
        <Text style={styles.value}>{roomStore.formatTime(roomStore.selectedTime)}</Text>
      </TouchableOpacity>

      {/* Modal Date Picker */}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirmDate}
        onCancel={hideDatePicker}
      />

      {/* Modal Time Picker */}
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleConfirmTime}
        onCancel={hideTimePicker}
      />

      <View style={styles.row}>
        <Text>Rooms</Text>
        <Button title="Sort" onPress={() => setShowSortDialog(true)} />
      </View>

     {/* Sort Dialog */}
     <SortDialog visible={showSortDialog} onClose={() => setShowSortDialog(false)} />

      {/* Room List */}
      <FlatList data={roomStore.rooms} renderItem={renderRoomItem} keyExtractor={(item) => item.name} />
    </SafeAreaView>
  );
});
