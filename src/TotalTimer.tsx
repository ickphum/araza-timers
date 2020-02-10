import React, { useState, useEffect } from "react";
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { ThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core/styles';
import { green, orange, blue } from '@material-ui/core/colors';

import { Timer } from "./Timer";
import { TimeDisplay } from "./TimeDisplay";

const useStyles = makeStyles(theme => ({
  total: {
    border: `1px solid ${theme.palette.divider}`,
    padding: "5px",
    display: 'flex',
    flexDirection: "column",
    alignItems: 'center',
    fontWeight: "bold",
    fontSize: "40px",
  }
}));

const defaultTheme = createMuiTheme({
  palette: {
    primary: green,
  },
});

const orangeTheme = createMuiTheme({
  palette: {
    primary: orange,
    secondary: blue,
  },
});


interface TotalTimerProps { total: number; }

export const TotalTimer = () => {

    const [baseTime, setBaseTime ] = useState<number>(0);
    const [times, setTimes] = useState<number[]>([0,0,0]);
    const [periods] = useState<number[]>([200,600,400]);
    const [runnings, setRunnings] = useState<boolean[]>([false, false, false]);

    const updateTimer = () => {

        const newBaseTime = baseTime + 100;
        setBaseTime(newBaseTime);
        setTimes(prevTimes => {
            const newTimes = [ ...prevTimes ];
            for (let i : number = 0; i < runnings.length; i++) {
                if (runnings[i] && newBaseTime % periods[i] === 0)
                    newTimes[i] += periods[i];
            }

            return newTimes;
        });
    }

    useEffect(() => {
        const intervalTimer = setInterval(updateTimer, 100);

        return () => clearInterval(intervalTimer);
    })

    const toggleTimer = (index : number) => {
        setRunnings(prevRunnings => {
            const newRunnings = [ ...prevRunnings ];
            newRunnings[index] = ! newRunnings[index];
            return newRunnings;
        });
    }

    const resetTimer = (index : number) => {
        setTimes(prevTimes => {
            const newTimes = [ ...prevTimes ];
            newTimes[index] = 0;
            return newTimes;
        });

    }

    const classes = useStyles();

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container spacing={2}>
                <Grid item xs={7}>
                    <Box className={classes.total}>
                        Total Timer
                        <TimeDisplay milliseconds={times[0] + times[1] + times[2]} />
                    </Box>
                </Grid>
                <Grid item container xs={5} spacing={2}>

                     {periods.map((period, i) =>
                        <Grid item xs={12}>
                            <ThemeProvider theme={i === 1 ? orangeTheme : defaultTheme}>
                                <Timer label={"Timer " + (i+1).toString()}
                                    periodInMilliseconds={period} 
                                    index={i} 
                                    time={times[i]}
                                    running={runnings[i]}
                                    toggleTimer={toggleTimer}
                                    resetTimer={resetTimer}
                                    />
                            </ThemeProvider>
                        </Grid>
                      )}
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}
