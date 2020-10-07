import React from "react"
import { createStore } from "redux"

const store = createStore((_num) => {
    if(_num == 1) {
        console.log(111)
        return 111
    } else {
        console.log(222)
    }
})

const action = {
    type: "ADD",
    payload: "111222 add"
}

const state = store.getState()