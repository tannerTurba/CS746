import { useState } from "react";
import { Button, Divider, FormControl, IconButton, InputLabel, List, ListItem, ListItemText, MenuItem, Select, TextField } from "@mui/material";
import Grid from '@mui/material/Grid2';
import CloseIcon from '@mui/icons-material/Close';
import { Qualification } from "../../models/Qualification";
import { Alarm } from "../../models/Alarm";

export interface IAlarmsTabProps {
    alarms: Alarm[],
    setAlarms: (val: Alarm[]) => void,
    qualifications: Qualification[],
}

export default function AlarmsTab(props: IAlarmsTabProps) {
    const { alarms, setAlarms, qualifications } = props;
    const [description, setDescription] = useState<string | undefined>("");
    const [qualiVal, setQualiVal] = useState<Qualification | "" | undefined>("");

    const evaluateForm = () => {
        if (qualiVal === "") {
            setQualiVal(undefined);
            return false;
        }
        if (description === "") {
            setDescription(undefined);
            return false
        }

        if (qualiVal && description) {
            setQualiVal("");
            setDescription("");
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
                <TextField
                    required
                    error={description === undefined}
                    id="id-input"
                    label="Description"
                    helperText={description === null ? "Enter a description" : ""}
                    variant="standard"
                    value={description}
                    onChange={(e) => {
                        const val = e.target.value;
                        if (val && val !== "") {
                            setDescription(val);
                        }
                    }}
                />
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="qualification-label">Qualification</InputLabel>
                    <Select
                        error={qualiVal === undefined}
                        required
                        margin="dense"
                        id="quali-select"
                        name="select"
                        label="Qualification"
                        fullWidth
                        variant="standard"
                        value={qualiVal}
                        renderValue={(val) => val.value}
                        onChange={(event) => {
                            const val = event.target.value;
                            if (typeof val !== 'string') {
                                setQualiVal(val)
                            }
                            else {
                                for (const q of qualifications) {
                                    if (val === q.value) {
                                        setQualiVal(q);
                                    }
                                }
                            }
                        }}
                    >
                        {qualifications.map((val, index) => {
                            return (
                                <MenuItem key={index} value={val.value}>{val.value}</MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>

                
                <Button
                    onClick={() => {
                        const success = evaluateForm();
                        if (success && description && qualiVal) {
                            setAlarms([...alarms, new Alarm(description, qualiVal)])
                        }
                    }}
                >
                    Submit
                </Button>
            </Grid>
            <Divider orientation="vertical" flexItem/>
            <Grid 
                container
                direction={"column"}
                justifyContent={"center"}
                height={'100%'}
                width={"25vw"}
                overflow={'scroll'}
            >
                <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                    {alarms.map((alarm, index) => {
                        return (
                            <ListItem
                                key={`alarm-${index}`}
                                secondaryAction={
                                    <IconButton
                                        edge="end"
                                        onClick={() => {
                                            setAlarms(alarms.filter(x => x !== alarm));
                                        }}
                                    >
                                        <CloseIcon/>
                                    </IconButton>
                                }
                                disablePadding
                            >
                                <ListItemText 
                                    id={`alarm-id-${index}`}
                                    primary={alarm.description} 
                                    secondary={alarm.qualification.value}
                                />
                            </ListItem>
                        );
                    })}
                </List>
            </Grid>
        </Grid>
    );
}