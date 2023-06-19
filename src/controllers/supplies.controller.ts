import env from '@/config/env.config';
import axios from 'axios'
import { Request, Response } from 'express'

const URL_UI= 'http://localhost:3001/api/unifiedIndex/UI'
export default class SupplyController{
    async getParseHub (req: Request, res: Response) {
        const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `https://parsehub.com/api/v2/projects/${env.promart_token_pintura}/last_ready_run/data?api_key=${env.api_key}`,
            headers: { }
        };
        const dataUI = await axios.get(URL_UI)
        console.log(dataUI.data)
        axios.request(config)
        .then((response) => {
                const product = []
                product.push(response.data.product)
                let supplies = product[0]

                let infoSupply = supplies.map(function(supply:any){
                    return {
                        name: supply.name,
                        price: supply.price,
                        image: supply.image,
                        url: supply.url,
                        measurement_unit: '4L',
                        type: 'MATERIAL',
                        unified_index: dataUI.data[0].name
                    }
                })
                res.json(infoSupply)
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json({ error: 'Error al obtener los datos de ParseHub' })
            });
        }
    }