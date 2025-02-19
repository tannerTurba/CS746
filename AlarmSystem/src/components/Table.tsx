import { Expert } from "../models/Expert";
import { Plant } from "../models/Plant";
import { Typography } from "@mui/material";
import { Period } from "../models/Period";

export interface ITableProps {
    experts: Expert[],
    plant: Plant,
}

export function Table(props: ITableProps) {
    const { experts, plant } = props;
    const schedule = plant.schedule;
    const periods: Period[] = [...schedule.keys()];
    const invalidPeriods = plant.getInvalidPeriods();
    console.log(invalidPeriods);

    let i = 0;
    const getKey = () => {
        i++;
        return i;
    }

    return (
        <>
            {experts.length > 0 && schedule.size > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            {experts.map((e) => {
                                return <th key={getKey()}>{`Expert ${e.id}`}</th>
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {periods.map((period) => {
                            const scheduledExperts = schedule.get(period) ?? [];
                            return (
                                <tr key={getKey()} className={invalidPeriods.includes(period) ? "invalid" : ""}>
                                    <th key={getKey()}>{period.value}</th>
                                    {experts.map((expert) => {
                                        return <td key={getKey()}>{scheduledExperts.includes(expert) ? "ok" : ""}</td>
                                    })}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            ) : (
                <Typography variant="subtitle1">No schedule to display</Typography>
            )}
        </>
    );
}