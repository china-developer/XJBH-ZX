
// import request from "@/utils/request";
// class BanksAPI {
//   /*     获取权限列表     */
//   static getList () {
//     return request({
//       url: "/api/admin/banks",
//       method: "GET"
//     });
//   }
//   /*     获取    */
//   static get (id) {
//     return request({
//       url: `/api/admin/banks/${id}`,
//       method: "GET",
//     });
//   }
//   /*     添加     */
//   static add (data) {
//     return request({
//       url: "/api/admin/banks",
//       method: "POST",
//       data
//     });
//   }
//   /*     修改    */
//   static put (id, data) {
//     return request({
//       url: `/api/admin/banks/${id}`,
//       method: "PUT",
//       data
//     });
//   }
//   /*     删除     */
//   static del (id) {
//     return request({
//       url: `/api/admin/banks/${id}`,
//       method: "DELETE",
//     });
//   }
// }
// export default BanksAPI;