import { secretMasterName, host } from '../config.js';
import awsIot from 'aws-iot-device-sdk';
import AWS from 'aws-sdk';

import * as os from 'os';

import msgModel from '../mongo/msg/msgschema.js'
import alertModel from '../mongo/alarm/alarmschema.js'

// setting aws region to connect
AWS.config.update({ region: 'eu-central-1' });

const iot = new AWS.Iot();

let device;

export async function initDevice() {
    device = awsIot.device({
        keyPath: `${os.tmpdir()}/${secretMasterName}.private.pem.key`,
        certPath: `${os.tmpdir()}/${secretMasterName}.certificate.pem.crt`,
        caPath: `${os.tmpdir()}/AmazonRootCA1.pem`,
        host: host
    });


    device.on('connect', function () {
        console.info('system connected to aws iot...');
        device.subscribe('machines');
        console.info('mqtt parser ready...');
    });

    device.on('error', function (e) {
        console.info({ e });
    });

    device.on('message', async function (topic, payload) {
        console.info('message received');
        await parser(payload.toString());
    });
}

async function parser(message) {
    let objectMessage;
    try {
        objectMessage = JSON.parse(message);
        //salva in db
        //
        const doc = new msgModel();
        doc.timestamp= objectMessage.timestamp;
        doc.hum=objectMessage.hum;
        doc.value=objectMessage.value;
        doc.free_ram=objectMessage.free_ram;
        doc.total_ram=objectMessage.total_ram;
        doc.sensorCode=objectMessage.sensorCode;
        doc.creatorMessage='dl';
        //console.log(doc)
        //console.log(msgModel.db.name);

        

        await msgModel.create(doc); 
        //console.log(await msgModel.find({ creatorMessage: 'dl' }));
        //se alert attivo
        await alertModel.deleteOne({_id:"63ce4a87790a29d66440ac5a"})
        await alertModel.deleteOne({_id:"63ce4aa5790a29d66440ac67"})


        const listaalert= await alertModel.find({attivo: true, creatorMessage: "dl"});
        //console.log(listaalert)
        let ultimoalert;
        console.log(listaalert!=[])
        if(listaalert!=[]){//controlla
            //controlla quanto tempo passato
            //lascia solo uno ?
            
            listaalert.forEach(async (i) => {
                //se + uno ma non passato un giorno???
                //in teoria non possibile
                //non creo nuovi se ci sono gia
                    //solo se + di 1 gg
                if(doc.timestamp-i.ultimo>= 86400){//86400 ultimo - adesso >=
                    //attivo false
                    //fine=ultimo
                    await alertModel.findOneAndUpdate({_id: i._id},{ attivo: false, fine: i.ultimo})
                }else{
                    ultimoalert=i;
                    //console.log(ultimoalert)
                }
            })
        }else{
            ultimoalert=listaalert;
        }

        if(ultimoalert){//controlla
            if(doc.value<=20){
                //interrompi
                console.log('a20')
                console.log(ultimoalert)
                await alertModel.findOneAndUpdate({_id: ultimoalert._id},{ attivo: false, fine: doc.timestamp})
            }else{
                //listaalert mod temp push
                console.log('a')
                console.log(ultimoalert)
                ultimoalert.temp.push(doc.value)
                const t=ultimoalert.temp
                await alertModel.findOneAndUpdate({_id: ultimoalert._id},{ ultimo: doc.timestamp, temp: ultimoalert.temp})
                
            }

        }else{//non ci sono alert attivi
            if(doc.value>20){
                const nuovoalert = new alertModel();
                nuovoalert.inizio= doc.timestamp;
                nuovoalert.ultimo= doc.timestamp;
                nuovoalert.fine='';
                nuovoalert.hum= doc.hum;
                nuovoalert.temp= [doc.value];
                nuovoalert.sensorCode= doc.sensorCode;
                nuovoalert.creatorMessage='dl';
                nuovoalert.attivo=true;
                await alertModel.create(nuovoalert); 
                //console.log(nuovoalert)
            }
        }
        //se tempo sotto interrompi (tutti?)*
        //se temp sopra continua (agg temp)
        //se no alert attivo
        //se temp sopra crea nuovo alert

        //sensore fermo per tanto?
        //alert rimane attivo
        //se tempo differisce per tot ultima temp fine disattiva

    } catch (err) {
        console.log(err)
        console.error(`error parsing message: ${message}`);
    }

    console.log(objectMessage);
}
