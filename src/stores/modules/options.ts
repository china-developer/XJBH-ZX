import OptionsAPI from '@/api/options/api' 
import { OptionsTypesEnum } from '@/enums/OptionsEnum'

export const useOptionsStore = defineStore('options', ()=>{

    /**
     * 获取币种选项数据
     */
    function getInitalCurrencyData(){
        return new Promise<void>((resolve, reject) => {
            OptionsAPI.getCurrencyOptions()
              .then((res) => {
                localStorage.setItem(OptionsTypesEnum.CURRENCY, JSON.stringify(res.data))
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
    function getInitalPurveyorData(){
      return new Promise<void>((resolve, reject) => {
          OptionsAPI.getPurveyorOptions()
            .then((res) => {
              localStorage.setItem(OptionsTypesEnum.PURVEYOR, JSON.stringify(res.data))
              resolve();
            })
            .catch((error) => {
              reject(error);
            });
        });
  }

    return {
      getInitalCurrencyData,
      getInitalPurveyorData
      };
})