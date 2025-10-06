import classNames from 'classnames';
import styles from './TheGameOfLifeBoard.module.scss';
import { useTheGameOfLife } from '../../hooks/useTheGameOfLife/useTheGameOfLife';

const baseClassName = 'the-game-of-life-board'


export const GridBoard = () => {
    const { tgol, play, reset, getGenerations, createLife } = useTheGameOfLife();

    const isSelected = (rowIndex: number, columnIndex: number) => tgol?.matrix && tgol.matrix[rowIndex][columnIndex];

    const handleOnClick = (rowIndex: number, columnIndex: number): void => {
        if (tgol?.matrix && tgol.matrix[rowIndex][columnIndex]) {
            createLife(rowIndex, columnIndex, false);
        } else {
            createLife(rowIndex, columnIndex, true);
        }
    } 

    return <div className={styles[baseClassName]}>
        <div className={styles[`${baseClassName}__header`]}>
            <button onClick={play}>PLAY</button> 
            <div>Alive: {tgol?.total}</div>
            <div>Generation: {getGenerations()}</div>
            <button onClick={reset}>RESET</button>
        </div>
        <div className={styles[`${baseClassName}__board`]}>
        {tgol?.matrix?.map((columns, rowIndex) => {
            return (
                <div key={`row_${rowIndex}`} className={styles[`${baseClassName}__board__row`]}>
                    {columns.map((_, columnIndex) => {
                        return <div key={`cell_${columnIndex}`} onClick={() => handleOnClick(rowIndex, columnIndex)} className={classNames({ 
                                [styles[`${baseClassName}__board__cell`]]: true, 
                                [styles[`${baseClassName}__board__cell--selected`]]: isSelected(rowIndex, columnIndex) 
                            })}></div>
                    })}
                </div>
            )})}
        </div>
    </div>;
}