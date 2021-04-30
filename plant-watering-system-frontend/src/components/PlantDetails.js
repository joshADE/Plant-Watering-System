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
    plant,
    wateringStatus,
    isWatering,
    toggleWaterPlant,
    currentlyWatering,
    time,
    addCooldown
}) {


    
    const dispatch = useDispatch();




    const stopWatering = () => {
        
        dispatch(plantActions.updateWateringStatus(
            {[plant.id]: wateringStatus}, 
            () => { 
                window.alert("success");
                addCooldown(plant.id, 30);
            }, 
            () => {
                window.alert("failed");
            })
        );
        toggleWaterPlant(plant.id, plant.wateringStatus);
    }

    






    return (
        <div className="plant-container">
            <div className="plant-image">
                <RiPlantLine />
            </div>
            <div className="plant-details">
            {(Math.abs(time - convertDateToJS(plant.lastWateredTime)) > (1000 * 60 * 60 * 6)) && <div className="warning">6h has passed since this plant was last watered</div>}
                <div className="plant-name">Name: {plant.name}</div>
                <div className="watering-option">
                    <span>Select for watering:</span>
                    
                    <input 
                        className="water-checkbox"
                        type="checkbox" 
                        checked={isWatering} 
                        onChange={() => toggleWaterPlant(plant.id, plant.wateringStatus)}
                        
                    />
                    
                    <button
                        className="watering-button"
                        onClick={stopWatering}
                        disabled={!currentlyWatering || !isWatering}
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
                        <span>{wateringStatus}%</span>
                        <div className="water-indicator">
                            <div className="water-bar" style={{width: `${clamp(wateringStatus, 0, 100)}%`}}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlantDetails
