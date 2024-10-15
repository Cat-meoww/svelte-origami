import { writable } from 'svelte/store';
import { base } from '$app/paths';
const textures = [`${base}/texture/1.jpeg`, `${base}/texture/2.jpeg`, `${base}/texture/3.jpeg`, `${base}/texture/4.png`];

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

