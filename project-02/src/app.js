import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Link, Route } from 'react-router-dom'

import Home from './components/Home'
import Search from './components/Search'
import Index from './components/Index'
import Show from './components/Show'

import LightningImage from './assets/Lightning-Bolt.jpg'

class App extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <BrowserRouter>
        <div className="page-wrapper">
          <nav className="">
            <Link to="/">
              <img src={LightningImage} />
            </Link>
            <Link to="/search" className="title-name">FLASH FILMS</Link>
          </nav>
          <main>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/search/:id" component={Index} />
              <Route path="/search" component={Search}/>
              <Route path="/movies/:id" component={Show} />
            </Switch>
          </main>
        </div>
      </BrowserRouter>

    )
  }
  

}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)