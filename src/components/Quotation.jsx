import React, { useState, useEffect } from 'react'
import '../components/css/table.css'
import { faNairaSign } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useReducer } from 'react'
import QuotationReducer, { initialQuotationParameters } from './reducer/QuotationReducer'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

const Quotation = () => {

    /*Codes for Persisting Reducer to local storage*/
    const checkLocalStorage = () => {
        const storedValue = localStorage.getItem('Quotation')
        return JSON.parse(storedValue) || initialQuotationParameters
    }
    // -----Reducer----- //
    const [state, dispatch] = useReducer(QuotationReducer, checkLocalStorage())

    useEffect(() => {
        localStorage.setItem('Quotation', JSON.stringify(state))
    }, [state])



    // -----Function to map all the quotes in state----- //
    const showQuote = state.quotes.map((quote, index) => {

        // Function to edit a specific load //
        const editQuote = index => {
            dispatch({ type: 'changeId', payload: index })

        }

        // Function to remove a specific load //
        const removeQuote = index => {
            const filter = state.quotes.filter((_, i) => i !== index)
            dispatch({ type: 'addQuote', payload: filter })


        }


        return (
            state.id === index ? <EditList state={state} dispatch={dispatch} quotes={state.quotes} quote={quote} index={index} /> :
                <tr className='edit-list'>
                    <th>{index + 1}</th>
                    <td>{quote.name}</td>
                    <td >{quote.qty}</td>
                    <td >{quote.unitPrice}</td>
                    <td >{quote.unitPrice * quote.qty}</td>
                    <td className='action'>
                        <button onClick={() => editQuote(index)}>Edit</button>
                        <button onClick={() => removeQuote(index)}>Remove</button>
                    </td>
                </tr >
        )
    })

    // Function to add load
    const addQuote = () => {

        const newQuote = {

            name: '',
            totalPrice: 0,
            unitPrice: 0,
            qty: 0

        }
        dispatch({ type: 'addQuote', payload: [...state.quotes, newQuote] })
    }



    // Function to calculate Total
    const totalQuote = state.quotes.reduce((acc, cur) => {
        return acc + (cur.unitPrice * cur.qty)
    }, 0)


    // Function to Print Load section




    const marry = (
        <div id='print-quotation'>
            <table class="load-table table-striped table-bordered my-4 table" data-aos='fade-up' data-aos-duration='1000'>
                <thead>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">Name</th>
                        <th scope="col">Qty</th>
                        <th scope="col">Unit Price(<FontAwesomeIcon icon={faNairaSign} />)</th>
                        <th scope="col">Total Price(<FontAwesomeIcon icon={faNairaSign} />)</th>
                        <th scope="col">Update</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        state.quotes.map((quote, index) => {
                            return (
                                <tr className='edit-list'>
                                    <th>{index + 1}</th>
                                    <td>{quote.name}</td>
                                    <td >{quote.qty}</td>
                                    <td >{quote.unitPrice}</td>
                                    <td >{quote.unitPrice * quote.qty}</td>
                                </tr >
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )




    const exportPDF = () => {
        const input = document.getElementById('abc')

        html2canvas(input, { logging: true, useCORS: true, letterRendering: 1 }).then(canvas => {
            const imgWidth = 208;
            const imgHeight = canvas.height * imgWidth / canvas.width
            const imgData = canvas.toDataURL('img/png');
            const pdf = new jsPDF('portrait', 'mm', 'a4');
            pdf.addImage(imgData, 'PNG', 5, 5, imgWidth, imgHeight);
            pdf.save('quotation.pdf')
        })
    }





    return (
        <div className='border container-xxl p-3' id='quotation'>
            <h2 className='text-center' data-aos='fade-up' data-aos-duration='1000'>Solar Quote Generator</h2>
            <table id='abc' class="load-table table-striped table-bordered my-4 table" data-aos='fade-up' data-aos-duration='1000'>
                <thead>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">Name</th>
                        <th scope="col">Qty</th>
                        <th scope="col">Unit Price(<FontAwesomeIcon icon={faNairaSign} />)</th>
                        <th scope="col">Total Price(<FontAwesomeIcon icon={faNairaSign} />)</th>
                        <th scope="col">Update</th>
                    </tr>
                </thead>
                <tbody>
                    {showQuote}
                </tbody>
            </table>
            <div className="add-product container" data-aos='zoom-in' data-aos-duration='1000'>
                <button onClick={addQuote}>Add Quote</button>
            </div>
            <div className="total-quote" data-aos='fade-up' data-aos-duration='1000'>
                <p>Total material cost: <FontAwesomeIcon icon={faNairaSign} /> {totalQuote}</p>
                {
                    state.workmanState ?

                        <p className="quote-button"> Workmanship cost: <FontAwesomeIcon icon={faNairaSign} /> {state.workmanship}
                            <button onClick={() => dispatch({ type: 'toggleWorkmanState', payload: !state.workmanState })} className=''>Change</button>

                        </p>
                        : <Workmanship workmanship={state.workmanship} state={state} dispatch={dispatch} />
                }
                <p className='total'>Grand Total: <FontAwesomeIcon icon={faNairaSign} />{state.workmanship + totalQuote}</p>
            </div>
            <div className="pdf-button container">
                <button onClick={exportPDF}>Print Quotation</button>
            </div>

        </div>
    )
}

export default Quotation



// EditList components // 
const EditList = ({ index, state, dispatch, quotes, quote }) => {
    const [initialQuote, setInitialQuote] = useState({
        name: quote.name,
        qty: quote.qty,
        unitPrice: quote.unitPrice,

    })
    const updatequote = (e) => {
        setInitialQuote(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value

            }
        })
    }
    const submitUpdatedQuote = () => {

        state.quotes[index].name = initialQuote.name
        state.quotes[index].price = Number(initialQuote.price)
        state.quotes[index].qty = Number(initialQuote.qty)
        state.quotes[index].unitPrice = Number(initialQuote.unitPrice)
        dispatch({ type: 'changeId', payload: -1 })
    }



    return (
        <tr className='edit-list'>
            <td scope="row"> {index + 1}</td>
            <td><input onChange={updatequote} type="text" name='name' value={initialQuote.name} placeholder='Add Quote' /></td>
            <td><input onChange={updatequote} min={1} type="number" name='qty' value={initialQuote.qty} /></td>
            <td><input onChange={updatequote} min={1} type="number" name='unitPrice' value={initialQuote.unitPrice} /></td>
            <td><input value={initialQuote.unitPrice * initialQuote.qty} /></td>
            <td><button className='action' onClick={submitUpdatedQuote}> Update</button></td>
        </tr>
    )
}

// Workmanskip Component
const Workmanship = ({ workmanship, setWorkmanship, setWorkmanState, state, dispatch }) => {
    return (
        <div className='quote-button'>
            <input type="number" value={workmanship} onChange={(e) => dispatch({ type: 'changeWorkmanship', payload: Number(e.target.value) })} />
            <button className='change ' onClick={() => dispatch({ type: 'toggleWorkmanState', payload: !state.workmanState })}>Apply</button>
        </div >
    )
}


