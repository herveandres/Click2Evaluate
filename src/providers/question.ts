// This file defines a class for Questions

export class SubQuestion{ // to ask the question iff the actual answer is...
  question: string;
  answer: string;
}

export class Question{
  id:number;
  position: number;
  title:string;
  label:string;         // ex. Pensez-vous que ce cours doit être maintenu ?
  obligatory:boolean;   // If we have to answer to this question ("true" or "false")
  answer: any;        // even if the answer is a number, we convert it to string

  type_question:string;          // "text" for long answer
                        // "inline" for short answer
                        // "number; 0; 10" for int entry between (included) 0 and 10
  type_data: Array<any>;// for "text" and "inline": []
                        // for "number" Array<number> = [begin, end]
                        // for "select" Array<string> = [choice1, choice2, ..., choiceN]

  isSub: boolean;         // "true" iff the question is a subquestion
  parentsQuestionPosition:number; // id of the parents question. Make sense iff isSub
  parentsQuestionValue:number; // the conditionnal answer to display that question

   constructor(q: any){
     this.id = q.id;
     this.position = q.position;
     this.label = q.label;
     this.obligatory = q.obligatory;
     this.title = q.title;
     this.type_question = q.type_question;
     this.type_data = q.type_data.split(";");
     this.isSub = q.isSub;
     this.parentsQuestionValue = q.parentsQuestionsValue;
     this.parentsQuestionPosition = q.parentsQuestionPosition;

     if(this.type_question == "select"){
      this.answer = new Array<number>();
      for(let index = 0; index < this.type_data.length; index++){
        this.answer.push(false);
      }
       console.log(this.answer);
     }else{
        this.answer = "";
     }

     if(this.type_question == "number"){

       this.type_data[0] = Number(this.type_data[0]);
       this.type_data[1] = Number(this.type_data[1]);
     }
     console.log(this.type_data, q.type_data);
   }
}
