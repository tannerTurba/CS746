import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { MenuItem, Select } from '@mui/material';
import { useState } from 'react';
import { Period, Plant } from '../../models/Plant';

export interface ExpertsModalProps {
    plant: Plant,
}

export default function ExpertsModal(props: ExpertsModalProps) {
    const { plant } = props;

    const [value, setValue] = useState<Period>(Period.P1);
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
                        value={value}
                        onChange={(event) => {
                            const val = event.target.value as Period;
                            setValue(val);
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
                            if (value) {
                                setOpen(false);
                                alert(plant.getNumberOfExperts(value));
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
