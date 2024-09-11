import {makeAutoObservable} from 'mobx';
import {makePersistable} from 'mobx-persist-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {User} from '../screens/secure/UserListScreen';

class FavoritesStore {
  favoriteUsers: User[] = [];

  constructor() {
    makeAutoObservable(this);

    // Persist the store
    makePersistable(this, {
      name: 'FavoritesStore',
      properties: ['favoriteUsers'],
      storage: AsyncStorage,
    });
  }

  addFavorite(user: User) {
    if (!this.isFavorite(user.id)) {
      this.favoriteUsers.push(user);
    }
  }

  removeFavorite(userId: number) {
    this.favoriteUsers = this.favoriteUsers.filter(user => user.id !== userId);
  }

  isFavorite(userId: number): boolean {
    return this.favoriteUsers.some(user => user.id === userId);
  }
}

const favoritesStore = new FavoritesStore();
export default favoritesStore;
