
import { Measurement } from "./Measurement";
import { NamedStationMeasurement } from "./MeasurementsDisplay";
import './styles/measurement-display.css';

export const MeasurementDisplay = (props: { measurement: NamedStationMeasurement }) => {
    return (
        <div className="card">
            <div className="card-title">{props.measurement.name}</div>
        
            <div key={ props.measurement.date.getTime() } className="station-measurement">
                <Measurement name="Nadmorská výška" value={ props.measurement.altitude.toString() + " m"}/>
                <Measurement name="Vlhkosť vzduchu" value={ props.measurement.humidity.toString() + "%" } />
                <Measurement name="Svetelnosť" value={ props.measurement.illuminance.toString() + " lux" } />
                <Measurement name="Teplota" value={ props.measurement.temperature.toString() + "°C" } />
                <Measurement name="Tlak" value={ props.measurement.pressure.toString() + " Pa" } />
                <Measurement name="Hladina zvuku" value={ props.measurement.sound_level.toString() + " dB" } />
                <Measurement name="VOC koncentrácia" value={ props.measurement.voc_conc.toString() + " ppm" } />
            </div>

        </div>
    )
}