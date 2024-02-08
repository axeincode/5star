// Utilities
import { createPinia } from 'pinia'
import { aboutStore } from './about';
import { achievementStore } from './achievement';
import { agentStore } from './agent';
import { gameStore } from './game';

const pinia = createPinia();

export function resetAllStores() {
    const stores = [aboutStore, achievementStore, agentStore, gameStore]; // Add more stores as needed
    stores.forEach(store => {
        const instance = store(pinia);
        instance.$reset();
        console.log(instance.$state)
    });
}

export default createPinia()
