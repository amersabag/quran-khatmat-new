Meteor.startup(function () {
  Khatmat._ensureIndex({'startDate': -1}, {background: 1});
  Periods._ensureIndex({'khatmaId': 1}, {background: 1});
  Periods._ensureIndex({'startDate': -1}, {background: 1});
  Parts._ensureIndex({'periodId': 1}, {background: 1});
  Parts._ensureIndex(
      {'khatmaId': 1, 'periodId': 1, 'partNumber': 1},
      {unique: 1, background: 1}
  );
  if(!Meteor.users.find({username: 'admin'}).count())
  {
    var adminId = Accounts.createUser({
      username: 'admin',
      email: 'amersabag@gmail.com',
      password: 'admin',
      profile: {
        name: 'The Admin'
      }
    });
    Meteor.users.update({_id: adminId}, {$set: {isAdmin: true}});
  }
});


