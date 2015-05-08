Meteor.startup(function () {
  Khatmat._ensureIndex({'startDate': -1}, {background: 1});
  Periods._ensureIndex({'khatmaId': 1}, {background: 1});
  Periods._ensureIndex({'startDate': -1}, {background: 1});
  Parts._ensureIndex({'periodId': 1}, {background: 1});
  Parts._ensureIndex(
      {'khatmaId': 1, 'periodId': 1, 'partNumber': 1},
      {unique: 1, background: 1}
  );

  if(!Meteor.users.find({
		  $or: [
			  {username: 'admin'},
			  {emails: { $elemMatch: { address: 'amersabag@gmail.com' }}}
		  ]
	  }).count())
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
	var user = Meteor.users.findOne({
		$or: [
			{username: 'amer'},
			{emails: { $elemMatch: { address: 'amer@sabag.net' }}}
		]
	});
	var userId = null;
	if(!user)
	{
		userId = Accounts.createUser({
			username: 'amer',
			email : 'amer@sabag.net',
			password : '123456'
		});
	}
	else
	{
		userId = user._id;
	}
	if(Khatmat.find().count() == 0)
	{
		Khatmat.insert({
			name: 'Abu Mazen',
			period: 7,
			startDate: new Date('2015-03-21'),
			createdAt: new Date(),
			createdBy: userId
		});
	}
	var periodsToDenormalize = Parts.find({khatmaName: {$exists: false}});
	if(periodsToDenormalize.count())
	{
		_.each(periodsToDenormalize.fetch(), function(item){
			var updateSet = {
				khatmaName: Khatmat.findOne({_id: item.khatmaId}).name
			};
			Periods.update({_id: item._id}, {
				$set: updateSet
			});
		})
	}
	var partsToDenormalize = Parts.find({ownerUsername: {$exists: false}});
	if(partsToDenormalize.count())
	{
		_.each(partsToDenormalize.fetch(), function(item){
			var user = Meteor.users.findOne({_id:item.ownerId});
			var updateSet = {
				khatmaName: Khatmat.findOne({_id: item.khatmaId}).name,
				periodStartDate: Periods.findOne({_id: item.periodId}).startDate,
				ownerUsername: user ? user.username : null
			};
			Parts.update({_id: item._id}, {
				$set: updateSet
			});
		})
	}
});
