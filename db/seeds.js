/* seeds.js */
const MongoClient = require("mongodb").MongoClient;
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const recipes = require('./data');

async function seedDB() {
    // Connection URL
    const uri = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
    const client = new MongoClient(uri, {
        useNewUrlParser: true
        // useUnifiedTopology: true,
    });

    try {
        await client.connect();
        console.log("Connected correctly to server");

        const collection = client.db("node-recipes-api").collection("recipes");

        // Destroy existing data
        collection.deleteMany();

        await collection.insertMany(recipes);

        console.log("Database seeded! :)");
        client.close();
    } catch (err) {
        console.log(err.stack);
    }
}

seedDB();