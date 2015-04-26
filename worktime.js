Router.route('/', function () { this.render('Home'); });
Router.route('/about');
Router.route('/admin');

Times = new Mongo.Collection("times");
var notCame;

if (Meteor.isClient) {


	Template.home.helpers({
		times: function () {
			return Times.find({worker: Meteor.userId()}, {sort: {createdAt: -1}});
		}
	});

	Template.body.events({
		"click #arrive": function (event) {
			Meteor.call("arrive");
		},
		"click #leave": function (event) {
			Meteor.call("leave");
		}
	});
	
	Accounts.ui.config({
		passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL'
	});
}

Meteor.methods({
	arrive: function () {
		// Make sure the user is logged in before inserting a task
		if (! Meteor.userId()) {
			throw new Meteor.Error("not-authorized");
		}

		Times.insert({
			sort: "arriving",
			createdAt: new Date(),
			worker: Meteor.userId()
		});
	},
	leave: function () {
		// Make sure the user is logged in before inserting a task
		if (! Meteor.userId()) {
			throw new Meteor.Error("not-authorized");
		}

		Times.insert({
			sort: "leaving",
			createdAt: new Date(),
			worker: Meteor.userId()
		});
	}
});