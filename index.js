var request = require('request')
var express = require('express')
var app = express()
var ttn = require("ttn")

var appID = "thailora923mhz"
var accessKey = "ttn-account-v2.He_7mhPlldODNmYVsLi9OydUOC92I5zVkMa79RA8At8"

ttn.data(appID, accessKey)
  .then(function (client) {
    client.on("uplink", function (devID, payload) {
      console.log("Received uplink from ", devID)
      console.log(payload)
      //http.post("http://staging.enres.co/api/data_sensor_batch?access_token=8I3LaxaL8Yx5FASA4UpVh5I2swRoEO",[payload.payload_fields])
      console.log(JSON.stringify(payload.payload_fields))

      var options = {
        url: 'http://data.enres.co/v3/data_sensor_batch?access_token=8I3LaxaL8Yx5FASA4UpVh5I2swRoEO',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        json: [payload.payload_fields]
      }

      request(options, function(err, res, body) {
        if (res && (res.statusCode === 200 || res.statusCode === 201)) {
          console.log(body);
        }
      })

    })
  })
  .catch(function (error) {
    console.error("Error", error)
    process.exit(1)
  })

var port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", function() {
console.log("Listening on Port 3000");
});

setTimeout(function a(){}, 30000)