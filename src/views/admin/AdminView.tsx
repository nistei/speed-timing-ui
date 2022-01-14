import { useEffect, useRef, useState } from "react";
import { createAthlete, createTiming } from "../../lib/api";
import AthleteList from "../../compontents/timings/AthleteList";

const AdminView = () => {
    const [apiKey, setApiKey] = useState<string | null>(null);

    const apiKeyInput = useRef<HTMLInputElement>(null);

    const handleNewInput = () => {
        const apiKeyValue = apiKeyInput.current?.value;

        setApiKey(apiKeyValue ?? null);
    }

    return (
        <div className="flex gap-x-10 p-10">
            <div className="flex flex-col gap-y-10">
                <div className="flex gap-x-10">
                    <NewTimeForm apiKey={apiKey} apiKeyEntered={apiKey !== null && apiKey.length > 0} />
                    <NewAthleteForm apiKey={apiKey} apiKeyEntered={apiKey !== null && apiKey.length > 0} />
                </div>

                <div className="w-52 flex flex-col gap-y-2">
                    <h1 className="text-3xl">API Key</h1>

                    <input ref={apiKeyInput} type="text" onInput={handleNewInput} />
                </div>
            </div>

            <AthleteList />
        </div>
    )
};

const NewTimeForm = ({ apiKey, apiKeyEntered }: { apiKey: string | null, apiKeyEntered: boolean }) => {
    const [startNumber, setStartNumber] = useState<number | null>(null);
    const [startTime, setStartTime] = useState<number | null>(null);
    const [endTime, setEndTime] = useState<number | null>(null);

    const [canSubmit, setCanSubmit] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);

    const startNumberInput = useRef<HTMLInputElement>(null);
    const startTimeInput = useRef<HTMLInputElement>(null);
    const endTimeInput = useRef<HTMLInputElement>(null);

    const validateTime = (timeString?: string): number | null => {
        const REGEX = /^\d+[.,]\d+$/;

        if (!timeString) {
            return null;
        }

        if (!REGEX.test(timeString)) {
            return null;
        }

        return parseFloat(timeString.replace(',' ,'.'));
    }

    const handleNewInput = () => {
        const startNumberValue = startNumberInput.current?.value;
        const startTimeValue = startTimeInput.current?.value;
        const endTimeValue = endTimeInput.current?.value;

        let errors = [];

        if (startNumberValue && !Number.isNaN(parseInt(startNumberValue))) {
            setStartNumber(parseInt(startNumberValue));
        } else {
            errors.push('Start Number must be a number');
        }

        const parsedStartTime = validateTime(startTimeValue);
        if (parsedStartTime) {
            setStartTime(parsedStartTime * 1000);
        } else {
            errors.push('Start Time must be a number');
        }

        const parsedEndTime = validateTime(endTimeValue);
        if (parsedEndTime) {
            setEndTime(parsedEndTime * 1000);
        } else {
            errors.push('End Time must be a number');
        }

        setErrors(errors);

        if (errors.length > 0) {
            setCanSubmit(false);
        } else {
            setCanSubmit(true);
        }
    }

    useEffect(handleNewInput, []);

    const handleSubmit = () => {
        createTiming({
            athleteId: startNumber!,
            startTimeMs: startTime!,
            stopTimeMs: endTime!,
        }, apiKey!).catch((e) => alert('Error while submitting timing: ' + e.toString()))
    }

    return (
        <div className="flex flex-col gap-y-2">
            <h1 className="text-3xl">New Time</h1>

            <div className="flex justify-between gap-x-5">
                Start Number

                <input ref={startNumberInput} type="text" onInput={handleNewInput} />
            </div>

            <div className="flex justify-between gap-x-5">
                Start Time

                <input ref={startTimeInput} type="text" onInput={handleNewInput} />
            </div>

            <div className="flex justify-between gap-x-5">
                End Time

                <input ref={endTimeInput} type="text" onInput={handleNewInput} />
            </div>

            <div className="flex flex-col text-xl text-red-500">
                {errors.map((error) => (
                    <span>{error}</span>
                ))}
            </div>

            <button className="mt-5" type="button" disabled={!canSubmit || !apiKeyEntered} onClick={handleSubmit}>Submit</button>
        </div>
    )
}

const NewAthleteForm = ({ apiKey, apiKeyEntered }: { apiKey: string | null, apiKeyEntered: boolean }) => {
    const [firstName, setFirstName] = useState<string | null>(null);
    const [lastName, setLastName] = useState<string | null>(null);

    const [canSubmit, setCanSubmit] = useState(false);

    const firstNameInput = useRef<HTMLInputElement>(null);
    const lastNameInput = useRef<HTMLInputElement>(null);

    const handleNewInput = () => {
        const firstNameValue = firstNameInput.current?.value;
        const lastNameValue = lastNameInput.current?.value;

        if (firstNameValue && firstNameValue.length > 0) {
            setFirstName(firstNameValue);
        }

        if (lastNameValue && lastNameValue.length > 0) {
            setLastName(lastNameValue);
        }

        setCanSubmit(!!firstNameValue && firstNameValue.length > 0 && !!lastNameValue && lastNameValue.length > 0);
    }

    useEffect(handleNewInput, []);

    const handleSubmit = () => {
        createAthlete({
            firstName: firstName!,
            lastName: lastName!,
        }, apiKey!).then(r => alert('Athlete entered.')).catch((e) => alert('Error while submitting athlete: ' + e.toString()))
    }


    return (
        <div className="flex flex-col gap-y-2">
            <h1 className="text-3xl">New Athlete</h1>

            <div className="flex justify-between gap-x-5">
                First Name

                <input ref={firstNameInput} type="text" onInput={handleNewInput} />
            </div>

            <div className="flex justify-between gap-x-5">
                Last Name

                <input ref={lastNameInput} type="text" onInput={handleNewInput} />
            </div>

            <button className="mt-5" type="button" disabled={!canSubmit || !apiKeyEntered} onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export default AdminView;
