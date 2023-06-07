import axios, { AxiosRequestConfig } from 'axios';
import { Point } from '../../interfaces/Point'

export class ApiManager {
    public async getPoints(params: any = undefined): Promise<any> {
        // const params = {
        //     movelTipoConec: 'Desconhecido'
        // };
        try {
            let response
            const url = 'https://apiconectividadeunisc--lucasfreitag.repl.co/'
            if (params === undefined)
                response = await axios.get(url);
            else
                response = await axios.get(url, { params });
            
            const points: Array<Point> = response.data;
            console.log(points)
            return points;
        } catch (error) {
            console.log('error reading data from API');
        }
    }
}