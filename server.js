var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.get(['/api/:dateString', '/api/'], function (req, res) {
  let date;

  if (req.params.dateString) {
    const dateString = req.params.dateString;
    if (isNaN(dateString)) {
      date = new Date(dateString);
    } else {
      date = new Date(parseInt(dateString));
    }
  } else {
    date = new Date();
  }

  if (date.toString() === 'Invalid Date') {
    res.json({ error: date.toString() });
  } else {
    res.json({ unix: date.getTime(), utc: date.toUTCString() });
  }
});

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
