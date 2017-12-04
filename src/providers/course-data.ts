

export class CourseData{
  id: string;
  label: string;
  answered: boolean;
  group: number;
  delegate: string; // ldap
  commissionsDate: any;
  availableDate: any;
  typeForm: string;    // label corresponding to the form used for this course evaluation

  constructor(data: any, group: number){
    console.log("Adding : " + data.Id + " for the group " + group);
    this.id = data.Id;
    this.label = data.label;
    this.commissionsDate = data.dateComission;
    this.availableDate = data.dateDisponibilite;
    this.typeForm = data.typeQuestionnaire;
    this.answered = false;
    this.delegate = data.delegues;
    this.group = group;
  }


}
