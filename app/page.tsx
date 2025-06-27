import React, { useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
// import { colors } from '@/utils/colors';
import CanvasBlock from '@/components/canvasBlock/CanvasBlock';
import ConfusionMatrixBlock from '@/components/confusionMatrixBlock/ConfusionMatrixBlock';
import PredictionsBlock from '@/components/predictionsBlock/PredictionsBlock';
import TipsBlock from '@/components/tipsBlock/TipsBlock';
import SummaryBlock from '@/components/summaryBlock/SummaryBlock';
import { SelectedModelProvider } from '@/components/helpers/useSelectModel';

const ResponsiveGridLayout = WidthProvider(Responsive);

export interface Prediction {
    digit: number;
    confidence: number;
}

export interface ModelData {
    name: string;
    output: Prediction[];
    guess: Prediction;
}

export default function Home() {
    const [data, setData] = useState<ModelData[]>([])
    
    return (
        <div>
            Hi
        </div>
    );
}
