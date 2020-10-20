import React from "react"
import "./index.css"
import mp31 from "./1.mp3"
import axios from "axios"
import common from "../../utils/common";
import store from "../../store";
import Axios from "axios";
import $ from "jquery";
import { StepBackwardOutlined, StarFilled, PlayCircleOutlined, StepForwardOutlined, PauseCircleOutlined, DownloadOutlined } from '@ant-design/icons';
export default class C030bottom extends React.Component {
    dom;
    aaaabb;
    audioDom;
    playNodeDom;
    hadPlayed;
    diffX;
    playNodeBoxCW;
    diameterC2;

    processLineDom; // 整个进度条盒子
    bufferLineDom; // 缓冲进度条
    playNodeBoxDom; // 放已经播放 和 滑块的槽子
    constructor(props) {
        super(props)
        this.state = {
            dataList: [], // 所有歌曲的List
            playBool: false, // 播放与否 (而且可以控制初始是否播放)
            nowIndex: 0, // 当前播放的下标

            /**
             * 开始时候获取该首歌的 名字 时长 
             * 每隔500ms获取 当前缓存的长度 播放进度
             */
            musicInfo: {
                duration: "--:--", // 时长 00:00 形式
                musicName: "Mojito", // 歌曲名字
                musicLength: 0, // 歌曲时长 秒数
                bufferedPercent: 0, // 缓冲进度条 百分比
                playedTime: "--:--", // 播放进度 时长
                totalUrl: '', // 完整的链接
            },

            buttonStyle: { fontSize: '24px', color: '#32c3de' },
            buttonCenterStyle: { fontSize: '30px', color: '#32c3de' }
        }
    }

    render() {
        return (
            <div className="c-bottom-content-box dd-column">
                {/* 进度条 */}
                <div className="process-line dd-row dd-v-center">
                    {/* 缓存进度条 */}
                    <div className="cache-line ">
                    </div>
                    {/* 滑块的盒子 右侧少占滑块宽度的一半 */}
                    <div className="play-node-box dd-row dd-v-center">
                        {/* 播放进度条 */}
                        <div className="had-played">
                        </div>
                        {/* 播放滑块 */}
                        <div className="play-node" draggable="true" onDragStart={(e) => this.handelDragStart(e)} onDrag={(e) => this.handelDrag(e)} onDragEnd={(e) => this.handelDragEnd(e)}>
                        </div>
                    </div>
                </div>
                <div className="dd-column">
                    <div className="c-bottom-content">
                        <div className="c-bottom-content-center">
                            {/* 歌名和时间 */}
                            <div className="name-time dd-row">
                                <span className="musicName" style={{"flex":1}}>{this.state.musicInfo.musicName}</span>
                                <span >{this.state.musicInfo.playedTime} / {this.state.musicInfo.duration}</span>
                            </div>
                            {/* 放着audio 但是不占地方 */}
                            <div>
                                <audio id="mydom" preload="auto" src={mp31}
                                    onPlaying={() => this.musicPlaying()}
                                    onTimeUpdate={() => this.musicTimeUpdate()}
                                    onPause={() => this.musicPause()}
                                    onEnded={() => this.musicEnd()}
                                >
                                </audio>
                            </div>
                        </div>
                        {/* <div className="c-bottom-content-right">
                        声音
                    </div> */}
                    </div>
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
                        {/* 下载 */}
                        <div onClick={() => this.download(this.state.totalUrl, this.state.musicName)}>
                            {/* <div> */}
                            {/* <a href={this.state.totalUrl} download> */}
                            <DownloadOutlined style={this.state.buttonStyle} />
                            {/* </a> */}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    componentDidMount() {
        this.getAllData();
        this.dom = document.getElementById('mydom');
        this.audioDom = document.querySelector('#mydom');

        // 整个进度条盒子
        this.processLineDom = document.querySelector('.process-line');
        // 缓冲进度条
        this.bufferLineDom = document.querySelector('.cache-line');
        // 播放进度条
        this.playNodeBoxDom = document.querySelector(".play-node-box")

        setTimeout(() => {
            this.playOrStop()
        }, 500);

        store.subscribe(() => {
            let temp = store.getState()
            if (temp.type == "send_type") {
                this.changeMusic(temp.value)
            }
        })

        this.aaaabb = common.throttle(this.makeDataINeed, 1000, 1)
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
                let len = res.data.dataList.length
                let randomNum = Math.floor(Math.random(len) * len)
                this.myPlay(res.data.dataList[randomNum])
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
        let _musicInfo = this.state.musicInfo
        let arr = urlStr.split('/');
        _musicInfo.musicName = arr[arr.length - 1]
        let totalUrl = common.getDomain() + urlStr
        this.setState({
            musicInfo: _musicInfo,
            totalUrl: totalUrl
        })
        this.dom.src = totalUrl
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
    // 下载
    download(src, filename) {
        //   window.open(this.dom.src)

        // var link = document.createElement('a');
        // //设置下载的文件名
        // link.download = filename;
        // link.style.display = 'none';
        // //设置下载路径
        // link.href = src;
        // //触发点击
        // document.body.appendChild(link);
        // link.click();
        // //移除节点
        // document.body.removeChild(link);

        $(`<a href="${src}" download="${filename}">Download</a>`)[0].click();
    }

    // 播放开始 播放开始的时候只会触发一次
    musicPlaying(e) {
        this.playNodeDom = document.querySelector(".play-node");

        this.playNodeBoxCW = document.querySelector(".play-node-box").clientWidth;
        this.diameterC2 = document.querySelector(".play-node").clientWidth / 2;
        this.hadPlayed = document.querySelector(".had-played");
        //播放状态Doing
        // playOrPause.src = require('../assets/img/pause.svg')//背景音乐是播放还是暂停
        // _this.playState = true;//播放状态
        console.log("播放中开始")
        console.log("C030bottom -> componentDidMount -> 音频长度 this.dom.duration", this.audioDom.duration)
        let tempObj = this.state.musicInfo;
        tempObj.musicLength = (this.audioDom.duration);
        tempObj.duration = common.makeMinutes(this.audioDom.duration);
        this.setState({
            musicInfo: tempObj
        })
    }

    // 缓冲进度条 已经播放进度条
    makeDataINeed() {
        // console.log("播放中 每隔一秒 获取一次");
        // 获取已经缓存的时间
        const timeRanges = this.dom.buffered;
        if (timeRanges.length != 0) {
            let tempTimeRangesNum = timeRanges.end(timeRanges.length - 1);

            // 计算百分比 展示缓冲进度条
            let a = parseInt(tempTimeRangesNum * 100 / this.state.musicInfo.musicLength * 100) / 100
            // console.log("C030bottom -> makeDataINeed -> a", a)
            let tempObj = this.state.musicInfo
            tempObj.bufferedPercent = a
            this.setState({
                musicInfo: tempObj
            })

            // 改变缓冲进度条
            this.changeBuffer(a)
            // 改变播放进度
            this.changePlayNode()
        }
    }

    // 播放中
    musicTimeUpdate(e) {
        // console.log("播放中 函数默认的调取");
        this.aaaabb();
    }

    // 播放暂停
    musicPause() {
        console.log("播放暂停")
    }

    // 播放结束
    musicEnd() {
        console.log("停止了");
        this.nextOne();
    }

    // 判断位置
    judgePosition(e) {
        // 滑块的滑轨
        let tempWdith = this.playNodeBoxCW - this.diameterC2
        let tempNum = 0
        if (e.clientX <= this.diameterC2) {
            tempNum = 0
        }
        else if (e.clientX >= tempWdith) {
            tempNum = tempWdith
        }
        else {
            tempNum = e.clientX - this.diffX
        }
        this.playNodeDom.style.left = tempNum + 'px'
        this.hadPlayed.style.width = tempNum + 'px'
    }
    // 拖拽 开始
    handelDragStart(e) {
        this.diffX = e.clientX - this.playNodeDom.offsetLeft;
    }
    // 拖拽
    handelDrag(e) {
        this.judgePosition(e)
    }
    // 拖拽 结束
    handelDragEnd(e) {
        this.judgePosition(e)
    }

    // 改变缓冲进度条
    changeBuffer(percent) {
        if (percent > 100) {
            return
        }
        let bufferWidth = this.processLineDom.clientWidth * percent / 100
        this.bufferLineDom.style.width = bufferWidth + 'px'
    }

    // 改变播放进度
    changePlayNode() {
        // console.log("当前时间-->", this.dom.currentTime)
        let timeDisplay = this.dom.currentTime;//获取实时时间
        // 百分比
        let tempPercent = timeDisplay / this.state.musicInfo.musicLength
        // console.log("已经播放的百分比是 -> tempPercent", tempPercent)
        let tempNum = tempPercent * this.playNodeBoxDom.clientWidth
        this.playNodeDom.style.left = tempNum + 'px'
        this.hadPlayed.style.width = tempNum + 'px'

        let tempObj = this.state.musicInfo
        tempObj.playedTime = common.makeMinutes(timeDisplay)
        this.setState({
            musicInfo: tempObj
        })

    }
}


// 隐藏拖拽
// dataTransfer.setDragImage() 方法可以设置拖拽时的图片，默认就是一个半透明的内容
