import React from 'react'

//Initial state for Adjustable Parameters 
export const initialAdjustableParameters = {
    id: -1,
    autonomy: 1,
    discharge: 75,
    inductiveWatts: 0,
    dailySunlight: 5,
    dischargeState: false,
    inductiveState: false,
    loads: [
        {
            name: 'Fan',
            wattage: 95,
            hoursPerDay: 1,
            qty: 1
        },
        {
            name: 'Freezer',
            wattage: 150,
            hoursPerDay: 1,
            qty: 1
        }
    ]
}


// Adjustable Parameter Reducer
const AdjustableParametersReducer = (state, action) => {
    const { type, payload } = action
    switch (type) {
        // Autonomy
        case 'decreaseAutonomy':
            return {
                ...state,
                autonomy: state.autonomy - 1
            }
        case 'increaseAutonomy':
            return {
                ...state,
                autonomy: state.autonomy + 1
            }

        // Daily sunlight
        case 'decreaseDailySunlight':
            return {
                ...state,
                dailySunlight: state.dailySunlight - 1
            }
        case 'increaseDailySunlight':
            return {
                ...state,
                dailySunlight: state.dailySunlight + 1
            }

        // Toggle discharge state
        case 'toggleDischargeState':
            return {
                ...state,
                dischargeState: !state.dischargeState
            }
        // Change discharge 
        case 'changeDispatch':
            return {
                ...state,
                discharge: payload
            }

        // Change Id 
        case 'changeId':
            return {
                ...state,
                id: payload
            }

        // Adjust Inductive Watts
        case 'adjustInductiveWatts':
            return {
                ...state,
                inductiveWatts: payload
            }

        // Toggle discharge state
        case 'toggleInductiveState':
            return {
                ...state,
                inductiveState: !state.inductiveState
            }
        // Remove a specific load from the loads array
        case 'removeLoad':
            return {
                ...state,
                loads: payload
            }
        // Add a specific load from the loads array
        case 'addLoad':
            return {
                ...state,
                loads: payload
            }


        default:
            return state;
    }


}

export default AdjustableParametersReducer