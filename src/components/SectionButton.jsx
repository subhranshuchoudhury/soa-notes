import React from 'react';

const SectionButton = (props) => {
    return <>
        <button className='sectionButton' onClick={() => props.sectionSearch(props.secValue)}>{props.buttonName}</button>
    </>;
}

export default SectionButton;
