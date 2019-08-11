import axios, { AxiosResponse } from 'axios';
import * as qs from 'qs';
import { OpenSeaAsset } from '@/shared/models/OpenSeaAsset';
import ApiResponse from '@/shared/models/ApiResponse';

const baseUrl = 'https://api2.moonfarm.co/api/opensea/';

export default class OpenSeaService {

    // tslint:disable-next-line:variable-name
    public async getWizards(wizardIds: number[], limit: number, offset: number): Promise<ApiResponse<OpenSeaAsset[]>> {
        // tslint:disable-next-line:max-line-length, limit: number, offset: number
        return await axios.get(
            `${ baseUrl }wizards`, {
                params: {
                    wizardIds,
                    limit,
                    offset,
                },
                paramsSerializer: (params) => {
                    return qs.stringify(params);
                },
            }).then((response: AxiosResponse<ApiResponse<OpenSeaAsset[]>>) => {
                return response.data;
            });
    }

    public async getWizard(id: number): Promise<ApiResponse<OpenSeaAsset>> {
        // tslint:disable-next-line:max-line-length
        return await axios.get(`${ baseUrl }wizards/${ id }`).then((response: AxiosResponse<ApiResponse<OpenSeaAsset>>) => {
            return response.data;
        });
    }
}
