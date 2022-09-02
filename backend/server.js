app.use(function (req,res,next){
    console.log('request', req.url,req.body,req.method);
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods","GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-with,Content-Type, Accept, x-token");
    next();
})
