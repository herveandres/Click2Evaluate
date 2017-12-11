// Structure of "course"
// work with students-data.ts

export class CourseData{
  id: string;           // ex. "TDLOG"
  label: string;        // ex. "Techniques de développement logiciel"
  answered: boolean;
  group: number;        // between 0 and n. 0 if no group
  delegate: string;     // ex. "antoine.dupont@enpc.fr" if antoine Dupont is the delegate for this group
  commissionsDate: string; // it's impossible to answer after this date
  availableDate: string;   // it's impossible to answer before this date (ex. a day after the exam)
  typeForm: string;     // label corresponding to the form used for this course evaluation. Default = "Classique"

  constructor(data: any, group: number, answered: boolean){
    console.log("Adding : " + data.Id + " for the group " + group);
    this.id = data.Id;
    this.label = data.label;
    this.commissionsDate = data.dateComission;
    this.availableDate = data.dateDisponibilite;
    this.typeForm = data.typeQuestionnaire;
    this.delegate = data.delegues.split(";")[group];
    this.group = group;
    this.answered = answered;
    console.log(this);
  }
}
