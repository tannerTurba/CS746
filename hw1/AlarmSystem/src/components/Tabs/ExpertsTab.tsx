import { useState } from "react";
import { Button, Divider, FormControl, IconButton, InputLabel, List, ListItem, ListItemText, MenuItem, Select, TextField, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import CloseIcon from '@mui/icons-material/Close';
import { Expert } from "../../models/Expert";
import { Qualification } from "../../models/Qualification";

export interface IExpertsTabProps {
    experts: Expert[],
    setExperts: (val: Expert[]) => void,
    qualifications: Qualification[],
}

export default function ExpertsTab(props: IExpertsTabProps) {
    const { experts, setExperts, qualifications } = props;
    const [idVal, setIdVal] = useState<number | "" | undefined>("");
    const [qualiVal, setQualiVal] = useState<string[] | "" | undefined>("");
    const [error, setError] = useState<string>();

    const evaluateForm = () => {
        if (qualiVal === "") {
            setQualiVal(undefined);
            return false;
        }
        if (idVal === "") {
            setIdVal(undefined);
            return false
        }
        else if (idVal && experts.map(x => x.id).includes(idVal)) {
            setIdVal(undefined);
            setError("IDs must be unique!");
            return false;
        }

        if (qualiVal && idVal) {
            setQualiVal("");
            setIdVal("");
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
                    error={idVal === undefined}
                    id="id-input"
                    type="number"
                    label="Employee ID"
                    helperText={idVal === null ? "Enter an Employee ID" : ""}
                    variant="standard"
                    value={idVal}
                    onChange={(e) => {
                        const val = e.target.value;
                        if (val && val !== "") {
                            setIdVal(+val);
                        }
                    }}
                />
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="qualification-label">Qualification</InputLabel>
                    <Select
                        multiple
                        error={qualiVal === undefined}
                        required
                        margin="dense"
                        id="quali-select"
                        name="select"
                        label="Qualification"
                        fullWidth
                        variant="standard"
                        value={qualiVal && qualiVal.length > 0 ? qualiVal : []}
                        // renderValue={(val) => val.value}
                        onChange={(event) => {
                            const val = event.target.value;
                            if (typeof val !== 'string') {
                                setQualiVal(val);
                                // const qs: Qualification[] = [];
                                // for (const v of val as string[]) {
                                // qs.push(new Qualification(v))
                                // }
                                // setQualiVal(val)
                            }
                            else {
                                setQualiVal([val]);
                            }
                            // else {
                            //     for (const q of qualifications) {
                            //         if (val === q.value) {
                            //             if (qualiVal) {
                            //                 setQualiVal([...qualiVal, q]);
                            //             }
                            //             else {
                            //                 setQualiVal([q]);
                            //             }
                            //         }
                            //     }
                            // }
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
                        if (success && idVal && qualiVal) {
                            const qs = qualiVal.map(x => new Qualification(x));
                            const newE = new Expert(idVal, qs);
                            console.log(newE);
                            setExperts([...experts, newE]);
                        }
                    }}
                >
                    Submit
                </Button>
                {error && (
                    <Typography 
                        variant="subtitle1"
                        color="red"
                    >
                        {error}
                    </Typography>
                )}
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
                    {experts.map((expert, index) => {
                        return (
                            <ListItem
                                key={`expert-${index}`}
                                secondaryAction={
                                    <IconButton
                                        edge="end"
                                        onClick={() => {
                                            setExperts(experts.filter(x => x !== expert));
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
                    })}
                </List>
            </Grid>
        </Grid>
    );
}