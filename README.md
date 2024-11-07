# SwapUnit - Unit Conversion API

This project is a Node.js API for converting units of temperature and volume. It includes validation and conversion history for volume feature.

## Features

- **Temperature Conversion**: Supports Kelvin, Celsius, and Fahrenheit.
- **Volume Conversion**: Supports units like liters, milliliters, and cubic meters.
- **Conversion History**: Logs volume conversions with a separate file for each day, allowing easy access to previous measurements.

## Endpoints

- **Temperature**

  - `GET /temperature` – Get available temperature units.
  - `POST /temperature/convert` – Convert temperature between units.

- **Volume**
  - `GET /volume` – Get available volume units.
  - `POST /volume/convert` – Convert volume between units.
  - `GET /volume/history` – Retrieve a list of all daily history files, each named by the date it was created.
  - `DELETE /volume/history/:date` – Delete conversion history by date.

# Project Demo

For a full explanation of the project, check out my video on YouTube: [Project Demo](https://www.youtube.com/watch?v=K3MAD6juWzc)
