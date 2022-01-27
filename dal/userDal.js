const User = require("../model/userModel");
const redis=require('redis')
///C:\redis\64bit>
var client = redis.createClient({
  host: '127.0.0.1',
  port: 6379});

///////////////
// client.DEL('postdata',(err,redis_data)=>{
//   if(err){
//     console.log(err)
//     throw err
//   }
/////////

const findUser = async (data) => {
  const user = await User.findById(data);
  if(!user){
    console.log("data not found")
  }
  await client.set('postdata',JSON.stringify(user))
  return user;
};

const redis_post=(req,res,next)=>{
  client.get('postdata',(err,redis_data)=>{
    if(err){
      console.log(err)
      throw err
    }
    else if(redis_data){
      console.log('redisdata');
     return res.send(JSON.parse(redis_data))
    }
    else{
      next()
    }
  })
}

const storeUser = async (userToStore) => {
  const storedUser = await User.create(userToStore);
  return storedUser;
};

const findUserByUsername = async (username) => {
  const user = await User.findOne(username);
  return user;
};

const updateUser = async (userData) => {
  const user = await User.findByIdAndUpdate(
    userData._id,
    { $set: userData.toUpdate },
    { new: true }
  );
  await client.set('postdata',JSON.stringify(user))
  return user;
};

const findAll = async () => {
  const user = await User.find({});
  return user;
};

const deleteAll = async () => {
  const user = await User.remove({});
  return user;
};

module.exports = {
  findUser,
  storeUser,
  findUserByUsername,
  updateUser,
  findAll,
  deleteAll,
  redis_post
};

