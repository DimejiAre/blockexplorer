import Block from './Block';

export default function Blocks({blocks}) {

    return (
        <div className='blockDetail'>
            <h3>Latest Blocks</h3>
            <div>{blocks.map(block => <Block blockDetails={block}/>)}</div>  
        </div>
    )
}