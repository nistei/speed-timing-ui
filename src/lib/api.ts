import {AthleteDto, CreateAthleteDto} from "../types/athlete";
import axios from "axios";
import {CreateTimingDto, TimingDto} from "../types/timing";

const API_URL = 'https://speed-api.stonelabs.io';

export const getAthlete = async (id: number): Promise<AthleteDto> => {
    const url = `${API_URL}/api/athletes/${id}`
    const res = await axios.get<AthleteDto>(url);

    return res.data as AthleteDto;
}

export const getAthletes = async (): Promise<AthleteDto[]> => {
    const url = `${API_URL}/api/athletes`
    const res = await axios.get<AthleteDto[]>(url);

    return res.data;
}

export const createAthlete = async (data: CreateAthleteDto, apiKey: string): Promise<AthleteDto> => {
    const url = `${API_URL}/api/athletes`
    const res = await axios.post<AthleteDto>(url, data, {
        headers: {
            Authorization: apiKey,
        },
    });
    return res.data;
};

export const getTimings = async (athleteId?: number): Promise<TimingDto[]> => {
    let url = `${API_URL}/api/timings`
    if (athleteId) {
        url += `?athleteId=${athleteId}`;
    }

    const res = await axios.get<TimingDto[]>(url);
    return res.data;
};

export const createTiming = async (data: CreateTimingDto, apiKey: string): Promise<TimingDto> => {
    const url = `${API_URL}/api/timings`
    const res = await axios.post<TimingDto>(url, data, {
        headers: {
            Authorization: apiKey,
        },
    });
    return res.data;
};
