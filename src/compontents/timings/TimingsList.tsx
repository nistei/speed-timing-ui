import {useState} from 'react';
import useInterval from "../../hooks/useInterval";
import {TimingDto} from "../../types/timing";
import TimingsListEntry from "./TimingsListEntry";
import {getTimings} from "../../lib/api";

export type TimingsListProps = Partial<{
    athleteId: number;
}>;

const TimingsList = (props: TimingsListProps) => {
    const [timings, setTimings] = useState<TimingDto[]>([]);

    useInterval(async () => {
        setTimings(await getTimings(props.athleteId));
    }, 5000)

    return (
        <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                            <tr>
                                <th
                                    scope="col"
                                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    #
                                </th>
                                <th
                                    scope="col"
                                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Name
                                </th>
                                <th
                                    scope="col"
                                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Geschwindigkeit
                                </th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {timings.map((t) => (
                                <TimingsListEntry key={t.id} timing={t} />
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TimingsList;
