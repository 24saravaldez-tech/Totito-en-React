import React, { useContext, useState } from "react";
import { useReducer } from "react";
import { reducer } from "../reducers/TotitoReducer";
import { inicio } from "../types/initialTypes";
import OpenAI from "openai";

const TotitoContext = React.createContext();

function TotitoProvider({ children }) {


    const [modoJuego, setModoJuego] = useState('Inicio')

    const client = new OpenAI({
        apiKey: import.meta.env.VITE_OPEN_API_KEY,
        dangerouslyAllowBrowser: true
    })

    const [state, dispatch] = useReducer(reducer, {

        opcionInicio: '',
        continuar: false,
        tablero: [
            undefined, undefined, undefined,
            undefined, undefined, undefined,
            undefined, undefined, undefined,
        ],
        turno: 'X'

    })


    const onClickHH = (event) => {

        if (parseInt(event.target.id) > 0 && parseInt(event.target.id) <= 3) {
            dispatch({
                type: inicio.seleccionar,
                payload: { opcionInicio: parseInt(event.target.id) }
            })
            console.log('entro en modo humano vs humano')
            setModoJuego('HH')
        } else {
            alert('Seleccione una opcion valida')
        }
    }

    const onClickHAI = (event) => {

        if (parseInt(event.target.id) > 0 && parseInt(event.target.id) <= 3) {
            dispatch({
                type: inicio.seleccionar,
                payload: { opcionInicio: parseInt(event.target.id) }
            })
            console.log('entro en modo humano vs IA')
            setModoJuego('HAI')
        } else {
            alert('Seleccione una opcion valida')
        }
    }

    const onClickAIAI = (event) => {

        if (parseInt(event.target.id) > 0 && parseInt(event.target.id) <= 3) {
            dispatch({
                type: inicio.seleccionar,
                payload: { opcionInicio: parseInt(event.target.id) }
            })
            console.log('entro en modo IA vs IA')
            setModoJuego('AIAI')
        } else {
            alert('Seleccione una opcion valida')
        }
    }


    const ganadores = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    const MarcarHumano = (index) => {
        dispatch({ type: inicio.marcar, payload: { index, symbol: state.turno} })
    }

    const ReiniciarPartida = () => {
        dispatch({ type: inicio.reiniciar })
    }

    const VolverOpciones = () => {
        dispatch({ type: inicio.volver })
        setModoJuego('Inicio')
    }

    const RevisarGanador = () => {
        const isGanadorX = ganadores.some(item => item.every(indice => state.tablero[indice] == 'X'))
        const isGanador0 = ganadores.some(item => item.every(indice => state.tablero[indice] == '0'))

        return { isGanadorX, isGanador0 }
    }
    const promptSystem = `Eres el jugador ${state.turno} en un juego de Totito.

El tablero contiene 9 posiciones numeradas del 0 al 8.
Debes elegir únicamente una posición undefined.

Prioridades:
1. Ganar si existe una jugada ganadora.
2. Bloquear al jugador si puede ganar.
3. Elegir el centro.
4. Elegir una esquina.
5. Elegir cualquier posición disponible.

Responde únicamente con JSON:
{"posicion": numero}`

    const TirarAI = async (tablero) => {
        try {
            const response = await client.responses.create({
                model: "gpt-5-nano",
                input: [
                    {
                        role: 'system',
                        content: promptSystem
                    },
                    {
                        role: 'user',
                        content: JSON.stringify({
                            tablero,
                            jugadorAI: state.turno
                        }),
                    }
                ]
            })

            const resultado = JSON.parse(response.output_text);
            return resultado.posicion

        } catch (error) {
            console.error(error)
        }

    }

    // const Reiniciar = (modo) => {
    //     dispatch({

    //         opcionInicio: {modo = 1 ? 'HH' :},
    //         continuar: true,
    //         tablero: [
    //             undefined, undefined, undefined,
    //             undefined, undefined, undefined,
    //             undefined, undefined, undefined,
    //         ],
    //         turno: 'X'

    //     })
    // };

    return (
        <TotitoContext.Provider value={{
            state,
            dispatch,
            MarcarHumano,
            ReiniciarPartida,
            VolverOpciones,
            RevisarGanador,
            TirarAI,
            onClickHAI,
            onClickHH,
            onClickAIAI,
            modoJuego,
            //  Reiniciar

        }}>
            {children}
        </TotitoContext.Provider>
    );
}

export { TotitoProvider, TotitoContext }