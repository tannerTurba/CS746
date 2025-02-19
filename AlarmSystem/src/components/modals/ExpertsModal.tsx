import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { MenuItem, Select } from '@mui/material';
import { useState } from 'react';
import { Plant } from '../../models/Plant';
import { Period } from '../../models/Period';

export interface ExpertsModalProps {
    plant: Plant,
}

export default function ExpertsModal(props: ExpertsModalProps) {
    const { plant } = props;

    const [period, setPeriod] = useState<Period>();
    const [open, setOpen] = useState(false);

    return (
        <>
            <Button
                onClick={() => setOpen(true)}
            >
                Number of experts
            </Button>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
            >
                <DialogTitle>Number of Experts</DialogTitle>
                <DialogContent>
                    <DialogContentText>Get the number of experts from one period.</DialogContentText>
                    
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
                            if (period) {
                                setOpen(false);
                                alert(plant.getNumberOfExperts(period));

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
