import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "../actions";
import LocationList from "../components/LocationList";
import { getCity, getWeatherCities } from "../reducers";
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
  setWeather: PropTypes.func.isRequired,
  cities: PropTypes.array.isRequired,
  citiesWeather: PropTypes.array.isRequired,
  citiy: PropTypes.string.isRequired,
};

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

const mapStateToProps = (state) => ({
  citiesWeather: getWeatherCities(state),
  city: getCity(state),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LocationListContainer);
