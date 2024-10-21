import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from 'react-native';
import { roomStore } from '../../stores/RoomListStore';

interface SortDialogProps {
  visible: boolean;
  onClose: () => void;
}

export const SortDialog: React.FC<SortDialogProps> = ({ visible, onClose }) => {
  const [selectedSort, setSelectedSort] = useState<'capacity' | 'availability' | 'level' | null>(null);

  const handleReset = () => {
    setSelectedSort(null);
  };

  const handleApply = () => {
    if (selectedSort) {
      roomStore.setSortCriteria(selectedSort);
    }
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose} 
    >
      {/* Touchable overlay to dismiss the modal when tapping outside */}
      <Pressable style={styles.overlay} onPress={onClose}>
        <View style={styles.container}>
          <Pressable style={styles.dialog} onPress={() => {}}>
            <Text style={styles.title}>Sort</Text>

            {/* Sorting options */}
            <TouchableOpacity
              style={styles.optionRow}
              onPress={() => setSelectedSort('level')}
            >
              <Text style={styles.optionText}>Location</Text>
              <View style={selectedSort === 'level' ? styles.selectedCircle : styles.circle} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.optionRow}
              onPress={() => setSelectedSort('capacity')}
            >
              <Text style={styles.optionText}>Capacity</Text>
              <View style={selectedSort === 'capacity' ? styles.selectedCircle : styles.circle} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.optionRow}
              onPress={() => setSelectedSort('availability')}
            >
              <Text style={styles.optionText}>Availability</Text>
              <View style={selectedSort === 'availability' ? styles.selectedCircle : styles.circle} />
            </TouchableOpacity>

            {/* Reset and Apply buttons */}
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
                <Text style={styles.buttonText}>Reset</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
                <Text style={styles.buttonText}>Apply</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Transparent background
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  dialog: {
    backgroundColor: 'white',
    width: '80%',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 10,
  },
  selectedCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#6e85ff',
    marginRight: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '100%',
  },
  resetButton: {
    flex: 1,
    backgroundColor: '#4a4a4a',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
    alignItems: 'center',
  },
  applyButton: {
    flex: 1,
    backgroundColor: '#6e85ff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
