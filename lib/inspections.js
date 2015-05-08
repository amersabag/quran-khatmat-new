if(Meteor.isClient && Meteor.isServer)
{
	Router = {
		route: function(){}
	};
	BaseController.waitOn();
	BaseController.onBeforeAction();
}