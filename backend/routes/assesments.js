const router = require('express').Router();
let Assesment = require('../models/assesment.model');

router.route('/add').post((req, res) => {
  const classid = req.body.Assesment.classid;
  const title = req.body.Assesment.title;
  const startdate = req.body.Assesment.startdate;
  const enddate = req.body.Assesment.enddate;
  const questions = req.body.Assesment.questions;
  const createdby = req.body.Assesment.createdby;
  const assesmenttype = req.body.Assesment.assesmenttype;
  const objective = req.body.Assesment.objective;

  const newAssesment = new Assesment({
    classid,
    title,
    startdate,
    enddate,
    questions,
    objective,
    createdby,
    assesmenttype,
  });
  console.log(req.body.Assesment.questions[0]);
  newAssesment.save()
    .then(() => res.json('Assesment added!'))
    .catch(err => {
      console.log(err)
      res.status(400).json('Error: ' + err)
    });
});


router.route('/quiz').get((req, res) => {
  Assesment.find({ assesmenttype: 'quiz' })
    .then(assesments => { res.json(assesments) })
    .catch(err => res.status(400).json('Error: ' + err));

});



router.route('/assignment').get((req, res) => {
  Assesment.find({ assesmenttype: 'assignment' })
    .then(assesments => { res.json(assesments) })
    .catch(err => res.status(400).json('Error: ' + err));

});
router.route('/exam').get((req, res) => {
  Assesment.find({ assesmenttype: 'exam' })
    .then(assesments => { res.json(assesments) })
    .catch(err => res.status(400).json('Error: ' + err));

});

router.route('/quizquestions').get((req, res) => {
  Assesment.find({ assesmenttype: 'quiz',_id:req.id })
    .then(assesments => {
      var result = [];
      for (var a in assesments) {
        for (var q in a.questions) {
          var ques=q.question;
          var ans;
          for (var op in q.options) {
          
            if (op.isAnswer){
              ans=op.value;
            }
          }
        }
      }
    })
    .catch(err => res.status(400).json('Error: ' + err));

});
module.exports = router;