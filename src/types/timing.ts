import { AthleteDto } from './athlete';

export interface TimingDto {
    id: number;
    athlete: AthleteDto;
    startTimeMs: number;
    stopTimeMs: number;
    timingDistanceM: number;
    speedMps: number;
}

export interface CreateTimingDto {
    athleteId: number;
    startTimeMs: number;
    stopTimeMs: number;
}
