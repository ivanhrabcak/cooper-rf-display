import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { MeasurementDisplay } from "./MeasurementDisplay";
import { Substitution } from "./Substitution";
import './styles/display.css';
import { TimeToNextLesson } from "./TimeToNextLesson";
import { MeasurementsDisplay } from "./MeasurementsDisplay";

// #3b6a94
// dalsie zvonenie
// dalsie prazdniny


export const Display = () => {
    return (
        <div className="display">
                <div className="display-group">
                    <TimeToNextLesson />
                    <Substitution />
                </div>

                <MeasurementsDisplay />                
        </div>
    );
}