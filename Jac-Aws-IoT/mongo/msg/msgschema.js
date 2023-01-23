import mongoose from 'mongoose';
const { Schema } = mongoose;

const msgSchema = new Schema({
  timestamp:  String, // String is shorthand for {type: String}
  hum: String,
  value: String,
  free_ram: String,
  total_ram: String,
  sensorCode: String,
  creatorMessage: String

});

export default mongoose.model('datalog', msgSchema);