var express = require('express');
var router = express.Router();
///bisection
let fal = require('../models/false');
let bisec = require('../models/bisec');
let one = require('../models/one');
let rap = require('../models/rap');
let secant = require('../models/secant');
///integration
let trap = require('../models/trap');
let comtrap = require('../models/comtrap');
let simp = require('../models/simpson');
let comsimp = require('../models/comsimp');
/* GET users listing. */

//////////////////////////////Bisection///////////////////////////////
router.get('/showbisec', function(req, res, next) {
 
  bisec.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })

});


router.post('/addbisec',(req,res)=>{
  console.log(req.body);
  let doc = new bisec(req.body);
  doc.save((err,data)=>{
    if(err) throw err;
    res.send({success:true});
  })
})
////////////////////////////////False-Position/////////////////////////////

router.get('/showfalse', function(req, res, next) {
 
  fal.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })

});


router.post('/addfalse',(req,res)=>{
  console.log(req.body);
  let doc = new fal(req.body);
  doc.save((err,data)=>{
    if(err) throw err;
    res.send({success:true});
  })
})


///////////////////////////////One-Point//////////////////////////////
router.get('/showone', function(req, res, next) {
 
  one.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })

});


router.post('/addone',(req,res)=>{
  console.log(req.body);
  let doc = new one(req.body);
  doc.save((err,data)=>{
    if(err) throw err;
    res.send({success:true});
  })
})

/////////////////////////////Newton-Raphson////////////////////////////////
router.get('/showrap', function(req, res, next) {
 
  rap.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })
});

router.post('/addrap',(req,res)=>{
  console.log(req.body);
  let doc = new rap(req.body);
  doc.save((err,data)=>{
    if(err) throw err;
    res.send({success:true});
  })
})
/////////////////////////////Secant///////////////////////////////////////
router.get('/showsecant', function(req, res, next) {
 
    secant.find().sort({age:1}).exec((err,data)=>{
      console.log(data);
      return res.json({success:true,data:data});
    })
  });
  
  router.post('/addsecant',(req,res)=>{
    console.log(req.body);
    let doc = new secant(req.body);
    doc.save((err,data)=>{
      if(err) throw err;
      res.send({success:true});
    })
  })
//////////////////////////////Trapzoidal////////////////////////////////////
router.get('/showtrap', function(req, res, next) {
 
  trap.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })
});

router.post('/addtrap',(req,res)=>{
  console.log(req.body);
  let doc = new trap(req.body);
  doc.save((err,data)=>{
    if(err) throw err;
    res.send({success:true});
  })
})
////////////////////////////////Coposite-Trapzoidal////////////////////////////////
router.get('/showcomtrap', function(req, res, next) {
 
  comtrap.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })
});

router.post('/addcomtrap',(req,res)=>{
  console.log(req.body);
  let doc = new comtrap(req.body);
  doc.save((err,data)=>{
    if(err) throw err;
    res.send({success:true});
  })
})
////////////////////////////////////Simpson/////////////////////////////////////////
router.get('/showsimp', function(req, res, next) {
 
    simp.find().sort({age:1}).exec((err,data)=>{
      console.log(data);
      return res.json({success:true,data:data});
    })
  });
  
  router.post('/addsimp',(req,res)=>{
    console.log(req.body);
    let doc = new simp(req.body);
    doc.save((err,data)=>{
      if(err) throw err;
      res.send({success:true});
    })
  })
////////////////////////////////////Composite-Simpson/////////////////////////////////////////
router.get('/showcomsimp', function(req, res, next) {
 
  comsimp.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })
});

router.post('/addcomsimp',(req,res)=>{
  console.log(req.body);
  let doc = new comsimp(req.body);
  doc.save((err,data)=>{
    if(err) throw err;
    res.send({success:true});
  })
})
module.exports = router;
