var getMyKhatmatPageItems = function()
{
	var skipPages = getPageNumber();
	return Khatmat.find(
		{ createdBy: Meteor.userId() },
		{
			sort:{startDate: -1},
			limit: SETTINGS.myKhatmatPerPage,
			skip: (skipPages - 1) * SETTINGS.myKhatmatPerPage
		}
	)
};
Template.myKhatmat.helpers({
	myKhatmat: function(){
		return getMyKhatmatPageItems();
	},
	hasPreviousPage: function(){
		return getPageNumber() > 1;
	},
	hasNextPage: function(){
		return getMyKhatmatPageItems().count() >= SETTINGS.myKhatmatPerPage;
	},
	previousPageIsHome: function(){
		return getPageNumber() <= 2;
	},
	prevPageNum: function(){
		return getPageNumber(-1);
	},
	nextPageNum: function(){
		return getPageNumber(1);
	},
	haveNoData: function(){
		return !getPageNumber() && !getMyKhatmatPageItems().count();
	}

});
Template.myKhatmatItem.helpers({
});