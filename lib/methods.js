Meteor.methods({
  addKhatma: function (name, period, startDate) {
    if (!this.userId) {
      throw new Meteor.Error(CONSTANTS.NotLoggedInError);
    }
    if (
        !Match.test(name, String)
        || !name.length
    ) {
      throw new Meteor.Error(CONSTANTS.KhatmaNameIsNotValidError);
    }
    if (
        !Match.test(period, Match.Integer)
        || period <= 0
    ) {
      throw new Meteor.Error(CONSTANTS.KhatmaPeriodIsNotValidError);
    }
    if (isNaN(startDate.getTime())) {
      throw new Meteor.Error(CONSTANTS.KhatmaStartDateIsNotValidError);
    }

    return Khatmat.insert({
      name: event.target.name.value,
      period: parseInt(event.target.period.value),
      startDate: startDate,
      createdAt: new Date(),
      createdBy: this.userId
    });
  },
  addPeriod: function (khatmaId) {
    var khatma = Khatmat.findOne({_id: khatmaId});
    var khatmaPeriodCount = Periods.find({khatmaId: khatmaId}).count();
    var startDate = khatma.startDate;
    if (khatmaPeriodCount) {
      startDate = addDays(
          startDate,
          khatmaPeriodCount * khatma.period
      );
    }
    var previousPeriod = Periods.findOne({
      khatmaId: khatmaId
    }, {
      sort: {startDate: -1}
    });
    var periodId = Periods.insert({
      khatmaId: khatmaId,
      startDate: startDate
    });
    var previousPeriodParts = [];
    if (previousPeriod) {
      previousPeriodParts = Parts.find({
        khatmaId: this._id,
        periodId: previousPeriod._id
      }, {
        sort: {partNumber: 1}
      }).fetch();
    }
    for (var i = 1; i <= 30; ++i) {
      var previousPartIndex = i - 2;
      if (previousPartIndex == -1) {
        previousPartIndex = 29;
      }
      Parts.insert({
        khatmaId: khatma._id,
        periodId: periodId,
        partNumber: i,
        ownerId: (
        previousPeriodParts[previousPartIndex]
        && previousPeriodParts[previousPartIndex].ownerId
        )
            ? previousPeriodParts[previousPartIndex].ownerId
            : null,
        done: false
      });
    }
    return periodId;
  }
});