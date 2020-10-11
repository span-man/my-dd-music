import React from "react"
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import Ca from "./Ca"
import Cb from "./Cb"
import C010head from "./C010head/index"
import C020content from "./C020content/index"
import C030bottom from "./C030bottom/index"
import "./CRouter.css"

class CRouter extends React.Component {
    render() {
        return (
            <div className="base-page">
                {/* <Router>
                    <Route path="/Ca" component={Ca}></Route>
                    <Route path="/Cb" component={Cb}></Route>
                    <div>
                        <Link to={`/Ca`}>Ca</Link>
                        <Link to={`/Cb`}>Cb</Link>
                    </div>
                </Router> */}
                <div className="c-head">
                    <C010head />
                </div>
                <div className="c-content">
                    <C020content />
                </div>
                <div className="c-bottom">
                    <C030bottom />
                </div>
            </div>
        )
    }

    handelCaClick() {
        console.log("222")
    }
}
export default CRouter