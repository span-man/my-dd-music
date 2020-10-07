import React from "react"

class Home extends React.Component {
    render() {
        return (
            <button className="Home" onClick={() => this.handelCaClick()}>
                Home
            </button>
        )
    }

    handelCaClick() {
        console.log("222")
    }
}
export default Home