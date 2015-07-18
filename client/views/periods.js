Template.periods.helpers({
  currentKhatma: function () {
    return Khatmat.findOne(Router.current().getParams().khatmaId);
  },
  periods: function () {
    return Periods.find({khatmaId: Router.current().getParams().khatmaId}, {sort: {startDate: -1}});
  },
  currentUserIsOwner: function () {
    return Meteor.userId()
        && Meteor.userId() == Khatmat.findOne(Router.current().getParams().khatmaId).createdBy;
  }
});
Template.periods.events({
  'click #showDueReport': function(){
    Meteor.call('getKhatmaDueParts', Router.current().getParams().khatmaId, function(error, dueParts){
      if(error)
      {
        alert(getErrorMessage(error.error));
      }
      else
      {
        var data = {dueUsers: []};
        if(dueParts && dueParts.length)
        {
          var duePartsGroupedByUser = _.groupBy(dueParts, function(duePart){
            return duePart.ownerId;
          });
          for(var ownerId in duePartsGroupedByUser)
          {
            if(duePartsGroupedByUser.hasOwnProperty(ownerId))
            {
              data.dueUsers.push({
                username: duePartsGroupedByUser[ownerId][0].ownerUsername,
                dueParts: duePartsGroupedByUser[ownerId]
              })
            }
          }
        }
        var $dueReport = $('#dueReport');
        $dueReport.html('');
        Blaze.renderWithData(
            Template.dueParts,
            data,
            $dueReport.get(0)
        );
      }
    });
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
