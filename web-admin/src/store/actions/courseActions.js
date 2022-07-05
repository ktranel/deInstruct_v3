import {courseApi} from "../api/courseApi";

export async function fetchCourseList(page=1) {
    return courseApi().getCourseList(page);
}