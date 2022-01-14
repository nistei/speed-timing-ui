import { Link } from "wouter";
import {TimingDto} from "../../types/timing";

export type TimingsListEntryProps = {
    timing: TimingDto;
};

const TimingsListEntry = (props: TimingsListEntryProps) => {
    return (
        <tr>
            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                {props.timing.athlete.id}
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
}

export default TimingsListEntry;
