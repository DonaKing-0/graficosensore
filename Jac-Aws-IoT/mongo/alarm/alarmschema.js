import mongoose from 'mongoose';
const { Schema } = mongoose;

const alarmSchema = new Schema({
  inizio:  String,  //timestamp inizio alarm
  ultimo: String,    //ultimo timestamp rilevato in allarme
  fine:  String,    //timestamp fine allarme
  hum: String,
  //value1: String,
  //value2: String,
  temp: [String],
  sensorCode: String,
  creatorMessage: String,
  attivo: Boolean

});

export default mongoose.model('alarm', alarmSchema);
