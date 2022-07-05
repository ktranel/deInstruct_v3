import mainApi from "./mainApi";

export function imageApi() {
    return {
        // upload an image file
        upload: function(data) {
            return mainApi.post(`/api/admin/images/new`, data);
        },
        getList: function(page, name) {
            return mainApi.get(`/api/admin/images/list?page=${page}&name=${name}`);
        }
    };
}