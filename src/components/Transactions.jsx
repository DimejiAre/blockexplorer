import React from 'react';
import Transaction from './Transaction';

export default function Transactions({transactions}) {

    return (
        <>
            <h3>Latest Transactions</h3>
            <div>{transactions.map(transaction => <Transaction transactionDetails={transaction}/>)}</div>  
        </>
    )
}