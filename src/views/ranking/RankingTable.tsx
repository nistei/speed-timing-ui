import {useState} from 'react';
import useInterval from "../../hooks/useInterval";
import {TimingDto} from "../../types/timing";
import {getTimings} from "../../lib/api";
import {Link} from "wouter";

export type RankingTableProps = {};

const RankingTable = (props: RankingTableProps) => {
    const [timings, setTimings] = useState<{ timing: TimingDto, rank: number }[]>([]);

    useInterval(async () => {
        let data = await getTimings();
        data = data.sort((a, b) => {
            return b.speedMps - a.speedMps;
        });

        const unique: TimingDto[] = [];
        data.forEach(timing => {
            if (!unique.find(x => x.athlete.id === timing.athlete.id)) {
                unique.push(timing);
            }
        });

        setTimings(unique.map((t, i) => {
            return {timing: t, rank: i + 1}
        }));
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
                                    Rang
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
                                <RankingTableEntry key={t.timing.id} timing={t.timing} rank={t.rank}/>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
};

type RankingTableEntryProps = {
    rank: number;
    timing: TimingDto;
}

const RankingTableEntry = (props: RankingTableEntryProps) => {
    return (
        <tr>
            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                {props.rank}
            </td>
            <td className="px-4 py-4 whitespace-nowrap text-sm text-blue-600">
                <Link href={`/athletes/${props.timing.athlete.id}`}>
                    {props.timing.athlete.firstName} {props.timing.athlete.lastName}
                </Link>
            </td>
            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                {(props.timing.speedMps * 3.6).toFixed(2)} km/h
            </td>
        </tr>
    )
};

export default RankingTable;
