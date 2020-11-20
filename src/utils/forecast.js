const request = require("postman-request");

const forecast = (longitude, latitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=184ff084f78e6bc0cc06e195c37d86ca&query=${latitude},${longitude}&units=m`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback(`Unable to connect to location services!`, undefined);
    } else if (body.error) {
      callback(`Location not found.`, undefined);
    } else {
      callback(undefined, {
        Weather_Description: body.current.weather_descriptions[0],
        Current_Temp: body.current.temperature,
        feelslike: body.current.feelslike,
        String_statement: `${body.current.weather_descriptions[0]}. It is ${
          body.current.temperature
        } degrees out. It feels like ${
          body.current.feelslike
        } degrees out. The humidity is ${
          body.current.humidity
        } and there is a ${body.current.precip * 100} percent chance of rain.`,
      });
    }
  });
};
// const url =
//   "http://api.weatherstack.com/current?access_key=184ff084f78e6bc0cc06e195c37d86ca&query=37.8267,-122.4233&units=s";

// request({ url: url, json: true }, (error, response) => {
//   // const data = JSON.parse(response.body);
//   // console.log(response.body.current);

//   console.log(error);
//   if (error) {
//     console.log(`Unable to connect to weather service.`);
//   } else if (response.body.error) {
//     console.log(`Unable to find location`);
//   } else {
//     console.log(
//       `${response.body.current.weather_descriptions[0]}. It is ${response.body.current.temperature} degrees out. It feels like ${response.body.current.feelslike} degrees out`
//     );
//   }
// });

module.exports = forecast;
// console.log(
//     `${response.body.current.weather_descriptions[0]}. It is ${response.body.current.temperature} degrees out. It feels like ${response.body.current.feelslike} degrees out`
