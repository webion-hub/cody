import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

import registerServiceWorker from './registerServiceWorker';

import Requests from 'src/lib/requests';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');

Requests.onError = (reason) => {
  console.log(reason);
};


ReactDOM.render(
  <BrowserRouter basename={baseUrl}>
    <App />
  </BrowserRouter>,
  rootElement
);

registerServiceWorker();

