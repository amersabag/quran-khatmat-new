Template.periods.helpers({
  currentKhatma: function(){
    return Khatmat.findOne(Router.current().route.params.khatmaId);
  },
  periods: function () {
    return Periods.find({khatmaId: Router.current().route.params.khatmaId});
  }
});

Template.createPeriod.events({
  'submit .createPeriod': function () {
    var khatmaId = Router.current().route.params.khatmaId;
    Meteor.call(
        'addPeriod',
        khatmaId,
        function (error, result) {
          if (error) {
            alert(getErrorMessage(error.error));
          }
          else {
            Router.go('parts', {khatmaId: khatmaId, periodId: result});
          }
        }
    );
    return false;
  }
});
