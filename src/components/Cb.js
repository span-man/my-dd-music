import React from "react"
class Cb extends React.Component {
    render() {
        return (
            <button className="Cb" onClick={() => this.handelCaClick()}>
                Cb
            </button>
        )
    }

    componentDidMount() {
        
    }

    handelCaClick() {
        console.log("222")
    }
}
export default Cb