const builder = require('botbuilder');

module.exports = [
  function( session, results ) {
    session.send(`So I'm guessing you're just browsing around? That's cool!
You can ask me questions like:
- Who are you?
- What do you do?
- What's the coolest project you've done?
- How is this chatbot made?

You can try asking me other things!`)
  }
];
