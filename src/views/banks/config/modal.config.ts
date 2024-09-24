import { IForm, ISelectOption } from '@/base-ui/form'
import BanksAPI from '@/api/bank'


export const modalConfig: IForm = {
  formAction: function (data, isEdit) {
    if (isEdit) {
      return BanksAPI.updateBanksPage(data);
    } else {
      return BanksAPI.updateBanksPage(data);
    }
  },
  formItems: [
    {
      prop: "id",
      type: "input",
      label: "id",
      defaultValue: '',
      attrs: {
        placeholder: "请输入id",
      },
      isHidden: true
    },
    {
      prop: "code",
      type: "input",
      label: "label3",
      attrs: {
        placeholder: "placeholder3",
      },
      defaultValue: '',
      rules: [
        {
          required: true,
          message: "placeholder3",
          trigger: "blur",
        }
      ]
    },
    {
      prop: "name",
      type: "input",
      label: "label4",
      defaultValue: '',
      attrs: {
        placeholder: "placeholder4",
      },
      rules: [
        {
          required: true,
          message: "placeholder4",
          trigger: "blur",
        }
      ]
    },
    {
      prop: "env",
      type: "select",
      label: "环境",
      attrs: {
        placeholder: "请选择环境",
      },
      defaultValue: '',
      options: [],
      rules: [
        {
          required: true,
          message: "请选择环境",
          trigger: "blur",
        }
      ],
      async initFn(formItem) {
        let { data } = await BanksAPI.getEnvOptions()
        this.options = data.map((item: ISelectOption) => {
          return {
            label: item.name,
            value: item.url
          }
        })
      },
    },
  ],
  colLayout: { span: 24 },
  itemStyle: { padding: 0 },
};

export const modelConfigAdd = { ...modalConfig, title: "add" };

export const modelConfigEdit = { ...modalConfig, title: "edit" };
