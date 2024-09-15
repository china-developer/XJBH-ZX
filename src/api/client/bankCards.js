
// import request from "@/utils/request";
// class BanksCardsAPI {
//   /*     获取权限列表     */
//   static getList () {
//     return request({
//       url: "/api/admin/bank-cards",
//       method: "GET"
//     });
//   }
//   /*     获取    */
//   static get (id) {
//     return request({
//       url: `/api/admin/bank-cards/${id}`,
//       method: "GET",
//     });
//   }
//   /*     添加     */
//   static add (data) {
//     return request({
//       url: "/api/admin/bank-cards",
//       method: "POST",
//       data
//     });
//   }
//   /*     修改    */
//   static put (id, data) {
//     return request({
//       url: `/api/admin/bank-cards/${id}`,
//       method: "PUT",
//       data
//     });
//   }
//   /*     删除     */
//   static del (id) {
//     return request({
//       url: `/api/admin/bank-cards/${id}`,
//       method: "DELETE",
//     });
//   }
// }
// export default BanksCardsAPI;