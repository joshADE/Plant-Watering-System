import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectPlantState } from '../reducers/plant';
import * as plantActions from '../actions/plant';
import PlantDetails from './PlantDetails';
import NewPlant from './NewPlant';
function Plants() {
    const { plants } = useSelector(selectPlantState);
    
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(plantActions.fetchAll());
    }, [])


    return (
        <div className="page main-page">
            <div className="fixed-section">
                <div>
                    <p>Click start to start watering the plants. Click stop to stop watering them.</p>
                </div>
                
            </div>
            <div className="all-plants">
            {plants.map(plant => {
                return <PlantDetails 
                            key={plant.id}
                            plant={plant}            
                            
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

