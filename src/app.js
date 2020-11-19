const path = require("path");
const express = require("express");
const hbs = require("hbs");
const request = require("postman-request");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

//Define Paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to server
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Allan Jason",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Allan J",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "Hi dis is da help page, welkum",
    title: "Help",
    name: "Allan",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Must provide an address. ",
    });
  }

  geocode(
    req.query.address,
    (error, { longitude, latitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(longitude, latitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send(
          {
            location,
            forecast: forecastData.String_statement,
            address: req.query.address,
          }
          // forecast: `Sunny`,
          // location: `QC`,
          // temp: 23,
          // feelsLike: 20,
          // address: req.query.address,
        );
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term.",
    });
  }

  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "aj_help",
    errorMessage: "Help article not found",
  });
});
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "aj",
    errorMessage: "Page not found",
  });
});
app.listen(3000, () => {
  console.log(`Server is up on port 3000.`);
});
