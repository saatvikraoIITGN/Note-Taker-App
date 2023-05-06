const express = require('express'); 

require('./db/mongoose.js');

const userRouter = require('./routers/user-routers.js');
const noteRouter = require('./routers/note-routers.js');

const app = express(); 

app.use((req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Headers', '*');
    res.set('Access-Control-Allow-Methods', '*');
    if (res.method == "OPTIONS") {
        return res.status(200).end(); 
        return;
    }
    next();
});

app.use(express.json());
app.use(userRouter);
app.use(noteRouter); 


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Backend is running on port ${port}`);
});