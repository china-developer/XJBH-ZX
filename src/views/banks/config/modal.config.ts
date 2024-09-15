import { IForm, ISelectOption } from '@/base-ui/form'
import { OptionsTypesEnum } from '@/enums/OptionsEnum'
import BanksAPI from '@/api/bank'


export const modalConfig: IForm = {
  formAction: function (data, isEdit) {
    let id = data.id;
    let param = {
      code: data.code,
      name: data.name,
    }
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
      attrs: {
        placeholder: "请输入id",
      },
    },
    {
      prop: "code",
      type: "input",
      label: "label3",
      attrs: {
        placeholder: "placeholder3",
      },
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
  ],
  colLayout: { span: 24 },
  itemStyle: { padding: 0 },
};

export const modelConfigAdd = { ...modalConfig, title: "add" };

export const modelConfigEdit = { ...modalConfig, title: "edit" };
