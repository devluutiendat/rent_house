
import instance from '../axios'; // Ensure the import path is correct

const apiRegister = (data) => instance.post('/api/auth/register', data);
const apiSignIn = (data) => instance.post('/api/auth/signin', data);
const apiCurrent = (data) => instance.get('/api/data',data);
const searchCoditions = (data) => {
    const query = `/search?minSize=${data.minSize}&maxSize=${data.maxSize}&minPrice=${data.minPrice}&maxPrice=${data.maxPrice}&current=${data.current}&address=${data.address}`
    return instance.get(query);
};
const details = (data) =>{    
    return instance.get(`/api/details/${data}`);
}
const deleteSub = (data) => instance.delete('/deleteSub',{data});
const updateSub = (data) => instance.put('updateSub',data);
const addSub = (data) => instance.post('/addSubmission',data);
const getUser = (data) =>  instance.post('/getUser',data);
const getAgent = (data) => instance.post('/getAgent',data);
const deleteProperty = (data) => instance.delete('/deleteProperty',data)
const updateProperty = (data) => instance.put('updateProperty',data)
const addProperty = (data) => instance.post('addProperty',data)
const updateUser  =  (data) => instance.put('updateUser',data)

export {updateSub,deleteSub,updateUser,apiRegister,apiSignIn,apiCurrent,details,searchCoditions,addSub,getAgent,getUser,deleteProperty,updateProperty,addProperty};
