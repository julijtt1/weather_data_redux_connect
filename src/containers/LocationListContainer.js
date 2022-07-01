import React, { Component } from "react";
import { connect } from "react-redux";
import { setSelectedCity, setWeather } from "../actions";
import LocationList from "../components/LocationList";
import { getWeatherCities } from "../reducers";
import PropTypes from "prop-types";

class LocationListContainer extends Component {
  componentDidMount() {
    this.props.setWeather(this.props.cities);
  }

  handleSelectedLocation = (city) => {
    this.props.setSelectedCity(city);
  };

  render() {
    return (
      <LocationList
        cities={this.props.citiesWeather}
        onSelectedLocation={this.handleSelectedLocation}
      ></LocationList>
    );
  }
}

LocationListContainer.propTypes = {
  setSelectedCity: PropTypes.func.isRequired,
  cities: PropTypes.array.isRequired,
  citiesWeather: PropTypes.array.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  setSelectedCity: (value) => dispatch(setSelectedCity(value)),
  setWeather: (cities) => dispatch(setWeather(cities)),
});

const mapStateToProps = (state) => ({
  citiesWeather: getWeatherCities(state),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LocationListContainer);
