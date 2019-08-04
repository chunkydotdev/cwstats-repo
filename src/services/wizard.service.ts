import axios, { AxiosResponse } from 'axios';
import { Wizard } from '@/shared/models/Wizard';
import ApiResponse from '@/shared/models/ApiResponse';

const baseUrl = 'https://api2.moonfarm.co/api/cheezewizard/';

export default class WizardService {

    public async getWizardById(id: number): Promise<ApiResponse<Wizard>> {
        return await axios.get(`${ baseUrl }wizards/${ id }`).then((response: AxiosResponse<ApiResponse<Wizard>>) => {
            return response.data;
        });
    }

    public async getTopWizardsByPower(count: number): Promise<ApiResponse<Wizard[]>> {
        // tslint:disable-next-line:max-line-length
        return await axios.get(`${ baseUrl }wizards/top/power/${ count }`).then((response: AxiosResponse<ApiResponse<Wizard[]>>) => {
            return response.data;
        });
    }
}
