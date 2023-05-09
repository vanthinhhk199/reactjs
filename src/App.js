import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './components/Header/index';

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Switch>
        <Route exact path="/" component="" />
        <Route path="/register" component="" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
