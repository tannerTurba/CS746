import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import SingleEntryTab from './SingleEntryTab';
import ExpertsTab from './ExpertsTab';
import { Expert } from '../../models/Expert';
import { Qualification } from '../../models/Qualification';
import { Period } from '../../models/Period';
import SchedulesTab from './SchedulesTab';
import { Schedule } from '../../models/Schedule';
import AlarmsTab from './AlarmsTab';
import { Alarm } from '../../models/Alarm';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export interface ITabsFormProps {
    qualifications: Qualification[],
    setQualifications: (val: Qualification[]) => void,
    periods: Period[],
    setPeriods: (val: Period[]) => void,
    experts: Expert[],
    setExperts: (val: Expert[]) => void,
    schedule: Schedule,
    setSchedule: (val: Schedule) => void,
    alarms: Alarm[],
    setAlarms: (val: Alarm[]) => void,
}

export default function TabsForm(props: ITabsFormProps) {
    const { qualifications, setQualifications, periods, setPeriods, experts, setExperts, schedule, setSchedule, alarms, setAlarms } = props;
    const [value, setValue] = React.useState(0);
    const tabLabels: {label: string, form: React.ReactNode}[] = [
        {
            label: 'Qualifications', 
            form: (
                <SingleEntryTab 
                    value={qualifications}
                    setValue={setQualifications} 
                    label={'Qualification'} 
                    helperText={'Provide a Qualification'}
                />
            )
        },
        {
            label: 'Experts',
            form: (
                <ExpertsTab 
                    experts={experts}
                    setExperts={setExperts}
                    qualifications={qualifications}
                />
            )
        },
        {
            label: 'Periods', 
            form: (
                <SingleEntryTab 
                    value={periods}
                    setValue={setPeriods} 
                    label={'Period'} 
                    helperText={'Provide a period'}
                />
            )
        },
        {
            label: 'Schedules', 
            form: (
                <SchedulesTab
                    periods={periods}
                    experts={experts}
                    schedule={schedule}
                    setSchedule={setSchedule}
                />
            )
        },
        {
            label: 'Alarms', 
            form: (
                <AlarmsTab
                    alarms={alarms}
                    setAlarms={setAlarms}
                    qualifications={qualifications}
                />
            )
        }, 
        {label: 'Plants', form: <></>}
    ];

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs centered value={value} onChange={handleChange} aria-label="tabs form">
                {tabLabels.map((tab, index) => {
                    return <Tab key={index} label={tab.label} {...a11yProps(index)} />
                })}
            </Tabs>
        </Box>
        {tabLabels.map((tab, index) => {
            return (
                <CustomTabPanel key={`panel-${index}`} value={value} index={index}>
                    {tab.form}
                </CustomTabPanel>
            );
        })}
        </Box>
    );
}
