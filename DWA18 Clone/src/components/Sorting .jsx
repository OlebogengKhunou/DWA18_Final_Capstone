import { useEffect, useState } from 'react';
import { UseContextValue } from "./UseContextValues"

export function SearchSorting() {
    const {phaseState, setPhaseState, search, setSearch} = UseContextValue()

    useEffect(() => {
        search && 
        setPhaseState(prevPhase => ({
            ...prevPhase,
            Preview: phaseState.DefaultPreview.filter((item) => item.title.toLowerCase().includes(search.toLowerCase()))
        })) 
    },[search])

    return (<input onChange={(e) => setSearch(e.target.value)} placeholder="Search..." value={search} type='text' />)
}


export function PreviewSorting() {

    const { phaseState, setPhaseState } = UseContextValue()

    function SortByGender(event) {
        const selectedGenre = parseInt(event.target.value)
        setPhaseState(prevPhase => ({
            ...prevPhase,
            Preview: phaseState.DefaultPreview.filter((item) => item.genres.includes(selectedGenre))
        }))
    }

    function sortByAscending() {
        setPhaseState(prevPhase => ({
            ...prevPhase,
            Preview: phaseState.Preview.sort((a, b) => a.title.localeCompare(b.title))
        }))
    }
    function sortByDescending() {
        setPhaseState(prevPhase => ({
            ...prevPhase,
            Preview: phaseState.Preview.sort((a, b) => b.title.localeCompare(a.title))
        }))
    }
    function sortByLatest() {
        setPhaseState(prevPhase => ({
            ...prevPhase,
            Preview: phaseState.Preview.sort((a, b) => new Date(b.updated) - new Date(a.updated))
        }))
    }
    function sortByOldest() {
        setPhaseState(prevPhase => ({
            ...prevPhase,
            Preview: phaseState.Preview.sort((a, b) => new Date(a.updated) - new Date(b.updated))
        }))
    }

    return (
        <div className='SortNav'>
            <button onClick={sortByAscending}>A-Z</button>
            <button onClick={sortByDescending}>Z-A</button>
            <button onClick={sortByLatest}>Latest</button>
            <button onClick={sortByOldest}>Oldest</button>
            <button value={7} onClick={SortByGender}>Fiction</button>
            <button value={3} onClick={SortByGender}>History</button>
            <button value={5} onClick={SortByGender}>Entertainment</button>
        </div>
    )
}
