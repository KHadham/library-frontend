import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import Nav from './Components/Nav';

import Profile from './Screens/Profile';
import UserDetail from './Screens/userDetail';
import UserProff from './Screens/userProfile';
import MeditUser from './Components/modal/modalEditUser';

import BUUKUU from './Screens/book';
import BuKuDeTaIl from './Screens/bookDetail';
import MeditBook from './Components/modal/modalEditBook';

import HIST from './Screens/history';
import histDetail from './Screens/historyDetail';

import store from './redux/store';
import axios from 'axios'; 

const tokenya = localStorage.getItem("token")
const iduser = localStorage.getItem("number")

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'Arkademy',
      counter: 0,
    };
  }
  render() {
    axios.defaults.headers.common["authorization"] = "wikwik"
    axios.defaults.headers.common["x-access-token"] =  tokenya
    axios.defaults.headers.common["x-control-user"] = iduser

    // jsx expression {}
    return (
      <Provider store={store}>
        <div>
          <Router>
            <Nav />
            <Route exact path="/" component={HIST} />
            
            <Route exact path={'/buku'} component={BUUKUU} />
            <Route  exact path={'/buku/:idd'} component={BuKuDeTaIl} />
            <Route  exact path={'/buku/:idd'} component={MeditBook} />

            <Route  exact path={'/users'} component={Profile} />
            <Route  exact path={'/users/:iduser'} component={UserDetail} />
            <Route  exact path={'/users/:iduser'} component={MeditUser} />
            <Route  exact path={'/profile'} component={UserProff} />

            <Route  exact path={'/history'} component={HIST} />
            <Route  exact path={'/history/:idHist'} component={histDetail} />
          </Router>
        </div>
      </Provider>
    );
  }
}

export default App;
