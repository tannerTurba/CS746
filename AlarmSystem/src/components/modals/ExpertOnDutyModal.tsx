import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { MenuItem, Select } from '@mui/material';
import { useState } from 'react';
import { Plant } from '../../models/Plant';
import { Expert } from '../../models/Expert';
import { Period } from '../../models/Period';

export interface ExpertOnDutyModalProps {
    experts: Expert[], 
    plant: Plant,
}

export default function ExpertOnDutyModal(props: ExpertOnDutyModalProps) {
    const { experts, plant } = props;

    const [expert, setExpert] = useState<Expert>(experts[0]);
    const [period, setPeriod] = useState<Period>();
    const [open, setOpen] = useState(false);

    return (
        <>
            <Button
                onClick={() => setOpen(true)}
            >
                Expert is on duty
            </Button>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
            >
                <DialogTitle>Expert Is On Duty</DialogTitle>
                <DialogContent>
                    <DialogContentText>Learn if an expert is on duty.</DialogContentText>
                    
                    <Select
                        autoFocus
                        required
                        margin="dense"
                        id="select"
                        name="select"
                        label="Expert"
                        fullWidth
                        variant="standard"
                        value={expert}
                        onChange={(event) => {
                            const val = event.target.value as string;
                            console.log(val);
                            for (const e of experts) {
                                console.log(String(e.id));
                                if (e.id === +val) {
                                    setExpert(e);
                                    break;
                                }
                            }
                            console.log(expert); 
                        }}
                        renderValue={(e) => {
                            return `Expert ${e.id}`
                        }}
                    >
                        {Object.values(experts).map((val) => {
                            return (
                                <MenuItem key={val.toString()} value={val.id}>{val.toString()}</MenuItem>
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
                            if (expert && period) {
                                setOpen(false);

                                const periods = plant.getExpertSchedule(expert);
                                alert(periods.includes(period));
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
