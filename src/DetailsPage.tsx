import { Component } from 'react';
import './App.css';
import { get } from './api';
import { TopBar } from './TopBar';
import { Link } from '@reach/router';
import { Value } from './Value';

interface Country {
  name: string;
  nativeName: string;
  population: number;
  region: string;
  subregion: string;
  capital: string;
  alpha3Code: string;
  topLevelDomain: string;

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
    if (this.state.country === null) {
      return <p>Haetaan</p>;
    }

    const {
      capital,
      currencies,
      flags,
      languages,
      name,
      nativeName,
      population,
      region,
      subregion,
      topLevelDomain
    } = this.state.country;

    return (
      <div className="page">
        <TopBar />

        <div className="toolbar">
          <Link className="back-button" to={'/'}>
            Back
          </Link>
        </div>

        <div className="details">
          <div className="flag-container">
            <img src={flags.svg} alt={`Flag of ${name}`} />
          </div>
          <div className="details-content">
            <h2>{name}</h2>

            <div className="details-columns">
              <div className="column">
                <Value label="Native name" value={nativeName} />
                <Value label="Population" value={population} />
                <Value label="Region" value={region} />
                <Value label="Sub Region" value={subregion} />
                <Value label="Capital" value={capital} />
              </div>
              <div className="column">
                <Value label="Top Level Domain" value={topLevelDomain} />
                <Value
                  label="Currencies"
                  value={currencies.map(currency => currency.name).join(', ')}
                />
                <Value
                  label="Languages"
                  value={languages.map(language => language.name).join(', ')}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
