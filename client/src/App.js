import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavbar from './components/Navbar';
import EmailList from './components/EmailList';
import EmailModal from './components/EmailModal';
import { Container } from 'reactstrap';
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authAction';
import './App.css';

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <div className='App'>
        <AppNavbar />
        <Container>
          <EmailModal />
          <EmailList />
        </Container>
      </div>
    </Provider>
  );
};

export default App;
