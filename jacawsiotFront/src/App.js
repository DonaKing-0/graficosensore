import logo from './logo.svg';
import './App.css';
import Linechart from './components/Linechart';
import Listalarm from './components/Listalarm'

function App() {
  //        <img src={logo} className="App-logo" alt="logo" />

  return (
    <div className="App">
      <header className="App-header">
        <Linechart />
        <Listalarm></Listalarm>

      </header>
    </div>
  );
}

export default App;
