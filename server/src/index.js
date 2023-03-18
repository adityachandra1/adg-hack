const app = require('./app');
const dotenv = require('dotenv');
const mongoose = require('mongoose');


dotenv.config();
//connect to DB
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.connect(process.env.DATABASE_URL ,{ useNewUrlParser: true, useUnifiedTopology: true }, async () => {
    console.log('connected to DB');
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server running at PORT:'+ PORT));
