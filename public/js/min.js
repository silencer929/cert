
var select= document.querySelectorAll('.select');
const test = document.querySelector(".test");
const submitBtn = document.querySelector("#submit-btn");
const sideBar = document.querySelector(".side-bar");
const tab= document.querySelector(".tab");
const progress_bar= document.querySelector("#progress-bar")
var questionLeftOut = [...document.querySelectorAll(".question-leftout")];
const totalScore= document.querySelector("#total-score");
var tabs=[]
var store=[];
var total={};
class storage{
    static store_questions(){
        localStorage.setItem("questions", JSON.stringify(store));
    }
    static get_questions(){
        localStorage.getItem()
    }
}
class Products {
    async getQuestions() {
        try {
            tabs= new Queue(14);
            var data = await fetch("user.json");
            let result = await data.json();
            let quiz= result.test
            quiz.forEach(part=>{
                tabs.enqueue(part)
            })
            return tabs;
        } catch (error) {
            console.log(error)
        }
    }
    
}
 
class UI {
    getOptions(marks){
        var option = "";
        marks.forEach(mark=>{
            option+=`<option value="${mark}">${mark} marks</option>`
        })
        return option
    }
    displayQuestions() {
        var result="";
        var questions =tabs.peek()
         var key=Object.keys(questions);
        tab.textContent= key[0];
        this.create_question_objects(questions[key[0]]);
        questions[key[0]].forEach(question => {
            result +=`<div class="question-box">
                   <input type="number" readonly value="${question.question_id}" class="question_id">
                   <div class="question">${question.question}</div>
                   <div class="marks">
                    <select class="selected" data-id="${question.question_id}">`
                   + this.getOptions(question.marks) +
                    `<option value="pending" selected>pending</option>
                    </select>
                    </div>
                   <input type=hidden>
                   <input type="checkbox" class="checkbox"></div>`;
        });
        test.innerHTML = result;
    }
    create_question_objects(tabs){
        tabs.forEach(tab=>{
            var question= new Question();
            question.set_question_id(tab.question_id);
            question.set_question(tab.question);
            question.set_marks(tab.marks);
            question.set_status(false)
            store[question.get_question_id()]=question;
        })
    }
     static getSelecetedValues() {
        var checkbox = [...document.querySelectorAll(".checkbox")];
        var select = [...document.querySelectorAll(".selected")];
        select.forEach(option => {
            option.addEventListener("change",(event)=>{
                var id = event.target.dataset.id;
                var score= event.target.value;
                store[id].set_status(true);
                store[id].mark_question(parseInt(score),total);
                totalScore.value=total.computeTotal();
                progress_bar.value=total.computeTotal();
            })
        })
    }
    validate(){
            var status;
        Object.values(store).forEach(question=>{
            if(question.get_status()==true){
                status = true;
            } else{
                status = false;
            }
        })
        return status;
    }
    get_empty_fields(){
        var empty_fields=[];
        Object.values(store).forEach(question=>{
            if(question.get_status()==false){
               if(empty_fields.includes(question.get_question_id())){
                   return false;
               }
                else{
                    empty_fields.push(question.get_question_id())
                }
            }
        })
        return empty_fields;
    }
    display_empty_fields(){
        var result;
        this.get_empty_fields().forEach(id=>{
            result += `<button class="question-leftout">${id}</button>`
        });
        sideBar.innerHTML=result;
    }

}

function showSideBar(){
   submitBtn.addEventListener("click",()=>{
      sideBar.classList.toggle("hide-side-bar");
       questionLeftOut.forEach((question,index)=>{
          if(question.style.animation){
              question.style.animation = "";
          }
           else{
                question.style.animation = `fade-question-leftout 4s ease forwards ${index / 5 + 0.2}s`;
           }
       })
   }) 
}
function check(){
    questionLeftOut.forEach(question=>{
           question.addEventListener("click",()=>{
//               console.log("hello")
           })
       })
}

document.addEventListener("DOMContentLoaded", ()=>{
	var products = new Products();
    const ui= new UI();
    total = new Total();
    showSideBar();
    check();
    products.getQuestions().then(tabs => {
        ui.displayQuestions();

    }).then(()=>{
        UI.getSelecetedValues();
    }).then(()=>{
        submitBtn.addEventListener("click",()=>{
            if(ui.validate()==true){
                ui.displayQuestions();
            UI.getSelecetedValues();
            }
            else{
                ui.display_empty_fields();
            }
        })
    })
});