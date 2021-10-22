import { Link } from '@reach/router';
import React from 'react';
import './App.css';
import { get } from './api';
import { TopBar } from './TopBar';
import { Value } from './Value';

interface Country {
  name: string;
  population: number;
  region: string;
  // subregion: string
  capital: string;
  alpha3Code: string;

  flags: {
    svg: string;
    png: string;
  };
}

type State = {
  countries: Country[];
  search: {
    input: string;
    typing: boolean;
    timeout: any; //TODO:
  };
};
export default class App extends React.Component {
  state: State = {
    countries: [],

    search: {
      input: '',
      typing: false,
      timeout: 0
    }
  };

  componentDidMount() {
    this.getCountries('/all');
  }

  async getCountries(path: string) {
    const response = await get<Country[]>(path);

    const countries = response
      ? response.map(r => {
          const { name, population, region, capital, flags, alpha3Code } = r;

          return {
            name,
            population,
            region,
            capital,
            flags,
            alpha3Code
          };
        })
      : [];

    this.setState({ countries });
  }

  onChange(e: any) {
    e.preventDefault();

    if (this.state.search.timeout) {
      clearTimeout(this.state.search.timeout);
    }

    this.setState({
      search: {
        timeout: setTimeout(() => {
          const path =
            e.target.value.length === 0 ? '/all' : `/name/${e.target.value}`;

          this.getCountries(path);
        }, 1000)
      }
    });
  }

  render() {
    return (
      <div className="page">
        <TopBar />
        <div className="toolbar">
          <input
            type="text"
            className="search"
            placeholder="Search for a country"
            onChange={this.onChange.bind(this)}
          />
          <button className="dropdown">Filter by region </button>
        </div>

        <div className="content">
          {this.state.countries.map(country => {
            const { name, alpha3Code, population, region, capital, flags } =
              country;

            return (
              <Link
                className="country-item"
                key={name}
                to={`country/${alpha3Code}`}
              >
                <img
                  className="country-flag"
                  src={flags.svg}
                  alt={`Flag of ${name}`}
                />
                <div className="country-info">
                  <h2 className="country-name">{name}</h2>

                  <Value label="Population" value={population} />
                  <Value label="Region" value={region} />
                  <Value label="Capital" value={capital} />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    );
  }
}
