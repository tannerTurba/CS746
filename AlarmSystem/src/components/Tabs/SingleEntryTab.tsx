import { useState } from "react";
import { Button, Divider, IconButton, List, ListItem, ListItemText, Stack, TextField, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import CloseIcon from '@mui/icons-material/Close';
import { Period } from "../../models/Period";
import { Qualification } from "../../models/Qualification";

export interface ISingleEntryTabProps<T> {
    value: T[],
    setValue: (val: T[]) => void,
    label: string,
    helperText: string,
}

type ValidTypes = Period | Qualification;
export default function SingleEntryTab<T extends ValidTypes>(props: ISingleEntryTabProps<T>) {
    const { value, setValue, label, helperText } = props;
    const [formVal, setFormVal] = useState<T | "" | null>("");

    const evaluateForm = () => {
        if (formVal === "") {
            setFormVal(null);
            return undefined;
        }

        if (formVal) {
            setFormVal("");
            return formVal;
        }
    }

    return (
        <Grid
            container
            columnSpacing={4}
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-evenly"}
            height={"50vh"}
        >
            <Grid 
                container
                direction={"row"}
                justifyContent={"center"}
            >
                <TextField
                    required
                    error={formVal === null}
                    id="standard-error-helper-text"
                    label={label}
                    helperText={formVal === null ? helperText : ""}
                    variant="standard"
                    value={formVal}
                    onChange={(e) => {
                        for (const v of value) {
                            if (e.target.value === v.value) {
                                setFormVal(v);
                            }
                        }
                    }}
                />
                <Button
                    onClick={() => {
                        const result = evaluateForm();
                        if (result && !value.includes(result)) {
                            setValue([...value, result]);
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
                    {value.map((v) => {
                        return (
                            <ListItem
                                key={v.value}
                                secondaryAction={
                                    <IconButton
                                        edge="end"
                                        onClick={() => {
                                            setValue(value.filter(x => x !== v));
                                        }}
                                    >
                                        <CloseIcon/>
                                    </IconButton>
                                }
                                disablePadding
                            >
                                <ListItemText 
                                    id={`${v.value}-description`}
                                    primary={v.value} 
                                />
                            </ListItem>
                        );
                    })}
                </List>
            </Grid>
        </Grid>
    );
}