import { ZXRequest } from "@/utils/request/index";
class FileAPI {
  /**
   * 文件上传地址
   */
  static uploadUrl = import.meta.env.VITE_APP_API_URL + "/api/v1/files";

  /**
   * 上传文件
   *
   * @param file
   */
  static upload(file: File) {
    const formData = new FormData();
    formData.append("file", file);
    return ZXRequest.post<any>(
      "/api/v1/files",
      { data: formData },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  }

  /**
   * 删除文件
   *
   * @param filePath 文件完整路径
   */
  static deleteByPath(filePath?: string) {
    return ZXRequest.delete<any>("/api/v1/files", {
      params: { filePath: filePath },
    });
  }

  /**
   * 下载文件
   * @param url
   * @param fileName
   */
  static async downloadFile(uploadUrl: string, fileName?: string): Promise<void> {
    try {
      const res = await ZXRequest.get<any>(uploadUrl, {}, { responseType: "blob" });
      const blob = new Blob([res.data as any]);
      const a = document.createElement("a");
      const url = window.URL.createObjectURL(blob); // 这里是新的 url 变量
      a.href = url;
      a.download = fileName || "下载文件";
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  }
}


export default FileAPI;

/**
 * 文件API类型声明
 */
export interface FileInfo {
  /** 文件名 */
  name: string;
  /** 文件路径 */
  url: string;
}
