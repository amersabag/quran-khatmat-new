Template.registerHelper('formatDate', function (date) {
  return weekday[date.getDay()] + ' ' + date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
});

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_AND_EMAIL'
});

Meteor.startup(function () {
  var url = _.object(_.compact(_.map(location.search.slice(1).split('&'), function (item) {
    if (item) return item.split('=');
  })));
  if (url['periodId']) {
    var requestedPeriod = Periods.findOne(url['periodId']);
    if(requestedPeriod)
    {
      Router.go('parts', {
        khatmaId: requestedPeriod.khatmaId,
        periodId: url['periodId']
      });
    }
  } else if (url['khatmaId']) {
    Router.go('periods', {khatmaId: url['khatmaId']});
  }
});
