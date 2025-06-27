import React, { useRef, useState, useEffect, useCallback } from 'react'

interface Point {
    x: number;
    y: number;
}

interface UseCanvasDrawingProps {
    onCanvasChange?: (hasContent: boolean) => void;
    onPredictionsReset?: () => void;
}


export interface Prediction {
    digit: number;
    confidence: number;
}

export const useCanvasDrawing = ({ onCanvasChange, onPredictionsReset }: UseCanvasDrawingProps) => {
    const [isDrawing, setIsDrawing] = useState(false)
    const [hasDrawn, setHasDrawn] = useState(false)


    const [strokeHistory, setStrokeHistory] = useState<Point[][]>([])
    const [currentStroke, setCurrentStroke] = useState<Point[]>([])

    const canvasRef = useRef<HTMLCanvasElement | null>(null)

    const initializeCanvas = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return null;

        const ctx = canvas.getContext('2d');
        ctx!.lineWidth = 12;
        ctx!.lineCap = 'round';
        ctx!.lineJoin = 'round';
        ctx!.strokeStyle = '#000000';

        return ctx;
    }, []);

    const getMousePos = (e: MouseEvent | TouchEvent): Point => {
        const canvas = canvasRef.current
        if (!canvas) return { x: 0, y: 0 }

        const rect = canvas.getBoundingClientRect()

        if (e instanceof TouchEvent) {
            return {
                x: e.touches[0].clientX - rect.left,
                y: e.touches[0].clientY - rect.top
            }
        } else {
            return {
                x: (e as MouseEvent).clientX - rect.left,
                y: (e as MouseEvent).clientY - rect.top
            }
        }
    }

    const startDrawing = useCallback((e: MouseEvent | TouchEvent) => {
        e.preventDefault()
        const ctx = initializeCanvas()
        if (!ctx) return

        const { x, y } = getMousePos(e)

        setIsDrawing(true);
        setHasDrawn(true);
        setCurrentStroke([{ x, y }]);

        ctx.beginPath();
        ctx.moveTo(x, y);
        if (onCanvasChange) {
            onCanvasChange(true);
        }
    }, [initializeCanvas, getMousePos, onCanvasChange]);

    const draw = useCallback((e: MouseEvent | TouchEvent) => {
        if (!isDrawing) return

        e.preventDefault()
        const ctx = initializeCanvas()
        if (!ctx) return

        const { x, y } = getMousePos(e)
        setCurrentStroke(prev => [...prev, { x, y }]);
        ctx.lineTo(x, y);
        ctx.stroke();
    }, [isDrawing, initializeCanvas, getMousePos])

    const stopDrawing = useCallback((e: MouseEvent | TouchEvent) => {
        if (!isDrawing) return

        e.preventDefault()
        setIsDrawing(false)
        setStrokeHistory(prev => [...prev, currentStroke]);
        setCurrentStroke([]);

    }, [isDrawing, currentStroke])

    const clearCanvas = useCallback(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        ctx?.clearRect(0, 0, canvas.width, canvas.height)

        setStrokeHistory([]);
        setCurrentStroke([]);
        setHasDrawn(false);
        setIsDrawing(false);

        if (onCanvasChange) {
            onCanvasChange(false);
        }
        if (onPredictionsReset) {
            onPredictionsReset();
        }
    }, [onCanvasChange, onPredictionsReset]);

    const undoLastStroke = useCallback(() => {
        if (strokeHistory.length === 0) return

        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const newHistory = strokeHistory.slice(0, -1)

        ctx.clearRect(0, 0, canvas.width, canvas.height)

        if (newHistory.length === 0) {
            setHasDrawn(false)
            if (onCanvasChange) {
                onCanvasChange(false)
            }
            if (onPredictionsReset) {
                onPredictionsReset()
            }
        } else {
            const newCtx = initializeCanvas()
            if (newCtx) {
                newHistory.forEach(stroke => {
                    if (stroke.length > 0) {
                        newCtx.beginPath()
                        newCtx.moveTo(stroke[0].x, stroke[0].y)
                        stroke.forEach(point => {
                            newCtx.lineTo(point.x, point.y)
                        })
                        newCtx.stroke()
                    }
                })
            }
        }

        setStrokeHistory(newHistory)
    }, [strokeHistory, initializeCanvas, onCanvasChange, onPredictionsReset]);

    const getCanvasImageData = useCallback(() => {
        const canvas = canvasRef.current
        if (!canvas) return null

        const ctx = canvas.getContext('2d')
        if (!ctx) return null

        const originalImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        const invertedImageData = new ImageData(
            new Uint8ClampedArray(originalImageData.data),
            originalImageData.width,
            originalImageData.height
        );

        for (let i = 0; i < invertedImageData.data.length; i += 4) {
            invertedImageData.data[i] = 255 - invertedImageData.data[i];     // Red
            invertedImageData.data[i + 1] = 255 - invertedImageData.data[i + 1]; // Green
            invertedImageData.data[i + 2] = 255 - invertedImageData.data[i + 2]; // Blue
        }
        
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = canvas.width;
        tempCanvas.height = canvas.height;
        const tempCtx = tempCanvas.getContext('2d');

        if (!tempCtx) return null;

        // Put the inverted image data on the temporary canvas
        tempCtx.putImageData(invertedImageData, 0, 0);

        // Get the data URL from the temporary canvas
        const dataUrl = tempCanvas.toDataURL("image/png");
        return dataUrl.replace(/^data:image\/png;base64,/, '');
    }, [])

    const getCanvasBlob = useCallback((callback: any) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        canvas.toBlob(callback, 'image/png');
    }, []);


    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Type the event listeners properly
        const handleMouseDown = startDrawing as EventListener;
        const handleMouseMove = draw as EventListener;
        const handleMouseUp = stopDrawing as EventListener;
        const handleMouseOut = stopDrawing as EventListener;
        const handleTouchStart = startDrawing as EventListener;
        const handleTouchMove = draw as EventListener;
        const handleTouchEnd = stopDrawing as EventListener;

        // Mouse events
        canvas.addEventListener('mousedown', handleMouseDown);
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseup', handleMouseUp);
        canvas.addEventListener('mouseout', handleMouseOut);

        // Touch events
        canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
        canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
        canvas.addEventListener('touchend', handleTouchEnd, { passive: false });

        // Cleanup
        return () => {
            canvas.removeEventListener('mousedown', handleMouseDown);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseup', handleMouseUp);
            canvas.removeEventListener('mouseout', handleMouseOut);
            canvas.removeEventListener('touchstart', handleTouchStart);
            canvas.removeEventListener('touchmove', handleTouchMove);
            canvas.removeEventListener('touchend', handleTouchEnd);
        };
    }, [startDrawing, draw, stopDrawing]);

    // Initialize canvas on mount
    useEffect(() => {
        initializeCanvas();
    }, [initializeCanvas]);

    return {
        canvasRef,
        hasDrawn,
        clearCanvas,
        undoLastStroke,
        getCanvasImageData,
        getCanvasBlob
    };
}