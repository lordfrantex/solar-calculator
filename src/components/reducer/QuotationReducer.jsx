import React from 'react'

//Initial state for Quotation Initial Parameters 
export const initialQuotationParameters = {
    quotes: [
        {
            name: 'Inverter',
            unitPrice: 1,
            qty: 1
        },
        {
            name: 'Solar Panel',
            unitPrice: 1,
            qty: 1
        }
    ],
    workmanship: 5000,
    workmanState: true,
    id: -1

}

// Adjustable Parameter Reducer
const QuotationReducer = (state, action) => {
    const { type, payload } = action
    switch (type) {




        // Toggle Workman state
        case 'toggleWorkmanState':
            return {
                ...state,
                workmanState: !state.workmanState
            }
        // Change Workmanship 
        case 'changeWorkmanship':
            return {
                ...state,
                workmanship: payload
            }

        // Change Id 
        case 'changeId':
            return {
                ...state,
                id: payload
            }
        // Remove a specific quote from the quotes array
        case 'removeQuote':
            return {
                ...state,
                quotes: payload
            }
        // Add a specific quote from the quotes array
        case 'addQuote':
            return {
                ...state,
                quotes: payload
            }




        default:
            return state;
    }


}

export default QuotationReducer