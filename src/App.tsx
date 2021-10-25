import { RouteComponentProps, Router } from '@reach/router';
import React from 'react';
import DetailsPage from './DetailsPage';
import HomePage from './HomePage';
import { TopBar } from './TopBar';
import { Mode } from './types';

const Home: React.FC<RouteComponentProps> = () => {
  return <HomePage />;
};

const Details: React.FC<RouteComponentProps> = () => {
  return <DetailsPage />;
};

type State = {
  mode: Mode;
};
export default class App extends React.Component {
  state: State = {
    mode: Mode.Light
  };

  toggleMode = (mode: Mode) => {
    this.setState({ mode });
  };

  render() {
    const { mode } = this.state;
    const theme = mode === Mode.Light ? 'light-theme' : 'dark-theme';

    return (
      <div className={`page ${theme}`}>
        <TopBar mode={mode} toggleMode={this.toggleMode} />
        <Router>
          <Home path="/" />
          <Details path="/country/:name" />
        </Router>
      </div>
    );
  }
}
