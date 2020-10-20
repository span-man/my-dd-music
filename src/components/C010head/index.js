import React from "react"
import { Input, AutoComplete } from "antd"
import { sendAction } from "../../action"

import "./index.css"
import store from "../../store";
export default class C010head extends React.Component {
    inputValue = "";
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        return (
            <div className="dd-row dd-v-center c-head-content">
                <div className="left dd-row dd-v-center">dd-music</div>
                <div className="right dd-row dd-v-center">
                    <Input.Search size="large" onSearch={(value) => this.handelInput(value)} placeholder="周董" enterButton allowClear />
                </div>
            </div>
        )

    }

    handelInput(value) {
        // console.log(value.currentTarget.value)
        // window.find(value)
        if (value) {
            value = value.trim()
        }
        const action = sendAction({
            type: "send_type",
            value: value
        })
        store.dispatch(action)
    }
}