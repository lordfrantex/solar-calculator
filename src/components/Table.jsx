import React, { useState, useReducer, useEffect } from 'react'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import AdjustableParametersReducer, { initialAdjustableParameters } from './reducer/AdjustableParametersReducer'
import '../components/css/table.css'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

// Fontawesome  Libraries
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

const Table = () => {

    const exportPDF = () => {
        const input = document.getElementById('quotation')
        html2canvas(input, { logging: true, useCORS: true, letterRendering: 1 }).then(canvas => {
            const imgWidth = 208;
            const imgHeight = canvas.height * imgWidth / canvas.width
            const imgData = canvas.toDataURL('img/png');
            const pdf = new jsPDF('portrait', 'mm', 'a4');


            pdf.addImage(imgData, 'PNG', 5, 5, imgWidth, imgHeight);
            pdf.save('quotation.pdf')
        })
    }


    /*Codes for Persisting Reducer to local storage*/
    const checkLocalStorage = () => {
        const storedValue = localStorage.getItem('Parameters')
        return JSON.parse(storedValue) || initialAdjustableParameters
    }
    // -----Reducer----- //
    const [state, dispatch] = useReducer(AdjustableParametersReducer, checkLocalStorage())

    useEffect(() => {
        localStorage.setItem('Parameters', JSON.stringify(state))
    }, [state])




    // Function to get total wattage 
    const totalWatts = state.loads.reduce((acc, cur) => {
        return acc + (cur.wattage * cur.qty)
    }, 0)


    // Function to get daily energy (wattage*qty*hour) //
    const dailyEnergy = state.loads.reduce((acc, cur) => {
        return acc + (cur.wattage * cur.qty * cur.hoursPerDay)
    }, 0)


    // Function to choose capacity of inverter
    let inverterCapacity
    const inverterCalculation = (totalWatts / 0.8) + (0.15 * totalWatts) + (state.inductiveWatts)
    if (inverterCalculation < 1000) {
        inverterCapacity = (inverterCalculation).toFixed(2) + 'va'
    } else {

        inverterCapacity = (inverterCalculation / 1000).toFixed(2) + 'kva'
    }


    // Function to choose the system's voltage //
    const systemVoltage = [12, 24, 48]
    const voltageCalculator = systemVoltage.filter(volt => {
        return (inverterCalculation / volt) < 180
    })[0]


    let voltage
    if (!voltageCalculator) {
        voltage = `${Math.ceil(totalWatts / 180)}`

    }
    else {
        voltage = voltageCalculator

    }





    // Function to calculate Battery capacity //
    const batteryCapacity = ((dailyEnergy * state.autonomy) / (voltage * (state.discharge / 100))).toFixed(2)


    // Function to calculate Solar array(panel) capacity //
    let solarPanelCapacity
    const solarPanelCapacityCalculation = ((batteryCapacity * voltage) / state.dailySunlight) + 300
    if (solarPanelCapacityCalculation > 1000) {
        solarPanelCapacity = (solarPanelCapacityCalculation / 1000).toFixed(2) + 'kw'
    } else {
        solarPanelCapacity = (solarPanelCapacityCalculation).toFixed(2) + 'w'
    }


    // Function to choose Charge controller //
    const chargeControllerAmperages = [20, 30, 40, 60, 80, 100]
    const chargeControllerCalculation = chargeControllerAmperages.filter(amps => {
        return amps > (solarPanelCapacityCalculation / voltage)
    })[0]

    let chargeController
    if (chargeControllerCalculation > 80 || voltage > 12) {
        chargeController = `12/24/48V (40/60/100A) MPPT`


    }
    else if (voltage <= 12 && chargeControllerCalculation <= 80) {
        chargeController = `${chargeControllerCalculation}Amps PWM`

    }
    else {
        chargeController = `${Math.ceil(solarPanelCapacityCalculation / voltage)}Amps MPPT`

    }


    // -----Function to map all the loads from state reducer----- //
    const showLoads = state.loads.map((load, index) => {

        // Function to edit a specific load //
        const editLoads = index => {
            dispatch({ type: 'changeId', payload: index })
        }

        // Function to remove a specific load //
        const removeLoad = index => {
            const filter = state.loads.filter((_, i) => i !== index)
            dispatch({ type: 'removeLoad', payload: filter })

        }




        return (
            state.id === index ? <EditList loads={state.loads} state={state} load={load} dispatch={dispatch} index={index} totalWatts={totalWatts} /> :
                <tr className='edit-list'>
                    <td>{index + 1}</td>
                    <td width='20%'>{load.name}</td>
                    <td >{load.wattage}</td>
                    <td >{load.qty}</td>
                    <td >{load.hoursPerDay}</td>
                    <td>{load.wattage * load.qty * load.hoursPerDay}</td>
                    <td className='action'>
                        <button onClick={() => editLoads(index)}>Edit</button>
                        <button onClick={() => removeLoad(index)}>Remove</button>
                    </td>
                </tr >
        )
    })



    // Function to add load
    const addLoad = () => {

        const newProduct = {

            name: '',
            wattage: 0,
            hoursPerDay: 0,
            qty: 0

        }
        dispatch({ type: 'addLoad', payload: [...state.loads, newProduct] })


    }



    return (

        <div id='calculator' className='container-xxl '>
            <h2 className='text-center my-3'>Solar Load Calculator</h2>
            <table class="load-table table-striped table-bordered my-4 table" data-aos='fade-up' data-aos-duration='800'>
                <thead>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">Name</th>
                        <th scope="col">Wattage(W)</th>
                        <th scope="col">Qty</th>
                        <th scope="col">Hours/day(hrs)</th>
                        <th scope="col">Daily Energy(WH)</th>
                        <th scope="col">Update</th>
                    </tr>
                </thead>
                <tbody>
                    {showLoads}
                </tbody>
            </table>
            <div className="add-product container" data-aos='zoom-in' data-aos-duration='1000'>
                <button onClick={addLoad}>Add Load</button>
            </div>
            <div className="container row py-3 output">
                <div className="border col-md-5 m-3  p-3" data-aos='fade-right' data-aos-duration='1000'>
                    <h3>My Energy Demands</h3>

                    <p>Total wattage: <strong>{totalWatts}W</strong></p>
                    <p>Total daily energy: <strong>{dailyEnergy}Wh</strong></p>
                    <p>Voltge of System: <strong>{voltage}V</strong></p>
                    <p>Inverter Capacity: <strong>{inverterCapacity}</strong></p>
                    <p>Battery Capacity: <strong>{batteryCapacity}Ah</strong></p>
                    <p>Panel Capacity: <strong>{solarPanelCapacity}</strong></p>
                    <p>Charge Controller Capacity: <strong>{chargeController}</strong></p>
                </div>
                <div className="adjustable-parameters col-md-5 m-3  border p-3" data-aos='fade-left' data-aos-duration='1000'>
                    <h3>Adjustable Parameters</h3>
                    <div>
                        <span> Days of Autonomy:</span>
                        <div className="control-button">
                            <button onClick={() => state.autonomy > 1 && dispatch({ type: 'decreaseAutonomy' })}><FontAwesomeIcon icon={faMinus}></FontAwesomeIcon></button>
                            <strong>{state.autonomy}</strong>
                            <button onClick={() => dispatch({ type: 'increaseAutonomy' })}><FontAwesomeIcon icon={faPlus}></FontAwesomeIcon></button>
                        </div>

                    </div>
                    <div>
                        <span> Daily sunlight : </span>
                        <div className="control-button">
                            <button onClick={() => state.dailySunlight > 1 && dispatch({ type: 'decreaseDailySunlight' })}><FontAwesomeIcon icon={faMinus}></FontAwesomeIcon></button>
                            <strong>{state.dailySunlight}</strong>
                            <button onClick={() => dispatch({ type: 'increaseDailySunlight' })}><FontAwesomeIcon icon={faPlus}></FontAwesomeIcon></button>
                        </div>
                    </div>
                    <div>

                        {!state.dischargeState ?
                            <p>   Depth of discharge: {state.discharge}% <button className='change' onClick={() => dispatch({ type: 'toggleDischargeState' })}>Change</button> </p>
                            : <DischargeComponent inputDispatch='changeDispatch' onClickDispatch='toggleDischargeState' dischargeState={state.dischargeState} discharge={state.discharge} dispatch={dispatch} />}

                    </div>
                    <div>

                        {!state.inductiveState ?
                            <p>Inductive/ Surge Watt: {state.inductiveWatts}W <button className='change' onClick={() => dispatch({ type: 'toggleInductiveState' })}>Change</button> </p>
                            : <DischargeComponent inputDispatch='adjustInductiveWatts' onClickDispatch='toggleInductiveState' dischargeState={state.inductiveState} discharge={state.inductiveWatts} dispatch={dispatch} />}

                    </div>

                </div>

            </div>
            {/* <div className="pdf-button container">
                <button onClick={exportPDF}>Print Quotation</button>
            </div> */}
        </div >
    )
}

export default Table

// EditList components // 
const EditList = ({ load, loads, index, totalWatts, state, dispatch }) => {
    const [InitialLoad, setInitialLoad] = useState({
        name: load.name,
        wattage: load.wattage,
        qty: load.qty,
        hoursPerDay: load.hoursPerDay,

    })
    const updateLoad = (e) => {
        setInitialLoad(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value

            }
        })
    }
    const submitUpdatedLoad = () => {

        state.loads[index].name = InitialLoad.name
        state.loads[index].wattage = Number(InitialLoad.wattage)
        state.loads[index].qty = Number(InitialLoad.qty)
        state.loads[index].hoursPerDay = Number(InitialLoad.hoursPerDay)
        dispatch({ type: 'changeId', payload: -1 })
    }



    return (
        <tr className='edit-list'>
            <td scope="row"> {index + 1}</td>
            <td><input onChange={updateLoad} type="text" name='name' value={InitialLoad.name} placeholder='Add Load' /></td>
            <td><input onChange={updateLoad} min={1} type="number" name='wattage' value={InitialLoad.wattage} /></td>
            <td><input onChange={updateLoad} min={1} type="number" name='qty' value={InitialLoad.qty} /></td>
            <td><input onChange={updateLoad} min={1} type="number" name='hoursPerDay' value={InitialLoad.hoursPerDay} /></td>
            <td><span> {InitialLoad.wattage * InitialLoad.qty * InitialLoad.hoursPerDay}</span></td>
            <td><button className='action' onClick={submitUpdatedLoad}> Update</button></td>
        </tr>
    )
}

// Discharge Component
const DischargeComponent = ({ dispatch, discharge, dischargeState, onClickDispatch, inputDispatch }) => {
    return (
        <p>
            <input type="number" value={discharge} onChange={(e) => dispatch({ type: inputDispatch, payload: Number(e.target.value) })} />
            <button className='change' onClick={() => dispatch({ type: onClickDispatch })}>Apply</button>
        </p>
    )
}


