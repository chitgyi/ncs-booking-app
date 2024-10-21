import { makeAutoObservable, runInAction } from 'mobx';
import apiInstance from '../api';
import { Room } from '../types/Room';

class RoomStore {
  rooms: Room[] = [];
  selectedDate: Date = new Date();
  selectedTime: Date = new Date();
  sortCriteria: 'capacity' | 'availability' | 'level' = 'level';
  isLoading: boolean = false;
  someSharedValue: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchRooms() {
    this.isLoading = true;
    try {
      const response = await apiInstance.get<Room[]>('/yuhong90/7ff8d4ebad6f759fcc10cc6abdda85cf/raw/463627e7d2c7ac31070ef409d29ed3439f7406f6/room-availability.json');
      runInAction(() => {
        this.rooms = response.data;
        this.sortRooms();
        this.isLoading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.isLoading = false;
        console.error('Error fetching rooms', error);
      });
    }
  }

  setDate(date: Date) {
    this.selectedDate = date;
    this.setSortCriteria('availability'); // Sort based on availability after date change
  }

  setTime(time: Date) {
    this.selectedTime = time;
    this.setSortCriteria('availability');
  }

  setSortCriteria(criteria: 'capacity' | 'availability' | 'level') {
    this.sortCriteria = criteria;
    this.sortRooms();
  }

  sortRooms() {
    switch (this.sortCriteria) {
      case 'capacity':
        this.rooms = this.rooms.sort((a, b) => parseInt(b.capacity) - parseInt(a.capacity));
        break;
      case 'availability':
        this.rooms = this.rooms.sort((a, b) => this.checkAvailability(b) - this.checkAvailability(a));
        break;
      case 'level':
      default:
        this.rooms = this.rooms.sort((a, b) => parseInt(a.level) - parseInt(b.level));
        break;
    }
  }

  checkAvailability(room: Room): number {
    const formattedTime = this.formatTime(this.selectedTime);
    return room.availability[formattedTime] === '1' ? 1 : 0;
  }

  formatTime(date: Date): string {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }
}

export const roomStore = new RoomStore();
