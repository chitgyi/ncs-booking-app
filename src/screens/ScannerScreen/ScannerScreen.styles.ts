import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000',  // Ensures the background is black for the camera view
  },
  fullScreenCamera: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  rnholeView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
   backgroundColor: 'rgba(128,128,128,0.3)'
  },
});
