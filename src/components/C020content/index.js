import Axios from "axios"
import React from "react"
import { sendAction } from "../../action"
import common from "../../utils/common"
import store from "../../store";

export default class C020content extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dataList: []
        }
    }
    render() {

        return (
            <div>
                <ol>
                    {this.state.dataList.map((item, index) => {
                        return <li onClick={() => this.handelClick(item, index)} key={index} data={item}>{this.filterName(item)}</li>
                    })}
                </ol>
            </div>
        )
    }
    componentDidMount() {
        this.getAllData()

        store.subscribe(() => {
            let obj = store.getState()
            console.log("搜索项===>", obj.value.value)
            if (!obj.value.value) {
                this.getAllData()
            } else {
                try {
                    let tempArr = this.state.OData.filter(item => item.includes(obj.value.value))
                    console.log("C020content -> componentDidMount -> tempArr", tempArr)
                    this.setState({
                        dataList: tempArr
                    })
                } catch (error) {

                }
            }
        })
    }

    filterName(args) {
        if (args && args.includes('/')) {
            let t = args.split('/')
            return t[t.length - 1]
        }
        return args
    }

    getAllData() {
        // 接口获取
        Axios.get(common.getDomain() + "/getAllData").then(res => {
            try {
                this.setState({
                    OData: res.data.dataList,
                    dataList: res.data.dataList
                })
            } catch (error) {

            }
        })
    }

    handelClick(item, index) {
        // 点击之后使用redux传给兄弟组件
        console.log("C020content -> handelClick -> item,index", item, index)
        const action = sendAction({
            item, index
        })
        store.dispatch(action)
    }
}