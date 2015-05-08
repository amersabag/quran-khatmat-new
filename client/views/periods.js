Template.periods.helpers({
  currentKhatma: function(){
    return Khatmat.findOne(Router.current().getParams().khatmaId);
  },
  periods: function () {
    return Periods.find({khatmaId: Router.current().getParams().khatmaId}, {sort: {startDate: -1}});
  },
	currentUserIsOwner: function(){
		return Meteor.userId()
			&& Meteor.userId() == Khatmat.findOne(Router.current().getParams().khatmaId).createdBy;
	}
});

Template.createPeriod.events({
  'submit .createPeriodForm': function () {
    var khatmaId = Router.current().getParams().khatmaId;
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
