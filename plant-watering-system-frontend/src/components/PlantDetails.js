import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { RiPlantLine } from 'react-icons/ri';
import * as plantActions from '../actions/plant';

const convertDateToJS = dotNETDate => {
    return new Date(Date.parse(dotNETDate))
}

const clamp = (num, min, max) => {
    return num <= min ? min : num >= max ? max : num;
}

function PlantDetails({
    plant
}) {

    const [time, setTime] = useState(new Date());
    const [newWateringStatus, setNewWateringStatus] = useState(plant.wateringStatus);
    const [currentlyWatering, setCurrentlyWatering] = useState(false);
    const [canWater, setCanWater] = useState(true);
    const dispatch = useDispatch();
    const interval = useRef(null);
    const waterInterval = useRef(null);


    const startWatering = () => {
        if (canWater){
            setCurrentlyWatering(true);
        }else{
            window.alert("You must wait 30s before watering again")
        }
    }

    const stopWatering = () => {
        setCanWater(false);
        setCurrentlyWatering(false);
        dispatch(plantActions.updateWateringStatus(
            {[plant.id]: newWateringStatus}, 
            () => { 
                window.alert("success")
                
                setTimeout(() => {
                    setCanWater(true);
                }, 30000)
            }, 
            () => {
                setTimeout(() => {
                    setCanWater(true);
                }, 30000)
                setNewWateringStatus(plant.wateringStatus)
            })
        );
    }

    
    useEffect(() => {
        interval.current = setInterval(() => {
            setTime(new Date())
        }, 1000)
        return () => {
            clearInterval(interval.current);
        }
    }, [])

    useEffect(() => {
        if (currentlyWatering){
            waterInterval.current = setInterval(() => {
                setNewWateringStatus((current) => Math.min(current + 10, 100))
            }, 1000)
        }else{
            clearInterval(waterInterval.current);
        }
        return () => {
            clearInterval(waterInterval.current);
        }
    }, [currentlyWatering])


    return (
        <div className="plant-container">
            <div className="plant-image">
                <RiPlantLine />
            </div>
            <div className="plant-details">
            {(Math.abs(time - convertDateToJS(plant.lastWateredTime)) > (1000 * 60 * 60 * 6)) && <div className="warning">6h has passed since this plant was last watered</div>}
                <div className="plant-name">Name: {plant.name}</div>
                <div className="watering-option">
                    <button
                        className="watering-button start-button"
                        onClick={startWatering}
                        disabled={currentlyWatering}
                    >
                        Start Watering
                    </button>
                    <button
                        className="watering-button stop-button"
                        onClick={stopWatering}
                        disabled={!currentlyWatering}
                    >
                        Stop Watering
                    </button>
                </div>
                <div className="watering-time">
                    <span>Last watering time: </span>
                    <span>{convertDateToJS(plant.lastWateredTime).toLocaleString()}</span>
                    
                </div>
                <div className="watering-status">
                    <div>Watering status</div>
                    <div>
                        <span>{newWateringStatus}%</span>
                        <div className="water-indicator">
                            <div className="water-bar" style={{width: `${clamp(newWateringStatus, 0, 100)}%`}}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlantDetails
