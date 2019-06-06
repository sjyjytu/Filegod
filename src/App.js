import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './Components/Home/index'
import AddLink from './Components/AddLink'
import AddFile from './Components/AddFile'

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <BrowserRouter>
          <div style={{ minHeight: 445 }}>
            <Route exact path="/" component={Home} />
            <Route exact path="/AddFile" component={AddFile} />
            <Route exact path="/AddLink" component={AddLink} />
          </div>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

export default App;
