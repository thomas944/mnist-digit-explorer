export type ModelName = "CNN" | "MLP" | "LR";

export const MODEL_NAMES: ModelName[] = ["CNN", "MLP", "LR"];

export interface Stats {
  bestPredicted: string;
  mostConfused: string;
  worstConfusion: string;
  overallAcc: string;
}

export interface ModelEntry {
  pred: number[][]; 
  stats: Stats;
}


export const modelData = {
    'CNN': {
        pred: [
            [6, 0, 0, 0, 0, 0, 0, 0, 1, 3],
            [1, 1, 0, 2, 0, 5, 0, 0, 0, 1],
            [0, 0, 5, 4, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 10, 0, 0, 0, 0, 0, 0],
            [0, 1, 0, 0, 6, 2, 0, 0, 1, 0],
            [0, 0, 0, 2, 0, 6, 0, 0, 0, 2],
            [1, 0, 0, 1, 0, 0, 7, 0, 1, 0],
            [0, 2, 1, 4, 1, 0, 0, 2, 0, 0],
            [2, 0, 0, 0, 0, 2, 1, 0, 5, 0],
            [0, 0, 0, 0, 2, 0, 1, 3, 1, 3],
        ],
        stats: {
            bestPredicted: '3',
            mostConfused: '1',
            worstConfusion: '1 -> 5',
            overallAcc: '51%',
        },
    },
    'MLP': {
        pred: [
            [0, 0, 0, 0, 5, 0, 0, 0, 0, 5],
            [0, 0, 0, 0, 3, 3, 0, 0, 0, 4],
            [0, 1, 0, 2, 5, 1, 0, 0, 0, 1],
            [0, 0, 0, 4, 3, 0, 0, 0, 0, 3],
            [0, 0, 0, 0, 8, 0, 0, 0, 0, 2],
            [0, 0, 1, 1, 5, 2, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 5, 5, 0, 0, 0],
            [0, 1, 0, 5, 0, 0, 1, 1, 0, 2],
            [0, 0, 0, 3, 1, 2, 3, 0, 1, 0],
            [0, 0, 0, 8, 0, 1, 0, 1, 0, 0],
        ],
        stats: {
            bestPredicted: '4',
            mostConfused: '0, 1, 2, 9',
            worstConfusion: '9 -> 3',
            overallAcc: '21%',
        },
    },
    'LR': {
        pred: [
            [3, 0, 1, 3, 1, 0, 2, 0, 0, 0],
            [1, 4, 0, 0, 4, 0, 0, 0, 0, 1],
            [1, 3, 0, 0, 1, 0, 0, 0, 1, 4], 
            [0, 5, 0, 0, 3, 0, 0, 0, 1, 1], 
            [0, 1, 0, 0, 7, 0, 0, 0, 1, 1], 
            [0, 0, 0, 1, 3, 0, 5, 0, 1, 0], 
            [1, 0, 0, 0, 6, 0, 2, 0, 1, 0], 
            [0, 5, 0, 1, 3, 0, 0, 0, 1, 0], 
            [0, 0, 0, 1, 1, 0, 3, 0, 4, 1], 
            [1, 5, 0, 3, 1, 0, 0, 0, 0, 0],
        ],
        stats: {
            bestPredicted: '4',
            mostConfused: '2, 3, 5, 7, 9',
            worstConfusion: '6 -> 4',
            overallAcc: '20%',
        },
    }
}