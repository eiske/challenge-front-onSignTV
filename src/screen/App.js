import React, { Component } from "react";
import { getGeocode, getTemperature } from "../api/api";

export default class App extends Component {
  state = {
    lat: "",
    lng: "",
    city: "",
    temperature: "",
    geoKey: "AIzaSyAg6rz9WIBVRKGEo-Zqx9tjDxSTF4Yk6rs",
    weatherKey: "b78eb13035123aa706e7715ef9d79f6c"
  };

  /**
   * Fetch the latitude and longitude from Google Geocoding API
   * then set the values in latitude and longitude caught from response
   */
  fetchGeocode = async () => {
    const { city, geoKey } = this.state;

    try {
      const response = await getGeocode(geoKey, city);

      const latitude = response.results[0].geometry.location.lat.toFixed(3);
      const longitude = response.results[0].geometry.location.lng.toFixed(3);

      this.setState({
        lat: latitude,
        lng: longitude
      });

      this.fetchTemperature();
    } catch (error) {
      if (error.status === 400) {
        alert("Invalid Geocode, please insert the name of city correctly");
      }
    }
  };

  /**
   * Fetch the weather from OpenWeather's api to get temperature by geocode
   * then set the temperature caught from response
   */
  fetchTemperature = async () => {
    const { lat, lng, weatherKey } = this.state;

    try {
      const response = await getTemperature(lat, lng, weatherKey);

      if (response.cod === 200) {
        const temp = `${parseInt(response.main.temp)} °C`;
        this.setState({ temperature: temp });
      } else {
        alert("There is an error with your APR request");
      }
    } catch (error) {
      if (error.cod === 401) {
        alert("Something is wrong with your API key :/");
      } else {
        alert("There is an error with your APR request");
      }
    }
  };

  // Update and set the city state while typing
  handleChange(event) {
    this.setState({ city: event.target.value });
  }

  // Call fetch geocode function
  handleSubmit = async event => {
    this.fetchGeocode();
    event.preventDefault();
  };

  renderForm() {
    const { lat, lng, city } = this.state;
    return (
      <form onSubmit={event => this.handleSubmit(event)}>
        <div className="form-row">
          <label for="city" className="col-sm-1 col-form-label">
            City
          </label>
          <div className="col-sm-11">
            <input
              type="text"
              value={city}
              onChange={event => this.handleChange(event)}
              class="form-control"
              id="city"
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label for="latitude">Latitude</label>
            <input
              type="text"
              value={lat}
              className="form-control bg-light"
              id="latidude"
              disabled
            />
          </div>
          <div className="form-group col-md-6">
            <label for="longitude">Longitude</label>
            <input
              type="text"
              value={lng}
              className="form-control bg-light"
              id="longitude"
              disabled
            />
          </div>
        </div>
        <button type="submit" className="btn btn-outline-primary">
          Show Temperature
        </button>
      </form>
    );
  }

  renderTemperature() {
    const { lat, lng, city, temperature } = this.state;
    return (
      <div className="text-center">
        <div className="dropdown-divider" />
        <h4 className="mt-3">
          Temperature at {lat}, {lng}
          <span className="text-capitalize"> ({city})</span> is {temperature}
        </h4>
      </div>
    );
  }

  render() {
    const { temperature } = this.state;
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-dark text-light">
          <h3>OnSign TV Temperature App</h3>
        </nav>
        <div className="container align-item-center mt-5 w-50">
          <div className="card">
            <div className="card-header">
              <h5>
                Current Temperature For Location
                <span role="img" aria-label="Thermometer">
                  🌡️
                </span>
              </h5>
            </div>
            <div className="card-body container">
              {this.renderForm()}
              {temperature !== "" ? this.renderTemperature() : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
