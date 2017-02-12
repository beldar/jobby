const builder = require('botbuilder');

module.exports = [
  function( session, results ) {
    builder.Prompts.choice(session, `Hi there fellow developer! Which kind of developer are you?`, ['Frontend', 'Backend', 'Fullstack']);
  },
  function( session, results ) {
    const type = results.response.entity;
    session.userData.developerType = type;
    session.send(`Awesome! I've also worked as a ${type}!`);
    builder.Prompts.text(session, `What's your main language of choice?`);
  },
  function( session, results ) {
    session.userData.language = results.response;
    session.send(`Cool! Now's your turn to ask questions, you can ask me thinks like:
- Do you write any tech posts?
- Which technologies are you proficient at?
- Have you given any tech talks?
- How is this chatbot made?
- What's the coolest project you've done?

You can also try asking me other things, but I can't guarantee I'll have an answer!`);
    session.endDialog();
  }
];
