import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {store} from "./state";
import { Provider } from 'react-redux';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import {Root,Articulos,ConstruirArticulo,Proveedores} from "./Routes";
import {RootComponent} from "./modules/root/components";
import {ArticulosComponent,ArticuloEditarComponent} from "./modules/articulos/components";
import {MasterComponent} from "./modules/master/components";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { syncHistoryWithStore } from 'react-router-redux';
import "flexboxgrid/dist/flexboxgrid.css";
injectTapEventPlugin();



const history = syncHistoryWithStore(browserHistory,store);

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      <Router history={history}>
        <Route path={Root} component={MasterComponent}>
          <IndexRoute component={RootComponent}/>
          <Route path={Articulos} component={ArticulosComponent}/>
          <Route path={ConstruirArticulo} component={ArticuloEditarComponent}/>
        </Route>
      </Router>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);
