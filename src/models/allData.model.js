const mongoose = require('mongoose');


const allDataSchema = new mongoose.Schema({
    adult: { type: Boolean},
    backdrop_path: { type: String },
    genre_ids:[], 
    id: { type: Number, required: true, unique: true },
    original_name: { type: String, required: true },
    overview: { type: String, required: true },
    poster_path: { type: String,required:true},
    media_type: { type: String, required: true },
    original_language: { type: String},
    name: { type: String, required: true },
    popularity: { type: Number, required: true },
    first_air_date: { type: Date, required: true },
    vote_average: { type: Number, required: true },
    vote_count: { type: Number, required: true },
    origin_country: { type: [String], required: true },
    video: { type: String, required: true }  
}, {
    timestamps: true, 
    versionKey: false
})



const AllData = mongoose.model("AllData", allDataSchema);

module.exports = AllData;  