const { createSlice } = require("@reduxjs/toolkit");






const notificationSlice = createSlice({
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
export default notificationSlice.reducer