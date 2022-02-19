const BACKEND_URL = "http://127.0.0.1:8000";

type Response<T> = {
    status: number,
    response: T
}

type StationMeasurementPoints = {
    id: string,
    points: Array<Date>
}


type Measurement = {
    date: Date,
    altitude: number,
    humidity: number,
    illuminance: number,
    motion_count: number,
    orientation: number,
    co2_concentration: number,
    press_count: number,
    pressure: number,
    sequence: number,
    sound_level: number,
    temperature: number,
    uptime: number,
    voc_conc: number,
    voltage: number
}

type StationMeasurements = {
    id: string,
    measurements: Array<Measurement>
}

type Station = {
    id: string,
    name: string
}

enum Format {
    JSON, TEXT
}

const getDatesWithData = async (): Promise<Array<Date>> => {
    const request = await fetch(`${BACKEND_URL}/api/data/points`);

    const response: Response<Array<string>> = await request.json();

    return response.response.map((x) => {
        const [year, month, day]: Array<string> = x.split("-");
        return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    });
}


const getMeasurementTimesForDate = async (date: Date): Promise<Array<StationMeasurementPoints>> => {
    const formattedDate = `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`;

    const request = await fetch(`${BACKEND_URL}/api/data/points/${formattedDate}`);
    const response: Response<any> = await request.json();

    return Object.keys(response.response).map((k: string) => {
        const measurements = response.response[k].map((x: string) => {
            const [date, time] = x.split(" ");
    
            const [year, month, day] = date.split("-").map(x => parseInt(x));
            const [hour, minute, second] = time.split(":").map(x => parseInt(x));

            return new Date(Date.UTC(year, month - 1, day, hour, minute, second));
        });

        return { id: k, points: measurements } as StationMeasurementPoints;
    });
}

const getAllStations = async (): Promise<Array<Station>> => {
    const request = await fetch(`${BACKEND_URL}/api/stations`);
    const response: Response<any> = await request.json();

    return Object.keys(response.response).map((x) => {
        const name = response.response[x];

        return { name, id: x } as Station
    });
}

const getDataFromDate = async (format: Format, date: Date): Promise<Array<StationMeasurements>> => {
    const formattedDate = `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`;
    const formatString = format === Format.JSON ? "json" : "text";

    const request = await fetch(`${BACKEND_URL}/api/data/${formattedDate}/${formatString}`);
    const response: Response<any> = await request.json();

    return Object.keys(response.response).map((station) => {
        return {
            id: station,
            measurements: Object.keys(response.response[station]).map(measurementDate => {
                const [date, time] = measurementDate.split(" ");
    
                const [year, month, day] = date.split("-").map(x => parseInt(x));
                const [hour, minute, second] = time.split(":").map(x => parseInt(x));

                
                const dateOfMeasurement = new Date(Date.UTC(year, month - 1, day, hour, minute, second));
                return {...response.response[station][measurementDate], date: dateOfMeasurement};
            })
        } as StationMeasurements;
    })
}

const fetchSubstitutionHtml = async (date: Date): Promise<string> => {
    const formattedDate = `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`;
    const request = await fetch(`${BACKEND_URL}/api/edupage/substitution/${formattedDate}`);
    const response: Response<string> = await request.json();

    return response.response;
}

const fetchNextLessonTime = async (): Promise<Date | string> => {
    const currentTime = new Date();
    
    const request = await fetch(`${BACKEND_URL}/api/edupage/nextlesson?hours=${currentTime.getHours()}&minutes=${currentTime.getMinutes()}`);
    const response: Response<string> = await request.json();

    if (response.response === "Weekend!") {
        return "Víkend!";
    }

    const [hours, minutes] = response.response.split(":");

    currentTime.setHours(parseInt(hours));
    currentTime.setMinutes(parseInt(minutes));

    return currentTime;
}

export { BACKEND_URL, Format, getDatesWithData, getMeasurementTimesForDate, getAllStations, getDataFromDate, fetchSubstitutionHtml, fetchNextLessonTime };
export type { Measurement, StationMeasurements, StationMeasurementPoints };
