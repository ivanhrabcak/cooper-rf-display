
import { NamedStationMeasurement } from "./Display";
import { Measurement } from "./Measurement";
import './styles/measurement-display.css';

export const MeasurementDisplay = (props: { measurement: NamedStationMeasurement }) => {
    return (
        <div className="card">
            <div className="card-title">Merania - {props.measurement.name}</div>
        
            <div key={ props.measurement.date.getTime() } className="station-measurement">
                <Measurement name="Nadmorská výška" value={ props.measurement.altitude.toString() }/>
                <Measurement name="Vlhkosť" value={ props.measurement.humidity.toString() } />
                <Measurement name="Svetelnosť" value={ props.measurement.illuminance.toString() } />
                <Measurement name="Teplota" value={ props.measurement.temperature.toString() } />
            </div>

        </div>
    )
}