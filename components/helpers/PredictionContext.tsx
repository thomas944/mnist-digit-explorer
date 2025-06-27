'use client';

import React, { createContext, useContext, useState } from 'react';

export interface Prediction {
    digit: number;
    confidence: number;
}

export interface ModelData {
    name: string;
    output: Prediction[];
    guess: Prediction;
}

interface PredictionContextType {
    data: ModelData[];
    setData: React.Dispatch<React.SetStateAction<ModelData[]>>;
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const PredictionContext = createContext<PredictionContextType | undefined>(undefined);

export const PredictionProvider = ({ children }: { children: React.ReactNode }) => {
    const [data, setData] = useState<ModelData[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    return (
        <PredictionContext.Provider value={{ data, setData, isLoading, setIsLoading }}>
            {children}
        </PredictionContext.Provider>
    );
};

export const usePrediction = (): PredictionContextType => {
    const context = useContext(PredictionContext);
    if (!context) throw new Error('usePrediction must be used within a PredictionProvider');
    return context;
};