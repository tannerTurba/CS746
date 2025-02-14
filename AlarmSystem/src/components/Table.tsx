export interface ITableProps {
    
}

export function Table(props?: ITableProps) {
    const experts: string[] = ["Expert 1", "Expert 2", "Expert 3", "Expert 4", "Expert 5"];
    const periods: string[] = ["Period 1", "Period 2", "Period 3", "Period 4", "Period 5"];

    return (
        <table>
            <thead>
                <tr>
                    <th></th>
                    {experts.map((expert) => <th>{expert}</th>)}
                </tr>
            </thead>
            <tbody>
                {periods.map((period) => {
                    return (
                        <tr>
                            <th>{period}</th>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}