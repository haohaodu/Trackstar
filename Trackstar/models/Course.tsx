export default class Course {
    code:string;
    title:string;
    min_grade:number;
    grade:number;
    complete:boolean;

    constructor(t: string, c: string, min_g: number, g: number = 0, cp: boolean = false) {
        this.title = t;
        this.code = c;
        this.min_grade = min_g;
        this.grade = g;
        this.complete = cp;
    }

//will be used to update grade with evaluation grades
    cur_grade(){
        return Evaluation.grade;
    }
}
