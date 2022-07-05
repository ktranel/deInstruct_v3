import mainApi from "./mainApi";

export function courseApi() {
    return {
        // get a list of courses
        getCourseList: function(page){
            return mainApi.get('/api/admin/courses/list');
        }
    }
}