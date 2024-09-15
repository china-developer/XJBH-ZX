
// import request from "@/utils/request";
// class PowerAPI {
//   /*     获取权限列表     */
//   static getList () {
//     return request({
//       url: "/api/admin/permissions",
//       method: "GET"
//     });
//   }
//   /*     添加     */
//   static add (data) {
//     return request({
//       url: "/api/admin/permissions",
//       method: "POST",
//       data
//     });
//   }
//   /*     获取    */
//   static get (id) {
//     return request({
//       url: `/api/admin/permissions/${id}`,
//       method: "GET",
//     });
//   }
//   /*     修改    */
//   static put (id, data) {
//     return request({
//       url: `/api/admin/permissions/${id}`,
//       method: "PUT",
//       data
//     });
//   }
//   /*     删除     */
//   static del (id) {
//     return request({
//       url: `/api/admin/permissions/${id}`,
//       method: "DELETE",
//     });
//   }
// }
// export default PowerAPI;