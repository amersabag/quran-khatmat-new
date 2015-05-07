Template.myParts.helpers({
  myPartsItemHaveData: function(){
    return Session.get('myPartsItemHaveData');
  }
});
Template.myPartsItem.helpers({
  myPartsItemHaveData: function(){
    Session.set('myPartsItemHaveData', true);
  },
  khatmaName: function(){
    var khatma = Khatmat.findOne({_id: this.khatmaId});
    return khatma && khatma.name;
  },
  periodStartDate: function(){
    var period = Periods.findOne({_id: this.periodId});
    return period && period.startDate;
  }
});