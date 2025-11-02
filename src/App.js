import React from 'react';
import Route from './pages/Route';
import { Provider } from 'react-redux';
import appStore from './utils/appStore';



const App =() =>{
  return (
    <Provider store={appStore}>
            <Route/>
    </Provider>

  );
}

export default App;
