Template.createKhatma.events({
  'submit .createKhatmaForm': function (event) {
    Meteor.call(
        'addKhatma',
        event.target.khatmaName.value,
        parseInt(event.target.khatmaPeriod.value),
        new Date(event.target.khatmaStartDate.value),
        function (error, result) {
          if (error) {
            alert(getErrorMessage(error.error));
          }
          else {
            Router.go('periods', {khatmaId: result});
          }
        }
    );
    return false;
  }
});
Template.createKhatma.rendered = function(){
  $('#khatmaStartDateInput').datepicker({
    format: "yyyy-mm-dd",
    weekStart: 6,
    todayHighlight: true
  });
};