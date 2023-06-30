import React from 'react'


const printPDF = () => {
    // const [state, dispatch] = useReducer(QuotationReducer, checkLocalStorage())

    const printQuote = state.quotes.map((quote, index) => {

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
    return (
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
                {printQuote}
            </tbody>
        </table>
    )
}
export default printPDF