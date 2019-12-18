// Axios to make http requests and use Promise API, native to JS ES6
import axios from "axios";

export const getGeocode = async (geoKey, city) => {
  try {
    const response = await axios({
      method: "get",
      url: `https://maps.googleapis.com/maps/api/geocode/json?key=${geoKey}&address=${city}`
    });

    const { data } = response;

    return Promise.resolve(data);
  } catch (error) {
    const { response } = error;

    return Promise.reject(response);
  }
};

export const getTemperature = async (lat, lng, weatherKey) => {
  try {
    const response = await axios({
      method: "get",
      url: `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&mode=json&appid=${weatherKey}`
    });

    const { data } = response;

    return Promise.resolve(data);
  } catch (error) {
    const { response } = error;

    return Promise.reject(response);
  }
};

export default {
  getGeocode,
  getTemperature
};
