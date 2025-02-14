import { useState } from 'react'
import './App.css'
import Grid from '@mui/material/Grid2';
import { Button } from '@mui/material';
import { Table } from './components/Table';

function App() {

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
          <Table/>
        </Grid>
        <Grid 
          container
          direction={"row"}
          sx={{
            justifyContent: "center"
          }}
        >
          <Button
            sx={{border: "thin"}}
            onClick={() => {

            }}
          >
            Expert to page
          </Button>
          <Button
            onClick={() => {

            }}
          >
            Number of experts
          </Button>
          <Button
            onClick={() => {

            }}
          >
            Expert is on duty
          </Button>
        </Grid>
      </Grid>
    </>
  )
}

export default App
