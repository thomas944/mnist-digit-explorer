import React, { useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
// import { colors } from '@/utils/colors';
import CanvasBlock from './canvasBlock/CanvasBlock';
import ConfusionMatrixBlock from './confusionMatrixBlock/ConfusionMatrixBlock';
import PredictionsBlock from './predictionsBlock/PredictionsBlock';
import TipsBlock from './tipsBlock/TipsBlock';
import SummaryBlock from './summaryBlock/SummaryBlock';
import styles from './MnistPage.module.css';
import { SelectedModelProvider } from './helpers/useSelectModel';
import { lg, md } from '../app/layouts'

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

const MnistPage = () => {
    const [data, setData] = useState<ModelData[]>([])
    const [isLoading, setIsLoading] = useState(false)

    return (

        <div className={styles.container}>
            {/* <div className={styles.titleContainer}>
                <div className={styles.headerContainer}>
                    <span className={styles.topHeader}>MNIST Model Explorer</span>
                    <span className={styles.subHeader}>Draw digits on the canvas and compare predictions across three different AI models!</span>
                </div>
                <div className={styles.subContainer}>
                    <div className={styles.contentContainer}>
                        <SelectedModelProvider>
                            <ResponsiveGridLayout
                                layouts={{ lg: lg, md: md }}
                                breakpoints={{ lg: 900, md: 500 }}
                                cols={{ lg: 3, md: 2 }}
                                rowHeight={100}
                                isDraggable={false}
                                isResizable={false}
                                useCSSTransforms
                                className="layout"
                            >
                                <div key="Canvas">
                                    <CanvasBlock setData={setData} />
                                </div>
                                <div key="ModelPred">
                                    <PredictionsBlock data={data} />
                                </div>
                                <div key="Tips">
                                    <TipsBlock />
                                </div>
                                <div key="Stats">
                                    <ConfusionMatrixBlock />
                                </div>
                                <div key="Summary">
                                    <SummaryBlock />
                                </div>
                            </ResponsiveGridLayout>
                        </SelectedModelProvider>
                    </div>
                </div>
            </div> */}
        </div>
    )
}

export default MnistPage