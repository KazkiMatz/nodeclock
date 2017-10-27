const express = require('express');
const request = require('request');
const socketio = require('socket.io');
const morgan = require('morgan');
const http = require('http');
const path = require('path');

const app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(morgan('combined'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const business_id = process.env.BUSINESS_ID || null;
const subscription_token = process.env.SUBSCRIPTION_TOKEN || '';
const api_url_pref = process.env.API_URL_PREFIX || 'https://clockpad.net/api/v1';

app.get('/', (req, res) => {
  res.render('index', {subscription_token});
});

app.get('/consoles', (req, res) => {
  const options = {
    url: `${api_url_pref}/businesses/${business_id}/time_attendance_consoles`,
    headers: { 'Authorization': `Token ${subscription_token}`},
    json: true,
  };

  request.get(options, (api_err, api_res, body) => {
    const status_code = api_res ? api_res.statusCode : null;

    if (api_err || status_code != '200') {
      res.render('consoles', {
        error: api_err,
        status_code,
        items: [],
      });
    } else {
      const items = body.data.time_attendance_consoles;
      res.render('consoles', {
        error: null,
        status_code, items,
      });
    }
  });
});

app.post('/webhook', (req, res) => {
  const msg = req.body;
  io.sockets.emit('msg', msg);

  // NOTE: Here we should return "20X" response code, otherwise the webhook server will retry sending messages
  res.status(201).json({});
});

const server = http.createServer(app).listen(app.get('port'), ()=>{
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  console.log('Listening on ' + bind);
});

const io = socketio.listen(server);
