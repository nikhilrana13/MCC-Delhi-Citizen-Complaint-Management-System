
"use client"

import persistReducer from "redux-persist/es/persistReducer";
import sessionStorage from "redux-persist/es/storage/session";

const { createSlice } = require("@reduxjs/toolkit");


export const notificationSlice = createSlice({
    name:"notification",
    initialState:{
        items:[],
        unReadCount:0
    },
    reducers:{
        addNotification:(state,action)=>{
            state.items.unshift({
                ...action.payload
            })
            state.unReadCount += 1;
        },
       MarkedAllread:(state)=>{
         state.unReadCount = 0
       }
    }
})

export const {addNotification,MarkedAllread} = notificationSlice.actions
const persistconfig = {
    key:'notification',
    storage:sessionStorage
}

export const persistedNotificationReducer = persistReducer(persistconfig,notificationSlice.reducer)