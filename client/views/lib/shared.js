removeOwner = function () {
	Meteor.call(
		'removeOwner',
		this._id,
		function (error) {
			if (error) {
				alert(getErrorMessage(error.error));
			}
			else {
				//Router.go('periods', {khatmaId: result});
			}
		}
	);
	return false;
};
setPartDone = function (event) {
	Meteor.call(
		'setDone',
		this._id,
		!!event.target.checked,
		function (error) {
			if (error) {
				alert(getErrorMessage(error.error));
			}
			else {
				//
			}
		}
	);
};
