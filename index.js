const restify  = require('restify'),
      builder  = require('botbuilder'),
      mongoose = require('mongoose'),
      config   = require('./config'),
      dialogs  = require('./dialogs'),
      isChat   = process.env.NODE_ENV === 'production' || false,
      mongoUri = process.env.MONGO_URI || config.MONGO;

//=========================================================
// DB Setup
//=========================================================
mongoose.connect(mongoUri);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongo connection error:'));
db.once('open', function() {
  console.log('Connected to mongo');
});

//=========================================================
// Bot Setup
//=========================================================
let bot;

if ( isChat ) {
  // Setup Restify Server
  const server = restify.createServer();
  const port   = (process.env.PORT || config.SERVER_PORT);
  const ip     = (process.env.IP || config.IP);
  server.listen(port, ip, function() {
    console.log('%s listening to %s', server.name, server.url);
  });
  const connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
  });
  bot = new builder.UniversalBot(connector);
  server.post('/api/messages', connector.listen());
  server.get('/health', function( req, res ) {
    res.send();
  });
} else {
  const connector = new builder.ConsoleConnector().listen();
  bot = new builder.UniversalBot(connector);
}


//=========================================================
// Bots Dialogs
//=========================================================

bot.dialog('/',[]);

bot.dialog('/profile', dialogs.profile);

bot.dialog('/recruiter', dialogs.recruiter);

bot.dialog('/offer', dialogs.offer);

bot.dialog('/firstRun', dialogs.firstRun);

// Install First Run middleware and dialog
bot.use(builder.Middleware.firstRun({ version: 1.0, dialogId: '*:/firstRun' }));
