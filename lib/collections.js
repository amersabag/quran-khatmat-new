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
  perPage: 20
});
