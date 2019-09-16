import axios, { AxiosResponse } from 'axios';
import { Wizard } from '@/shared/models/Wizard';
import ApiResponse from '@/shared/models/ApiResponse';
import Duel from '@/shared/models/Duel';
import Player from '@/shared/models/Player';
import * as qs from 'qs';
import { LeaderboardCategory } from '@/shared/models/LeaderboardCategory';
import { Stats } from '@/shared/models/Stats';

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

    public async getTopWizards(category: LeaderboardCategory, count: number): Promise<ApiResponse<Wizard[]>> {
        // tslint:disable-next-line:max-line-length
        return await axios.get(`${ baseUrl }wizards/top/${ LeaderboardCategory[category] }/${ count }`).then((response: AxiosResponse<ApiResponse<Wizard[]>>) => {
            return response.data;
        });
    }

    public async getDuelById(id: number): Promise<ApiResponse<Duel>> {
        // tslint:disable-next-line:max-line-length
        return await axios.get(`${ baseUrl }duels/${ id }`).then((response: AxiosResponse<ApiResponse<Duel>>) => {
            return response.data;
        });
    }

    public async getDuels(wizardId: number): Promise<ApiResponse<Duel[]>> {
        // tslint:disable-next-line:max-line-length
        return await axios.get(`${ baseUrl }duels/${ wizardId }`)
            .then((response: AxiosResponse<ApiResponse<Duel[]>>) => {
                return response.data;
            });
    }

    public async getPlayer(address: string): Promise<ApiResponse<Player>> {
        // tslint:disable-next-line:max-line-length
        return await axios.get(`${ baseUrl }players/${ address }`).then((response: AxiosResponse<ApiResponse<Player>>) => {
            return response.data;
        });
    }

    public async getTopPlayers(category: LeaderboardCategory, count: number): Promise<ApiResponse<Player[]>> {
        // tslint:disable-next-line:max-line-length
        return await axios.get(`${ baseUrl }players/top/${ LeaderboardCategory[category] }/${ count }`).then((response: AxiosResponse<ApiResponse<Player[]>>) => {
            return response.data;
        });
    }

    public async getPlayerStats(address: string): Promise<ApiResponse<Stats>> {
        // tslint:disable-next-line:max-line-length
        return await axios.get(`${ baseUrl }players/stats/${ address }`).then((response: AxiosResponse<ApiResponse<Stats>>) => {
            return response.data;
        });
    }

    public async getWizardStats(id: number): Promise<ApiResponse<Stats>> {
        // tslint:disable-next-line:max-line-length
        return await axios.get(`${ baseUrl }wizards/stats/${ id }`).then((response: AxiosResponse<ApiResponse<Stats>>) => {
            return response.data;
        });
    }
}
