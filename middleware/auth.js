const jwt = require('jsonwebtoken');
const util = require('../Utilities/util');
const userDAO = require('../DAO/icuserDAO');
const auth = {
    verifyToken: (req, res, next) => {
        if (!req.headers.token || !req.headers.token.length || req.headers.token=="") {
           res.send({"statusCode":"300","statusMessage":"provide access token "})
        }
        jwt.verify(req.headers.token, util.secret, (err, decoded) => {
            if (err) {
                res.send({"statusCode":util.statusCode.THREE_ZERO_ZERO,"statusMessage":util.statusMessage.INVALID_TOKEN,"error":err})
            } else {
				
				if(req.headers.type  == "merchant"){
					console.log(decoded);
					req.headers.decodedData=decoded;
					req.body.decodedData=decoded;
					next();
				}
				else if(req.headers.type  == "icashier"){
					jwt.verify(req.headers.cashiertoken, util.secret, (err, decoded2) => {
					if (err) {
						res.send({"statusCode":util.statusCode.THREE_ZERO_ZERO,"statusMessage":util.statusMessage.INVALID_TOKEN,"error":err})
					} else {
				
						console.log("DECODE",decoded2)	
						userDAO.getCashierUsers({id:decoded2.id}, (err, dbData) => {
							if (err) {
								cb(null,{"code":util.statusCode.THREE_ZERO_ZERO,"message":util.statusMessage.DB_ERROR, error:err});
								return;
							}	
							console.log(dbData)
							req.body.decodedData=decoded;
							next();
						});
					}
				})
				}else{
					res.send({"statusCode":util.statusCode.THREE_ZERO_ZERO,"statusMessage":"please add 'type' key value either 'merchant' or 'icashier'","error":err})
				}
				
				
				
				
				
				
				// req.headers.decodedData=decoded;
				// req.body.decodedData=decoded;
                // next();
            }
        })
    },
	cashierTokenVerification: (req, res, next) => {
		
        if (!req.headers.token || !req.headers.token.length || req.headers.token=="") {
           res.send({"statusCode":"300","statusMessage":"provide access token "})
        }
        jwt.verify(req.headers.token, util.secret, (err, decoded) => {
            if (err) {
                res.send({"statusCode":util.statusCode.THREE_ZERO_ZERO,"statusMessage":util.statusMessage.INVALID_TOKEN,"error":err})
            } else {
				console.log(decoded);
				//console.log(req.headers);
				if(req.headers.type  == "merchant"){
					req.headers.decodedData=decoded;
					req.body.decodedData=decoded;
					next();
				}
				else if(req.headers.type  == "icashier"){

					jwt.verify(req.headers.cashiertoken, util.secret, (err2, decoded2) => {
						if (err2) {
							res.send({"statusCode":util.statusCode.THREE_ZERO_ZERO,"statusMessage":util.statusMessage.INVALID_TOKEN,"error":err})
						} else {
							console.log(decoded2)
							userDAO.getCashierUsers({id:decoded.id,name:decoded2.name}, (err, dbData) => {
								console.log("LEN",dbData.length)
								if (err) {
									res.send({"code":util.statusCode.THREE_ZERO_ZERO,"message":util.statusMessage.DB_ERROR, error:err});
									return;
								}
								if(dbData && dbData.length){					
									if(dbData[0].token!=req.headers.cashiertoken){
										res.send({"code":util.statusCode.THREE_ZERO_ONE,"message":util.statusMessage.OLD_TOKEN});
										return;
									}
									
								}

								// console.log(decoded);
								// console.log(dbData);
								req.body.decodedData=decoded;
								next();
							});


						}})
					
				}else{
					res.send({"statusCode":util.statusCode.THREE_ZERO_ZERO,"statusMessage":"please add loggedInAs key value either 'merchant' or 'icashier'","error":err})
				}
            }
        })
    }
};



module.exports = auth;