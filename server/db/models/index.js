const User = require('./user')
const List = require('./list')
const Receiver = require('./receiver')
const Item = require('./item')
const Gift = require('./gift')

List.belongsTo(User)
User.hasOne(List)

Receiver.belongsTo(List)
List.hasMany(Receiver)

Gift.belongsTo(Item)
Gift.belongsTo(Receiver)
Receiver.hasMany(Gift)

module.exports = {
  User,
  List,
  Receiver,
  Item,
  Gift
}
