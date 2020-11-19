const request = require("postman-request");
const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiamFzb25hbGxhbiIsImEiOiJja2hrNGNmY3UwY2JkMnJwZWR6NGozOW96In0.vW7JHrh_cYmenedzkClPkA&limit=1`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback(`Unable to connect to location services!`, undefined);
    } else if (body.message) {
      callback(`Location not found.`, undefined);
    } else if (body.features.length === 0) {
      callback(`Unable to find location, try another search.`, undefined);
    } else {
      // const latitude = response.body.features[0].center[1];
      // const longitude = response.body.features[0].center[0];
      // console.log(latitude, longitude);
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
