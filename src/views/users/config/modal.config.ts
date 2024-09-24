import { IForm, ISelectOption } from '@/base-ui/form'
import { OptionsTypesEnum } from '@/enums/OptionsEnum'
import UsersAPI from '@/api/users'
import BanksAPI from '@/api/bank'

export const modalConfig: IForm = {
  formAction: function (data, isEdit) {
    if (isEdit) {
      return UsersAPI.updateUsers(data);
    } else {
      return UsersAPI.updateUsers(data);
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
      defaultValue: '',
      isHidden: true
    },
    {
      prop: "username",
      type: "input",
      label: "用户名",
      defaultValue: '',
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
      type: "select",
      label: "银行",
      attrs: {
        placeholder: "请选择银行",
      },
      defaultValue: '',
      options: [],
      rules: [
        {
          required: true,
          message: "请选择银行",
          trigger: "blur",
        }
      ],
      async initFn(formItem) {
        let { data } = await BanksAPI.getBanksOptions()
        this.options = data.map((item: ISelectOption) => {
          return {
            label: item,
            value: item
          }
        })
      },
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
      prop: "pwd",
      type: "input",
      label: "密码",
      attrs: {
        placeholder: "请输入密码",
      },
      rules: [
        {
          required: true,
          message: "请输入密码",
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
