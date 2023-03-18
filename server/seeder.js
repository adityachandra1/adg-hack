const fs = require('fs');
const User = require('./models/User');
const Post = require('./models/Post');
const Startup = require('./models/Startup');

const users_list = JSON.parse(fs.readFileSync(`${__dirname}/./data/users.json`));
const post_list = JSON.parse(fs.readFileSync(`${__dirname}/./data/posts.json`));
const startup_list = JSON.parse(fs.readFileSync(`${__dirname}/./data/startup.json`));

async function seedWithDummyData() {
    try {
        // CLEAR DB
        // await User.deleteMany({});
        // await Post.deleteMany({});
        
        for (let strtp of startup_list) {
            await Startup.create(strtp);
        }

        console.log(`posts seeded successfully`);
    } catch (error) {
        console.error(`Error seeding data: ${error}`);
        process.exit(1);
    }
}

module.exports = seedWithDummyData