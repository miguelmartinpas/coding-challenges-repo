import { useEffect, useRef, useState } from "react";
import { TheGameOfLife } from "../../services/TheGameOfLife/GameOfLife";
import { COLUMNS, ROWS } from "../../services/TheGameOfLife/GameOfLife.consts";
import { Matrix } from "../../services/TheGameOfLife/GameOfLife.types";

export const useTheGameOfLife = () => {
    const [tgol, setTgol] = useState<{ matrix: Matrix, total: number } | null>(null);
    const theGameOfLife = useRef<TheGameOfLife | null>(null);

    useEffect(() => {
        if (!theGameOfLife.current) {
            theGameOfLife.current = new TheGameOfLife(ROWS, COLUMNS);
            setTgol({matrix: theGameOfLife.current.getMatrix(), total: theGameOfLife.current.countLife()});
        }
    }, []);

    const handleOnPlay = (): void => {
        if (theGameOfLife.current) { 
            setTgol({matrix: theGameOfLife.current.play().getMatrix(), total: theGameOfLife.current.countLife()});
        }
    }

    return {tgol, play: handleOnPlay, rows: ROWS, columns: COLUMNS}
}