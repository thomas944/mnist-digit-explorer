'use client';
import React, { useState } from 'react'
import { useCanvasDrawing, Prediction } from '../helpers/useCanvasDrawing'
import { ModelData } from '../MnistPage';
import styles from './CanvasBlock.module.css'
import { usePrediction } from '../helpers/PredictionContext';

// interface CanvasBlockProps {
//     setData: React.Dispatch<React.SetStateAction<ModelData[]>>;
// }

const CanvasBlock = () => {
    const [showOverlay, setShowOverlay] = useState(true);
    const [predictions, setPredictions] = useState<Prediction[]>([]);
    const { setData, setIsLoading } = usePrediction();

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

        const base64Image = getCanvasImageData()

        const res = await fetch("http://3.143.204.131:8000/mnist/predict/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ image: base64Image })
        });

        const data = await res.json();
        setData(data)
        console.log(data);
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
                    <button onClick={handlePredict}
                        className={styles.predictButton}>
                        Predict
                    </button>
                </div>
            </div>

        </div>
    )
}

export default CanvasBlock