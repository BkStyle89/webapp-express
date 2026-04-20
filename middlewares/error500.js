function error500(err,req,res,next){
    res.status(500).json({
        error: "not found",
        messagge: "qualcosa è andato storto, film non trovato"
    })
}

module.exports = error500