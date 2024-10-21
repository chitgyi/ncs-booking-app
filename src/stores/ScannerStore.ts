import {makeAutoObservable} from 'mobx';

class ScannerStore {
  codeScanned: string = '';
  isScannerActive: boolean = true;
  flash: 'on' | 'off' = 'off';

  constructor() {
    makeAutoObservable(this);
  }

  setCodeScanned(code: string) {
    this.codeScanned = code;
    this.isScannerActive = false;
  }

  resetScanner() {
    this.codeScanned = '';
    this.isScannerActive = true;
  }

  toggleFlash() {
    this.flash = this.flash === 'on' ? 'off' : 'on';
  }
}

export const scannerStore = new ScannerStore();
