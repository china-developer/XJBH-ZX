
// import request from "@/utils/request";
// class UserAPI {
//   /*     获取用户信息     */
//   static getList () {
//     return request({
//       url: "/user",
//       method: "GET"
//     });
//   }
//   /*     添加    */
//   static add (data) {
//     return request({
//       url: "/users",
//       method: "POST",
//       data
//     });
//   }
//   /*     获取     */
//   static get (id) {
//     return request({
//       url: `/users/${id}`,
//       method: "GET",
//     });
//   }
//   /*     修改     */
//   static put (id, data) {
//     return request({
//       url: `/users/${id}`,
//       method: "PUT",
//       data
//     });
//   }
//   /*     删除     */
//   static del (id) {
//     return request({
//       url: `/users/${id}`,
//       method: "DELETE",
//     });
//   }
// }
// export default UserAPI;