import { IForm, ISelectOption } from '@/base-ui/form'
import { OptionsTypesEnum } from '@/enums/OptionsEnum'
import BankUsersAPI from '@/api/users'


export const modalConfig: IForm = {
  formAction: function (data, isEdit) {
    // let id = data.id;
    // let param = {
    //   code: data.code,
    //   name: data.name,
    // }
    if (isEdit) {
      return BankUsersAPI.getUsersPage(data);
    } else {
      return BankUsersAPI.getUsersPage(data);
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
      prop: "username",
      type: "input",
      label: "用户名",
      attrs: {
        placeholder: "请输入用户名",
      },
      rules: [
        {
          required: true,
          message: "请输入用户名",
          trigger: "blur",
        }
      ]
    },
    {
      prop: "bank",
      type: "input",
      label: "银行",
      attrs: {
        placeholder: "请输入银行",
      },
      rules: [
        {
          required: true,
          message: "请输入银行",
          trigger: "blur",
        }
      ]
    },
    {
      prop: "acct",
      type: "input",
      label: "转账账号",
      attrs: {
        placeholder: "请输入转账账号",
      },
      rules: [
        {
          required: true,
          message: "请输入转账账号",
          trigger: "blur",
        }
      ]
    },
    {
      prop: "uid",
      type: "input",
      label: "登录账号",
      attrs: {
        placeholder: "请输入登录账号",
      },
      rules: [
        {
          required: true,
          message: "请输入登录账号",
          trigger: "blur",
        }
      ]
    },
    {
      prop: "status",
      type: "switch",
      label: "状态",
      defaultValue: false,
      options: [
        {
          value: false,
          label: "禁用"
        },
        {
          value: true,
          label: "启用"
        }
      ]
    },
  ],
  colLayout: { span: 24 },
  itemStyle: { padding: 0 },
};

export const modelConfigAdd = { ...modalConfig, title: "add" };

export const modelConfigEdit = { ...modalConfig, title: "edit" };
