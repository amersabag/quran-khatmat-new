Template.khatmat.helpers({
  khatmat: function () {
    return Khatmat.find();
  },
  creatorName: function () {
    var owner = Meteor.users.findOne({_id: this.createdBy});
    return owner && owner.username;
  }

});
Template.khatmaItem.events({
  'click .khatmaLink': function () {
    Router.go('periods', {khatmaId: this._id});
    return false;
  }
});
Template.createKhatma.events({
  'submit .createKhatmaForm': function (event) {
    Meteor.call(
        'addKhatma',
        event.target.name.value,
        parseInt(event.target.period.value),
        new Date(event.target.startDate.value),
        function (error, result) {
          if (error) {
            alert(getErrorMessage(error.error))
          }
          else {
            Router.go('periods', {khatmaId: result});
          }
        }
    );
    return false;
  }
});
