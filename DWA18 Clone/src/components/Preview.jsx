import React from "react";
import { GenderToString } from "./Root";
import { UseContextValue } from "./UseContextValues";

export function Preview() {
    const { phaseState, setPhase, setFavourite, setPhaseState, setShowImage, setShowDescription } = UseContextValue()

    async function HandlePreviewClick(showTitle, showId, showImg, showDescript) {
        if (showId) {
            try {
                const response = await fetch(`https://podcast-api.netlify.app/id/${showId}`);
                const data = await response.json();
                setPhaseState(prevState => ({
                    ...prevState,
                    Season: data.seasons
                }))
                setFavourite(prevState => ({
                    ...prevState,
                    favouriteShowTitle: showTitle
                }))
                setPhase('seasonPhase')
                setShowImage(showImg)
                setShowDescription(showDescript)
            } catch (error) {
                console.error('Error fetching Preview data:', error.message);
            }
        }
    }


    const previewElements = phaseState.Preview.map(item => {
        const UpdatedDate = new Date(item.updated)
        return (
            <button
                key={item.id}
                className="showItem"
                onClick={() => HandlePreviewClick(item.title, item.id, item.image, item.description)}
            >
                <img src={item.image} />
                <p>{item.title}</p>
                <p>Seasons: {item.seasons}</p>
                <p>Gender: {item.genres.map(GenderToString).join(', ')}</p>
                <p>Updated: {UpdatedDate.toLocaleDateString('en-GB')}</p>
            </button>
        )
    })

    return (
        <>
            {phaseState.Preview.length !== 0 ?
                <div className="previewDiv">
                    {
                        previewElements
                    }
                </div>
                : <h1>No Search Result</h1>
            }
        </>
    )
}

export function BackButton() {
    const { phase, setPhase } = UseContextValue()

    function HandleBack() {
        if (phase === "seasonPhase") {
            setPhase('previewPhase')
        }
        else if (phase === 'episodePhase') {
            setPhase('seasonPhase')
        }
        else if (phase === 'previewPhase') {
            setPhase('signUpPhase')
        }
        else if (phase === 'favouritePhase') {
            setPhase('previewPhase')
        }
        else if (phase === 'historyPhase') {
            setPhase('previewPhase')
        }
    }

    return (<button className="backButton" onClick={HandleBack} >
        {phase === 'previewPhase' ? 'LOGOUT' : 'BACK'}</button>)
}
