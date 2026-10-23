
import { useContext, useReducer } from 'react';
import { InicioJuego } from './components/InicioJuego';
import { reducer } from './reducers/TotitoReducer';
import { inicio } from './types/initialTypes';
import { Juego } from './components/Juego';
import { TotitoContext } from './Context';

function App() {
  const { dispatch, state, modoJuego } = useContext(TotitoContext)

  return (
    <>
      {!state.continuar && <InicioJuego />}
      {state.continuar && modoJuego == 'HH' && <Juego modo={'HH'}/>}
      {state.continuar && modoJuego == 'HAI' && <Juego modo={'HAI'} />}
      {state.continuar && modoJuego == 'AIAI' && <Juego modo={'AIAI'} />}
    </>
  );

}

export { App }

