var select= document.querySelectorAll('.select');
const test = document.querySelector(".test");
class UI {
    displayQuestions(questions) {
        var result="";
        questions.forEach(question => {
            result +=`<div class="question-box">
                   <div class=" question-label"><input type="number" readonly value="${question.id_no}">${question.label}</div>
                   <div class="question">${question.question}</div>
                   <div class="marks">
                    <select class="selected">
                    <option value="2">${question.marks.fc} Marks</option>
                    <option value="0"> ${question.marks.sc} mark</option>
                    <option value="0" selected>pending</option>
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
                console.log(event.value)
            })
        })
        console.log(select)
    }
    computeTotal(){
    }
    checkemptyfields(){
    }

}
class Products {
    async getQuestions() {
        try {
            var data = await fetch("new.json");
            let result = await data.json();
            let questions = result.test;
            return questions;
        } catch (error) {
            console.log(error)
        }
    }
}


document.addEventListener("DOMContentLoaded", ()=>{
	var products = new Products();
    const ui= new UI();
    products.getQuestions().then(questions => {
        ui.displayQuestions(questions);
    }).then(()=>{
        ui.computeTotal();
    })
});