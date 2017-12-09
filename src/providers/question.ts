// This file defines a class for Questions

export class SubQuestion{ // to ask the question iff the actual answer is...
  question: string;
  answer: string;
}

export class Question{
  id:string;
  label:string;         // ex. Pensez-vous que ce cours doit être maintenu ?
  obligatory:boolean;   // If we have to answer to this question ("true" or "false")
  answer: any;        // even if the answer is a number, we convert it to string

  type:string;          // "text" for long answer
                        // "inline" for short answer
                        // "number; 0; 10" for int entry between (included) 0 and 10
  type_data: Array<any>;// for "text" and "inline": []
                        // for "number" Array<number> = [begin, end]
                        // for "select" Array<string> = [choice1, choice2, ..., choiceN]

  isSub: boolean;         // "true" iff the question is a subquestion
  parentsQuestionId:number; // id of the parents question. Make sense iff isSub
  parentsQuestionValue:number; // the conditionnal answer to display that question

   constructor(q: any){
     this.id = q.id;
     this.label = q.label;
     this.obligatory = q.obligatory;
     this.answer = "";
     this.type = q.type;
     this.type_data = q.type_data.split(";");
     this.isSub = q.isSub;
     this.parentsQuestionValue = q.parentsQuestionValue;
     this.parentsQuestionId = q.parentsQuestionId;
   }
}
