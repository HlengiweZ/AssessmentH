import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Home from "./pages/home";

;
function App() {
  return (
   <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      {/* <Route exact path="/create" component={create} />
      <Route exact path="/edit/:id" component={edit} />
      <Route exact path="/view/:id" component={details} /> */}
    </Switch>
   </BrowserRouter>
  );
}

export default App;
