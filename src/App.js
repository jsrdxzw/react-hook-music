import React from 'react';
import {GlobalStyle} from './style'
import {IconStyle} from "./assets/iconfont/iconfont"
import {HashRouter} from "react-router-dom"
import {renderRoutes} from "react-router-config"
import routes from './routes'
import {Provider} from "react-redux";
import store from "./store";


function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <GlobalStyle/>
        <IconStyle/>
        {renderRoutes(routes)}
      </HashRouter>
    </Provider>
  )
}

export default App;
