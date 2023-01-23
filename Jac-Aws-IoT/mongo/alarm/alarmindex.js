//import _ from 'lodash'
import { Router } from 'express';
import alarmschema from './alarmschema.js';

const router = new Router();

//lista degli alert

//lista
router.get("/" , async function (request, response) {
    return response.json(await alarmschema.find({ creatorMessage: "dl"}).sort({attivo: -1}));
});

//non array
/*router.get("/uno", async function (request, response) {
    const a=_.pick(await msgschema.findOne(), ['stagioni', 'categorie', 'unitamisura']);
    console.log(a)
    return response.json(a);
});*/

export default router;