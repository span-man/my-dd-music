import React from "react"
import { createStore } from "redux"
import store from "../store";
import { sendAction } from "../action";

class Ca extends React.Component {
    render() {
        return (
            <div>
                <button className="Ca" onClick={() => this.handelCaClick()}>
                    Ca
            </button>
                <button className="Ca" onClick={() => this.handelCaClick2()}>
                    Ca
            </button>
            </div>
        )
    }

    handelCaClick() {
        const action = sendAction()
        console.log("111")
        store.dispatch(action)
    }
    handelCaClick2() {
        console.log("222")
    }
}
export default Ca