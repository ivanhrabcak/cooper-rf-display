import { useEffect, useState } from "react"
import * as Api from '../api';
import './styles/substitution.css';

export const Substitution = () => {
    const [substitutingTeachers, setSubstitutionHtml]: [Array<string> | null, any] = useState(null);


    useEffect(() => {
        const fetchSubstitution = async () => {
            const substitution = await Api.fetchSubstitutionHtml(new Date());

            const [_, substitutionInfo] = substitution.split(":");
            const substitutingTeachers = substitutionInfo.split(",");

            setSubstitutionHtml(substitutingTeachers);
        }

        fetchSubstitution();
    }, []);

    if (substitutingTeachers === null) {
        return (
            <div className="card substitution">
                Loading...
            </div>
        )
    }


    return (
        <div className="card substitution">
            <div className="card-title">Chýbajúci učitelia:</div>
            {
                (substitutingTeachers as Array<string>).map((x: string, i: number) => {
                    return (
                        <div key={i} className="substitution-teacher">
                            { x }
                        </div>
                    );
                })
            }
        </div>
    );
}