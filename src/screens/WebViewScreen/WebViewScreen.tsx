import React from 'react';
import { StyleSheet, View, SafeAreaView, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';

interface WebViewScreenProps {
  navigation: any;
  route: any; 
}

export const WebViewScreen: React.FC<WebViewScreenProps> = ({ navigation, route }) => {
  const { uri } = route.params;

  const goToHome = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'RoomList' }],
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.webviewContainer}>
        {/* WebView to load the URL passed in navigation params */}
        <WebView
          source={{ uri }} 
          style={styles.webview}
          startInLoadingState={true}
          renderLoading={() => <ActivityIndicator size="large" color="#0000ff" />}
          javaScriptEnabled={true}
          domStorageEnabled={true}
        />

        {/* Primary Button stacked over WebView at the center-bottom */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.primaryButton} onPress={goToHome}>
            <Text style={styles.buttonText}>Back to Home</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webviewContainer: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#2039a8',
    paddingVertical: 12,
    paddingHorizontal: 45,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF', 
    fontSize: 16,
    fontWeight: 'bold',
  },
});
