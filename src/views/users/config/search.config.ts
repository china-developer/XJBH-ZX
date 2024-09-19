import { IForm, ISelectOption } from '@/base-ui/form'
import { OptionsTypesEnum } from '@/enums/OptionsEnum'
import BanksAPI from '@/api/bank'

export const searchFormConfig: IForm = {
  formItems: [
    {
      prop: "username",
      type: "input",
      label: "用户名",
      attrs: {
        placeholder: "请输入用户名",
      },
      defaultValue: '',
      rules: [],
      colLayout: {
        xl: 4, // ≥1920px
        lg: 6, // ≥1200px
        md: 12, // ≥992px
        sm: 12, // ≥768px
        xs: 24, // <768px
      },
    },
    {
      prop: "bank",
      type: "select",
      label: "银行",
      attrs: {
        placeholder: "请选择银行",
      },
      defaultValue: '',
      rules: [],
      options: [],
      async initFn(formItem) {
        let { data } = await BanksAPI.getBanksOptions()
        this.options = data.map((item: ISelectOption) => {
          return {
            label: item,
            value: item
          }
        })
      },
      colLayout: {
        xl: 4, // ≥1920px
        lg: 6, // ≥1200px
        md: 12, // ≥992px
        sm: 12, // ≥768px
        xs: 24, // <768px
      },
    },
    {
      prop: "acct",
      type: "input",
      label: "转账账号",
      attrs: {
        placeholder: "请输入转账账号",
      },
      defaultValue: '',
      rules: [],
      colLayout: {
        xl: 4, // ≥1920px
        lg: 6, // ≥1200px
        md: 12, // ≥992px
        sm: 12, // ≥768px
        xs: 24, // <768px
      },
    },
    {
      prop: "uid",
      type: "input",
      label: "登录账号",
      attrs: {
        placeholder: "请输入登录账号",
      },
      defaultValue: '',
      rules: [],
      colLayout: {
        xl: 4, // ≥1920px
        lg: 6, // ≥1200px
        md: 12, // ≥992px
        sm: 12, // ≥768px
        xs: 24, // <768px
      },
    },
    {
      prop: "status",
      type: "select",
      label: "状态",
      attrs: {
        placeholder: "请选择状态",
      },
      rules: [],
      defaultValue: null,
      options: [
        {
          label: "全部",
          value: null,
        },
        {
          label: "启用",
          value: true,
        },
        {
          label: "禁用",
          value: false,
        }
      ],
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

