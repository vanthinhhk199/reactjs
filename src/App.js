import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './components/Header/index';
import NotFound from './components/NotFound/index';
import ProductFeature from './components/Product/index';


function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Switch>
        <Route exact path="/" component="" />
        <Route path="/products" component={ProductFeature} />

        <Route component={NotFound}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
