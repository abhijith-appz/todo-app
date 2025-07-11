const app=require("./app");
const PORT = 8000;


//listen server
app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);

});