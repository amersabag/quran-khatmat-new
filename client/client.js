Template.registerHelper('formatDate', function (date) {
  return weekday[date.getDay()] + ' ' + date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
});

Meteor.subscribe('userData');
Accounts.ui.config({
  passwordSignupFields: 'USERNAME_AND_EMAIL'
});

Meteor.startup(function () {
  var url = _.object(_.compact(_.map(location.search.slice(1).split('&'), function (item) {
    if (item) return item.split('=');
  })));
  if (url['khatmaId']) {
    Session.set('currentKhatmaId', url['khatmaId']);
  }
  if (url['periodId']) {
    Session.set('currentPeriodId', url['periodId']);
  }
});
