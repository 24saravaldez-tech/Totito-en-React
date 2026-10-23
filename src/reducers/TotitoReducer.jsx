import { inicio } from "../types/initialTypes"

const reducer = (state, action) => {
    let nuevoArreglo;
    switch (action.type) {
        case inicio.seleccionar:
            return {
                ...state,
                opcionInicio: action.payload.opcionInicio,
                continuar: true
            };

        case inicio.continuar:
            return {
                ...state,
                continuar: true
            };

        case inicio.reiniciar:
            return {
                ...state,
                tablero: [
                    undefined, undefined, undefined,
                    undefined, undefined, undefined,
                    undefined, undefined, undefined,
                ],
                turno: 'X'
            };

        case inicio.volver:
            return {
                ...state,
                opcionInicio: '',
                continuar: false,
                tablero: [
                    undefined, undefined, undefined,
                    undefined, undefined, undefined,
                    undefined, undefined, undefined,
                ],
                turno: 'X'
            };

        case inicio.marcar:
            nuevoArreglo = [...state.tablero]
            nuevoArreglo[action.payload.index] = action.payload.symbol

            return {
                ...state,
                tablero: [...nuevoArreglo],
                turno: state.turno == 'X' ? '0' : 'X'
            }
            break
        default:
            break;
        // return state
    }
}

export { reducer }