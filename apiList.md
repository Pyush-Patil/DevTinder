# DeevTinder API's

* authRouter
POST /signup
POST /login
POST /logout

* profileRouter
GET /profile/view
PATCH /profile/edit
PATCH profile/password

* connectionRequestRouter
POST /request/send/Interested/:userid
POST /request/send/Ignored/:userid

POST /request/review/Accepted/:requestid
POST /request/review/Rejected/:requestid

* userRouter
GET /Connections
GET /requests/recieved
GET /feed => get profile of the other user on your feed  

status:Ignore,Interested,accepted,rejected 