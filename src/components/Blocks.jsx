import Block from './Block';

export default function Blocks({blocks}) {

    return (
        <div className='blockDetail'>
            <div className='block-detail-header'><h3>Latest Blocks</h3></div>
            <div>{blocks.map(block => <Block key={block.hash} blockDetails={block}/>)}</div>  
        </div>
    )
}