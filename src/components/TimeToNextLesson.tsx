import { useEffect, useState } from "react"
import * as Api from '../api';
import './styles/time-to-next-lesson.css';

type TimeDifference = {
    minutes: number,
    seconds: number
}

export const TimeToNextLesson = () => {
    const [isLoading, setLoading] = useState(true);
    const [nextLessonTime, setNextLessonTime]: [null | Date, any]  = useState(null);
    const [timeDifference, setTimeDifference]: [TimeDifference | null, any] = useState(null);

    const [intervalId, setIntervalId]: [null | number, any] = useState(null);


    const difference = (x: Date, y: Date) => {
        const utc1 = Date.UTC(x.getFullYear(), x.getMonth(), x.getDate(),  
                              x.getHours(), x.getMinutes(), x.getSeconds());
        const utc2 = Date.UTC(y.getFullYear(), y.getMonth(), y.getDate(), 
                              y.getHours(), y.getMinutes(), y.getSeconds());

        
        const minutes = Math.floor((utc2 - utc1) / (60 * 1000));
        const seconds = Math.floor((utc2 - utc1 - minutes * 60 * 1000) / 1000);
        
        return { minutes, seconds };
    }

    useEffect(() => {
        const fetchNextLessonTime = async () => {
            const date = await Api.fetchNextLessonTime();

            if (typeof date === "string") {
                setNextLessonTime(null);
            }
            else {
                setNextLessonTime(date);
            }

            setLoading(false);
        }

        if (isLoading) {
            fetchNextLessonTime();
        }

        if (nextLessonTime !== null) {
            setTimeDifference(difference(new Date(), nextLessonTime));
        }
    }, [nextLessonTime, isLoading]);


    useEffect(() => {
        if (intervalId !== null) {
            clearInterval(intervalId);
        }

        setInterval(() => {
            if (nextLessonTime !== null) {
                setTimeDifference(difference(new Date(), nextLessonTime));
            }
        }, 1000);
    });
    

    return (
        <div className="card">
            <div className="card-title">Ďalšia hodina</div>
                <div className="time-difference">{ timeDifference === null ? 
                        <div>Víkend!</div> 
                        : 
                        <div>
                            O { (timeDifference as TimeDifference).minutes }:{ (timeDifference as TimeDifference).seconds }
                        </div> 
                    }
                </div>
        </div>
    )
}