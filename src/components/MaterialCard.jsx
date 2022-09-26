import React, { useState, useEffect } from 'react';
import SectionButton from './SectionButton';
import JsFileDownloader from 'js-file-downloader';
const MaterialCard = (props) => {
    const [Materials, setMaterials] = useState(props.Materials);
    const [FilteredList, setFilteredList] = useState([]);
    const [downloadPercent, setDownloadPercent] = useState("0");
    const [isDownloadStarted, setIsDownloadStarted] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);
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

    const downloader = (url) => {
        setIsDownloadStarted(true);
        setIsDownloading(true);
        const fileUrl = `https://link-server-proxy-mode.herokuapp.com/${url}`;

        new JsFileDownloader({
            url: fileUrl,
            process: process
        })
            .then(function () {
                // Called when download ended
                setIsDownloading(false);

            })
            .catch(function (error) {
                // Called when an error occurred
            });

        function process(event) {
            if (!event.lengthComputable) return; // guard
            let downloadingPercentage = Math.floor(event.loaded / event.total * 100);
            setDownloadPercent(downloadingPercentage);
        };
    }






    return (



        <>
            <div className='welcomeUser'>
                <p className='userName'>Hello, <b className='subjectIAbout'>{props.Name} !</b></p>
                <p>Your current section: <b className='subjectIAbout'>{preDefinedSection === "" ? "ALL" : preDefinedSection}</b></p>
            </div>
            <div className='searchBox'>
                <input onChange={(e) => handleSearch(e)} placeholder="Search your notes..."></input>
            </div>
            <div className='sectionButtonContainer'>
                <SectionButton secValue={""} buttonName={"ALL"} sectionSearch={sectionSearch} />
                <SectionButton secValue={"A"} buttonName={"A"} sectionSearch={sectionSearch} />
                <SectionButton secValue={"B"} buttonName={"B"} sectionSearch={sectionSearch} />
                <SectionButton secValue={"C"} buttonName={"C"} sectionSearch={sectionSearch} />
                <SectionButton secValue={"D"} buttonName={"D"} sectionSearch={sectionSearch} />
                <SectionButton secValue={"E"} buttonName={"E"} sectionSearch={sectionSearch} />
                <SectionButton secValue={"F"} buttonName={"F"} sectionSearch={sectionSearch} />
                <SectionButton secValue={"G"} buttonName={"G"} sectionSearch={sectionSearch} />
                <SectionButton secValue={"H"} buttonName={"H"} sectionSearch={sectionSearch} />
                <SectionButton secValue={"I"} buttonName={"I"} sectionSearch={sectionSearch} />
                <SectionButton secValue={"J"} buttonName={"J"} sectionSearch={sectionSearch} />
                <SectionButton secValue={"K"} buttonName={"K"} sectionSearch={sectionSearch} />
                <SectionButton secValue={"L"} buttonName={"L"} sectionSearch={sectionSearch} />


            </div>
            <center>
                {
                    isDownloadStarted ? <div style={downloadPercent === 100 ? { color: "yellowgreen" } : { color: "red" }} className={'downloadDisplay'}>⬇️ Download: {downloadPercent}%</div> : null
                }
                {
                    isDownloading ? <div className='downloadDisplay'>Downloading started...</div> : null
                }
                {
                    FilteredList.map((material, i) => {
                        return <div key={i} className='notePageHolder'>


                            <div className='noteCard'>
                                <div className='marquee'>
                                    <b>{material.name}</b>
                                </div>
                                <div className='aboutNote'>
                                    <ol start={-1}>
                                        <li className='removeListStyle'><b className='subjectIAbout'>{material.subject}</b></li>
                                        <li className='removeListStyle'><b className='dateIAbout'>{material.date}</b></li>
                                        {
                                            material.about.map((data, i) => {
                                                return <li className='aboutOText' key={i}>{data}</li>
                                            })
                                        }
                                        <li className='removeListStyle'>🛡️{material.uploader}</li>
                                    </ol>
                                </div>
                                <div className='downloadNoteBtn'>
                                    <button onClick={() => downloader(material.download_link)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-download" viewBox="0 0 16 16">
                                        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                                        <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
                                    </svg> Download</button>

                                </div>
                            </div>
                        </div>
                    })
                }
            </center>

        </>

    );
}

export default MaterialCard;
