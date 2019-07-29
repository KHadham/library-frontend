import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Provider} from 'react-redux';

import Nav from './Components/Nav';
import Profile from './Screens/Profile';
import UserDetail from './Screens/userDetail';
import BUUKUU from './Screens/book';
import BuKuDeTaIl from './Screens/bookDetail';
import HIST from './Screens/history';
import store from './redux/store';

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'Arkademy',
      counter: 0,
    };
  }
  render() {
    // jsx expression {}
    return (
      <Provider store={store}>
        <div>
          <Router>
            <Nav />
            <Route exact path="/" component={HIST} />
            <Route exact path={'/buku'} component={BUUKUU} />
            <Route  exact path={'/buku/:idd'} component={BuKuDeTaIl} />
            <Route  exact path={'/history'} component={HIST} />
            <Route  exact path={'/profile'} component={Profile} />
            <Route  exact path={'/users/:iduser'} component={UserDetail} />
          </Router>
        </div>
      </Provider>
    );
  }
}

export default App;
