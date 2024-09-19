import { ref } from "vue";
import PageModal from "@/components/page-modal";
import PageContent from "@/components/page-content";
import PageSearch from "@/components/page-search";
import { handleData } from "./useData";

type IObject = Record<string, any>;
type CallbackFn = (item?: any) => void;

const usePage = (
  newHandleCallback?: CallbackFn,
  editHandleCallback?: CallbackFn,
  // 对数据回写处理
  writeBackCallback?: (row: any) => any,
  searchFormData: object = {}
) => {
  // console.log(editHandleCallback);
  // 获取实例组件
  const searchRef = ref<InstanceType<typeof PageSearch>>();
  const contentRef = ref<InstanceType<typeof PageContent>>();
  const addModalRef = ref<InstanceType<typeof PageModal>>();
  const editModalRef = ref<InstanceType<typeof PageModal>>();

  const modalInfo = ref({});

  // 搜索
  const handleSearchClick = (queryInfo: any) => {
    let data = handleData(queryInfo);
    contentRef.value?.fetchPageData(data, true);
  };
  // 重置
  const handleResetClick = (queryInfo: any) => {
    contentRef.value?.fetchPageData(queryInfo, true);
  };

  // 表单提交
  function handleSubmitClick() {
    //根据检索条件刷新列表数据
    contentRef.value?.fetchPageData(searchFormData, true);
  }

  // 新增
  const handleAddClick = () => {
    modalInfo.value = {};
    if (addModalRef.value) {
      addModalRef.value.dialogVisible = true;
    }
    newHandleCallback && newHandleCallback();
  };

  // 导出
  function handleExportClick() {
    // 根据检索条件导出数据
    contentRef.value?.handleExports();
  }

  // 编辑
  const handleEditClick = (row: IObject) => {
    console.log("触发编辑hook", row);
    modalInfo.value = { ...row };
    if (!!writeBackCallback) {
      console.log(1)
      modalInfo.value = writeBackCallback(row);
    } else {
      console.log(2)
      modalInfo.value = { ...row };
    }
    if (editModalRef.value) {
      editModalRef.value.dialogVisible = true;
    }

    editHandleCallback && editHandleCallback(row);
    console.log(4);
  };

  return {
    modalInfo,
    contentRef,
    addModalRef,
    editModalRef,
    handleAddClick,
    handleEditClick,
    handleSubmitClick,
    handleExportClick,
    handleSearchClick,
    handleResetClick,
  };
};

export default usePage;
