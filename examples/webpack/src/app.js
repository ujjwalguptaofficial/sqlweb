import {
    StudentGrid
} from "./component/student_grid";
import "jsstore/dist/jsstore.min.js";
var componentStudentGrid = new StudentGrid()
document.getElementById('app').innerHTML = componentStudentGrid.getHtml();
componentStudentGrid.init();