const User = require('./user')
const List = require('./list')
const Receiver = require('./receiver')
const Item = require('./item')
const Gift = require('./gift')
const Reset = require('./Reset')

List.belongsTo(User)
User.hasOne(List)

Reset.belongsTo(User)
User.hasOne(Reset)

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
  Gift,
  Reset
}
