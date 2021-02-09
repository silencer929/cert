class Total{
    constructor(){
        this.total=[];
    }
    findOne(id){
        return this.total.hasOwnProperty(id) ? this.total[id] : false;
    }
    computeTotal(){
        
    }
    addQuestion(){
       if(this.findOne(id) == false){
           var totalItem= new TotalItem();
           this.total[totalItem.getQuestion().get_question_id()]= totalItem;
       } 
        else{
            
        }
    }
    removeQuestion(){
        
    }
    getTotalQuestions(){
        
    }
}

class TotalItem {
    constructor() {
        this.question;
        this.score = "";
    }
    setQustion() {

    }
    getQuestions() {

    }
    setScore() {

    }
    getScore() {}
    changeScore(score) {

    }
}
class Question{
    construcor(){
        
    }
}