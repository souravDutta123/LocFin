const LocationHistory = require('../models/LocationHistory');

const getLocationHistories = function(req){
  try {
    const promise = new Promise(function(resolve,reject){
      LocationHistory.find({
        user_email : req.user.email
      },function(err,locations){
        if(err){
          reject({message : 'Some error occured, could not fetch history'});
        }
        if(!locations){
          reject({message : 'Some error occured, could not fetch history'});
        }else{
          resolve(locations);
        }
      });
    });
    return promise;
  } catch (e) {
    const promise = new Promise(function(resolve, reject) {
      reject({message : 'Some error occured, could not fetch history'});
    });
    return promise;
  }
}
const addLocation = function(req){
  try {
    const promise = new Promise(function(resolve,reject){
      const location = req.body;
      location.user_email = req.user.email;
      const newLocation = new LocationHistory(location);
      newLocation.save(function(err,location){
        if(err){
          console.log(err);
          reject(err);
        }
        if(!location){
          reject({message : 'Some error occured, could not save location'});
        }else{
          resolve(location);
        }
      })
    });
    return promise;
  } catch (e) {
    console.log(e);
    const promise = new Promise(function(resolve, reject) {
      reject(e);
    });
    return promise;
  }
}

const updateLocation = function(req){
  try {
    const promise = new Promise(function(resolve,reject){
      const location = req.body;
      LocationHistory.findOne({
        _id : location._id,
        user_email : req.user.email
      },function(err,locationFound){
        if(err){
          reject(err);
        }
        if(!locationFound){
          reject({message : 'Location not found'});
        }else{
          locationFound.location_tag = location.location_tag;
          locationFound.save(function(err,savedLocation){
            if(err){
              reject(err);
            }
            if(!savedLocation){
              reject({message : 'Internal Server Error..'})
            }else {
              resolve(savedLocation);
            }
          })
        }
      });
    });
    return promise;
  } catch (e) {
    const promise = new Promise(function(resolve, reject) {
      reject(e);
    });
    return promise;
  }
}

const deleteLocation = function(req){
  try {
    const promise = new Promise(function(resolve,reject){
      const location = req.body;
      LocationHistory.findOne({
        _id : location._id,
        user_email : req.user.email
      },function(err,locationFound){
        if(err){
          reject(err);
        }
        if(!locationFound){
          reject({message : 'Location not found'});
        }else{

          LocationHistory.remove({_id : locationFound._id},function(err){
            if(err){
              reject(err);
            }else {
              resolve({message : 'Successfully removed location..'});
            }
          })
        }
      });
    });
    return promise;
  } catch (e) {
    const promise = new Promise(function(resolve, reject) {
      reject(e);
    });
    return promise;
  }
}
module.exports = {
  addLocation : addLocation,
  getLocationHistories : getLocationHistories,
  updateLocation : updateLocation,
  deleteLocation : deleteLocation
}
