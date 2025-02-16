import './App.css'
import Grid from '@mui/material/Grid2';
import { Table } from './components/Table';
import { Period, Plant } from './models/Plant';
import { Expert, Qualification } from './models/Expert';
import { Schedule } from './models/Schedule';
import { Alarm } from './models/Alarm';
import ExpertsModal from './components/modals/ExpertsModal';
import ExpertOnDutyModal from './components/modals/ExpertOnDutyModal';
import ExpertToPageModal from './components/modals/ExpertToPageModal';
import { useState } from 'react';
import { Button } from '@mui/material';

function App() {
  const [experts, setExperts] = useState<Expert[]>([
    new Expert(1, [Qualification.ELEC]),
    new Expert(2, [Qualification.MECH, Qualification.CHEM]),
    new Expert(3, [Qualification.BIO, Qualification.CHEM, Qualification.ELEC]),
    new Expert(4, [Qualification.BIO]),
    new Expert(5, [Qualification.CHEM, Qualification.BIO]),
    new Expert(6, [Qualification.ELEC, Qualification.MECH, Qualification.BIO, Qualification.CHEM]),
    new Expert(7, [Qualification.ELEC, Qualification.MECH]),
    new Expert(8, [Qualification.MECH, Qualification.BIO]),
  ]);
  const [schedule, setSchedule] = useState<Schedule>(new Schedule([
    [Period.P1, [experts[6], experts[4], experts[0]]],
    [Period.P2, [experts[5]]],
    [Period.P3, [experts[0], experts[2], experts[7]]],
    [Period.P4, [experts[5]]],
    [Period.P5, []],
  ]));
  const [alarms, setAlarms] = useState<Alarm[]>([
    new Alarm("Power supply missing", Qualification.ELEC),
    new Alarm("Tank overflow", Qualification.MECH),
    new Alarm("CO2 detected", Qualification.CHEM),
    new Alarm("Biological attack", Qualification.BIO),
  ]);
  const [plant, setPlant] = useState<Plant>(new Plant(schedule, alarms));

  return (
    <>
      <Grid 
        container
        spacing={4}
        direction={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        sx={{ minHeight: '100vh' }}
      >
        <Grid 
          container
          direction={"row"}
          sx={{
            justifyContent: "center"
          }}
        >
          <Table 
            schedule={plant.schedule}
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
