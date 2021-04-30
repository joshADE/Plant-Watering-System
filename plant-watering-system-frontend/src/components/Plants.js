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
    const [cooldowns, setCooldowns] = useState({});
    const [currentlyWatering, setCurrentlyWatering] = useState(false);
    const [time, setTime] = useState(new Date());
    const waterInterval = useRef(null);


    
    useEffect(() => {
        dispatch(plantActions.fetchAll());
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
            setCooldowns(current => {
                const newCooldowns = {};
                Object.keys(current).forEach(key => { 
                    if (current[key] - 1 > 0){
                        newCooldowns[key] = current[key] - 1;
                    }
                });
                return newCooldowns;
            });
        }, 1000);


        return () => {
            clearInterval(interval);
        }
    }, [])




    const toggleWaterPlant = (id, initWateringStatus) => {

        if (plantsToWater.hasOwnProperty(id)){
            const plantsCopy = Object.assign({}, plantsToWater);
            delete plantsCopy[id];
            setPlantsToWater({
                ...plantsCopy
            })
        }else {
            if (cooldowns[id])
                window.alert("You must wait 30s before watering this plant again");
            else
                setPlantsToWater({
                    ...plantsToWater,
                    [id]:initWateringStatus
                })
        }
        
    }

    const addCooldown = (id, cooldownAmountInSeconds) => {
        setCooldowns({
            ...cooldowns,
            [id]: cooldownAmountInSeconds
        })
    }

    const toggleWatering = () => {
        
        if (currentlyWatering){
            // the user wants to stop watering the plant
            // send a request to server to update plant status
            
            if (Object.keys(plantsToWater).length !== 0){

                dispatch(plantActions.updateWateringStatus(
                    plantsToWater, 
                    () => { 
                        window.alert("success")
                        setCooldowns(current => {
                            const newCooldowns = {};
                            Object.keys(plantsToWater).forEach(key => {
                                newCooldowns[key] = 30;
                            })
                            return newCooldowns;
                        });
                        setPlantsToWater({});
                    }, 
                    () => {
                        setPlantsToWater({});
                        
                    }));
            }
            
            setCurrentlyWatering(false);
        }else{
            setCurrentlyWatering(true);
        }
        
    }
    

    useEffect(() => {
        console.log(plantsToWater);
    }, [plantsToWater])

    useEffect(() => {
        if (currentlyWatering){
            waterInterval.current = setInterval(() => {
                setPlantsToWater((current) => {
                    const newPlantsToWater = {};
                    Object.keys(current).forEach(key => newPlantsToWater[key] = Math.min(current[key] + 10, 100));
                    return newPlantsToWater;
                });
                console.log("watered")
                
            }, 1000)
        }else{
            clearInterval(waterInterval.current)
        }

    }, [currentlyWatering])


    return (
        <div className="page main-page">
            <div className="fixed-section">
                <div>
                    <p>Click start to start watering the plants. Click stop to stop watering them.</p>
                </div>
                <button 
                    className={`watering-button ${currentlyWatering?"stop-button":"start-button"}`}
                    onClick={toggleWatering}
                >{currentlyWatering?"Batch Stop Watering": "Start Watering"}</button>
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
                            time={time}
                            addCooldown={addCooldown}
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

