
const teacher_login_get = (req, res) => {
    res.render("teacher/teacherLogin");
};

const teacher_login_post = (req, res) => {
    if(req.body.password == "1234"){
        res.redirect("/teacher/option");
    }
    else{
        res.render("teacher/teacherLogin", {
            error : "Please Enter Correct Password"
        })
    }
};

const teacher_viewall_get = async (req, res) => {
    const allStudents = require('../student.json');
    res.render("teacher/viewall", {student : allStudents})
};



const teacher_edit_get = async (req, res) => {

  const allStudents = require('../student.json')
  let user = null;
   allStudents.forEach((item)=>{
    if(item.roll==req.params.roll){
        user = item;
    }
  });
    res.render("teacher/edit", {user : user})
};
const teacher_edit_post =async (req, res) => {
 
    const allStudents = require('../student.json')
  
    allStudents.forEach((item)=>{
        if(item.roll==req.params.roll){
            item.dob=req.body.dob;
            item.score = req.body.score;
            item.name = req.body.name;
        }
    });
    res.redirect("/teacher/viewall")
};
const teacher_delete_get =async (req, res) => {

   const allStudents = require('../student.json')

    allStudents.forEach((e,indx)=>{
        if(e.roll===req.params.roll){
            allStudents.splice(indx,1);
        }
    });

    res.redirect("/teacher/viewall")
};
const teacher_option_get = (req,res) => {
    res.render("teacher/option")
};
const teacher_add_get = (req, res) => {
    res.render("teacher/addstudent");
};
const teacher_add_post = async (req, res) => {
    const singleStudent = {
        name : req.body.name,  
        roll : req.body.roll,             
        dob : dobParser(req.body.dob),
        score : req.body.score        
    };
    try {

        const allStudents = require('../student.json');
        allStudents.push(singleStudent);
        res.redirect("/teacher/add");
      } catch {
        res.send("error");
    }
};

const dobParser=(dob)=>{
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    return dob.substring(8,10)+" "+months[Number(dob.substring(5,7))-1]+" "+dob.substring(0,4);
  }


module.exports={
    teacher_login_get,
    teacher_login_post,
    teacher_viewall_get,
    teacher_edit_get,
    teacher_edit_post,
    teacher_delete_get,
    teacher_add_post,
    teacher_add_get,
    teacher_option_get
}