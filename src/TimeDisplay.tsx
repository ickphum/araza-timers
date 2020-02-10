import React from "react";
const numeral = require('numeral');

interface TimeDisplayProps { 
    milliseconds: number; 
}

export const TimeDisplay = ({milliseconds}: TimeDisplayProps) => {

    const FormatTime = (milliseconds: number) => {
        const minutes = numeral(Math.floor(milliseconds/60000));
        const seconds = numeral(Math.floor((milliseconds % 60000) / 1000));
        const millis = numeral(milliseconds % 1000);
        return <p>{minutes.format('00')}:{seconds.format('00')}:{millis.format('000')}</p>;
    }

    return FormatTime(milliseconds);

}