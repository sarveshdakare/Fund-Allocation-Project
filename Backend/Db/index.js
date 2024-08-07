const mongoose=require('mongoose')

mongoose.connect("mongodb+srv://sarveshdakare08:admin@cluster0.ddi6i10.mongodb.net/FundAllocation").then(()=>{console.log("database connected")})

const userSchema=mongoose.Schema({
    username:String,
    password:String,
    fundReq: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    }]
})

const AdminSchema=mongoose.Schema({
    username:String,
    password:String
})


const ProjectSchema = new mongoose.Schema({
    projectName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    moneyWant: {
        type: Number,
        required: true,
        min: 0
    },
    status: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});


const Admin=mongoose.model('Admin',AdminSchema);
const User=mongoose.model('User',userSchema);
const Project=mongoose.model('Project',ProjectSchema);

module.exports={
    Admin,
    User,
    Project
}


