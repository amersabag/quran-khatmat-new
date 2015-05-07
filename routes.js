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
Router.route('/create', {
  name: 'create',
  controller: 'CreateController'
});
Router.route('/khatmat/:khatmaId/periods', {
  name: 'periods',
  controller: 'PeriodsController'
});
Router.route('/khatmat/:khatmaId/periods/:periodId/parts', {
  name: 'parts',
  controller: 'PartsController'
});
Router.route('/my/khatmat', {
  name: 'my.khatmat',
  controller: 'MyKhatmatController'
});
Router.route('/my/parts', {
  name: 'my.parts',
  controller: 'MyPartsController'
});
BaseController = RouteController.extend({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound'
});
PublicController = BaseController.extend({
  onBeforeAction: function () {
    KhatmatPages.unsubscribe();
    MyKhatmatPages.unsubscribe();
    MyPartsPages.unsubscribe();
    this.next();
  }
});
MyController = BaseController.extend({
  onBeforeAction: function(){
    if(!Meteor.userId())
    {
      Router.go('home');
    }
    else
    {
      KhatmatPages.unsubscribe();
      this.next();
    }
  }
});
MyKhatmatController = MyController.extend({
  template: 'myKhatmat',
  onBeforeAction: function(){
    Session.set('myKhatmatItemHaveNoData', true);
    MyKhatmatPages.set({
      filters: {createdBy: Meteor.userId()}
    });
    this.next();
  }
});
MyPartsController = MyController.extend({
  template: 'myParts',
  onBeforeAction: function(){
    MyKhatmatPages.set({
      filters: {ownerId: Meteor.userId()}
    });
    this.next();
  }

});
HomeController = PublicController.extend({
  template: 'home'
});
AboutController = PublicController.extend({
  template: 'about'
});
CreateController = PublicController.extend({
  template: 'createKhatma'
});

PeriodsController = PublicController.extend({
  template: 'periods',
  waitOn: function () {
    return [
      Meteor.subscribe('khatma', this.params.khatmaId),
      Meteor.subscribe('periods', this.params.khatmaId)
    ]
  }
});
PartsController = PublicController.extend({
  template: 'parts',
  waitOn: function () {
    return [
      Meteor.subscribe('khatma', this.params.khatmaId),
      Meteor.subscribe('period', this.params.periodId),
      Meteor.subscribe('parts', this.params.periodId)
    ]
  }
});

