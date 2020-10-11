import React from "react"
import "./index.css"
import mp31 from "./1.mp3"
import axios from "axios"
import common from "../../utils/common";
import store from "../../store";
import Axios from "axios";
import { StepBackwardOutlined, StarFilled, PlayCircleOutlined, StepForwardOutlined, PauseCircleOutlined } from '@ant-design/icons';
export default class C030bottom extends React.Component {
    dom;
    constructor(props) {
        super(props)
        this.state = {
            dataList: [], // 所有歌曲的List
            playBool: false, // 播放与否 (而且可以控制初始是否播放)
            nowIndex: 0, // 当前播放的下标

            musicName: "-- --",

            buttonStyle: { fontSize: '24px', color: '#32c3de' },
            buttonCenterStyle: { fontSize: '30px', color: '#32c3de' }
        }
    }

    render() {
        return (
            <div className="c-bottom-content-box dd-column">
                {/* 进度条 */}
                <div className="process-line dd-row dd-v-center">
                    {/* 游标的盒子 右侧少占游标宽度的一半 */}
                    <div className="play-node-box dd-row dd-v-center">
                        {/* 播放游标 */}
                        <div className="play-node" draggable="true" onDrag={(e) => this.handelDrag(e)} onDragEnd={(e) => this.onDragEnd(e)}>
                        </div>
                    </div>
                    {/* 缓存进度条 */}
                    <div className="cache-line ">
                        {/* 已经播放的 */}
                        <div className="had-played dd-row dd-v-center">
                        </div>
                    </div>
                </div>
                <div className="c-bottom-content">
                    <div className="dd-row dd-v-center c-bottom-content-left">
                        <div onClick={() => this.prevOne()} >
                            <StepBackwardOutlined style={this.state.buttonStyle} />
                        </div>
                        <div className="mg-x-px" onClick={() => this.playOrStop()}>
                            {/* 播放 暂停 */}
                            {!this.state.playBool ? <PlayCircleOutlined style={this.state.buttonCenterStyle} /> : <PauseCircleOutlined style={this.state.buttonCenterStyle} />}
                        </div>
                        <div onClick={() => this.nextOne()}>
                            <StepForwardOutlined style={this.state.buttonStyle} />
                        </div>
                    </div>
                    <div className="c-bottom-content-center">
                        {/* 歌名和时间 */}
                        <div className="name-time">
                            <span>{this.state.musicName}</span>
                            <span>00:00 / 04:13</span>
                        </div>
                        {/* 进度条 */}
                        <div>
                            {/* 进度条 */}
                            <audio id="mydom" preload="auto" src={mp31} onEnded={() => this.musicEnd()}>
                            </audio>
                        </div>
                    </div>
                    <div className="c-bottom-content-right">
                        声音
                </div>
                </div>
            </div>
        )
    }
    componentDidMount() {
        this.getAllData();
        this.dom = document.getElementById('mydom');
        this.playOrStop()

        store.subscribe(() => {
            let temp = store.getState()
            if (temp.type == "send_type") {
                this.changeMusic(temp.value)
            }
        })
    }

    changeMusic(obj) {
        try {
            // this.dom.src = obj.item
            this.setState({
                playBool: true,
                nowIndex: obj.index
            })

            this.myPlay(obj.item)

        } catch (error) {

        }
    }

    getAllData() {
        // 接口获取
        Axios.get(common.getDomain() + "/getAllData").then(res => {
            try {
                this.setState({
                    dataList: res.data.dataList
                })
            } catch (error) {

            }
        })
    }

    // 上一首
    prevOne() {
        if (this.state.nowIndex <= 0) {
            return
        }
        let temp = this.state
        this.setState({
            nowIndex: --temp.nowIndex
        })

        this.myPlay(this.state.dataList[this.state.nowIndex])
    }

    // 播放具体某歌曲
    myPlay(urlStr) {
        this.setState({
            musicName: urlStr
        })
        this.dom.src = common.getDomain() + urlStr
        this.dom.play()
    }
    // 播放或者暂停
    playOrStop() {
        if (this.state.playBool) {
            this.setState({
                playBool: false
            })
            this.dom.pause()
        } else {
            this.setState({
                playBool: true
            })
            this.dom.play()
        }
    }
    // 下一首
    nextOne() {
        if (this.state.nowIndex >= this.state.dataList.length - 1) {
            return
        }
        let temp = this.state
        this.setState({
            nowIndex: ++temp.nowIndex
        })

        this.myPlay(this.state.dataList[this.state.nowIndex])
    }

    // 播放结束
    musicEnd() {
        this.nextOne()
    }

    // 拖拽
    handelDrag(e) {
        console.log("拖拽中")
        document.querySelector(".had-played").style.width = e.clientX + 'px'
    }
    // 拖拽
    onDragEnd(e) {
        console.log("结束")
        document.querySelector(".had-played").style.width = e.clientX + 'px'
    }


} 