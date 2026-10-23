import { useContext, useReducer, useState } from 'react'
import { reducer } from '../../reducers/TotitoReducer';
import { inicio, opcionesValidas } from '../../types/initialTypes';
import './style.css'
import { TotitoContext } from '../../Context';


function InicioJuego() {

    const { dispatch, onClickHH, onClickHAI, onClickAIAI } = useContext(TotitoContext)


    return (
        <>
            <svg width="0" height="0" style={{ position: 'absolute' }}>
                <defs>
                    <filter id="wobble">
                        <feTurbulence type="fractalNoise" baseFrequency="0.018" numOctaves="2" seed="7" result="noise" />
                        <feDisplacementMap in="SourceGraphic" in2="noise" scale="3.2" />
                    </filter>

                    <symbol id="grid-lines" viewBox="0 0 120 120">
                        <g stroke="var(--ink-soft)" strokeWidth="3.5" strokeLinecap="round">
                            <line x1="41" y1="6" x2="39" y2="114" />
                            <line x1="81" y1="6" x2="79" y2="114" />
                            <line x1="6" y1="41" x2="114" y2="39" />
                            <line x1="6" y1="81" x2="114" y2="79" />
                        </g>
                    </symbol>

                    <symbol id="mark-x" viewBox="0 0 40 40">
                        <g stroke="var(--ink)" strokeWidth="5.5" strokeLinecap="round" fill="none">
                            <path d="M10 10 L30 30" />
                            <path d="M30 10 L10 30" />
                        </g>
                    </symbol>

                    <symbol id="mark-o" viewBox="0 0 40 40">
                        <circle cx="20" cy="20" r="12" stroke="var(--ink)" strokeWidth="5.5" fill="none" />
                    </symbol>

                    <symbol id="mark-robot" viewBox="0 0 40 40">
                        <g fill="none" stroke="var(--ink)" strokeLinecap="round">
                            <rect x="8" y="11" width="24" height="19" rx="4" strokeWidth="4" />
                            <line x1="20" y1="11" x2="20" y2="5" strokeWidth="3.5" />
                            <circle cx="20" cy="4" r="2.2" fill="var(--ink)" stroke="none" />
                            <circle cx="15.5" cy="20.5" r="2.1" fill="var(--ink)" stroke="none" />
                            <circle cx="24.5" cy="20.5" r="2.1" fill="var(--ink)" stroke="none" />
                            <line x1="14" y1="26.5" x2="26" y2="26.5" strokeWidth="2.8" />
                        </g>
                    </symbol>
                </defs>
            </svg>

            <div className="wrap">
                <header>
                    <span className="eyebrow">Cuaderno de partidas</span>
                    <h1>Totito</h1>
                    <svg className="underline" viewBox="0 0 240 18">
                        <path d="M4 12 Q60 2 120 10 T236 8" />
                    </svg>
                    <p className="tagline">
                        Antes de empezar, <strong>elige quién ocupa cada casilla</strong>: dos personas, una persona
                        contra la máquina, o dos máquinas jugando entre sí.
                        Puedes escoger entre tres modos de juego. Jug
                    </p>
                </header>

                <div className="modes">

                    {/* Modo 1: Humano vs Humano */}
                    <article className="mode">
                        <div className="tape"></div>
                        <svg className="board" viewBox="0 0 120 120">
                            <g filter="url(#wobble)">
                                <use href="#grid-lines" />
                                <use href="#mark-x" x="0" y="0" width="40" height="40" />
                                <use href="#mark-o" x="40" y="40" width="40" height="40" />
                                <use href="#mark-x" x="80" y="80" width="40" height="40" />
                            </g>
                        </svg>
                        <p className="tag">Humano · Humano</p>
                        <h2>Dos jugadores</h2>
                        <p>Compartan el mismo dispositivo y túrnense para marcar la casilla.</p>
                        <button id='1' onClick={onClickHH} className="play-btn" href="#">Jugar</button>
                    </article>

                    {/* Modo 2: Humano vs IA */}
                    <article className="mode">
                        <div className="tape"></div>
                        <svg className="board" viewBox="0 0 120 120">
                            <g filter="url(#wobble)">
                                <use href="#grid-lines" />
                                <use href="#mark-x" x="0" y="0" width="40" height="40" />
                                <use href="#mark-robot" x="80" y="0" width="40" height="40" />
                                <use href="#mark-x" x="40" y="40" width="40" height="40" />
                            </g>
                        </svg>
                        <p className="tag">Humano · IA</p>
                        <h2>Tú contra la máquina</h2>
                        <p>Pon a prueba tu estrategia frente a una inteligencia artificial.</p>
                        <button id='2' onClick={onClickHAI} className="play-btn" href="#">Jugar</button>
                    </article>

                    {/* Modo 3: IA vs IA */}
                    <article className="mode">
                        <div className="tape"></div>
                        <svg className="board" viewBox="0 0 120 120">
                            <g filter="url(#wobble)">
                                <use href="#grid-lines" />
                                <use href="#mark-robot" x="0" y="0" width="40" height="40" />
                                <use href="#mark-robot" x="80" y="40" width="40" height="40" />
                                <use href="#mark-robot" x="40" y="80" width="40" height="40" />
                            </g>
                        </svg>
                        <p className="tag">IA · IA</p>
                        <h2>Duelo de máquinas</h2>
                        <p>Siéntate a observar cómo compiten dos inteligencias artificiales.</p>
                        <button id='3' onClick={onClickAIAI} className="play-btn" href="#">Ver partida</button>
                    </article>

                </div>

                <footer>totito · elige un modo para comenzar</footer>
            </div>
        </>
    )
}

export { InicioJuego }