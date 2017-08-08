const builder = require('botbuilder');
const Role    = require('../models/role');

module.exports = [
  function( session, results ) {
    session.send(`Great! To save a bit of your and Marti's time, here's what he might be interested in:
- Ideally focused on React and/or Nodejs
- No Angular roles of any kind please
- Ideally a Lead position or higher

If you have anything close to these specs, please refer this role first.`);
    builder.Prompts.choice(session, `What kind of offer is it?`, ['Permanent', 'Contract' ]);
  },
  function( session, results ) {
    const offerType = results.response.entity;
    session.userData.offerData = {};
    session.userData.offerData.offerType = offerType;
    builder.Prompts.time(session, `When is the role due to start?`);
  },
  function( session, results ) {
    session.userData.offerData.start = results.response;
    builder.Prompts.text(session, `What is the duration of the role?`);
  },
  function( session, results ) {
    session.userData.offerData.duration = results.response;
    builder.Prompts.text(session, `What is the maximum salary they can offer?`);
  },
  function( session, results ) {
    session.userData.offerData.salary = results.response;
    builder.Prompts.confirm(session, `Does the role involve leading a team of developers?`);
  },
  function( session, results ) {
    session.userData.offerData.isLead = results.response;
    builder.Prompts.text(session, `What else can you tell me about the role?`);
  },
  function( session, results ) {
    session.userData.offerData.role = results.response;
    builder.Prompts.text(session, `What can you tell me about the company?`);
  },
  function( session, results ) {
    session.userData.offerData.company = results.response;
    session.userData.offers = session.userData.offers || [];
    session.userData.offers.push( session.userData.offerData );
    delete session.userData.offerData;
    const role = new Role(session.userData);
    role.save(( err, role ) => {
      if (err) return console.error(err);
      console.log('New role saved', role);
    });
    builder.Prompts.confirm(session, `Great! I think I have everything I need, would you like to tell me about another offer?`)
  },
  function( session, results ) {
    if ( results.response ) {
      session.beginDialog('/offer');
    } else {
      session.send(`Thanks for your patience and we'll let you know asap!`);
      session.endDialog();
    }
  },
  function( session, results ) {
    session.send(`There's nothing else for me to say so I'll ask you about another offer?`)
    session.beginDialog('/offer');
  }
];
