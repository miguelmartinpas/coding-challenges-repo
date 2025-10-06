import classNames from 'classnames';
import styles from './TheGameOfLifeBoard.module.scss';
import { useTheGameOfLife } from '../../hooks/useTheGameOfLife/useTheGameOfLife';

const baseClassName = 'the-game-of-life-board'


export const GridBoard = () => {
    const { tgol, play } = useTheGameOfLife();

    const isSelected = (rowIndex: number, columnIndex: number) => tgol?.matrix && tgol.matrix[rowIndex][columnIndex];

    console.log('cahnge...');

    return <div className={styles[baseClassName]}>
        <button onClick={play}>PLAY ({tgol?.total})</button>
        <div className={styles[`${baseClassName}__board`]}>
        {tgol?.matrix?.map((columns, rowIndex) => {
            return (
                <div key={`row_${rowIndex}`} className={styles[`${baseClassName}__board__row`]}>
                    {columns.map((_, columnIndex) => {
                        return <div key={`cell_${columnIndex}`} className={classNames({ 
                                [styles[`${baseClassName}__board__cell`]]: true, 
                                [styles[`${baseClassName}__board__cell--selected`]]: isSelected(rowIndex, columnIndex) 
                            })}></div>
                    })}
                </div>
            )})}
        </div>
    </div>;
}