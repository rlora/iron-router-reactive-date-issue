/* jshint indent: 2 */

Facts = new Mongo.Collection("facts");

if (Meteor.isServer) {
  Meteor.publish("facts", function(from) {
    console.log(">> Publish facts", from);
    return Facts.find();
  });
}

if (Meteor.isClient) {
  Router.route("/", {
    name: "root",
    waitOn: function() {
      return [
        Meteor.subscribe("facts", Date.now())
      ];
    },
    action: function() {
      console.log(">> Rendered");
      this.render();
    }
  });
}