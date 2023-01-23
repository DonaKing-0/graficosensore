//import _ from 'lodash'
import { Router } from 'express';
import msgschema from './msgschema.js';

const router = new Router();

//lista dei msg

//lista
router.get("/" , async function (request, response) {
    return response.json(await msgschema.find());
});

//non array
/*router.get("/uno", async function (request, response) {
    const a=_.pick(await msgschema.findOne(), ['stagioni', 'categorie', 'unitamisura']);
    console.log(a)
    return response.json(a);
});*/

export default router;