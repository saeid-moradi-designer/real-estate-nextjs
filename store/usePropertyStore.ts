import {create} from 'zustand';

interface Property {
    id: number;
    title: string;
    description: string;
    price: number;
    location: string;
    images: string[];
}

interface PropertyState {
    properties: Property[];
    setProperties: (properties: Property[]) => void;
}

export const usePropertyStore = create<PropertyState>((set) => ({
    properties: [],
    setProperties: (properties) => set({ properties }),
}));
