Template.khatmat.helpers({
  khatmat: function () {
    return Khatmat.find();
  }
});
Template.khatmaItem.helpers({
  creatorName: function () {
    var owner = Meteor.users.findOne({_id: this.createdBy});
    return owner && owner.username;
  },
  currentUserIsOwnerOrAdmin: function(){
    return Meteor.user().isAdmin
        || (
          Meteor.userId()
          && Meteor.userId() == this.createdBy
        )
        ;
  }
});
Template.khatmaItem.events({
  'click .khatmaLink': function () {
    Router.go('periods', {khatmaId: this._id});
    return false;
  },
  'click .deleteKhatma': function () {
    if(confirm('Are you sure you want to delete this khatma?'))
    {
      Meteor.call(
          'deleteKhatma',
          this._id,
          function(error) {
            if (error) {
              alert(getErrorMessage(error.error));
            }
            else {
              //Router.go('periods', {khatmaId: result});
            }
          }
      );
    }
  }
});
Template.createKhatma.events({
  'submit .createKhatmaForm': function (event) {
    Meteor.call(
        'addKhatma',
        event.target.khatmaName.value,
        parseInt(event.target.khatmaPeriod.value),
        new Date(event.target.khatmaStartDate.value),
        function (error, result) {
          if (error) {
            alert(getErrorMessage(error.error));
          }
          else {
            Router.go('periods', {khatmaId: result});
          }
        }
    );
    return false;
  }
});
Template.createKhatma.rendered = function(){
  $('#khatmaStartDateInput').datepicker({
    format: "yyyy-mm-dd",
    weekStart: 6,
    todayHighlight: true
  });
};