import {createSlice} from '@reduxjs/toolkit';

const initialState= {

    selectedRowKeys: []
   
}

export const selectedRowKeysSlice = createSlice ({
    name: 'selectedRowKeys', 
    initialState,
    reducers: {
        

        setSelectedRowKeys: (state, action) => {
   
            state.selectedRowKeys = action.payload;
        },

        

        clearselectedRowKeys: (state) => {
           
            state.selectedRowKeys = [];
        }
        
    }
})

export const {setSelectedRowKeys, clearselectedRowKeys}= selectedRowKeysSlice.actions

export default selectedRowKeysSlice.reducer