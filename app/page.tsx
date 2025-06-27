'use client';
import React from 'react';
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
import { PredictionProvider } from '@/components/helpers/PredictionContext';
import styles from './home.module.css'
import { lg, md } from './layouts'

const ResponsiveGridLayout = WidthProvider(Responsive);

export default function Home() {
    return (
        <div className={styles.container}>
            <div className={styles.titleContainer}>
                <div className={styles.headerContainer}>
                    <span className={styles.topHeader}>MNIST Model Explorer</span>
                    <span className={styles.subHeader}>Draw digits on the canvas and compare predictions across three different AI models!</span>
                </div>
                <div className={styles.subContainer}>
                    <div className={styles.contentContainer}>
                        <SelectedModelProvider>
                            <PredictionProvider>
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
                                        <CanvasBlock />
                                    </div>
                                    <div key="ModelPred">
                                        <PredictionsBlock />
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
                            </PredictionProvider>
                        </SelectedModelProvider>

                    </div>
                </div>
            </div>
        </div>
    );
}
