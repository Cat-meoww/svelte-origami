import { writable } from 'svelte/store';
const textures = ["/texture/1.jpeg", "/texture/2.jpeg", "/texture/3.jpeg", "/texture/4.png"];

interface Store {
    index: number;
    texture: string;
}




function createStore() {
    const { subscribe, update } = writable<Store>({
        index: 0,
        texture: textures[0],
    });

    return {
        subscribe,
        setIndex: (num: number) => update(() => ({
            index: num,
            texture: textures[num]
        }))
    };
}

export const useStore = createStore();

