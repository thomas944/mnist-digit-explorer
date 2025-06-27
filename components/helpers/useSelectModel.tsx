import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ModelName } from '../data/modelData';

interface SelectedModelContextType {
    selectedModel: ModelName;
    setSelectedModel: (model: ModelName) => void;
}

const SelectedModelContext = createContext<SelectedModelContextType | undefined>(undefined);

export const SelectedModelProvider = ({ children }: { children: ReactNode }) => {
    const [selectedModel, setSelectedModel] = useState<ModelName>('CNN');

    return (
        <SelectedModelContext.Provider value={{ selectedModel, setSelectedModel }}>
            {children}
        </SelectedModelContext.Provider>
    );

}


export const useSelectedModel = () => {
    const context = useContext(SelectedModelContext);
    if (!context) {
        throw new Error("useSelectedModel must be used within a SelectedModelProvider");
    }
    return context;
};