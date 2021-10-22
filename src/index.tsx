import { RouteComponentProps, Router } from '@reach/router';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import DetailsPage from './DetailsPage';
import './index.css';
import reportWebVitals from './reportWebVitals';

const Home: React.FC<RouteComponentProps> = () => {
  return <App />;
};

const Details: React.FC<RouteComponentProps> = () => {
  return <DetailsPage />;
};

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Home path="/" />
      <Details path="/country/:name" />
    </Router>

    {/* <App /> */}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
