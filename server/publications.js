Meteor.publish(null, function () {
	var fields = this.userId
		? {isAdmin: 1, 'username': 1}
		: {'username': 1};
	return Meteor.users.find(
		{},
		{fields: fields})
		;
});
Meteor.publish('khatmat', function(skip){
	skip = parseInt(skip);
	if(isNaN(skip))
	{
		skip = 0;
	}
	return Khatmat.find(
		{
			$or: [
				{ private: {$exists: false} },
				{ private: false },
				{ createdBy: this.userId }
			]
		},
		{
			sort: {startDate: -1},
			skip: skip,
			limit: SETTINGS.limitPerPage
		}
	);
});
Meteor.publish('khatma', function (khatmaId) {
  check(khatmaId, String);
  return Khatmat.find({_id: khatmaId});
});
Meteor.publish('periods', function (khatmaId) {
  check(khatmaId, String);
  return Periods.find({khatmaId: khatmaId});
});
Meteor.publish('period', function (periodId) {
  check(periodId, String);
  return Periods.find({_id: periodId});
});
Meteor.publish('parts', function (periodId) {
  check(periodId, String);
  return Parts.find({periodId: periodId});
});
Meteor.publish('myKhatmat', function(skip){
	skip = parseInt(skip);
	if(isNaN(skip))
	{
		skip = 0;
	}
	return Khatmat.find(
		{createdBy: this.userId},
		{
			sort: {startDate: -1},
			limit: SETTINGS.limitPerPage,
			skip: skip
		}
	);
});
Meteor.publish('myParts', function(skip){
	skip = parseInt(skip);
	if(isNaN(skip))
	{
		skip = 0;
	}
	return Parts.find(
		{ownerId: this.userId},
		{
			sort: {periodStartDate: -1},
			limit: SETTINGS.limitPerPage,
			skip: skip
		}
	);
});

