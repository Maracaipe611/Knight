import logo from './logo.svg';
import './App.css';
import Tabuleiro from './Tabuleiro.js';

function App() {
  return (
    <div className="App">
      <h1>Xadrez</h1>
      <div style={{
        width: '100%',
        height: 500
      }}><Tabuleiro/></div>
    </div>
  );
}

export default App;
