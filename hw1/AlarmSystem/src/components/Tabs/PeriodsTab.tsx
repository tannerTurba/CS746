import { useState } from "react";
import { Button, Divider, IconButton, List, ListItem, ListItemText, TextField } from "@mui/material";
import Grid from '@mui/material/Grid2';
import CloseIcon from '@mui/icons-material/Close';
import { Period } from "../../models/Period";

export interface IPeriodsTabProps {
    value: Period[],
    setValue: (val: Period[]) => void,
    label: string,
    helperText: string,
}

export default function PeriodsTab(props: IPeriodsTabProps) {
    const { value, setValue, label, helperText } = props;
    const [formVal, setFormVal] = useState<string | null>("");

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
                        if (e.target.value !== "") {
                            setFormVal(e.target.value);
                        }
                    }}
                />
                <Button
                    onClick={() => {
                        const result = evaluateForm();
                        if (result && !value.map(x => x.value).includes(result)) {
                            setValue([...value, new Period(result)]);
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