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
                let drugsInfo={
                    drugsInfoID:[],
                    drugsInfoName:[],
                    description_urlInfo:[],
                }
    
                    for(let i=0; i<=action.payload.data.length-1; i++) {  
                        drugsInfo.drugsInfoID.push(action.payload.data[i].id);
                        drugsInfo.drugsInfoName.push(action.payload.data[i].name);
                        drugsInfo.description_urlInfo.push(action.payload.data[i].description_url);
                    }
                
                    drugsInfo={
                        drugsInfoID:Array.from(new Set(drugsInfo.drugsInfoID)),
                        drugsInfoName:Array.from(new Set(drugsInfo.drugsInfoName)),
                        description_urlInfo:Array.from(new Set(drugsInfo.description_urlInfo)),
                    }
                    let drugsInfoToState=[];
                    let pharmaciesInfod=[];
                    for(let j=0; j<=drugsInfo.drugsInfoID.length-1; j++) {
                        pharmaciesInfod=[]; 
                        for(let i=0; i<=action.payload.data.length-1; i++) {
                            if(action.payload.data[i].id===drugsInfo.drugsInfoID[j]) {
          
                                pharmaciesInfod.push(`${action.payload.data[i].caption_pharmacy} (${action.payload.data[i].count})`)
                                
                            }       
                        }
                        drugsInfoToState.push({id:drugsInfo.drugsInfoID[j], name:drugsInfo.drugsInfoName[j], description_url:drugsInfo.description_urlInfo[j], pharmacyDrugs: pharmaciesInfod})
                    
                    }



                 state.drugs = drugsInfoToState;
                 state.drugs.forEach(el => {
                    el['img']= "drugs.jpg";
                 });
                console.log(state.drugs);
                break;

            case '/pharmacies' :

               let pharmaciesInfo={
                pharmaciesInfoID:[],
                pharmaciesInfoName:[],
                addressesInfo:[],
                emailInfo:[],
                phoneInfo:[],
                gpsInfo:[]
            }

                for(let i=0; i<=action.payload.data.length-1; i++) {  
                    pharmaciesInfo.pharmaciesInfoID.push(action.payload.data[i].id);
                    pharmaciesInfo.pharmaciesInfoName.push(action.payload.data[i].name);
                    pharmaciesInfo.addressesInfo.push(action.payload.data[i].address);
                    pharmaciesInfo.emailInfo.push(action.payload.data[i].email);
                    pharmaciesInfo.phoneInfo.push(action.payload.data[i].phone);
                    pharmaciesInfo.gpsInfo.push(action.payload.data[i].gps_coordinates);

                }
            
                pharmaciesInfo={
                    pharmaciesInfoID:Array.from(new Set(pharmaciesInfo.pharmaciesInfoID)),
                    pharmaciesInfoName:Array.from(new Set(pharmaciesInfo.pharmaciesInfoName)),
                    addressesInfo:Array.from(new Set(pharmaciesInfo.addressesInfo)),
                    emailInfo:Array.from(new Set(pharmaciesInfo.emailInfo)),
                    phoneInfo:Array.from(new Set(pharmaciesInfo.phoneInfo)),
                    gpsInfo:Array.from(new Set(pharmaciesInfo.gpsInfo))
                }
                let pharmaciesInfoToState=[];
                let drugsInfop=[];
                for(let j=0; j<=pharmaciesInfo.pharmaciesInfoID.length-1; j++) {
                    drugsInfop=[]; 
                    for(let i=0; i<=action.payload.data.length-1; i++) {
                        if(action.payload.data[i].id===pharmaciesInfo.pharmaciesInfoID[j]) {
      
                            drugsInfop.push(`${action.payload.data[i].caption_drug} (${action.payload.data[i].count})`)
                            
                        }       
                    }
                    pharmaciesInfoToState.push({id:pharmaciesInfo.pharmaciesInfoID[j], name:pharmaciesInfo.pharmaciesInfoName[j], address:pharmaciesInfo.addressesInfo[j], email: pharmaciesInfo.emailInfo[j], phone: pharmaciesInfo.phoneInfo[j],  gps_coordinates: pharmaciesInfo.gpsInfo[j], drugsPharmacy: drugsInfop})
                
                }
                
         
                state.pharmacies = pharmaciesInfoToState;

                state.pharmacies.forEach(el => {
                    el['img']= "pharmacies.jpg";
                });
                console.log(state.pharmacies);
                break;
                

            case '/doctors' :
               
                state.doctors = action.payload.data;
                state.doctors.forEach(el => {
                    el['img']= "doctors.jpg";
                });
                console.log(state.doctors);
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