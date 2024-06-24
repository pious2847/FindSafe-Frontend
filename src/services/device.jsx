/* eslint-disable no-unused-vars */


export const fetchUserDevices = async (userId)=>{
    try{
        const response = await fetch(`${import.meta.env.VITE_API_URL}/mobiledevices/${userId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
        })
        if(response.statusCode === 200){
            return response.data['mobileDevices'];
        }
        else return alert('AnExpected Error Occured')
    }catch (error){
        alert(error.message)
    }
}