import './App.css'
import Grid from '@mui/material/Grid2';
import { Table } from './components/Table';
import { Plant } from './models/Plant';
import { Expert } from './models/Expert';
import { Schedule } from './models/Schedule';
import { Alarm } from './models/Alarm';
import ExpertsModal from './components/modals/ExpertsModal';
import ExpertOnDutyModal from './components/modals/ExpertOnDutyModal';
import ExpertToPageModal from './components/modals/ExpertToPageModal';
import { useEffect, useState } from 'react';
import TabsForm from './components/Tabs/TabsForm';
import { Qualification } from './models/Qualification';
import { Period } from './models/Period';

const ELEC = new Qualification("Electrical");
const MECH = new Qualification("Mechanical");
const BIO = new Qualification("Biological");
const CHEM = new Qualification("Chemical")

const P1 = new Period("Monday AM");
const P2 = new Period("Monday PM");
const P3 = new Period("Tuesday AM");
const P4 = new Period("Tuesday PM");
const P5 = new Period("Wednesday AM");

function App() {
  const [qualifications, setQualifications] = useState<Qualification[]>([ELEC, MECH, BIO, CHEM]);
  const [periods, setPeriods] = useState<Period[]>([P1, P2, P3, P4, P5]);
  const [experts, setExperts] = useState<Expert[]>([
    new Expert(1, [ELEC]),
    new Expert(2, [MECH, CHEM]),
    new Expert(3, [BIO, CHEM, ELEC]),
    new Expert(4, [BIO]),
    new Expert(5, [CHEM, BIO]),
    new Expert(6, [ELEC, MECH, BIO, CHEM]),
    new Expert(7, [ELEC, MECH]),
    new Expert(8, [MECH, BIO]),
  ]);
  const [schedule, setSchedule] = useState<Schedule>(new Schedule([
    [P1, [experts[6], experts[4], experts[0]]],
    [P2, [experts[5]]],
    [P3, [experts[0], experts[2], experts[7]]],
    [P4, [experts[5]]],
    [P5, []],
  ]));
  const [alarms, setAlarms] = useState<Alarm[]>([
    new Alarm("Power supply missing", ELEC),
    new Alarm("Tank overflow", MECH),
    new Alarm("CO2 detected", CHEM),
    new Alarm("Biological attack", BIO),
  ]);
  const [plant, setPlant] = useState<Plant>(new Plant(schedule, alarms));

  useEffect(() => {
    const temp = new Schedule(schedule);
    for (const p of [...temp.keys()] as Period[]) {
      if (!periods.includes(p)) {
        temp.delete(p);
      }
    }
    setSchedule(temp);
  }, [periods]);

  useEffect(() => {
    const temp = new Schedule(schedule);
    for (const [p, e] of [...temp.entries()]) {
      temp.set(p, e.filter(x => experts.includes(x)));
    }
    setSchedule(temp);
  }, [experts]);


  return (
    <>
      <TabsForm
        qualifications={qualifications}
        setQualifications={setQualifications}
        periods={periods}
        setPeriods={setPeriods}
        experts={experts}
        setExperts={setExperts}
        schedule={schedule}
        setSchedule={setSchedule}
        alarms={alarms}
        setAlarms={setAlarms}
      />
      <Grid 
        container
        spacing={4}
        direction={"column"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Grid 
          container
          direction={"row"}
          sx={{
            justifyContent: "center"
          }}
        >
          <Table 
            schedule={schedule}
            experts={experts}
          />
        </Grid>
        <Grid 
          container
          direction={"row"}
          sx={{
            justifyContent: "center"
          }}
        >
          <ExpertToPageModal plant={plant}/>
          <ExpertsModal plant={plant}/>
          <ExpertOnDutyModal
            experts={experts}
            plant={plant}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default App
