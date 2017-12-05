// This file defines a class for Questions

export class SubQuestion{ // to ask the question iff the actual answer is...
  question: string;
  answer: string;
}

export class Question{
  id:string;
  label:string;         // ex. Pensez-vous que ce cours doit être maintenu ?
  obligatory:string;   // If we have to answer to this question ("true" or "false")
  answer:string;        // even if the answer is a number, we convert it to string
  subQuestions:Array<SubQuestion>;// when we ask new questions following the answer.
                          //the last subQuestion is the default question (for any answer)
  type:string;          // "text" for long answer
                        // "inline" for short answer
                        // "number; 0; 10" for int entry between (included) 0 and 10
  type_data: Array<any>;// for "text" and "inline": []
                        // for "number" Array<number> = [begin, end]
                        // for "select" Array<string> = [choice1, choice2, ..., choiceN]
   constructor(q: any){
     this.id = q.id;
     this.label = q.label;
     this.obligatory = q.obligatory;
     this.answer = "";
     this.subQuestions = [];// TODO it's not really easy like with the delegates
     this.type = q.type;
     this.type_data = q.type_data.split(";");
   }
}
