import axios, { AxiosResponse } from 'axios';
import * as qs from 'qs';
import { OpenSeaAsset } from '@/shared/models/OpenseaAsset';

const baseUrl = 'https://api.opensea.io/api/v1/assets';
const cwContract = '0x2f4bdafb22bd92aa7b7552d270376de8edccbc1e';

export default class OpenSeaService {

    // tslint:disable-next-line:variable-name
    public async getWizards(token_ids: number[], on_sale: boolean): Promise<OpenSeaAsset[]> {
        // tslint:disable-next-line:max-line-length
        return await axios.get(
            `${ baseUrl }`, {
                params: {
                    token_ids,
                    on_sale,
                    asset_contract_address: cwContract,
                },
                paramsSerializer: (params) => {
                    return qs.stringify(params);
                },
            }).then((response: AxiosResponse<OpenSeaAsset[]>) => {
                return response.data;
            });
    }

    public async getWizard(id: number): Promise<OpenSeaAsset> {
        // tslint:disable-next-line:max-line-length
        return await axios.get(
            `${ baseUrl }/${ cwContract }/${ id }/`).then((response: AxiosResponse<OpenSeaAsset>) => {
                return response.data;
            });
    }
}
