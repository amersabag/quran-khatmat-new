Khatmat = new Meteor.Collection('khatmat');
Periods = new Mongo.Collection('periods');
Parts = new Mongo.Collection('parts');

KhatmatPages = new Meteor.Pagination(Khatmat, {
  router: 'iron-router',
  homeRoute: '/khatmat/',
  route: '/khatmat/',
  routerTemplate: 'khatmat',
  routerLayout: 'layout',
  itemTemplate: 'khatmaItem',
  sort: {startDate: -1},
  perPage: 1
});

MyKhatmatPages = new Meteor.Pagination(Khatmat, {
  templateName: 'myKhatmat',
  itemTemplate: 'myKhatmatItem',
  sort: {startDate: -1},
  perPage: 1,
  availableSettings: {
    filters: true
  },
  auth: function (skip, subscription) {
    return Khatmat.find({createdBy: subscription.userId});
  }
});

MyPartsPages = new Meteor.Pagination(Parts, {
  templateName: 'myParts',
  itemTemplate: 'myPartsItem',
  sort: {startDate: -1},
  perPage: 1,
  availableSettings: {
    filters: true
  },
  auth: function (skip, subscription) {
    var myPeriodsIds = [];
    var myKhatmatIds = [];
    _.each(Parts.find({ownerId: subscription.userId}).fetch(), function (row) {
      myPeriodsIds.push(row.periodId);
      myKhatmatIds.push(row.khatmaId);
    });
    return [
      Parts.find({ownerId: subscription.userId}),
      Periods.find({_id: {$in: myPeriodsIds}}),
      Khatmat.find({_id: {$in: myKhatmatIds}})
    ];
  }
});
