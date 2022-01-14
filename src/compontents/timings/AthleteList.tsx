import {useState} from 'react';
import useInterval from "../../hooks/useInterval";
import { getAthletes } from "../../lib/api";
import { AthleteDto } from "../../types/athlete";
import { Link } from "wouter";

const AthleteList = () => {
    const [athletes, setAthletes] = useState<AthleteDto[]>([]);

    useInterval(async () => {
        setAthletes(await getAthletes());
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
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {athletes.map((a) => (
                                    <tr>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {a.id}
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-blue-600">
                                            <Link href={`/athletes/${a.id}`}>
                                                {a.firstName} {a.lastName}
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AthleteList;
