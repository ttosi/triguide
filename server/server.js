const turf = require('@turf/turf');
const fs = require('fs');
const express = require('express');
const Sugar = require('sugar-date');
const request = require('request');

Sugar.extend();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const trimetBaseApi = 'https://trimet.org/ws/int/v2/';

// because debugger
const stops = fs.existsSync('./tmstops.geojson') ?
  JSON.parse(fs.readFileSync('./tmstops.geojson')) :
  JSON.parse(fs.readFileSync('./server/tmstops.geojson'));

app.post('/api/stops', async (req, res) => {
  const boundary = turf.polygon([[
    [req.body.boundary._northEast.lng, req.body.boundary._southWest.lat],
    [req.body.boundary._northEast.lng, req.body.boundary._northEast.lat],
    [req.body.boundary._southWest.lng, req.body.boundary._northEast.lat],
    [req.body.boundary._southWest.lng, req.body.boundary._southWest.lat],
    [req.body.boundary._northEast.lng, req.body.boundary._southWest.lat]
  ]]);

  const foundStops = turf.pointsWithinPolygon(stops, boundary);
  const foundStopIds = foundStops.features.map(s => s.properties.stop_id);
  const arrivals = await getArrivals(foundStopIds);

  foundStops.features.forEach(s => {
    s.arrivals = arrivals.filter(a => parseInt(s.properties.stop_id) === parseInt(a.locid) && a.departed)
      .sort(a => a.estimated)
      .reverse()
      .slice(0, 2);
  });

  res.end(JSON.stringify(foundStops.features));
});

app.listen(30000, () => {
  console.log('api ready');
});

async function getArrivals(stopIds) {
  return new Promise(async (resolve) => {
    let arrivals = [];
    while (stopIds.length > 0) {
      const results = await fetchArrivals(stopIds.splice(0, 10));
      arrivals = arrivals.concat(results);
    }
    resolve(arrivals)
  });
}

async function fetchArrivals(ids) {
  return new Promise((resolve) => {
    const reqUrl = `${trimetBaseApi}arrivals?arrivals=1&locIDs=${ids.join(',')}`;
    request(reqUrl, async (err, response, body) => {
      resolve(JSON.parse(body).resultSet.arrival);
    });
  });
}