import { CourseMapper } from "./CourseMapper";
import Course from "../models/Course";
import DBConnection from "../DBConnection";


export default class CourseMapperImpl implements CourseMapper {

  db = DBConnection.open()

  insert(c: Course): void {
    this.db.transaction(
      tx => {
        tx.executeSql("insert into Course (code, title, min_grade) values (?, ?, ?)", [c.code, c.title, c.min_grade]);
      },
      null
    );
  };

  update(c: Course): void {
    // use find() to find the course
    // compare the two
    // update
  };

  delete(c: Course): void {
    this.db.transaction(
      tx => {
        tx.executeSql("delete from Course where code=?", [c.code]);
      },
      null
    );
  };

  all(): Course[] {
    new Promise((resolve) => {
        const course_objs = []
        this.db.transaction(tx => {
            tx.executeSql("select * from Course", [], (_, { rows: { _array } }) => {
                _array.forEach(course => {
                    course_objs.push(new Course(course.title, course.code, course.min_grade, course.grade, course.complete))
                })
                resolve(course_objs)
            })
        })
    })
  };

  find(): Course {
     new Promise((resolve) => {
      this.db.transaction(tx => {
        tx.executeSql("select * from Course where code = ?", [code], (_, { rows: { _array } }) => {
            const returnObj: Course = new Course(_array[0].title, _array[0].code, _array[0].min_grade, _array[0].grade, _array[0].complete)
            resolve(returnObj)
        })
      })
    })//.then((course) => { // for testing only
    //   console.log("Found course:")
    //   console.log(JSON.stringify(course))
    // })

  };
}
