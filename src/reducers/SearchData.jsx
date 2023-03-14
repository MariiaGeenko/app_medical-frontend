import {createSlice} from '@reduxjs/toolkit';

const initialState= {
    drugs: [],
    pharmacies: [],
    doctors: [],
    SearchData:[],

}

export const SearchDataSlice = createSlice ({
name: 'SearchData', 
initialState,
reducers: {
    

    setSearchParamData: (state, action) => {

        switch(action.payload.path) {
            case '/drugs' :
                 state.drugs = action.payload.data;
                 state.drugs.forEach(el => {
                    el['img']= "drugs.jpg";
                 })
                break;

            case '/pharmacies' :
                 state.pharmacies = action.payload.data;
                break;

            case '/doctors' :
                 state.doctors = action.payload.data;
                break;
         
     
            }
        },

    setSearchData: (state, action) => {
            
            state.SearchData = action.payload;
         
         },
 
 
    clearSearchData: (state) => {
            
        
                state.SearchData=[];
             
         },


    }
})


    


export const {setSearchParamData, setSearchData, clearSearchData}= SearchDataSlice.actions

export default SearchDataSlice.reducer