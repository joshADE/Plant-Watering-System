
import './App.css';
import { store } from './actions/store';
import { Provider } from 'react-redux';
import Plants from './components/Plants';

function App() {
  return (
    <Provider store={store}>
      <Plants />
    </Provider>
  );
}

export default App;
