const mongoose = require('mongoose');

var PartyRoomSchema = mongoose.Schema({
  party_room_id: {type: Number, required: true, unique: true},
  party_room_name: {type: String, required: true, unique: true},
  party_room_number: {type: String, required: true},
  address: {type: String, required: true},
  district: {type: String, required: true},
  description: {type: String},
  quotaMin: {type: Number, required: true},
  quotaMax: {type: Number, required: true},
  price_setting: [{
    day: String,
    startTime: String,
    endTime: String,
    price: Number
  }],
  facilities: [String],
  photos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'photos.files'
  }]
});

const PartyRoom = mongoose.model('PartyRoom', PartyRoomSchema);

module.exports = PartyRoom;
