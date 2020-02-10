import React from "react";
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

import { TimeDisplay } from "./TimeDisplay";


const useStyles = makeStyles(theme => ({
  timer: {
    border: `1px solid ${theme.palette.divider}`,
    padding: "5px",
    display: 'flex',
    flexDirection: "column",
    alignItems: 'center',
    fontWeight: "bold"
  },
  button: {
    margin: "5px",     
  }
}))

interface TimerProps { 
    label: string; 
    periodInMilliseconds: number; 
    index: number;
    time: number;
    running: boolean;
    toggleTimer: (index: number) => void;
    resetTimer: (index: number) => void;
}


export const Timer = (props: TimerProps) => {
    const toggleTimer = () => {
        props.toggleTimer(props.index);
    }
    const resetTimer = () => {
        props.resetTimer(props.index);
    }
    const classes = useStyles();


    return (<Box className={classes.timer}>
        <Box>
            {props.label}
        </Box>
        <Box>
            <TimeDisplay milliseconds={props.time} />
        </Box>

        <Box component="span">
            <Button 
                variant="contained" 
                color={props.running ? "secondary" : "primary"}
                onClick={toggleTimer} 
                className={classes.button}>
              {props.running ? "Pause" : "Play"}
            </Button>
            <Button variant="contained" onClick={resetTimer} className={classes.button}>
              Reset
            </Button>
        </Box>
    </Box>);
}
