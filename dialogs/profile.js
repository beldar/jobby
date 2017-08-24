const builder = require('botbuilder');

module.exports = [
  function( session ) {
    builder.Prompts.text(session, `
Hi there!
Welcome to the chatbot application made by Marti Planellas.
I'm here to help you find all the information you may need from me.
Can I begin by asking your full name?
`);
  },
  function( session, results ) {
    session.userData.fullName = results.response;
    session.userData.name = results.response.split(' ')[0];
    builder.Prompts.confirm(session, `Hi ${session.userData.name}. Are you a recruiter?`);
  },
  function( session, results, next ) {
    if (results.response) {
      session.userData.isRecruiter = true;
      session.beginDialog('/recruiter');
    } else {
      session.send(`I'm afraid I can't help you then, this part of the dialog is under construction!`);
    }
  }
];
