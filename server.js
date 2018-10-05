const express = require ('express');
    path = require ('path');
    bodyParser = require ('body-parser');
    cors = require ('cors');
    mongoose = require ('mongoose');
    config = require('./Config/DB');
    const jwt = require('jsonwebtoken');
    const app = express();
    
    app.use(cors());

    mongoose.Promise =global.Promise
    mongoose.connect(process.env.MONGODB_URI,{useNewUrlParser: true}).then(
    () => {console.log('Databse is connected')},
    () => {console.log('Connection not connected')}
    )

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    const userRoutes = require('./routes/user.route');

    app.use('/user', userRoutes);

    const port = process.env.PORT || 4000;


    const server = app.listen(port, function(){
        console.log('Listening on port ' + port);
       });


 


