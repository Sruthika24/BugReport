import React, { useEffect, useState } from "react";
import html2canvas from 'html2canvas';
import '../App.css';

function DummyRoute2() {

    const [feedbackIsChecked, setFeedbackIsChecked] = useState(false);
    const [bugReportIsChecked, setBugReportIsChecked] = useState(false);
    const [errCount, setErrCount] = useState(0);
    const [warnCount, setWarnCount] = useState(0);
    const [browserName, setBrowserName] = useState("");
    const [browserVersion, setBrowserVersion] = useState("");
    const [screenshot, setScreeshot] = useState(null);


    const takeshot = () => {
        let div =
            document.getElementById('photo');

        // Use the html2canvas
        // function to take a screenshot
        // and append it
        // to the output div
        html2canvas(div).then(
            function (canvas) {
                setScreeshot(canvas.toDataURL())
            })
    }

    const validateForm = (event) => {
        const type = document.getElementById("report-type");
        const description = document.getElementById("description");
        if (type.value === "" || description.value === "") {
            alert("Enter Valid Details!")
            return false
        } else return true
    }


    const getBrowser = () => {
        var ua = navigator.userAgent, tem, M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
        if (/trident/i.test(M[1])) {
            tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
            return { name: 'IE', version: (tem[1] || '') };
        }
        if (M[1] === 'Chrome') {
            tem = ua.match(/\bOPR|Edg\/(\d+)/)
            if (tem !== null) { return { name: tem[1] === 'OPR' ? 'Opera' : 'Edge', version: tem[1] }; }
        }
        M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
        if ((tem = ua.match(/version\/(\d+)/i)) != null) { M.splice(1, 1, tem[1]); }
        return {
            name: M[0],
            version: M[1]
        };
    }

    useEffect(() => {
        document.title = "Dummy Route 2"
        const browser = getBrowser()
        setBrowserName(browser.name)
        setBrowserVersion(browser.version)
        console.stderr = console.error.bind(console);
        console.stdwarn = console.warn.bind(console);
        console.errors = [];
        console.warns = [];
        console.error = function () {
            console.errors.push(Array.from(arguments))
            console.stderr.apply(console, arguments)
            setErrCount(console.errors.length)
        }
        console.warn = function () {
            console.warns.push(Array.from(arguments))
            console.stdwarn.apply(console, arguments)
            setWarnCount(console.warns.length)
        }
    }, [])

    const setFeedback = () => {
        setBugReportIsChecked(false)
        setFeedbackIsChecked(true)
    }

    const setBugReport = () => {
        takeshot()
        setFeedbackIsChecked(false)
        setBugReportIsChecked(true)
    }

    return (
        <div className="App" id="photo">
            <nav className="navbar navbar-dark navbar-expand-lg" style={{ backgroundColor: "#424040" }}>
                <div className="container-fluid">
                    <span className="navbar-brand">Genosis</span>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <a className="bi bi-lightning-charge-fill" style={{ color: "#FFD700" }} data-bs-toggle="modal" data-bs-target="#exampleModal"></a>
                        </div>
                    </div>
                </div>
            </nav>
            <div className="modal fade" id="exampleModal" data-bs-backdrop="static" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content" style={{ backgroundColor: "#424040", color: "#FFFFFF", minHeight: "450px" }}>
                        <div className="modal-body">
                            <div className="dropdown">
                                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    Report Type
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <li><a className="dropdown-item" onClick={setFeedback}>Feedback</a></li>
                                    <li><a className="dropdown-item" onClick={setBugReport}>Bug / Error / Technical Problem</a></li>
                                </ul>
                            </div>
                            {
                                feedbackIsChecked === true ?
                                    <form className="feedback" onSubmit={validateForm}>
                                        <div className="mb-3">
                                            <label htmlFor="report-type" className="form-label">Report type</label>
                                            <input type="text" className="form-control" id="report-type" readOnly value="Feedback" />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="description" className="form-label">Description</label>
                                            <textarea className="form-control" rows="5" id="description" />
                                        </div>
                                        <div className="card bg-secondary">
                                            <pre>{document.title} : Genosis.com{window.location.pathname}</pre>
                                        </div>
                                        <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Send</button>
                                    </form> :
                                    bugReportIsChecked === true ?
                                        <form className="feedback" onSubmit={validateForm}>
                                            <div className="mb-3">
                                                <label htmlFor="report-type" className="form-label">Report type</label>
                                                <input type="text" className="form-control" id="report-type" readOnly value="Bug / Error / Technical Problem" />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="description" className="form-label">Description</label>
                                                <textarea className="form-control" rows="5" id="description" />
                                            </div>
                                            <div className="card bg-secondary">
                                                <div className="card-body">
                                                    <pre>{document.title} : Genosis.com{window.location.pathname}</pre>
                                                    <pre>Console logs captured : Errors: {errCount} / Warnings: {warnCount}</pre>
                                                    <pre>Browser : {browserName} v{browserVersion}</pre>
                                                    <pre>Attachments :</pre>
                                                    <img src={screenshot} alt="screen-shot"></img>
                                                    <pre><input type="file"></input></pre>
                                                </div>
                                            </div>
                                            <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Send</button>
                                        </form> : null
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )

}

export default DummyRoute2;