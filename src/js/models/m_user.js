import Backbone from 'backbone';

const UserModel = Backbone.Model.extend({
  urlRoot: "/api/users"
});

export default UserModel;
