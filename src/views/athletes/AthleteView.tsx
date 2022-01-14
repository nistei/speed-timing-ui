import {useRoute} from "wouter";
import {useCallback, useEffect, useState} from "react";
import {AthleteDto} from "../../types/athlete";
import {getAthlete} from "../../lib/api";
import TimingsList from "../../compontents/timings/TimingsList";

const AthleteView = () => {
    const [, params] = useRoute("/athletes/:athleteId");
    const [athlete, setAthlete] = useState<AthleteDto>();

    const fetchData = useCallback(async () => {
        if (params?.athleteId) {
            setAthlete(await getAthlete(Number(params.athleteId)));
        }
    }, [params?.athleteId])

    useEffect(() => {
        fetchData().then();
    }, [fetchData]);

    return (
        <>
            <h1 className="w-full">{athlete?.firstName} {athlete?.lastName}</h1>
            <TimingsList athleteId={Number(params?.athleteId)} />
        </>
    )
}

export default AthleteView;
