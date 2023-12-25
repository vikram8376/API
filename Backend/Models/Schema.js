const mongoose = require('mongoose');


const CompanySchema = new mongoose.Schema({
    Name: {
        type: 'string',
        required: true,
    },
    Email:{
        type: 'string',
        required: true,
    },
    Phone_No:{
        type: Number,
        required: true,
    },
    Password:{
        type: mongoose.Schema.Types.Mixed,
        required: true,
    }
})

const AllSchemas = mongoose.model('Profiles', CompanySchema);

module.exports = AllSchemas;