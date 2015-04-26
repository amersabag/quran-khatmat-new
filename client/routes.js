Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading'
});

Router.route('/', {
  name: 'home',
  controller: 'HomeController'
});
Router.route('/about', {
  name: 'about',
  controller: 'AboutController'
});
Router.route('/khatmat/:khatmaId/periods', {
  name: 'periods',
  controller: 'PeriodsController'
});
Router.route('/khatmat/:khatmaId/periods/:periodId/parts', {
  name: 'parts',
  controller: 'PartsController'
});


BaseController = RouteController.extend({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  onBeforeAction: function () {
    KhatmatPages.unsubscribe();
    this.next();
  },
  action: function () {
    this.render();
  }
});
HomeController = BaseController.extend({
  template: 'home'
});
AboutController = BaseController.extend({
  template: 'about'
});

PeriodsController = BaseController.extend({
  template: 'periods',
  waitOn: function () {
    return [
      Meteor.subscribe('khatma', this.params.khatmaId),
      Meteor.subscribe('periods', this.params.khatmaId)
    ]
  }
});
PartsController = BaseController.extend({
  template: 'parts',
  waitOn: function () {
    return [
      Meteor.subscribe('khatma', this.params.khatmaId),
      Meteor.subscribe('period', this.params.periodId),
      Meteor.subscribe('parts', this.params.periodId)
    ]
  }
});

