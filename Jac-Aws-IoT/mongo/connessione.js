import mongoose from 'mongoose';
import { mongo } from '../config.js';

/*
const Cat = mongoose.model('Cat', { name: String });

const kitty = new Cat({ name: 'Zildjian' });
kitty.save().then(() => console.log('meow'));
*/

export default function connetti(){
    mongoose.connect(mongo);
    /*
MONGODB_URI=mongodb+srv://admin:0402Marco!@cluster0.ltb6d4p.mongodb.net/jac-iot?retryWrites=true&w=majority
    */

}