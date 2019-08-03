import axios, { AxiosResponse } from 'axios';
import { Wizard } from '@/shared/models/Wizard';
import ApiResponse from '@/shared/models/ApiResponse';

const baseUrl = 'https://api2.moonfarm.co/api/cheezewizard/';

export default class WizardService {

    public async getWizardById(id: number): Promise<ApiResponse<Wizard>> {
        return await axios.get(`${ baseUrl }/wizards/${ id }`).then((response: AxiosResponse<ApiResponse<Wizard>>) => {
            return response.data;
        });

    }
}
