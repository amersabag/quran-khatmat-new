Khatmat = new Meteor.Collection('khatmat');
Periods = new Mongo.Collection('periods');
Parts = new Mongo.Collection('parts');
KhatmatPages = new Meteor.Pagination("khatmat", {
  router: 'iron-router',
  homeRoute: '/khatmat/',
  route: '/khatmat/',
  routerTemplate: 'khatmat',
  routerLayout: 'layout',
  sort: {startDate: -1},
  perPage: 20
});
