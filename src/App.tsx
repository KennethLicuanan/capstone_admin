import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import Add from './pages/add/add';
import User from './pages/user/user';
import Studies from './pages/studies/studies';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/capstone_admin/">
        <Redirect to="/capstone_admin/Login"/>
          <Login />
        </Route>

        <Route exact path="/capstone_admin/Login">
          <Login />
        </Route>
        
        <Route exact path="/capstone_admin/Home">
          <Home/>
        </Route>
        
        <Route exact path="/capstone_admin/Home/Add">
          <Add />
        </Route>

        <Route exact path="/capstone_admin/Home/User">
          <User />
        </Route>

        <Route exact path="/capstone_admin/Home/Studies">
          <Studies />
        </Route>

      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
