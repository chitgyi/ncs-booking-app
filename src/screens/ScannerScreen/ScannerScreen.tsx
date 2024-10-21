import React, { useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Alert, SafeAreaView, Text, AppState, AppStateStatus } from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCodeScanner,
} from 'react-native-vision-camera';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { styles } from './ScannerScreen.styles';
import { scannerStore } from './../../stores/ScannerStore';
import { RNHoleView } from 'react-native-hole-view';
import { RootStackParamList } from '../../navigation/AppNavigation/AppNavigation';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types';
import { permissionStore } from '../../stores/PermissionStore';
import { getWindowHeight, getWindowWidth, isValidUrl } from '../../utils/helpers';
import { runInAction } from 'mobx';

type scannerProp = NativeStackNavigationProp<RootStackParamList, 'Scanner'>;

export const ScannerScreen = observer(() => {
  const navigation = useNavigation<scannerProp>();
  const camera = useRef<Camera>(null);
  const device = useCameraDevice('back');
  const [isCameraActive, setIsCameraActive] = useState(true); // State to control camera activity

  const handleAppStateChange = (nextAppState: AppStateStatus) => {
    if (nextAppState === 'active') {
      setIsCameraActive(true);
    } else if (nextAppState === 'background' || nextAppState === 'inactive') {
      setIsCameraActive(false);
    }
  };

  useEffect(() => {
    // Request camera permission when the component is mounted
    permissionStore.requestCameraPermission();

    // Add app state listener for foreground/background handling
    const subscription = AppState.addEventListener('change', handleAppStateChange);

    // Clean up the subscription on unmount
    return () => {
      subscription.remove();
    };
  }, []);

  const codeScanner = useCodeScanner({
    codeTypes: ['qr'],
    onCodeScanned: (codes) => {
      if (codes.length > 0 && codes[0].value) {
        runInAction(() => {
          scannerStore.setCodeScanned(codes[0].value ?? '');
        });
      }
    },
  });

  useEffect(() => {
    if (scannerStore.codeScanned) {
      if (isValidUrl(scannerStore.codeScanned)) {
        navigation.navigate('WebView', { uri: scannerStore.codeScanned });
      } else {
        Alert.alert('Error!', 'Invalid QR Code');
        runInAction(() => {
          scannerStore.resetScanner();
        });
      }
    }
  }, [scannerStore.codeScanned, navigation]);

  useFocusEffect(
    React.useCallback(() => {
      setIsCameraActive(true);

      return () => {
        setIsCameraActive(false);
      };
    }, [])
  );

  if (!device || !permissionStore.cameraPermissionGranted) {
    return <Text>Loading camera...</Text>;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Camera
        ref={camera}
        style={styles.fullScreenCamera}
        isActive={isCameraActive}
        device={device}
        torch={scannerStore.flash}
        codeScanner={codeScanner}
      />

      {/* Ensure RNHoleView is correctly placed */}
      <RNHoleView
        holes={[
          {
            x: (getWindowWidth() - 300) / 2,
            y: (getWindowHeight() - 300) / 2,
            width: 300,
            height: 200,
            borderRadius: 10,
          },
        ]}
        style={styles.rnholeView}
      />
    </SafeAreaView>
  );
});
