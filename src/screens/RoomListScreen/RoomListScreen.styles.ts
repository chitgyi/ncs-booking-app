import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    margin: 24,
  },
  label: {
    fontSize: 16,
    color: '#aaa',
    marginBottom: 5,
  },
  value: {
    fontSize: 18,
    color: '#000',
    marginBottom: 20,
  },
  roomCard: {
    padding: 20,
    marginVertical: 10,
    backgroundColor: '#ffffff',
    borderRadius: 8,
  },
  roomName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  roomLevel: {
    fontSize: 16,
    color: '#777',
  },
  roomCapacity: {
    fontSize: 16,
    color: '#777',
  },
  available: {
    fontSize: 16,
    color: 'green',
  },
  notAvailable: {
    fontSize: 16,
    color: 'red',
  },
  sortDialog: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'space-between',
    alignItems: 'center'
  }
});
