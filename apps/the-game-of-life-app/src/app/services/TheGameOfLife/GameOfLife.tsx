import { COLUMNS, INIT_LIVE, ROWS } from "./GameOfLife.consts";
import { Matrix, Point } from "./GameOfLife.types";

export type Axis = { xAxis: number, yAxis: number };
export type LivingStatus = { alive: number, dead: number };


/*
    El algoritmo del Juego de la Vida consiste en aplicar estas cuatro reglas a cada celda en un tablero de celdas vivas o muertas, y luego repetir el proceso para cada nueva generación: 
    
    Supervivencia: Una célula viva con 2 o 3 vecinos vivos continúa viva en la próxima generación. 
    Muerte por superpoblación: Una célula viva con más de 3 vecinos vivos muere. 
    Muerte por soledad: Una célula viva con menos de 2 vecinos vivos muere. 
    Nacimiento: Una célula muerta con exactamente 3 vecinos vivos se convierte en una célula viva. 

    Pasos para el algoritmo:
    Configuración inicial: Comienza con una cuadrícula de células, algunas vivas y otras muertas, determinando la configuración inicial. 
    Contar vecinos: Para cada célula en la cuadrícula, cuenta cuántas de sus ocho vecinas (horizontal, vertical y diagonalmente) están vivas. 
    Aplicar reglas: Usa la cantidad de vecinos vivos para determinar el nuevo estado de la célula en la siguiente generación, aplicando las reglas mencionadas. 
    Generar la siguiente generación: Crea una nueva cuadrícula con los estados actualizados de todas las células. 
    Repetir: Repite los pasos 2, 3 y 4 para cada nueva generación hasta que se alcance un patrón estable o el deseo de parar la simulación. 

*/
export class TheGameOfLife {
    private rows: number = ROWS;
    private columns: number = COLUMNS;
    private initLife: Point[] | undefined = undefined;
    private matrix: Matrix = [];
    private generations: number = 0;
    
    constructor(rows: number = ROWS, colums: number = COLUMNS, initLife?: Point[]) {
        this.rows = rows;
        this.columns = colums
        this.initLife = initLife;
        this.initMatrix();
        this.initGameOfLife();
    }

    private initMatrix(): void {
        this.matrix = [...new Array(this.rows).fill(null)].map(() => [...new Array(this.columns).fill(null).map(() => false)])
    }

    private initGameOfLife(): void {
        if (this.initLife && this.initLife.length) {
            this.initLife.forEach(({xAxis,yAxis}: Point) => {
                this.createLife(xAxis,yAxis);
            })
        } else {
            [...new Array(INIT_LIVE)].forEach(() =>this.createLife());
        }
        this.generations = 0;
    }
    
    public getMatrix(): Matrix {
        return this.matrix;
    }

    public getGenerations(): number {
        return this.generations;
    }

    public clean(): TheGameOfLife {
        this.initMatrix();
        this.initGameOfLife();
        return this;
    }

    public createLife(rowIndex?: number, columIndex?: number, alive = true): TheGameOfLife {
        const row = rowIndex || Math.floor(Math.random() * this.rows);
        const column = columIndex || Math.floor(Math.random() * this.columns);
        this.matrix[row][column] = alive;
        return this;
    }

    private getNeibourgsAxies = (rowIndex: number, columnIndex: number): Axis[] => {
        const axis: Axis[] = [
            { xAxis: rowIndex-1, yAxis: columnIndex-1 }, { xAxis: rowIndex-1, yAxis: columnIndex }, { xAxis: rowIndex-1, yAxis: columnIndex+1 },
            { xAxis: rowIndex, yAxis: columnIndex-1 }, { xAxis: rowIndex, yAxis: columnIndex+1 },
            { xAxis: rowIndex+1, yAxis: columnIndex-1 }, { xAxis: rowIndex+1, yAxis: columnIndex }, { xAxis: rowIndex+1, yAxis: columnIndex+1 },
            
        ];

        return axis.filter(( { xAxis, yAxis }) => {
            console.log('filtra', xAxis, yAxis, xAxis >= 0 && xAxis < this.rows && yAxis >= 0 && yAxis < this.columns)
            return xAxis >= 0 && xAxis < this.rows && yAxis >= 0 && yAxis < this.columns;
        });
    }

    private getNeighborsLivingStatus = (rowIndex: number, columnIndex: number): LivingStatus => {
        const neibourgs = this.getNeibourgsAxies(rowIndex, columnIndex);
        const alive = neibourgs.filter(({ xAxis, yAxis }: Axis) => {

            return this.matrix[xAxis][yAxis]
        }).length;

        return { alive, dead: neibourgs.length - alive }
    }
    
    public play(): TheGameOfLife {
        const newStatusOfTheMatrix = JSON.parse(JSON.stringify(this.matrix));

        this.matrix.forEach((columns, rowIndex) => {
            columns.forEach((currentCellState, columnIndex) => {
                // Supervivencia: Una célula viva con 2 o 3 vecinos vivos continúa viva en la próxima generación. 
                // Muerte por superpoblación: Una célula viva con más de 3 vecinos vivos muere. 
                // Muerte por soledad: Una célula viva con menos de 2 vecinos vivos muere. 
                // Nacimiento: Una célula muerta con exactamente 3 vecinos vivos se convierte en una célula viva. 
                const { alive } = this.getNeighborsLivingStatus(rowIndex, columnIndex);

                if (currentCellState) {  
                    if (alive === 2 || alive === 3) {
                        newStatusOfTheMatrix[rowIndex][columnIndex] = true;
                    } else if (alive > 3) {
                        newStatusOfTheMatrix[rowIndex][columnIndex] = false;
                    } else if (alive < 2) {
                        newStatusOfTheMatrix[rowIndex][columnIndex] = false;
                    }
                } else {
                    if (alive === 3) {
                        newStatusOfTheMatrix[rowIndex][columnIndex] = true;
                    }
                }
            });
        });

        this.matrix = newStatusOfTheMatrix;
        this.generations = this.generations + 1;

        return this;
    }

    public countLife(): number {
        return this.matrix.reduce((acc: number, current: boolean[]) => {
            return acc + current.reduce((accInternal: number, currentInternal: boolean) => { return accInternal + (currentInternal ? 1 : 0) }, 0);
        }, 0)
    }
}