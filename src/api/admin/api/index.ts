import { ZXRequest } from "@/utils/request/index";
import { AxiosPromise } from "axios";
import { AdminPageVO, RolesPageVO, PermissionsPageVO } from "../types";

/**
 * 枚举接口
 */
enum AdminEnum {
  Users = "/api/admin/admins",
  RolesPage = "/api/admin/roles",
  PermissionsPage = "/api/admin/permissions",
  Logs = "/api/admin/operation-logs",
}

class AdminAPI {
  /**
   * 用户管理员
   */
  // 分页数据
  static getUsersPage(data: object): AxiosPromise<PageResult<AdminPageVO[]>> {
    return ZXRequest.get<any>(AdminEnum.Users, data);
  }

  /**
   * 创建数据
   */
  static postUsers(data: object): AxiosPromise {
    return ZXRequest.post<any>(AdminEnum.Users, data);
  }

  /**
   * 更新数据
   */
  static updateUsers(data: object, id: number): AxiosPromise {
    return ZXRequest.put<any>(AdminEnum.Users + "/" + id, data);
  }

  /**
   * 删除数据
   */
  static deleteUsers(id: string & number): AxiosPromise {
    return ZXRequest.delete<any>(AdminEnum.Users + "/" + id);
  }

  /**
   * 角色
   * @param data
   * @returns
   */
  // 获取用户-角色
  static getRolesPage(data: object): AxiosPromise<ResponseData<RolesPageVO[]>> {
    return ZXRequest.get<any>(AdminEnum.RolesPage, data);
  }

  // 创建用户-角色
  static postRoles(data: object): AxiosPromise<PageResult<[]>> {
    return ZXRequest.post<any>(AdminEnum.RolesPage, data);
  }

  // 更新用户-角色
  static updateRoles(data: object, id: number): AxiosPromise<PageResult<[]>> {
    return ZXRequest.put<any>(AdminEnum.RolesPage + "/" + id, data);
  }

  // 删除用户-角色
  static deleteRoles(id: string & number): AxiosPromise<ResponseData<[]>> {
    return ZXRequest.delete<any>(AdminEnum.RolesPage + "/" + id);
  }

  /**
   * 权限
   * @param data
   * @returns
   */
  // 获取用户-权限
  static getUserPermissions(
    data: object
  ): AxiosPromise<ResponseData<PermissionsPageVO[]>> {
    return ZXRequest.get<any>(AdminEnum.PermissionsPage, data);
  }

  /**
   * 创建用户-角色
   */
  static postPermissions(data: object): AxiosPromise<PageResult<[]>> {
    return ZXRequest.post<any>(AdminEnum.PermissionsPage, data);
  }

  /**
   * 更新用户-角色
   */
  static updatePermissions(
    data: object,
    id: number
  ): AxiosPromise<PageResult<[]>> {
    return ZXRequest.put<any>(AdminEnum.PermissionsPage + "/" + id, data);
  }

  // 删除用户-角色
  static deletePermissions(
    id: string & number
  ): AxiosPromise<ResponseData<[]>> {
    return ZXRequest.delete<any>(AdminEnum.PermissionsPage + "/" + id);
  }

  /**
   * 操作日志
   */
  // 分页数据
  static getLogsPage(data: object): AxiosPromise<PageResult<AdminPageVO[]>> {
    return ZXRequest.get<any>(AdminEnum.Logs, data);
  }

  /**
   * 创建数据
   */
  static postLogs(data: object): AxiosPromise {
    return ZXRequest.post<any>(AdminEnum.Logs, data);
  }

  /**
   * 更新数据
   */
  static updateLogs(data: object, id: number): AxiosPromise {
    return ZXRequest.put<any>(AdminEnum.Logs + "/" + id, data);
  }

  /**
   * 删除数据
   */
  static deleteLogs(id: string & number): AxiosPromise {
    return ZXRequest.delete<any>(AdminEnum.Logs + "/" + id);
  }
}
export default AdminAPI;
