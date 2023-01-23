import React, { useEffect, useState } from 'react';

import { getAlert } from '../api';

import Alarm from './Alarm';

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

const Listalarm = ()=>{
  const [alert, setAlert] = useState([]);

    useEffect(() => {
      const didMount = async () => {
           setAlert(await getAlert());

          console.log(alert)
      }
      didMount()
  }, [])

//reverse
console.log(alert)
const reversed = alert.reverse();
console.log(reversed)


      return <div style={{'width': '100%'}}>
        {reversed.map((i)=>{
            return <Alarm dato={i}></Alarm>
        })}

        </div>

};

export default Listalarm;