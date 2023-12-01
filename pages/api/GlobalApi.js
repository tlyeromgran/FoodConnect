import axios from "axios";


const getNearByPlace=(category,lat,lng)=>axios.get('/pages/api/google-nearby-place?category='+
category+"&lat="+lat+"&lng="+lng);


const searchPlace=(searchtext,lat,lng)=>axios.get('/pages/api/google-search-place?searchtext='+
searchtext+"&lat="+lat+"&lng="+lng);


// eslint-disable-next-line import/no-anonymous-default-export
export default{
    getNearByPlace,
    searchPlace
    
}
