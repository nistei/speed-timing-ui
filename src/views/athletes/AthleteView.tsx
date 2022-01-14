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
        <div>
            <div className="w-full p-10">
                <h1 className="text-4xl mb-10">{athlete?.firstName} {athlete?.lastName}</h1>
                <div className="flex items-center gap-x-5 mb-10">
                    <h2 className="text-5xl">{athlete?.id}</h2>
                    <h2 className="text-2xl">Startnummer</h2>
                </div>
            </div>

            <TimingsList athleteId={Number(params?.athleteId)}/>
        </div>
    )
}

export default AthleteView;
