import { makeAutoObservable } from 'mobx';
import { Camera } from 'react-native-vision-camera';

class PermissionStore {
  cameraPermissionGranted: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  async requestCameraPermission() {
    const permission = await Camera.requestCameraPermission();
    this.cameraPermissionGranted = permission === 'granted';
  }
}

export const permissionStore = new PermissionStore();
