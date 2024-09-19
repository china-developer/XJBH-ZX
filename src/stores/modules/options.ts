import BanksAPI from '@/api/bank'
import { OptionsTypesEnum } from '@/enums/OptionsEnum'

export const useOptionsStore = defineStore('options', () => {

  /**
   * 获取币种选项数据
   */
  function getInitalBankOptions() {
    return new Promise<void>((resolve, reject) => {
      BanksAPI.getBanksOptions()
        .then((res) => {
          localStorage.setItem('BANKOPTIONS', JSON.stringify(res.data))
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * 获取供应商选项数据 - 【废弃接口】
   */
  function getInitalPurveyorData() {
    // return new Promise<void>((resolve, reject) => {
    //   OptionsAPI.getPurveyorOptions()
    //     .then((res) => {
    //       localStorage.setItem(OptionsTypesEnum.PURVEYOR, JSON.stringify(res.data))
    //       resolve();
    //     })
    //     .catch((error) => {
    //       reject(error);
    //     });
    // });
  }

  return {
    getInitalBankOptions,
    getInitalPurveyorData
  };
})