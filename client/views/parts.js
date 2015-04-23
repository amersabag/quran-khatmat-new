Template.parts.helpers({
  currentKhatma: function(){
    return Khatmat.findOne(Router.current().route.params.khatmaId);
  },
  currentPeriod: function(){
    return Periods.findOne(Router.current().route.params.periodId);
  },
  parts: function () {
    return Parts.find({
      khatmaId: Router.current().route.params.khatmaId,
      periodId: Router.current().route.params.periodId
    }, {
      sort: {partNumber: 1}
    });
  }
});
Template.part.helpers({
  test: function () {
    console.log('test');
  },
  ownerName: function () {
    var owner = Meteor.users.findOne({_id: this.ownerId});
    return owner && owner.username;
  },
  currentUserIsTheOwner: function () {
    return Meteor.userId() == this.ownerId;
  }
});
Template.part.events({
  'click .setOwner': function () {
    Parts.update(
        {_id: this._id},
        {$set: {ownerId: Meteor.userId()}}
    );
    return false;
  },
  'click .removeOwner': function () {
    Parts.update(
        {_id: this._id},
        {$set: {ownerId: null}}
    );
    return false;
  },
  'click .setDone': function (event) {
    Parts.update(
        {_id: this._id},
        {$set: {done: !!event.target.checked}}
    );
  }
});
