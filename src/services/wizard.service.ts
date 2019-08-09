import axios, { AxiosResponse } from 'axios';
import { Wizard } from '@/shared/models/Wizard';
import ApiResponse from '@/shared/models/ApiResponse';
import Duel from '@/shared/models/Duel';
import Player from '@/shared/models/Player';
import * as qs from 'qs';

const baseUrl = 'https://api2.moonfarm.co/api/cheezewizard/';

export default class WizardService {

    public async getWizardById(id: number): Promise<ApiResponse<Wizard>> {
        return await axios.get(`${ baseUrl }wizards/${ id }`).then((response: AxiosResponse<ApiResponse<Wizard>>) => {
            return response.data;
        });
    }

    public async getWizardsByOwner(owner: string): Promise<ApiResponse<Wizard[]>> {
        // tslint:disable-next-line:max-line-length
        return await axios.get(`${ baseUrl }wizards?owner=${ owner }`).then((response: AxiosResponse<ApiResponse<Wizard[]>>) => {
            return response.data;
        });
    }

    public async getTopWizardsByPower(count: number): Promise<ApiResponse<Wizard[]>> {
        // tslint:disable-next-line:max-line-length
        return await axios.get(`${ baseUrl }wizards/top/power/${ count }`).then((response: AxiosResponse<ApiResponse<Wizard[]>>) => {
            return response.data;
        });
    }

    public async getDuelById(id: number): Promise<ApiResponse<Duel>> {
        // tslint:disable-next-line:max-line-length
        return await axios.get(`${ baseUrl }duels/${ id }`).then((response: AxiosResponse<ApiResponse<Duel>>) => {
            return response.data;
        });
    }

    public async getDuels(wizardIds: number[]): Promise<ApiResponse<Duel[]>> {
        // tslint:disable-next-line:max-line-length
        return await axios.get(`${ baseUrl }duels`, {
            params: {
                wizardIds,
            },
            paramsSerializer: (params) => {
                return qs.stringify(params);
            },
        }).then((response: AxiosResponse<ApiResponse<Duel[]>>) => {
            return response.data;
        });
    }

    public async getPlayer(address: string): Promise<ApiResponse<Player>> {
        // tslint:disable-next-line:max-line-length
        return await axios.get(`${ baseUrl }players/${ address }`).then((response: AxiosResponse<ApiResponse<Player>>) => {
            return response.data;
        });
    }
}
