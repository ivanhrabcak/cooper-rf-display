import { Component, useEffect, useState } from "react";
import './styles/fading-display.css';

export const FadingDisplay = (props: { component: any }) => {
    const [displayingComponent, setDisplayingComponent] = useState(props.component);
    const [isInTransition, setInTransition] = useState(false);
    
    const RenderedComponent = displayingComponent;


    useEffect(() => {
        setInTransition(true);
    }, [props.component]);

    useEffect(() => {
        if (!isInTransition) {
            setDisplayingComponent(props.component);
        }
    }, [isInTransition]);

    return (
        <div onTransitionEnd={() => setInTransition(false)} className={`${isInTransition ? 'hidden' : ''}`}>
            <RenderedComponent />
        </div>
    )
}