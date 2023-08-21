import React from 'react';
import Block from './Block';

export default function Blocks({blocks}) {

    return (
        <>
            <h3>Latest Blocks</h3>
            <div>{blocks.map(block => <Block blockDetails={block}/>)}</div>  
        </>
    )
}