import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  TimeScale,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import db from '../json/boiler.json'
import { getAlert, getMsg } from '../api';

ChartJS.register(
  CategoryScale,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const msg2=[
  {
      "_id": "63c5316b2bbcd794483c334a",
      "timestamp": "1673867627808",
      "hum": "55",
      "value": "22.200001",
      "sensorCode": "esp32_9C9D1C",
      "__v": 0
  },
  {
      "_id": "63c5317f2bbcd794483c334e",
      "timestamp": "1673867647808",
      "hum": "55",
      "value": "22.200001",
      "sensorCode": "esp32_9C9D1C",
      "__v": 0
  },
  {
      "_id": "63c531cf2295cd34775632ab",
      "timestamp": "1673867727808",
      "hum": "55.200001",
      "value": "22.200001",
      "sensorCode": "esp32_9C9D1C",
      "__v": 0
  },
  {
      "_id": "63c5326f0fbc16c4042bfdba",
      "timestamp": "1673867887808",
      "hum": "55.400002",
      "value": "22.200001",
      "sensorCode": "esp32_9C9D1C",
      "__v": 0
  },
  {
      "_id": "63c532d376605cef37da3915",
      "timestamp": "1673867987808",
      "hum": "55.400002",
      "value": "22.200001",
      "sensorCode": "esp32_9C9D1C",
      "__v": 0
  },
  {
      "_id": "63c532e776605cef37da391b",
      "timestamp": "1673868007808",
      "hum": "55.5",
      "value": "22.299999",
      "sensorCode": "esp32_9C9D1C",
      "__v": 0
  }
]

const Linechart = ()=>{
  const [msg, setMsg] = useState([]);
  const [refresh, setRefresh] = useState(0);

    useEffect(() => {
      const didMount = async () => {
           setMsg(await getMsg());
           //prendo solo ultimi 50 dati
          console.log(msg)
      }
      didMount()
  }, [refresh])

  const myTimeout = setTimeout(()=>{
    setRefresh(refresh+1)
    //console.log(refresh)
  }, 10000);

    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'grafico umidità temperatura',
          },
          scales: {
            x: {
              type: 'time'
            }
          }
        },
      };

      const labels=msg.map((i)=>{
        const d= new Date(i.timestamp*1);
        //console.log(d)
        const data= ''+d.getDate() + '-'+ (d.getMonth()+1)+'-'+d.getFullYear()+' '+d.getHours();
        return data;
      })
      const umidita=msg.map((i)=>{
        return i.hum;
      })
      const temperatura=msg.map((i)=>{
        return i.value;
      })

//console.log(temperatura)

      const data = {
        labels,
        datasets: [
          {
            label: 'umidita',
            data: umidita,
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgbargb(53, 162, 235, 0.5)',
          },
          {
            label: 'temperatura',
            data: temperatura,
            borderColor: 'rgb(0, 153, 0)',
            backgroundColor: 'rgbargb(0, 153, 0, 0.5)',
          },
        ],
      };

      return <div style={{'width': '100%'}}>
          <Line options={options} data={data} />
        </div>

};

export default Linechart;