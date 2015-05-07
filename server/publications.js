Meteor.publish('khatma', function (khatmaId) {
  check(khatmaId, String);
  return Khatmat.find({_id: khatmaId});
});
Meteor.publish('khatmaCreatedBy', function (createdBy) {
  check(createdBy, String);
  return Khatmat.find({createdBy: createdBy});
});
Meteor.publish('periods', function (khatmaId) {
  check(khatmaId, String);
  return Periods.find({khatmaId: khatmaId});
});
Meteor.publish('periodsInIds', function (periodsIds) {
  check(periodsIds, [String]);
  return Periods.find({_id: {$in: periodsIds}});
});
Meteor.publish('period', function (periodId) {
  check(periodId, String);
  return Periods.find({_id: periodId});
});
Meteor.publish('parts', function (periodId) {
  check(periodId, String);
  return Parts.find({periodId: periodId});
});
Meteor.publish('partsOwnedBy', function (ownerId) {
  check(ownerId, String);
  return Parts.find({ownerId: ownerId});
});
Meteor.publish('userData', function () {
  var fields = this.userId
      ? {isAdmin: 1, 'username': 1}
      : {'username': 1};
  return Meteor.users.find(
      {},
      {fields: fields})
      ;
});