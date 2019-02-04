import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowRight, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import HomeScreen from './web/HomeScreen';
import DecodeTxScreen from './web/tx/DecodeTxScreen';
import CreateTxScreen from './web/tx/CreateTxScreen';
import DecompileASMScreen from './web/script/DecompileASMScreen';

import 'bootstrap';
import './web/scss/main.scss';

// icons to be used
library.add(faArrowRight, faGithub, faPlusCircle);

const App = () => (
  <Router basename="/bitcoin-forge">
    <div>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
        <Link className="navbar-brand" to="/">
          BF
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="transactions-dropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Transactions
              </a>
              <div className="dropdown-menu" aria-labelledby="transactions-dropdown">
                <Link className="dropdown-item" to="/tx/decode">
                  Decode a tx
                </Link>
                <Link className="dropdown-item" to="/tx/forge">
                  Create a tx
                </Link>
              </div>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="transactions-dropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Scripts
              </a>
              <div className="dropdown-menu" aria-labelledby="transactions-dropdown">
                <Link className="dropdown-item" to="/script/">
                  Decompile ASM
                </Link>
              </div>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              <a
                className="nav-link"
                href="https://github.com/improvein/bitcoin-forge"
                title="GitHub repo"
              >
                <FontAwesomeIcon icon={['fab', 'github']} />
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <main className="flex-shrink-0 pb-3" role="main">
        <div className="container">
          <Route path="/" exact component={() => <HomeScreen />} />
          <Route path="/tx/decode" component={() => <DecodeTxScreen />} />
          <Route path="/tx/forge" component={() => <CreateTxScreen />} />
          <Route path="/script/" component={() => <DecompileASMScreen />} />
        </div>
      </main>
    </div>
  </Router>
);

export default App;