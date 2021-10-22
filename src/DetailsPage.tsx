import { Component } from 'react';
import { get } from './api';

interface Country {
  name: string;
  population: number;
  region: string;
  subregion: string;
  capital: string;
  alpha3Code: string;

  flags: {
    svg: string;
    png: string;
  };

  languages: Language[];
  currencies: Currency[];
}

interface Currency {
  code: string;
  name: string;
  symbol: string;
}

interface Language {
  name: string;
}

type State = {
  country: Country | null;
};

export default class DetailsPage extends Component {
  state: State = {
    country: null
  };

  componentDidMount() {
    const paths = window.location.pathname.split('/');

    const countryCode = paths.pop();

    if (countryCode) {
      this.getCountry(countryCode);
    }
  }

  async getCountry(code: string) {
    const response = await get<Country>(`/alpha/${code}`);

    this.setState({ country: response ? response : null });
  }

  render() {
    return (
      <div>
        <p>Hello! {this.state.country?.name}</p>
      </div>
    );
  }
}
