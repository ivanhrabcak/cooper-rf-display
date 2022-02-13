import './styles/measurement.css';

export const Measurement = (props: { name: string, value: string }) => {
    return (
        <div className="measurement" >
            <div className="measurement-name">{ props.name }:</div>
            <div className="measurement-value">{ props.value }</div>
        </div>
    );
}