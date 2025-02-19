import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { MenuItem, Select } from '@mui/material';
import { useState } from 'react';
import { Plant } from '../../models/Plant';
import { Alarm } from '../../models/Alarm';
import { Period } from '../../models/Period';

export interface ExpertToPageModalProps {
    plant: Plant
}

export default function ExpertToPageModal(props: ExpertToPageModalProps) {
    const { plant } = props;

    const [alarm, setAlarm] = useState<Alarm>(plant.alarms[0]);
    const [period, setPeriod] = useState<Period>();
    const [open, setOpen] = useState(false);

    return (
        <>
            <Button
                onClick={() => setOpen(true)}
            >
                Expert to page
            </Button>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
            >
                <DialogTitle>Expert to Page</DialogTitle>
                <DialogContent>
                    <DialogContentText>Get the expert to page.</DialogContentText>
                    
                    <Select
                        autoFocus
                        required
                        margin="dense"
                        id="select"
                        name="select"
                        label="Expert"
                        fullWidth
                        variant="standard"
                        value={alarm}
                        onChange={(event) => {
                            const val = event.target.value as string;
                            for (const x of plant.alarms) {
                                if (x.description === val) {
                                    setAlarm(x);
                                    break;
                                }
                            }
                        }}
                    >
                        {plant.alarms.map((val) => {
                            return (
                                <MenuItem key={val.toString()} value={val.description}>{val.description}</MenuItem>
                            );
                        })}
                    </Select>

                    <Select
                        autoFocus
                        required
                        margin="dense"
                        id="select"
                        name="select"
                        label="Period"
                        fullWidth
                        variant="standard"
                        value={period}
                        onChange={(event) => {
                            const val = event.target.value;
                            if (typeof val !== 'string') {
                                setPeriod(val)
                            }
                            else {
                                for (const p of plant.schedule.keys()) {
                                    if (val === p.value) {
                                        setPeriod(p);
                                    }
                                }
                            }
                        }}
                    >
                        {[...plant.schedule.keys()].map((val, index) => {
                            return (
                                <MenuItem key={index} value={val.value}>{val.value}</MenuItem>
                            );
                        })}
                    </Select>

                </DialogContent>
                <DialogActions>
                    <Button onClick={()=> setOpen(false)}>Cancel</Button>
                    <Button 
                        onClick={() => {
                            if (alarm && period) {
                                setOpen(false);

                                const expert = plant.getExpertToPage(alarm, period);
                                alert(expert);
                                setPeriod(undefined);
                            }
                        }}
                    >
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
