import axios, { AxiosResponse } from 'axios';
import * as qs from 'qs';
import { OpenSeaAsset } from '@/shared/models/OpenseaAsset';

const baseUrl = 'https://api.opensea.io/api/v1/';
const cwContract = '0x2f4bdafb22bd92aa7b7552d270376de8edccbc1e';

export default class OpenSeaService {

    // tslint:disable-next-line:variable-name
    public async getWizards(token_ids: number[], limit: number, offset: number): Promise<OpenSeaAsset[]> {
        // tslint:disable-next-line:max-line-length, limit: number, offset: number
        return await axios.get(
            `${ baseUrl }assets/`, {
                params: {
                    token_ids,
                    limit,
                    offset,
                    asset_contract_address: cwContract,
                },
                paramsSerializer: (params) => {
                    return qs.stringify(params, { indices: false });
                },
            }).then((response: AxiosResponse<OpenSeaAsset[]>) => {
                return response.data;
            });
    }

    public async getWizard(id: number): Promise<OpenSeaAsset> {
        // tslint:disable-next-line:max-line-length
        return await axios.get(
            `${ baseUrl }asset/${ cwContract }/${ id }/`).then((response: AxiosResponse<OpenSeaAsset>) => {
                return response.data;
            });
    }
}
