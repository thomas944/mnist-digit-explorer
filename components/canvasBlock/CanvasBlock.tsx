'use client';

import React, { useState } from 'react'
import { useCanvasDrawing, Prediction } from '../helpers/useCanvasDrawing'
import styles from './CanvasBlock.module.css'
import { usePrediction } from '../helpers/PredictionContext';

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const CanvasBlock = () => {
    const [showOverlay, setShowOverlay] = useState(true);
    const [predictions, setPredictions] = useState<Prediction[]>([]);
    const { setData, setIsLoading, isLoading } = usePrediction();

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const {
        canvasRef,
        hasDrawn,
        clearCanvas,
        undoLastStroke,
        getCanvasImageData,
        getCanvasBlob
    } = useCanvasDrawing({
        onCanvasChange: (hasContent) => {
            setShowOverlay(!hasContent);
        },
        onPredictionsReset: () => {
            setPredictions([]);
        }
    });

    const handlePredict = async () => {
        if (!hasDrawn) {
            alert('Please draw a digit first!')
            return
        }

        if (isLoading) {
            return
        }

        try {
            setIsLoading(true)
            const base64Image = getCanvasImageData()

            await sleep(10000);

            const res = await fetch(`${apiUrl}/mnist/predict/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ image: base64Image })
                
            });
            const data = await res.json();
            setData(data)
        } catch (error) {
            console.error('Prediction Failed!: ', error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className={styles.container}>
            <div>
                <span className={styles.titleText}>Draw</span>
            </div>
            <div className={styles.canvasContainer}>
                <canvas
                    ref={canvasRef}
                    width={280}
                    height={280}
                    className={styles.canvas}
                />
            </div>
            <div className={styles.buttonWrapper}>
                <div className={styles.buttonContainer}>
                    <button onClick={() => undoLastStroke()}
                        className={styles.undoButton}>
                        <span>Undo</span>
                    </button>
                    <button onClick={() => clearCanvas()}
                        className={styles.clearButton}>
                        Clear
                    </button>
                    <button 
                        onClick={handlePredict}
                        className={`${styles.predictButton} ${isLoading ? styles.loadPredict : ''}`}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Wait!' : 'Predict'}
                    </button>
                </div>
            </div>

        </div>
    )
}

export default CanvasBlock