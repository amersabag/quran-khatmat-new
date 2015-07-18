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
Router.route('/khatmat', {
	name: 'khatmat',
	controller: 'KhatmatController'
});
Router.route('/khatmat/page/:page', {
	name: 'khatmatPage',
	controller: 'KhatmatPageController'
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
Router.route('/my/khatmat/page/:page', {
	name: 'my.khatmat.page',
	controller: 'MyKhatmatPageController'
});
Router.route('/my/parts', {
	name: 'my.parts',
	controller: 'MyPartsPageController'
});
Router.route('/my/parts/page/:page', {
	name: 'my.parts.page',
	controller: 'MyPartsPageController'
});
