import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import Search from './components/Search';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Search />
      </div>
    </Provider>
  );
}

export default App;
