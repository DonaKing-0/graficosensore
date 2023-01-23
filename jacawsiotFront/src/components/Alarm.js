import React, { useEffect, useState } from 'react';

import { getAlert } from '../api';

const alert2=[
  {
  "attivo": false,
  "creatorMessage": "dl",
  "fine": "1674465285747",
  "hum": "43.900002",
  "inizio": "1674463955747",
  "sensorCode": "esp32_9C9D1C",
  "temp": ['20.1', '20.6', '20.6', '20.6', '20.6', '20.6', '20.6', '20.6', '20.6', '20.6', '20.6', '20.6', '20.6', '20.6', '20.700001', '20.6', '20.6', '20.700001', '20.700001', '20.6', '20.700001', '20.700001', '20.700001', '20.700001', '20.700001', '20.700001', '20.700001', '20.700001', '20.700001', '20.700001', '20.700001', '20.700001', '20.700001', '20.700001', '20.700001', '20.700001', '20.799999', '20.799999', '20.799999', '20.799999', '20.799999', '20.799999', '20.799999', '20.799999', '20.799999', '20.799999', '20.799999', '20.799999', '20.799999', '20.799999'],
  "ultimo": "1674465285747",
  "_id": "63ce4ad8a3006d5087d2b3a8"
  },
  {
  "attivo": false,
  "creatorMessage": "dl",
  "fine": "1674465665747",
  "hum": "44.700001",
  "inizio": "1674465475747",
  "sensorCode": "esp32_9C9D1C",
  "temp": ['20.799999', '20.799999', '20.799999', '20.799999', '20.799999', '20.9', '20.799999', '20.9', '20.9', '20.9', '20.9', '20.9', '20.9', '20.9', '20.9', '20.9', '20.9', '20.9', '20.9'],
  "ultimo": "1674465665747",
  "_id": "63ce50c74b1f3c3231e362e0"
  },
  {
  "attivo": true,
  "creatorMessage": "dl",
  "fine": "",
  "hum": "44.900002",
  "inizio": "1674465785747",
  "sensorCode": "esp32_9C9D1C",
  "temp": ['21', '21', '21', '21', '21', '21', '21', '21', '21', '21', '21', '21', '21', '20.9', '20.9', '20.9', '20.9', '20.9', '20.9', '20.9', '20.9', '20.9', '20.9', '20.9', '20.9', '20.9', '20.799999', '20.799999', '20.9', '20.799999', '20.799999', '20.799999', '20.799999', '20.799999', '20.799999', '20.799999', '20.799999', '20.799999', '20.700001', '20.700001', '20.700001', '20.700001', '20.700001', '20.700001', '20.700001', '20.700001', '20.700001', '20.700001', '20.700001', '20.700001', '20.700001', '20.700001', '20.6', '20.6', '20.6', '20.6', '20.6', '20.6', '20.6', '20.6', '20.6', '20.6', '20.6', '20.6', '20.6', '20.5', '20.5', '20.5', '20.5', '20.5', '20.5'],
  "ultimo": "1674466605747",
  "_id": "63ce51fddeacdea517801794",
  }
  ]

const Alarm = ({dato})=>{
  const [disp, setDisp] = useState('none');
  const [colore, setColore] = useState(dato.attivo? '#c2a204':'white');

  const clic =()=>{
    if(disp=='none'){
        setDisp('')
    }else{
        setDisp('none')
    }

}

            const attivo= dato.attivo ? 'attivo' : 'inattivo';
              const df= new Date(dato.fine*1)
              const dfi=df.getDate()+'-'+(df.getMonth()+1)+'-'+df.getFullYear()+' '+df.getHours()

              const dfine= dato.fine=='' ? '-' : dfi;
              const d= new Date(dato.inizio*1)

            return <div className="card mb-2" style={{'maxWidth': '540px', backgroundColor:'#246980'}}>
            <div className="row no-gutters">
                <div className="col-md-3" style={{display: 'flex',justifyContent:'center', alignItems:"center"}}>
                    <i class="bi bi-exclamation-triangle-fill" style={{color:'#c2a204'}}></i>
                </div>
                <div className="col-md-8">
                <div className="card-body">
                    <h5 className="card-title">{dato._id +' '+dato.creatorMessage}</h5>
                    <p className="card-text">
                        inizio: {d.getDate()+'-'+(d.getMonth()+1)+'-'+d.getFullYear()+' '+d.getHours()}
                        <br></br>
                        fine: {dfine}
                        <br>
                        </br>
                        <button type="button" class="btn btn-info" onClick={clic}>temp</button>
                        <p style={{display: disp}}>{dato.temp.map((x)=>{
                            return x+' - '
                        })}</p>
                    </p>
                    <p className="card-text" style={{color:colore}}><small>{attivo}</small></p>
                </div>
                </div>
            </div>
        </div>
}

export default Alarm;