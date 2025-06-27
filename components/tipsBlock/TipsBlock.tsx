import React from 'react'
import style from './TipsBlock.module.css'

const TipsBlock = () => {
    return (
        <div className={style.container}>
            <span>Try experimenting with these drawing variations:</span>
            <ul className={style.tipsList}>
                <li className={style.tipItem}>
                    <span><strong>Position:</strong> try corners, edges, or off center</span>
                </li>
                <li className={style.tipItem}>
                    <span><strong>Scale:</strong> draw large or tiny digits</span>
                </li>
                <li className={style.tipItem}>
                    <span><strong>Style:</strong> cursive, block, etc</span>
                </li>
                <li className={style.tipItem}>
                    <span><strong>Rotation:</strong> tilted or upside-down</span>
                </li>
                <li className={style.tipItem}>
                    <span><strong>Line weight:</strong> thick vs thin strokes</span>
                </li>
                <li className={style.tipItem}>
                    <span><strong>Completeness:</strong> partial or broken digits</span>
                </li>
            </ul>
        </div>
    )
}

export default TipsBlock