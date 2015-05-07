Template.myKhatmat.helpers({
  myKhatmatItemHaveNoData: function(){
    return Session.get('myKhatmatItemHaveNoData');
  }
});
Template.myKhatmatItem.helpers({
  myKhatmatItemHaveData: function(){
    Session.set('myKhatmatItemHaveNoData', false);
  }
});