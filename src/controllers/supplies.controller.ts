import env from '@/config/env.config';
import axios from 'axios'
import { Request, Response } from 'express'
export default class SupplyController{
    getParseHub (req: Request, res: Response) {
        const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `https://parsehub.com/api/v2/projects/${env.promart_token_pintura}/last_ready_run/data?api_key=${env.api_key}`,
            headers: { }
        };
          
        axios.request(config)
            .then((response) => {
                console.log(response.data);
                res.json(response.data)
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json({ error: 'Error al obtener los datos de ParseHub' })
            });
    }
}