import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { MeasurementDisplay } from "./MeasurementDisplay";
import { Substitution } from "./Substitution";
import * as Api from '../api';
import './styles/display.css';

export type NamedStationMeasurement = {
    date: Date,
    altitude: number,
    humidity: number,
    illuminance: number,
    motion_count: number,
    orientation: number,
    press_count: number,
    pressure: number,
    sequence: number,
    sound_level: number,
    temperature: number,
    uptime: number,
    voc_conc: number,
    voltage: number,
    co2_concentration: number,

    name: string
}


// #3b6a94
// dalsie zvonenie
// dalsie prazdniny


export const Display = () => {
    const [displayedMeasurements, setDisplayedMeasurements]: [Array<NamedStationMeasurement[]>, any] = useState([]);

    useEffect(() => {
        const fetchLatestData = async () => {
            const datesWithData = (await Api.getDatesWithData()).sort((a: Date, b: Date) => a.getTime() - b.getTime());

            // no data
            if (datesWithData.length === 0) {
                return;
            }
            
            const stations = await Api.getAllStations();
            const measurements = await Api.getDataFromDate(Api.Format.JSON, new Date());

            const displayedMeasurements = [];
            for (let stationMeasurement of measurements) {
                const stationName = stations.filter(x => x.id === stationMeasurement.id)[0].name;

                const latestMeasurement = stationMeasurement.measurements.sort((a: Api.Measurement, b: Api.Measurement) => {
                    return b.date.getTime() - a.date.getTime();
                });

                if (latestMeasurement.length === 0) {
                    continue;
                }

                displayedMeasurements.push({ ...latestMeasurement[0], name: stationName });
            }

            setDisplayedMeasurements(displayedMeasurements);
        }

        fetchLatestData();
    }, []);

    return (
        <div className="display">
            {
                displayedMeasurements.map((x) => {
                    return (
                        <MeasurementDisplay measurement={x as unknown as NamedStationMeasurement} />
                    )
                })
            }
            <Substitution />
        </div>
    );
}