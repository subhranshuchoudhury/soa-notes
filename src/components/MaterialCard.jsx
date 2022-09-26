import React, { useState, useEffect } from 'react';

const MaterialCard = (props) => {

    const [Materials, setMaterials] = useState(props.Materials);
    const [FilteredList, setFilteredList] = useState([]);
    const preDefinedSection = props.Section;
    const sectionSearch = (input) => {
        const filteredList = Materials.filter((material) => {
            return Object.values(material.section).join(" ").toLowerCase().includes(input.toLowerCase());
        });

        if (filteredList.length === 0) {
            alert("No material available for section: " + input);
            return;
        }
        setFilteredList(filteredList);

    }

    const handleSearch = (e) => {
        const string = e.target.value;
        const filteredList = Materials.filter((material) => {
            return Object.values(material).join(" ").toLowerCase().includes(string.toLowerCase());
        });
        setFilteredList(filteredList);
    }
    useEffect(() => {
        sectionSearch(preDefinedSection);
    }, []);



    return (



        <>
            <div className='welcomeUser'>
                <b>Hi! <b className='subjectIAbout'>{props.Name}</b>, Your current section is <b className='subjectIAbout'>{preDefinedSection === "" ? "ALL" : preDefinedSection}</b>.</b>
            </div>
            <div className='searchBox'>
                <input onChange={(e) => handleSearch(e)} placeholder="Search your notes..."></input>
            </div>
            <div className='sectionButtonContainer'>
                <button className='sectionButton' onClick={() => sectionSearch("")}>ALL</button>
                <button className='sectionButton' onClick={() => sectionSearch("A")}>A</button>
                <button className='sectionButton' onClick={() => sectionSearch("B")}>B</button>
                <button className='sectionButton' onClick={() => sectionSearch("C")}>C</button>
                <button className='sectionButton' onClick={() => sectionSearch("D")}>D</button>
                <button className='sectionButton' onClick={() => sectionSearch("E")}>E</button>
                <button className='sectionButton' onClick={() => sectionSearch("F")}>F</button>
                <button className='sectionButton' onClick={() => sectionSearch("G")}>G</button>
                <button className='sectionButton' onClick={() => sectionSearch("H")}>H</button>
                <button className='sectionButton' onClick={() => sectionSearch("I")}>I</button>
                <button className='sectionButton' onClick={() => sectionSearch("J")}>J</button>
                <button className='sectionButton' onClick={() => sectionSearch("K")}>K</button>
                <button className='sectionButton' onClick={() => sectionSearch("L")}>L</button>

            </div>
            {
                FilteredList.map((material, i) => {
                    return <div key={i} className='notePageHolder'>


                        <div className='noteCard'>
                            <div className='marquee'>
                                <b>{material.name}</b>
                            </div>
                            <div className='aboutNote'>
                                <ul>
                                    <li><b className='subjectIAbout'>{material.subject}</b></li>
                                    <li><b className='dateIAbout'>{material.date}</b></li>
                                    {
                                        material.about.map((data, i) => {
                                            return <li className='aboutOText' key={i}>{data}</li>
                                        })
                                    }
                                    <li>Uploader: {material.uploader}</li>
                                </ul>
                            </div>
                            <div className='downloadNoteBtn'>
                                <a href={material.download_link}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-download" viewBox="0 0 16 16">
                                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                                    <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
                                </svg> Download</a>

                            </div>
                        </div>
                    </div>
                })
            }
        </>

    );
}

export default MaterialCard;
