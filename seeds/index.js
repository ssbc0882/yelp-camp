const mongoose = require("mongoose");
const cities = require("./cities")
const { places, descriptors } = require("./seedHelpers")
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp", { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("DB connected!")
})

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000)
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: "604802d23c115d648f6f18a1",
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam dolore porro omnis placeat ex voluptatibus, pariatur dolor. Error quod assumenda cumque, rem laudantium adipisci eligendi sunt quis quasi debitis cum.",
            price: price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/da1tpxeqg/image/upload/v1615999013/YelpCamp/dohrcwpumg8ruwbrv21b.jpg',
                    filename: 'YelpCamp/wehrssl1oxgwgcnpxysl'
                },
                {
                    url: 'https://res.cloudinary.com/da1tpxeqg/image/upload/v1615755615/YelpCamp/xyqozkekhcwxz0nvda6d.jpg',
                    filename: 'YelpCamp/xyqozkekhcwxz0nvda6d'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})

