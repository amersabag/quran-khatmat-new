Meteor.publish('khatma', function (khatmaId) {
  return Khatmat.find({_id: khatmaId});
});
Meteor.publish('periods', function (khatmaId) {
  return Periods.find({khatmaId: khatmaId});
});
Meteor.publish('period', function (periodId) {
  return Periods.find({_id: periodId});
});
Meteor.publish('parts', function (khatmaId, periodId) {
  return Khatmat.find({khatmaId: khatmaId, periodId: periodId});
});
Meteor.publish('userData', function () {
  if (!Meteor.userId) {
    return null;
  }
  return Meteor.users.find(
      Meteor.userId(),
      {fields: {isAdmin: 1}}
  );
});