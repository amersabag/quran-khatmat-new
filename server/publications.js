Meteor.publish('khatma', function (khatmaId) {
  return Khatmat.find({_id: khatmaId});
});
Meteor.publish('periods', function (khatmaId) {
  return Periods.find({khatmaId: khatmaId});
});
Meteor.publish('period', function (periodId) {
  return Periods.find({_id: periodId});
});
Meteor.publish('parts', function (periodId) {
  return Parts.find({periodId: periodId});
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