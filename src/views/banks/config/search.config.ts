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
      rules: [],
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

