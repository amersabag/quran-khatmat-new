var getMyPartsPageItems = function()
{
	var skipPages = getPageNumber();
	return Parts.find(
		{ ownerId: Meteor.userId() },
		{
			sort:{periodStartDate: -1},
			limit: SETTINGS.myPartsPerPage,
			skip: (skipPages - 1) * SETTINGS.myPartsPerPage
		}
	)
};

Template.myParts.helpers({
	myParts: function(){
		return getMyPartsPageItems();
	},
	hasPreviousPage: function(){
		return getPageNumber() > 1;
	},
	hasNextPage: function(){
		return getMyPartsPageItems().count() >= SETTINGS.myPartsPerPage;
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
		return !getPageNumber() && !getMyPartsPageItems().count();
	}

});
Template.myPartsItem.helpers({
});