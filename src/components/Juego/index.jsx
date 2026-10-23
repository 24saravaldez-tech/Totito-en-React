import { useContext, useEffect, useState } from 'react';
import './styles.css';
import { TotitoContext } from '../../Context';

function Juego({ modo }) {
    const { state, MarcarHumano, RevisarGanador, TirarAI, ReiniciarPartida, VolverOpciones } = useContext(TotitoContext)
    const [bloqueo, setBloqueo] = useState(false)
    const [seguirJugando, setSeguirJugando] = useState(false)
    const [ganador, setGanador] = useState(false)
    const { indicadores, setIndicadores } = useState('')

    const reiniciarPartida = () => {
        ReiniciarPartida()
        setBloqueo(false)
        setGanador(false)
    }

    const volverOpciones = () => {
        VolverOpciones()
        setBloqueo(false)
        setGanador(false)
    }

    const onClick = (event) => {

        if (parseInt(event.target.id) > 0 && parseInt(event.target.id) <= 3) {
            dispatch({
                type: inicio.seleccionar,
                payload: { opcionInicio: parseInt(event.target.id) }
            })
        } else {
            alert('Seleccione una opcion valida')
        }
    }


    //MODO HUMANO VS HUMANO
    if (modo == 'HH') {
        useEffect(() => {
            const { isGanadorX, isGanador0 } = RevisarGanador()
            if ((isGanador0 || isGanadorX) && bloqueo != true || state.tablero.every(item => item != undefined)) {
                setBloqueo(true)
                setGanador(isGanadorX ? 'El ganador del juego es: Jugador X' : isGanador0 ? 'El ganador del juego es: Jugador 0' : 'Empate')
            }
        }, [state.tablero, state.turno])


        //MODO IA VS HUMANO
    } else if (modo == 'HAI') {

        const recibirTiro = async () => {
            let posicion = await TirarAI(state.tablero)
            MarcarHumano(posicion)
        }

        useEffect(() => {
            const { isGanadorX, isGanador0 } = RevisarGanador()
            if ((isGanador0 || isGanadorX) || state.tablero.every(item => item != undefined)) {
                console.log('ha ganador')
                setBloqueo(true)
                setGanador(isGanadorX ? 'El ganador del juego es: Jugador X' : isGanador0 ? 'El ganador del juego es: Jugador 0' : 'Empate')
            } else {
                if (state.turno == '0' && !isGanador0 && !isGanadorX && state.tablero.some(item => item == undefined)) {
                    console.log('entro')
                    setBloqueo(true)
                    recibirTiro()
                } else if (state.turno == 'X') {
                    setBloqueo(false)
                }
            }
        }, [state.tablero, state.turno])

        //MODO IA VS IA
    } else if (modo == 'AIAI') {

        const recibirTiro = async () => {
            let posicion = await TirarAI(state.tablero)
            MarcarHumano(posicion)
        }

        let contador = 0

        useEffect(() => {
            contador++
            const { isGanadorX, isGanador0 } = RevisarGanador()

            if (contador == 1) {
                if (!bloqueo && (isGanador0 || isGanadorX) || state.tablero.every(item => item != undefined)) {
                    setBloqueo(true)
                    setGanador(isGanadorX ? 'El ganador del juego es: Jugador X' : isGanador0 ? 'El ganador del juego es: Jugador 0' : 'Empate')

                } else {
                    setBloqueo(false)
                    console.log('entro en el tiro de: ', state.turno)
                    if (!isGanador0 && !isGanadorX && state.tablero.some(item => item == undefined)) {
                        recibirTiro()
                    }

                }
            }



        }, [state.tablero, state.turno])
    }




    return (
        <div className="game-page">
            <button className="return-btn" onClick={volverOpciones}>Volver a opciones</button>

            <section className="tablero-card">
                <div className="tape"></div>

                <p className="tag">Turno actual</p>

            {(ganador) &&
                <h2 className="turno-indicador"> <span className="marca-turno">{ganador}</span></h2>}

            {(state.turno == '0' && ganador == false && modo == 'HAI') &&
                <h2 className="turno-indicador">Le toca a <span className="marca-turno"> {state.turno}</span>
                    <br /> <span className="marca-turno">Pensando...</span></h2>}
            {((!ganador && modo == 'HAI') && state.turno == 'X') &&
                <h2 className="turno-indicador">Le toca a <span className="marca-turno"> {state.turno}</span></h2>}

            {(!ganador && (modo == 'HH' || modo == 'AIAI')) &&
                <h2 className="turno-indicador">Le toca a <span className="marca-turno"> {state.turno}</span></h2>}




            <div className="tablero">
                <button disabled={state.tablero[0] || bloqueo} onClick={() => MarcarHumano(0)} className="casilla" aria-label="Casilla 1">
                    {state.tablero[0] != undefined && state.tablero[0]}
                    {/* <svg className="marca" viewBox="0 0 40 40">
                        <g filter="url(#wobble)">
                            <use href="#mark-x" width="40" height="40" />
                        </g>
                    </svg> */}
                </button>

                <button disabled={state.tablero[1] || bloqueo} onClick={() => MarcarHumano(1)} className="casilla" aria-label="Casilla 2">
                    {state.tablero[1] != undefined && state.tablero[1]}
                </button>

                <button disabled={state.tablero[2] || bloqueo} onClick={() => MarcarHumano(2)} className="casilla" aria-label="Casilla 3">
                    {state.tablero[2] != undefined && state.tablero[2]}
                    {/* <svg className="marca" viewBox="0 0 40 40">
                        <g filter="url(#wobble)"> 
                            <use href="#mark-o" width="40" height="40" />
                        </g>
                    </svg> */}
                </button>

                <button disabled={state.tablero[3] || bloqueo} onClick={() => MarcarHumano(3)} className="casilla" aria-label="Casilla 4">
                    {state.tablero[3] != undefined && state.tablero[3]}
                </button>

                <button disabled={state.tablero[4] || bloqueo} onClick={() => MarcarHumano(4)} className="casilla" aria-label="Casilla 5">
                    {state.tablero[4] != undefined && state.tablero[4]}
                    {/* <svg className="marca" viewBox="0 0 40 40">
                        <g filter="url(#wobble)">
                            <use href="#mark-x" width="40" height="40" />
                        </g>
                    </svg> */}
                </button>

                <button disabled={state.tablero[5] || bloqueo} onClick={() => MarcarHumano(5)} className="casilla" aria-label="Casilla 6">
                    {state.tablero[5] != undefined && state.tablero[5]}
                </button>
                <button disabled={state.tablero[6] || bloqueo} onClick={() => MarcarHumano(6)} className="casilla" aria-label="Casilla 7">{
                    state.tablero[6] != undefined && state.tablero[6]}
                </button>

                <button disabled={state.tablero[7] || bloqueo} onClick={() => MarcarHumano(7)} className="casilla" aria-label="Casilla 8">
                    {/* <svg className="marca" viewBox="0 0 40 40">
                        <g filter="url(#wobble)">
                            <use href="#mark-o" width="40" height="40" />
                        </g>
                    </svg> */}
                    {state.tablero[7] != undefined && state.tablero[7]}
                </button>

                <button disabled={state.tablero[8] || bloqueo} onClick={() => MarcarHumano(8)} className="casilla" aria-label="Casilla 9">{state.tablero[8] != undefined && state.tablero[8]}</button>
            </div>

                <button className="play-btn" onClick={reiniciarPartida}>Reiniciar partida</button>
            </section >
        </div>
    );
}

export { Juego }