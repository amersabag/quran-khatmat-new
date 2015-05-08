Template.parts.helpers({
  currentKhatma: function(){
    return Khatmat.findOne(Router.current().getParams().khatmaId);
  },
  currentPeriod: function(){
    return Periods.findOne(Router.current().getParams().periodId);
  },
  parts: function () {
    return Parts.find({
      periodId: Router.current().getParams().periodId
    }, {
      sort: {partNumber: 1}
    });
  }
});
Template.part.helpers({
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
    Meteor.call(
        'setOwner',
        this._id,
        function (error) {
          if (error) {
            alert(getErrorMessage(error.error));
          }
          else {
            //Router.go('periods', {khatmaId: result});
          }
        }
    );
    return false;
  },
  'click .removeOwner': removeOwner,
  'click .setDone': setPartDone
});
