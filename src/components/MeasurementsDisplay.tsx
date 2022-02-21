import { useEffect, useState } from "react";
import * as Api from '../api';
import { MeasurementDisplay } from "./MeasurementDisplay";
import './styles/measurements-display.css';

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


export const MeasurementsDisplay = () => {
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
        <div className="card big">
            <div className="card-title">Merania</div>
            <div className="grid center">
                {
                    displayedMeasurements.map((x) => {
                        return (
                            <MeasurementDisplay measurement={x as unknown as NamedStationMeasurement} />
                        )
                    })
                }
            </div>
        </div>
    )
}