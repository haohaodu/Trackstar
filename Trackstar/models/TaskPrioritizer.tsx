import Task from './Task'
import { EvaluationMapper, EvaluationMapperImpl } from '../data_mappers';
import { Evaluation } from '.';

export default class TaskPrioritizer{

    returnValue: Task[] = [];
    sortList: number[] = []; // take all priority values and put them into a list, to be sorted
    mappingList = new Map(); // attach all priority values with their respective tasks into a map

    prioritize(t: Task[]): Promise<Task[]> {
        console.log("prioritize is called ");
        console.log("total tasks: " + t.length);



        let DueDate;
        let priorityCounter = 0;

        let evalMapper: EvaluationMapper = new EvaluationMapperImpl;
        let currentEval: Evaluation;
        return new Promise((resolve) => {
          // have an 'evals' variable that will be used to represent all evaluations
          evalMapper.all().then((evals) => {

            console.log("evaluation length: " + evals.length);

            // loop through all the task elements that were past in
            t.forEach((task_element )=> {

                // find associated evaluation element
                evals.forEach(evaluation_element=>{
                    if(evaluation_element.id === task_element.evaluation_id){
                        currentEval = evaluation_element;
                    };
                });

                DueDate = this.date_diff_indays(new Date(),task_element.due_date);

                // calculate priority
                priorityCounter += this.due_date_levels(DueDate);
                priorityCounter += this.duration_levels(task_element.est_duration);
                priorityCounter += this.weighting_levels(currentEval.weight);
                priorityCounter/=3.0000;

                // pass in the priority values into a list 
                // and then priority + the task objects into a map so that we can retrieve the task objects later
                
                let flag = false;
                this.mappingList.forEach(task_ele=>{
                    if(task_ele.id === task_element.id)
                        flag = true;
                });  

                if(flag === false){
                    priorityCounter+=0.01;
                    this.mappingList.set(priorityCounter, task_element);
                    this.sortList.push(priorityCounter);
                }

                console.log("flag value: " + flag);
                console.log("sortList length: " + this.sortList.length);
                console.log("mappingList length: " + this.mappingList.size);
                
            })

            // after all elements have been inserted into lists, continue on with functionality
            // start by sorting our (priorityList)
            this.sortList = this.sortList.sort(function(a,b){return b-a});

            // populate a new sorted list of tasks based off of our sorted list
            // use our sorted list values as keys to retrieve the actual task objects
            this.sortList.forEach(element => {
              //console.log(element)
              //console.log(JSON.stringify(this.mappingList.get(element)))
              this.returnValue.push(this.mappingList.get(element))
            });
            
            console.log("\n\n\n\n\n\nRETURN VALUE length: " + this.returnValue.length);
            console.log("RETURN VALUE: " + this.returnValue);
            // return the sorted tasks list as well
            resolve(this.returnValue);
        })
      })
    }


    // difference between two days
    private date_diff_indays(date1: Date, date2: Date) {
        let dt1: Date = new Date(date1);
        let dt2: Date = new Date(date2);
        return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) /(1000 * 60 * 60 * 24));
    }


    // unfair to divide due dates into buckets so decided to create generic counter instead
    private due_date_levels(value) {
        return 10000 - value;
    }

    // estimated duration bucketing
    private duration_levels(value) {
        if(value<=30)return 1
        else if (value<=60)return 2
        else if (value<=120)return 3
        else if (value<=240)return 4
        else return 5
    }

    private weighting_levels(value) {
        if(value<=5)return 1
        else if (value<=10)return 2
        else if (value<=20)return 3
        else if (value<=40)return 4
        else return 5
    }
}
