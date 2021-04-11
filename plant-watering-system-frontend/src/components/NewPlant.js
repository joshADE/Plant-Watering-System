import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import useForm from '../hooks/useForm';
import ErrorNotice from './ErrorNotice';
import * as plantActions from '../actions/plant';

const initialState = {
    name: ''
}

function NewPlant({
    plants
}) {
    const dispatch = useDispatch();
    

    const validate = (fieldValues = values) => {
        let temp = {};
        if ('name' in fieldValues)
            temp.name = plants.every(plant => plant.name !== fieldValues.name) ? "" : "Name must be unique";
        setErrors({
            ...temp
        })
        if (fieldValues == values)
            return Object.values(temp).every(x => x == "");
    }

        const {
            values,
            setValues,
            errors,
            setErrors,
            handleInputChange
        } = useForm(initialState, validate);

    



    const handleSubmit = e => {
        e.preventDefault();
        if (validate()){
            const data = {
                ...values,
                lastWateredTime: new Date(),
                wateringStatus: 0
            }
            dispatch(plantActions.create(data, () => window.alert("successs")))
            setValues(initialState);
        }
    }

    return (
        <div className="plant-container plant-form-wrapper">
            <form 
                className="plant-form" 
                autoComplete="off"
                onSubmit={handleSubmit}
            >
                <input 
                    type="text" 
                    name="name" 
                    placeholder="Enter plant name" 
                    required 
                    onChange={handleInputChange}
                    value={values.name}   
                />
                {errors.name && <ErrorNotice message={errors.name} clearError={() => setErrors({...errors, name: ""})} />}
                <input type="submit" value="Add new plant" />
            </form>
        </div>
    )
}

export default NewPlant
