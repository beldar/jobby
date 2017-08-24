const builder = require('botbuilder');

module.exports = [
  function( session, results ) {
    builder.Prompts.confirm(session, `Awesome! Thanks for visiting my page! Are you here only to test Jobby? (i.e. you don't have a geniuine job opportunity to share)`);
  },
  function( session, results ) {
    session.userData.isFake = results.response;
    builder.Prompts.text(session, `Which company do you work for ${session.userData.name}?`);
  },
  function( session, results ) {
    session.userData.company = results.response;

    builder.Prompts.text(session, `And what's the best email address to reach you?`);
  },
  function( session, results ) {
    session.userData.email = results.response;

    builder.Prompts.confirm(session, `Are you here about a job opportunity?`);
  },
  function( session, results ) {
    if (results.response) {
      session.beginDialog('/offer');
    } else {
      session.send(`I'm afraid I can't help you then :(`);
    }
  }
];
