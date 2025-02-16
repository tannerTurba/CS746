import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { MenuItem, Select } from '@mui/material';
import { useState } from 'react';
import { Period, Plant } from '../../models/Plant';
import { Alarm } from '../../models/Alarm';

export interface ExpertToPageModalProps {
    plant: Plant
}

export default function ExpertToPageModal(props: ExpertToPageModalProps) {
    const { plant } = props;

    const [alarm, setAlarm] = useState<Alarm>(plant.alarms[0]);
    const [period, setPeriod] = useState<Period>(Period.P1);
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
                            const val = event.target.value as Period;
                            setPeriod(val);
                        }}
                    >
                        {Object.values(Period).map((val) => {
                            return (
                                <MenuItem key={val.toString()} value={val}>{val.toString()}</MenuItem>
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
