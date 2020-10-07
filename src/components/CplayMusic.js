import React from "react"
class cplayMusic extends React.Component {
    render() {
        return (
            <button className="cplayMusic" onClick={() => this.handelCaClick()}>
                cplayMusic
            </button>
        )
    }

    componentDidMount() {
        
    }

    handelCaClick() {
        console.log("222")
    }
}
export default cplayMusic