const Router = require("express")


const  { dataget , datapost,datadelete,dataupdate}  = require("../Controller/Control");
const router = Router()


router.get("/dataget",dataget);
router.post("/datapost",datapost);
router.delete("/datadelete/:userId",datadelete);
router.put("/dataupdate/:userId",dataupdate);
module.exports = router