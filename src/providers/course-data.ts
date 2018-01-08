// Structure of "course"
// work with students-data.ts

export class CourseData{
  id: number;
  id_course: string;    // ex. "TDLOG"
  label: string;        // ex. "Techniques de développement logiciel"
  answered: boolean;
  group: number;        // between 0 and n. 0 if no group
  delegate: string;     // ex. "antoine.dupont@enpc.fr" if antoine Dupont is the delegate for this group
  commissionsDate: string; // it's impossible to answer after this date
  availableDate: string;   // it's impossible to answer before this date (ex. a day after the exam)
  typeForm: string;     // label corresponding to the form used for this course evaluation. Default = "Classique"
  submissionDate: string;

  constructor(data: any){
    console.log("Adding : " + data.id_course + " for the group " + data.group);
    this.id = data.id;
    this.id_course = data.id_course;
    this.label = data.label;
    this.commissionsDate = data.commissionsDate;
    this.availableDate = data.availableDate;
    this.typeForm = data.typeForm;
    this.delegate = data.delegate;
    this.group = data.group;
    this.answered = data.answered;
    this.submissionDate = data.submissionDate;
    console.log(this);
  }

}
