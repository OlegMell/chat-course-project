const path = require('path');

require('dotenv').config({
    path: path.join(__dirname, 'config', '.env'),
});

const dbInit = require('./db/init');
const {server} = require('./config/server');
const io = require('./sockets/socket');

dbInit.then(() =>{
    server.listen(9999, () => {
        console.log('server has been' +
            ' started')
    })
}).catch(err => {
    console.log(err);
})


// const mongoose = require('mongoose');
// mongoose.connect("mongodb+srv://admin:HcntcPA7iVWnHj5@cluster0.bvvr6.mongodb.net/messages_db?retryWrites=true&w=majority",
//     {useNewUrlParser: true, useUnifiedTopology: true})
//     .then(async res => {
//         server.listen(9999, () => {
//             console.log('server has been' +
//                 ' started')
//         })
//
//         const a = require("./models/mongo/account");
//         // const acc = await a.findOne();
//
//
//
//
//         // console.log(acc);
//         const p = require("./models/mongo/personal-data");
//         // const p1 = await p.create({
//         //     firsname: "Oleg",
//         //     lastname: "Melnik",
//         //     phone: "0662189301",
//         //     username: "oleg_mell",
//         //     bio: "-",
//         //     image: "-"
//         // })
//         //
//         // const acc = await a.create({
//         //     email: "oleg.mel123@gmail.com",
//         //     password: "qwerty1",
//         //     personal_data: p1._id
//         // });
//
//         console.log(await a.find().populate("personal_data", "-_id -__v").select("-__v"));
//
//         // acc.personal_data_id = p1._id;
//         // acc.save();
//     }).catch(err => {
//     console.log(err);
// })
