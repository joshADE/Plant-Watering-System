import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectPlantState } from '../reducers/plant';
import * as plantActions from '../actions/plant';
import PlantDetails from './PlantDetails';
import NewPlant from './NewPlant';
function Plants() {
    const { plants } = useSelector(selectPlantState);
    
    const dispatch = useDispatch();

    const [plantsToWater, setPlantsToWater] = useState({});
    const [currentlyWatering, setCurrentlyWatering] = useState(false);
    const [canWater, setCanWater] = useState(true);
    const interval = useRef(null);
    const toggleWaterPlant = (id, initWateringStatus) => {

        if (plantsToWater.hasOwnProperty(id)){
            const plantsCopy = Object.assign({}, plantsToWater);
            delete plantsCopy[id];
            setPlantsToWater({
                ...plantsCopy
            })
        }else {
            setPlantsToWater({
                ...plantsToWater,
                [id]:initWateringStatus
            })
        }
        
    }

    const toggleWatering = () => {
        if (Object.keys(plantsToWater).length !== 0){
            if (currentlyWatering){
                // the user wants to stop watering the plant
                // send a request to server to update plant status
                setCanWater(false);
                dispatch(plantActions.updateWateringStatus(
                    plantsToWater, 
                    () => { 
                        window.alert("success")
                        setPlantsToWater({});
                        setTimeout(() => {
                            setCanWater(true);
                        }, 30000)
                    }, 
                    () => {
                        setPlantsToWater({});
                        setTimeout(() => {
                            setCanWater(true);
                        }, 30000)
                    }));
                
                setCurrentlyWatering(!currentlyWatering);
            }else{
                if(canWater)
                    setCurrentlyWatering(!currentlyWatering);
                else
                    window.alert("You have to wait 30s before you can water again")
            }
        }else{ 
            window.alert("You must select at least one plant");
        }
    }
    
    useEffect(() => {
        dispatch(plantActions.fetchAll());
    }, [])

    useEffect(() => {
        console.log(plantsToWater);
    }, [plantsToWater])

    useEffect(() => {
        
        if (currentlyWatering){
            interval.current = setInterval(() => {
                setPlantsToWater((current) => {
                    const newPlantsToWater = {};
                    Object.keys(current).forEach(key => newPlantsToWater[key] = Math.min(current[key] + 10, 100));
                    return newPlantsToWater
                });
                console.log("watered")
                
            }, 1000)
        }else{
            clearInterval(interval.current)
        }

    }, [currentlyWatering])

    return (
        <div className="page main-page">
            <div className="fixed-section">
                <div>
                    <p>Select the plants to water them. Click start to start watering the plants.</p>
                </div>
                <button 
                    className={`watering-button ${currentlyWatering?"stop-button":"start-button"}`}
                    onClick={toggleWatering}
                >{currentlyWatering?"Stop Watering": "Start Watering"}</button>
            </div>
            <div className="all-plants">
            {plants.map(plant => {
                const isWatering = plantsToWater.hasOwnProperty(plant.id);
                return <PlantDetails 
                            key={plant.id}
                            plant={plant}
                            wateringStatus={isWatering?plantsToWater[plant.id]:plant.wateringStatus}
                            isWatering={isWatering}
                            toggleWaterPlant={toggleWaterPlant}
                            currentlyWatering={currentlyWatering}
                        />
            })}
            <NewPlant 
                plants={plants}
            />
            </div>
        </div>
    )
}

export default Plants

