import { Expert } from "../models/Expert";
import { Schedule } from "../models/Schedule";

export interface ITableProps {
    schedule: Schedule,
    experts: Expert[],
}

export function Table(props: ITableProps) {
    const { schedule, experts } = props;
    let i = 0;
    
    const getKey = () => {
        i++;
        return i;
    }

    return (
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
                {[...schedule.keys()].map((period) => {
                    const scheduledExperts = schedule.get(period) ?? [];
                    return (
                        <tr key={getKey()}>
                            <th key={getKey()}>{period}</th>
                            {experts.map((expert) => {
                                return <td key={getKey()}>{scheduledExperts.includes(expert) ? "ok" : ""}</td>
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    );
}