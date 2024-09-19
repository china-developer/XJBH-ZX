import { IForm, ISelectOption } from '@/base-ui/form'
import { OptionsTypesEnum } from '@/enums/OptionsEnum'

export const searchFormConfig: IForm = {
  formItems: [
    {
      prop: "name",
      type: "input",
      label: "name",
      attrs: {
        placeholder: "name",
      },
      defaultValue: '',
      rules: [],
      // async initFn(formItem) {
      //   // 注意:如果initFn函数不是箭头函数,this会指向此配置项对象,那么也就可以用this来替代形参formItem
      //   const response = localStorage.getItem(OptionsTypesEnum.CURRENCY);
      //   if (response) {
      //     this.options! = Array.from(Object.values(JSON.parse(response))) as ISelectOption[];
      //   }
      // },
      colLayout: {
        xl: 4, // ≥1920px
        lg: 6, // ≥1200px
        md: 12, // ≥992px
        sm: 12, // ≥768px
        xs: 24, // <768px
      },
    },
  ],
  labelWidth: "",
  itemStyle: { padding: "10px 40px" },
  colLayout: { span: 8 },
};

