BaseController = RouteController.extend({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound',
	fastRender: true
});
PublicController = BaseController.extend({
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

KhatmatController = PublicController.extend({
	template: 'khatmat',
	waitOn: function(){
		return Meteor.subscribe('khatmat', 0);
	}
});
KhatmatPageController = PublicController.extend({
	template: 'khatmat',
	waitOn: function(){
		return Meteor.subscribe('khatmat', getSkipCount(this.params.page, SETTINGS.khatmatPerPage));
	}
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
MyController = BaseController.extend({
	onBeforeAction: function(){
		if(!Meteor.userId())
		{
			Router.go('home');
		}
		else
		{
			this.next();
		}
	}
});
MyKhatmatController = MyController.extend({
	template: 'myKhatmat',
	waitOn: function(){
		return Meteor.subscribe('myKhatmat', 0);
	}
});
MyKhatmatPageController = MyController.extend({
	template: 'myKhatmat',
	waitOn: function(){
		return Meteor.subscribe('myKhatmat', getSkipCount(this.params.page, SETTINGS.myKhatmatPerPage));
	}
});
MyPartsController = MyController.extend({
	template: 'myParts',
	waitOn: function(){
		return Meteor.subscribe('myParts', 0);
	}
});
MyPartsPageController = MyController.extend({
	template: 'myParts',
	waitOn: function(){
		return Meteor.subscribe('myParts', getSkipCount(this.params.page, SETTINGS.myPartsPerPage));
	}
});


getSkipCount = function(page, perPage)
{
	return parseInt(
			((page - 1) * perPage)/SETTINGS.limitPerPage
		)
		* SETTINGS.limitPerPage;
};