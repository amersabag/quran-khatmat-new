Meteor.startup(function () {
  Khatmat._ensureIndex({'startDate': -1}, {background: 1});
  Periods._ensureIndex({'khatmaId': 1});
  Periods._ensureIndex({'khatmaId': 1});
  Periods._ensureIndex({'khatmaId': 1});
  Parts._ensureIndex({'periodId': 1});
  Parts._ensureIndex(
      {'khatmaId': 1, 'periodId': 1, 'partNum': 1},
      {unique: 1}
  );
});


