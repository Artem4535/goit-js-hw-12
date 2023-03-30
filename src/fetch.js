 import axios from "axios";

 async function searchImage(value, numberOfPage) {
     const URL = 'https://pixabay.com/api/';
    const config = {
        params: {
            key: '34736091-07dbf1d110e7bfeee2e88aa1e',
            q: value,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
            page: numberOfPage,
            per_page: 40,
            
        }
    }

    
     
     try {
    const response = await axios.get(URL, config);

    return  response
  } catch (error) {
    console.error(error.message);
  }
 }

 export {searchImage}

 
    
 

    





