Meteor.methods({
  addKhatma: function (khatmaName, khatmaPeriod, khatmaStartDate) {
    if (!this.userId) {
      throw new Meteor.Error(CONSTANTS.NotLoggedInError);
    }
    if (
        !Match.test(khatmaName, String)
        || !khatmaName.length
    ) {
      throw new Meteor.Error(CONSTANTS.KhatmaNameIsNotValidError);
    }
    if (
        !Match.test(khatmaPeriod, Match.Integer)
        || khatmaPeriod <= 0
    ) {
      throw new Meteor.Error(CONSTANTS.KhatmaPeriodIsNotValidError);
    }
    if (isNaN(khatmaStartDate.getTime())) {
      throw new Meteor.Error(CONSTANTS.KhatmaStartDateIsNotValidError);
    }

    return Khatmat.insert({
      name: khatmaName,
      period: khatmaPeriod,
      startDate: khatmaStartDate,
      createdAt: new Date(),
      createdBy: this.userId
    });
  },
  deleteKhatma: function (khatmaId) {
    if (!this.userId) {
      throw new Meteor.Error(CONSTANTS.NotLoggedInError);
    }
    var khatma;
    if (
        !Match.test(khatmaId, String)
        || !(khatma = Khatmat.findOne(khatmaId))
    ) {
      throw new Meteor.Error(CONSTANTS.KhatmaIdIsNotValidError);
    }
    if(
        !Meteor.users.findOne(this.userId).isAdmin
        && (
          khatma.createdBy != this.userId
          || Parts.find(
              {
                khatmaId: khatmaId,
                $and: [
                  {ownerId: {$exists: true}},
                  {ownerId: {$ne: this.userId}},
                  {ownerId: {$ne: null}}
                ]
              }).count()
        )
    )
    {
      throw new Meteor.Error(CONSTANTS.KhatmaNotYoursCompletelyError);
    }
    Parts.remove({khatmaId: khatmaId});
    Periods.remove({khatmaId: khatmaId});
    Khatmat.remove({_id: khatmaId});
    return true;
  },
  addPeriod: function (khatmaId) {
    if (!this.userId) {
      throw new Meteor.Error(CONSTANTS.NotLoggedInError);
    }
    var khatma;
    if (
        !Match.test(khatmaId, String)
        || !(khatma = Khatmat.findOne(khatmaId))
    ) {
      throw new Meteor.Error(CONSTANTS.KhatmaIdIsNotValidError);
    }
    if(
        !Meteor.users.findOne(this.userId).isAdmin
        && khatma.createdBy != this.userId
    )
    {
      throw new Meteor.Error(CONSTANTS.KhatmaNotYoursError);
    }
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
	    khatmaName: khatma.name,
      startDate: startDate
    });
    var previousPeriodParts = [];
    if (previousPeriod) {
      previousPeriodParts = Parts.find({
        khatmaId: khatmaId,
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
	    var previousPeriodPreviousPartOwner = null;
      var previousPeriodPreviousPartOwnerUsername = null;
	    if(
		    previousPeriodParts[previousPartIndex]
		    && previousPeriodParts[previousPartIndex].ownerId
	    ){
		    previousPeriodPreviousPartOwner = previousPeriodParts[previousPartIndex].ownerId;
		    previousPeriodPreviousPartOwnerUsername = previousPeriodParts[previousPartIndex].ownerUsername;
	    }
      Parts.insert({
        khatmaId: khatma._id,
	      khatmaName: khatma.name,
        periodId: periodId,
	      periodStartDate: startDate,
        partNumber: i,
        ownerId: previousPeriodPreviousPartOwner,
	      ownerUsername: previousPeriodPreviousPartOwnerUsername,
        done: false
      });
    }
    return periodId;
  },
  setOwner: function(partId) {
    if (!this.userId) {
      throw new Meteor.Error(CONSTANTS.NotLoggedInError);
    }
    var part;
    if (
        !Match.test(partId, String)
        || !(part = Parts.findOne(partId))
        || (part.ownerId && !Meteor.user().isAdmin)
    ) {
      throw new Meteor.Error(CONSTANTS.PartIdIsNotValidError);
    }
    Parts.update(
        {_id: partId},
        {$set: {ownerId: this.userId}}
    );
    return true;
  },
  removeOwner: function(partId) {
    if (!this.userId) {
      throw new Meteor.Error(CONSTANTS.NotLoggedInError);
    }
    var part;
    if (
        !Match.test(partId, String)
        || !(part = Parts.findOne(partId))
        || (part.ownerId != this.userId && !Meteor.user().isAdmin)
    ) {
      throw new Meteor.Error(CONSTANTS.PartIdIsNotValidError);
    }
    Parts.update(
        {_id: partId},
        {$set: {ownerId: null}}
    );
    return true;
  },
  setDone: function(partId, doneValue) {
    if (!this.userId) {
      throw new Meteor.Error(CONSTANTS.NotLoggedInError);
    }
    if(!Match.test(doneValue, Boolean))
    {
      throw new Meteor.Error(CONSTANTS.DoneValueIsNotValidError);
    }
    var part;
    if (
        !Match.test(partId, String)
        || !(part = Parts.findOne(partId))
        || (part.ownerId != this.userId && !Meteor.user().isAdmin)
    ) {
      throw new Meteor.Error(CONSTANTS.PartIdIsNotValidError);
    }
    Parts.update(
        {_id: partId},
        {$set: {done: doneValue}}
    );
    return true;
  }
});
