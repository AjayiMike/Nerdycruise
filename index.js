const express = require("express");
const path = require("path")
const port = process.env.PORT || 5000;
const cors = require("cors")
const authRoute = require("./routes/auth");
const actionRoute = require("./routes/actions")
const userRoute = require("./routes/user")
const axios = require("axios")
const {randomBytes} = require("crypto")




const app = express();
app.use(express.json());

// production mode
if(process.env.NODE_ENV === "production") {
    // set static file
    app.use(express.static("client/build"))
    app.get('*', (req, res) => {
        res.sendfile(path.join(__dirname = "client/build/index.html"));
    })
}


    

app.use("/api/auth", authRoute)
app.use("/api/action", actionRoute)
app.use("/api/user", userRoute)



// lines below should only be for production but for the sake of ngrok
app.use(express.static("client/build"))

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
})



app.listen(port, () => {
    console.log(`server started on ${port}`)
});