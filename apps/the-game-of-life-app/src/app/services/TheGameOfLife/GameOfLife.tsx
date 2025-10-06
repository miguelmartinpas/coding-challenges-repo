import { COLUMNS, ROWS } from "./GameOfLife.consts";
import { Matrix, Point } from "./GameOfLife.types";

export type Axis = { xAxis: number, yAxis: number };

export class TheGameOfLife {
    private rows: number = ROWS;
    private columns: number = COLUMNS;
    private matrix: Matrix = [];
    
    constructor(rows: number = ROWS, colums: number = COLUMNS, initLife?: Point[]) {
        this.rows = rows;
        this.columns = colums
        this.initMatrix();
        if (initLife && initLife.length) {
            initLife.forEach(({xAxis,yAxis}: Point) => {
                this.createLife(xAxis,yAxis);
            })
        } else {
            this.createLife();
        }
    }

    private initMatrix(): void {
        this.matrix = [...new Array(this.rows).fill(null)].map(() => [...new Array(this.columns).fill(null).map(() => false)])
    }
    
    public getMatrix(): Matrix {
        return this.matrix;
    }

    public clean(): TheGameOfLife {
        this.initMatrix();
        return this;
    }

    public createLife(rowIndex?: number, columIndex?: number): TheGameOfLife {
        const row = rowIndex || Math.floor(Math.random() * this.rows);
        const column = columIndex || Math.floor(Math.random() * this.columns);
        this.matrix[row][column] = true;
        return this;
    }

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

   

    private getNeibourgsAxies = (rowIndex: number, columnIndex: number): Axis[] => {
        const axis: Axis[] = [
            { xAxis: rowIndex-1, yAxis: columnIndex-1 }, { xAxis: rowIndex-1, yAxis: columnIndex }, { xAxis: rowIndex-1, yAxis: columnIndex+1 },
            { xAxis: rowIndex, yAxis: columnIndex-1 }, { xAxis: 0, yAxis: 0 }, { xAxis: rowIndex, yAxis: columnIndex+1 },
            { xAxis: rowIndex+1, yAxis: columnIndex-1 }, { xAxis: rowIndex+1, yAxis: columnIndex }, { xAxis: rowIndex+1, yAxis: columnIndex+1 },
            
        ];

        return axis.filter(( { xAxis, yAxis }) => {
            return xAxis >= 0 && xAxis <= this.rows && yAxis >= 0 && yAxis <= this.columns;
        });
    }

    private countLivingNeighbors = (rowIndex: number, columnIndex: number) => {
        return this.getNeibourgsAxies(rowIndex, columnIndex).filter(({ xAxis, yAxis }: Axis) => {
            return this.matrix[xAxis][yAxis]
        }).length
    }
    
    public play(): TheGameOfLife {
        const newStatusOfTheMatrix = [...this.matrix];

        this.matrix.forEach((columns, rowIndex) => {
            columns.forEach((cell, columnIndex) => {
                if (cell) {
                    this.createLife();
                }
            });
        });

        this.matrix = newStatusOfTheMatrix;

        return this;
    }

    public countLife(): number {
        return this.matrix.reduce((acc: number, current: boolean[]) => {
            return acc + current.reduce((accInternal: number, currentInternal: boolean) => { return accInternal + (currentInternal ? 1 : 0) }, 0);
        }, 0)
    }
}