import { useState } from "react";
import { Button, Divider, FormControl, IconButton, InputLabel, List, ListItem, ListItemText, MenuItem, Select, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import CloseIcon from '@mui/icons-material/Close';
import { Expert } from "../../models/Expert";
import { Period } from "../../models/Period";
import { Schedule } from "../../models/Schedule";

export interface ISchedulesTabProps {
    periods: Period[],
    experts: Expert[],
    schedule: Schedule,
    setSchedule: (val: Schedule) => void,
}

export default function SchedulesTab(props: ISchedulesTabProps) {
    const { periods, experts, schedule, setSchedule } = props;
    const [period, setPeriod] = useState<Period | "" | undefined>("");
    const [expertsVal, setExpertsVal] = useState<Expert[] | "" | undefined>("");

    const evaluateForm = () => {
        if (expertsVal === "") {
            setExpertsVal(undefined);
            return false;
        }
        if (period === "") {
            setPeriod(undefined);
            return false
        }

        if (expertsVal && period) {
            setExpertsVal("");
            setPeriod("");
            return true;
        }
    }

    return (
        <Grid
            container
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-evenly"}
            height={"50vh"}
        >
            <Grid 
                container
                direction={"column"}
                justifyContent={"center"}
            >
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="period-label">Period</InputLabel>
                    <Select
                        error={period === undefined}
                        required
                        margin="dense"
                        id="quali-select"
                        name="select"
                        label="Period"
                        fullWidth
                        variant="standard"
                        value={period}
                        renderValue={(val) => val.value}
                        onChange={(event) => {
                            const val = event.target.value;
                            if (typeof val !== 'string') {
                                setPeriod(val)
                            }
                            else {
                                for (const p of periods) {
                                    if (val === p.value) {
                                        setPeriod(p);
                                    }
                                }
                            }
                        }}
                    >
                        {periods.map((val, index) => {
                            return (
                                <MenuItem key={index} value={val.value}>{val.value}</MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="expert-label">Experts</InputLabel>
                    <Select
                        multiple
                        error={expertsVal === undefined}
                        required
                        margin="dense"
                        id="quali-select"
                        name="select"
                        label="Experts"
                        fullWidth
                        variant="standard"
                        value={expertsVal && expertsVal.length > 0 ? expertsVal : []}
                        onChange={(event) => {
                            const val = event.target.value;
                            if (typeof val !== 'string') {
                                setExpertsVal(val)
                            }
                            else {
                                for (const v of val) {
                                    for (const e of experts) {
                                        if (String(v) === String(e.id)) {
                                            if (expertsVal) {
                                                setExpertsVal([...expertsVal, e]);
                                            }
                                            else {
                                                setExpertsVal([e]);
                                            }
                                        }
                                    }
                                }
                            }
                        }}
                    >
                        {experts.map((val, index) => {
                            return (
                                <MenuItem key={index} value={val.id}>{`Expert ${val.id}`}</MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>

                
                <Button
                    onClick={() => {
                        const success = evaluateForm();
                        if (success && period && expertsVal) {
                            let exs: Expert[] = expertsVal;
                            if (typeof expertsVal[0] === 'number' || typeof expertsVal[0] === 'string') {
                                exs = [];
                                for (const v of expertsVal) {
                                    for (const e of experts) {
                                        if (String(v) === String(e.id)) {
                                            exs.push(e);
                                        }
                                    }
                                }
                            }
                            const newSchedule: Map<Period, Expert[]> = new Schedule(schedule);
                            exs = [...(newSchedule.get(period) ?? []), ...exs];
                            newSchedule.set(period, exs);
                            setSchedule(newSchedule as Schedule);
                        }
                    }}
                >
                    Submit
                </Button>
            </Grid>
            <Divider orientation="vertical" flexItem/>
            <Grid 
                container
                direction={"row"}
                justifyContent={"center"}
                height={'100%'}
                width={"25vw"}
                overflow={'scroll'}
            >
                {[...schedule.entries()].map(([p, e]) => {
                    return (
                        <>
                            <Typography variant="h6">{p.value}</Typography>
                            <List sx={{ width: '100%', bgcolor: 'background.paper', overflow: 'scroll' }}>
                                {e.length > 0 ? (e.map((expert, index) => {
                                    return (
                                        <ListItem
                                            key={`expert-${index}`}
                                            secondaryAction={
                                                <IconButton
                                                    edge="end"
                                                    onClick={() => {
                                                        const newSchedule = new Schedule(schedule);
                                                        newSchedule.set(p, schedule.get(p)!.filter(x => x !== expert));
                                                        setSchedule(newSchedule);
                                                    }}
                                                >
                                                    <CloseIcon/>
                                                </IconButton>
                                            }
                                            disablePadding
                                        >
                                            <ListItemText 
                                                id={`expert-id-${index}`}
                                                primary={`Expert ${expert.id}`} 
                                                secondary={expert.qualifications.map((exp) => exp.value).join(", ")}
                                            />
                                        </ListItem>
                                    );
                                })) : (
                                    <Typography variant="subtitle1">No experts schedule</Typography>
                                )}
                            </List>
                        </>
                    );
                })}
            </Grid>
        </Grid>
    );
}