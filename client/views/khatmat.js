var getKhatmatPageItems = function()
{
	var skipPages = getPageNumber();
	return Khatmat.find(
		{},
		{
			sort:{startDate: -1},
			limit: SETTINGS.khatmatPerPage,
			skip: (skipPages - 1) * SETTINGS.khatmatPerPage
		}
	)
};
Template.khatmat.helpers({
	khatmat: function(){
		return getKhatmatPageItems();
	},
	hasPreviousPage: function(){
		return getPageNumber() > 1;
	},
	hasNextPage: function(){
		return getKhatmatPageItems().count() >= SETTINGS.khatmatPerPage;
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
		return !getPageNumber() && !getKhatmatPageItems().count();
	}
});
Template.khatmatItem.helpers({
  creatorName: function () {
    var owner = Meteor.users.findOne({_id: this.createdBy});
    return owner && owner.username;
  },
  currentUserIsOwnerOrAdmin: function(){
    return Meteor.user().isAdmin
        || (
          Meteor.userId()
          && Meteor.userId() == this.createdBy
        )
        ;
  }
});
Template.khatmatItem.events({
  'click .khatmaLink': function () {
    Router.go('periods', {khatmaId: this._id});
    return false;
  },
  'click .deleteKhatma': function () {
    if(confirm('Are you sure you want to delete this khatma?'))
    {
      Meteor.call(
          'deleteKhatma',
          this._id,
          function(error) {
            if (error) {
              alert(getErrorMessage(error.error));
            }
            else {
              //Router.go('periods', {khatmaId: result});
            }
          }
      );
    }
  }
});
