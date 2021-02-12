class Forbidden extends Error{
    constructor(message){
        super(message);
    }
}


class Queue{
    constructor(size){
       this.length = size;
        this.front=0;
        this.rear=0;
        this.queue=[]
    }
    maximum_peek(){
        if(this.front > this.length){
            throw new Forbidden("the maximum limit is exceed")
        }
    }
    queue_is_full(){
        if(this.length==this.rear){
            throw new Forbidden("the queue is full");
        }
    }
    queue_is_empty(){
        if(this.front==this.length){
            throw new Forbidden("the queue is empty");
        }
    }
    enqueue(data){
        try {
            if (!this.queue_is_full()) {
                this.rear++;
                this.queue[this.rear] = data;
            }
        } catch (error) {
            console.log(error.message)
        }
    }
    dequeue(){
        try {
            if (!this.queue_is_empty()) {
                this.front++;
                var data= this.queue[this.front];
                return data;
            }
        } catch (error) {
            console.log(error.message)
        }
    }
    peek(){
        try{
            if(!this.maximum_peek()){
                this.front++;
                var data = this.queue[this.front];
                return data;
            }
        }
        catch(error){
            console.log(error);
            return;
        }
    }
    
}




class Stack{
    constructor(size){
        this.top=0;
        this.size=size;
        this.stack=[];
        
    }
    is_stack_empty(){
        if(this.top<1){
            throw new Forbidden("the stack is empty")
        }
    }
    is_stack_full(){
        if(this.top==this.size){
         throw new Forbidden("you cant add more items")
        }
    }
    pop(){
      try{
          
          if(!this.is_stack_empty()){
            var data=this.stack.pop();
              this.top--;
             return data;
          }
      }  
        catch(error){
            console.log(error.message)
        }
    }
    peek(){
        
    }
    
  push(data){
      try {
          if (!this.is_stack_full()) {
              this.top++;
              this.stack[this.top] = data;
          }

      } catch (error) {
          console.log(error.message)
      }
  }  
}

