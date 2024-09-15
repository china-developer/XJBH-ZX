
// import request from "@/utils/request";
// class RoleAPI {
//   /*     获取角色列表     */
//   static getList () {
//     return request({
//       url: "/api/admin/roles",
//       method: "GET"
//     });
//   }
//   /*     修改     */
//   static add (data) {
//     return request({
//       url: "/api/admin/roles",
//       method: "POST",
//       data
//     });
//   }
//   /*     获取     */
//   static get (id) {
//     return request({
//       url: `/api/admin/roles/${id}`,
//       method: "GET",
//     });
//   }
//   /*     修改     */
//   static put (id, data) {
//     return request({
//       url: `/api/admin/roles/${id}`,
//       method: "PUT",
//       data
//     });
//   }
//   /*     删除    */
//   static del (id) {
//     return request({
//       url: `/api/admin/roles/${id}`,
//       method: "DELETE",
//     });
//   }
// }
// export default RoleAPI;