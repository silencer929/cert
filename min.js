
var select= document.querySelectorAll('.select');
const test = document.querySelector(".test");
const submitBtn = document.querySelector("#submit-btn");
const sideBar = document.querySelector(".side-bar");
const tab= document.querySelector(".tab");
var questionLeftOut = [...document.querySelectorAll(".question-leftout")]
var tabs=[]

class Products {
    async getQuestions() {
        try {
            tabs= new Queue();
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
        var questions =tabs.dequeue()
         var key=Object.keys(questions);
        questions[key[0]].forEach(question => {
            result +=`<div class="question-box">
                   <input type="number" readonly value="${question.question_id}" class="question_id">
                   <div class="question">${question.question}</div>
                   <div class="marks">
                    <select class="selected">`
                   + this.getOptions(question.marks) +
                    `<option value="pending" selected>pending</option>
                    </select>
                    </div>
                   <input type=hidden>
                   <input type="checkbox" class="checkbox"></div>`;
        });
        test.innerHTML = result;
    }
     static getSelecetedValues() {
        var checkbox = [...document.querySelectorAll(".checkbox")];
        var select = [...document.querySelectorAll(".selected")];
        select.forEach(option => {
            option.addEventListener("change",(event)=>{
                console.log(option.value)
            })
        })
    }
    computeTotal(){
    }
    checkemptyfields(){
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
    showSideBar();
    check();
    submitBtn.addEventListener("click",()=>{
        ui.displayQuestions()
    })
    products.getQuestions().then(tabs => {
        ui.displayQuestions();

    }).then(()=>{
        UI.getSelecetedValues();
        ui.computeTotal();
    });
});