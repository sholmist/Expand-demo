import { createContext, PropsWithChildren, useContext, useState } from "react";
import { Basket } from "../models/basket";

interface StoreContextValue {
    basket: Basket | null;
    setBasket: (basket: Basket) => void;
    removeItem: (courseId: string) => void;
}

export const StoreContext = createContext<StoreContextValue | undefined>(undefined);

export function useStoreContext() {
    const context = useContext(StoreContext);
    if (context === undefined) {
        throw Error("The store context is currently undefined");
    }
    return context;
}

export function StoreProvider({children}: PropsWithChildren<any>) {
    const [basket, setBasket] = useState<Basket | null>(null);

    const removeItem = (courseId: string) => {
        if (!basket) return;

        const items = [...basket.items];

        const itemIndex = items.findIndex(item => item.courseId === courseId);


        if (itemIndex >= 0) {
            items.splice(itemIndex, 1);
            setBasket((prevState) => {
                return { ...prevState!, items };
            });
        }
    }

    return (
        <StoreContext.Provider value={{ basket, setBasket, removeItem }}>
            {children}
        </StoreContext.Provider>
    );
}