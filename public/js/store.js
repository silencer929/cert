class Total{
    constructor(){
        this.totalScore=[];
    }
    get_total_score(){
        return this.totalScore;
    }
    findOne(id){
        return (id in this.totalScore) ? this.totalScore[id] : null;
    }
    computeTotal(){
        var sum=0;
        Object.values(this.totalScore).forEach(item=>{
            sum += item.get_score();
        })
        return sum;
    }
    addQuestion(question, score){
       if(this.findOne(question.get_question_id()) == null){
           var totalItem= new TotalItem();
           totalItem.set_question(question);
           totalItem.set_score(score)
           this.totalScore[totalItem.get_question().get_question_id()]= totalItem;
       } 
        else{
            this.totalScore[question.get_question_id()].changeScore(score);
        }
    }
    removeQuestion(){
        
    }
    getTotalQuestions(){
        
    }
}

class TotalItem {
    constructor() {
        this.question={};
        this.score = 0;
    }
    set_question(question){
        this.question= question;
    }
    get_question() {
        return this.question
    }
    set_score(score) {
        this.score= score;
    }
    get_score() {
        return this.score;
    }
    changeScore(score) {
        this.score= score;
    }
}
class Question{
    constructor(){
       this.question_id=0;
        this.question="";
        this.marks=[];
        this.status;
    }
    set_status(status){
        this.status= status;
    }
    set_question(question){
        this.question= question;
    }
    get_status(){
        return this.status;
    }
    get_question(){
        return this.question;
    }
    set_question_id(id){
        this.question_id= id;
    }
    get_question_id(){
        return this.question_id;
    }
    set_marks(marks){
        this.marks=marks;
    }
    get_marks(){
        return this.marks;
    }
    mark_question(score, total){
        total.addQuestion(this,score);
    }
    remark_question(){
        
    }
}