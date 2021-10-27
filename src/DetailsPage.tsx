import { Component } from 'react';
import './App.css';
import { get } from './api';
import { Link, RouteComponentProps } from '@reach/router';
import { Value } from './Value';
import { BorderCountry, DetailedCountry } from './types';

type State = {
  country: DetailedCountry | null;
  borderCountries: BorderCountry[];
};

export default class DetailsPage extends Component<RouteComponentProps> {
  state: State = {
    country: null,
    borderCountries: []
  };

  componentDidMount() {
    this.getCountry();
  }

  componentDidUpdate(props: any) {
    this.getCountry();
  }

  async getCountry() {
    const paths = window.location.pathname.split('/');
    const code = paths.pop();

    if (code && this.state.country?.alpha3Code !== code) {
      const countryResponse = await get<DetailedCountry>(`/alpha/${code}`);

      if (
        countryResponse &&
        countryResponse.borders &&
        countryResponse.borders.length > 0
      ) {
        const borderCountryString = countryResponse?.borders.join(',');
        const query = {
          codes: borderCountryString,
          fields: 'name,alpha3Code'
        };

        const borderCountryResponse = await get<BorderCountry>(`/alpha`, query);

        this.setState({
          country: countryResponse ?? null,
          borderCountries: borderCountryResponse ?? null
        });
      } else {
        this.setState({
          country: countryResponse ?? null
        });
      }
    }
  }

  render() {
    if (this.state.country === null) {
      // TODO: loading spinner
      return <p>Haetaan</p>;
    }

    const {
      country: {
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
      },
      borderCountries
    } = this.state;

    return (
      <div className="page">
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

            {borderCountries.length > 0 && (
              <div className="border-country-container">
                <p>Border countries</p>
                <div className="border-country-links">
                  {borderCountries.map(country => {
                    return (
                      <Link
                        className="border-country-link"
                        key={country.name}
                        to={`/country/${country.alpha3Code}`}
                      >
                        {country.name}
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
