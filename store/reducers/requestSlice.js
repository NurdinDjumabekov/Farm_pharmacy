import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../../env";
import {
  categoryGuidFN,
  changeActiveSelectCategory,
  changeSearchProd,
  changeStateForCategory,
  changeTemporaryData,
  clearDataInputsInv,
  clearLogin,
  doctorGuidFN,
} from "./stateSlice";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { changeLocalData } from "./saveDataSlice";
import { getLocalDataUser } from "../../helpers/returnDataUser";

/// logInAccount
export const logInAccount = createAsyncThunk(
  "logInAccount",
  async function (props, { dispatch, rejectWithValue }) {
    const { dataLogin, navigation, data } = props;
    try {
      const response = await axios({
        method: "POST",
        url: `${API}/farm/login`,
        data: dataLogin,
      });
      if (response.status >= 200 && response.status < 300) {
        const { result, seller_guid, seller_fio, point_name, agent_guid } =
          response?.data;
        if (+result === 1) {
          // Сохраняю seller_guid в AsyncStorage
          await AsyncStorage.setItem("seller_guid", seller_guid);
          await AsyncStorage.setItem("seller_fio", seller_fio);
          await AsyncStorage.setItem("point_name", point_name);
          // await AsyncStorage.setItem("agent_guid", agent_guid); checkcheck
          await dispatch(getBalance(seller_guid));
          await getLocalDataUser({ changeLocalData, dispatch });
          // console.log(data, "logInAccount");
          if (data?.seller_guid) {
            await navigation.navigate("Main");
            dispatch(clearLogin());
          }
        }
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/// getBalance
/// для получения баланса
export const getBalance = createAsyncThunk(
  "getBalance",
  async function (seller_guid, { dispatch, rejectWithValue }) {
    try {
      const response = await axios({
        method: "GET",
        url: `${API}/tt/get_debt?seller_guid=${seller_guid}`,
      });
      if (response.status >= 200 && response.status < 300) {
        return response?.data?.debt;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/// getHistoryBalance
/// для получения баланса
export const getHistoryBalance = createAsyncThunk(
  "getHistoryBalance",
  async function (seller_guid, { dispatch, rejectWithValue }) {
    try {
      const response = await axios({
        method: "GET",
        url: `${API}/tt/get_transactions?seller_guid=${seller_guid}`,
      });
      if (response.status >= 200 && response.status < 300) {
        return response?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//// checkQR_code
export const checkQR_code = createAsyncThunk(
  /// чекаю QR код
  "checkQR_code",
  async function (props, { dispatch, rejectWithValue }) {
    const { data, navigation, seller_guid } = props;
    try {
      const response = await axios({ url: `${API}/farm/scan?qrcode=${data}` });
      if (response.status >= 200 && response.status < 300) {
        const { doctor, result } = response?.data;
        if (doctor?.length === 0 || result === 0) {
          Alert.alert("Не удалось распознать QR-код");
          await navigation.navigate("Main");
        } else {
          await navigation.navigate("Main");
          await navigation.navigate("Soputka");
          const dataObj = { qrcode: data, seller_guid, comment: "" };
          await dispatch(createInvoiceSoputkaTT({ navigation, dataObj }));
          const fioDoctor = response?.data?.doctor?.[0]?.fio;
          Alert.alert(`Врач: ${fioDoctor}`);
        }
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/////////////////////////////// sale ////////////////////////////////

/// getListAgents
export const getListAgents = createAsyncThunk(
  /// список товаров сопутки
  "getListAgents",
  async function ({ seller_guid, check }, { dispatch, rejectWithValue }) {
    try {
      const response = await axios({
        method: "GET",
        url: `${API}/farm/get_doctors`,
      });
      if (response.status >= 200 && response.status < 300) {
        const guid = response?.data?.[0]?.guid;
        /// check (true) - беру докторов для отображения в остатках (false - в остальных компонетах)
        check && dispatch(getCategDoctor({ guid }));
        return response?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//// getHistorySoputka
export const getHistorySoputka = createAsyncThunk(
  /// список историй товаров сопутки
  "getHistorySoputka",
  async function (guidInvoice, { dispatch, rejectWithValue }) {
    try {
      const response = await axios({
        method: "GET",
        url: `${API}/farm/get_point_invoice?seller_guid=${guidInvoice}`,
      });
      if (response.status >= 200 && response.status < 300) {
        return response?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

///// createInvoiceSoputkaTT
////// создание накладной для продажи
export const createInvoiceSoputkaTT = createAsyncThunk(
  "createInvoiceSoputkaTT",
  async function (props, { dispatch, rejectWithValue }) {
    const { dataObj, navigation } = props;
    try {
      const response = await axios({
        method: "POST",
        url: `${API}/farm/create_invoice`,
        data: dataObj,
      });
      if (response.status >= 200 && response.status < 300) {
        navigation?.navigate("AddProdSoputkaSrceen", {
          forAddTovar: response?.data,
        });
        console.log(response?.data, "response?.data");
        return response?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/// getCategoryTT
export const getCategoryTT = createAsyncThunk(
  "getCategoryTT",
  /// для получения катеогрий товаров ТТ
  async function (props, { dispatch, rejectWithValue }) {
    const { checkComponent, seller_guid, type, doctor_guid } = props;
    const urlLink = !checkComponent
      ? `${API}/farm/get_category_all` //// для сопутки
      : `${API}/farm/get_category?doctor_guid=${doctor_guid}`; //// для пр0дажи
    try {
      const response = await axios(urlLink);
      if (response.status >= 200 && response.status < 300) {
        if (type === "leftovers") {
          const initilalCateg = response?.data?.[0]?.category_guid;
          dispatch(doctorGuidFN(doctor_guid));
          await dispatch(getMyLeftovers({ doctor_guid, initilalCateg }));
          //// для страницы остатков вызываю первую категорию
        } else if (type === "sale&&soputka") {
          ////// для продажи и с0путки
          const { category_guid } = response?.data?.[0];
          dispatch(changeActiveSelectCategory(category_guid));
          const sedData = { guid: category_guid, seller_guid, checkComponent };
          dispatch(getProductTT(sedData));
          dispatch(changeStateForCategory(category_guid));
          //// get список продуктов сопутки по категориям
          //// сразу подставляю первую категорию
        }
        return response?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/// getProductTT
export const getProductTT = createAsyncThunk(
  "getProductTT",
  /// для получения продуктов
  async function (props, { dispatch, rejectWithValue }) {
    const { guid, seller_guid, checkComponent } = props;
    const urlLink = !checkComponent
      ? `${API}/farm/get_product_all?categ_guid=${guid}` //// для сопутки
      : `${API}/farm/get_product?categ_guid=${guid}&seller_guid=${seller_guid}`; //// для пр0дажи
    ///// нижнее удалить
    try {
      const response = await axios(urlLink);
      if (response.status >= 200 && response.status < 300) {
        return response?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/// searchProdTT
export const searchProdTT = createAsyncThunk(
  "searchProdTT",
  /// для поиска товаров
  async function (props, { dispatch, rejectWithValue }) {
    const { searchProd, seller_guid, checkComponent } = props;
    const urlLink = !checkComponent
      ? `${API}/farm/get_product_all?search=${searchProd}` //// для сопутки
      : `${API}/tt/get_product?search=${searchProd}&seller_guid=${seller_guid}`; //// для пр0дажи
    try {
      const response = await axios(urlLink);
      if (response.status >= 200 && response.status < 300) {
        dispatch(changeSearchProd(searchProd));
        return response?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/// createInvoiceTT
export const createInvoiceTT = createAsyncThunk(
  "createInvoiceTT",
  /// создание накладной торговый точкой (открытие кассы)
  async function (seller_guid, { dispatch, rejectWithValue }) {
    try {
      const response = await axios({
        method: "POST",
        url: `${API}/tt/create_invoice`,
        data: { seller_guid },
      });
      if (response.status >= 200 && response.status < 300) {
        console.log(response?.data);
        return { codeid: response?.data?.codeid, guid: response?.data?.guid };
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/// addProductSoputkaTT
export const addProductSoputkaTT = createAsyncThunk(
  /// добавление продукта(по одному) в накладную в сопуттку накладной
  "addProductSoputkaTT",
  async function (props, { dispatch, rejectWithValue }) {
    const { data, getData } = props;
    console.log(data, "data");
    try {
      const response = await axios({
        method: "POST",
        url: `${API}/farm/create_invoice_product`,
        data,
      });
      if (response.status >= 200 && response.status < 300) {
        if (+response?.data?.result === 1) {
          dispatch(clearDataInputsInv()); // очищаю { price: "", ves: ""}
          dispatch(changeTemporaryData({})); // очищаю активный продукт
          dispatch(changeStateForCategory({})); ///  очищаю активную категорию
          setTimeout(() => {
            getData();
          }, 500);
        }
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//// getListSoputkaProd
export const getListSoputkaProd = createAsyncThunk(
  /// список товаров сопутки
  "getListSoputkaProd",
  async function (guidInvoice, { dispatch, rejectWithValue }) {
    try {
      const response = await axios({
        method: "GET",
        url: `${API}/farm/get_point_invoice_product?invoice_guid=${guidInvoice}`,
      });
      if (response.status >= 200 && response.status < 300) {
        return response?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//// deleteSoputkaProd
export const deleteSoputkaProd = createAsyncThunk(
  /// удаление данных из списока сопутки товаров
  "deleteSoputkaProd",
  async function (props, { dispatch, rejectWithValue }) {
    const { product_guid, getData } = props;
    try {
      const response = await axios({
        method: "POST",
        url: `${API}/farm/del_product`,
        data: { product_guid },
      });
      if (response.status >= 200 && response.status < 300) {
        setTimeout(() => {
          getData();
        }, 200);
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//// confirmSoputka
export const confirmSoputka = createAsyncThunk(
  /// подверждение товаров сопутки
  "confirmSoputka",
  async function ({ sendData, navigation }, { dispatch, rejectWithValue }) {
    console.log(sendData, "sendData");
    try {
      const response = await axios({
        method: "POST",
        url: `${API}/farm/point_conf_inv`,
        data: sendData,
      });
      if (response.status >= 200 && response.status < 300) {
        if (+response?.data?.result === 1) {
          navigation.navigate("Main");
        }
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/////////////////////////////// sale ////////////////////////////////

/////////////////////////////// Leftovers ////////////////////////////////

/// getMyLeftovers
export const getMyLeftovers = createAsyncThunk(
  "getMyLeftovers",
  async function (props, { dispatch, rejectWithValue }) {
    const { doctor_guid, initilalCateg } = props;
    try {
      const response = await axios({
        method: "GET",
        url: `${API}/farm/get_report_leftovers?doctor_guid=${doctor_guid}&categ_guid=${initilalCateg}`,
      });
      if (response.status >= 200 && response.status < 300) {
        const newInitilalCateg = initilalCateg || {};
        //// value в селекте undefibed или null быть не может!
        dispatch(categoryGuidFN(newInitilalCateg));
        return response?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/// getCategDoctor
//// беру катег0рию каждого доктора
export const getCategDoctor = createAsyncThunk(
  "getCategDoctor",
  async function ({ guid }, { dispatch, rejectWithValue }) {
    try {
      const response = await axios({
        method: "GET",
        url: `${API}/farm/get_category?doctor_guid=${guid}`,
      });
      if (response.status >= 200 && response.status < 300) {
        const obj = { doctor_guid: guid, type: "leftovers" };
        await dispatch(getCategoryTT({ ...obj, checkComponent: true }));
        return response?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/////////////////////////////// Leftovers ////////////////////////////////

/////////////////////////////// Pay ////////////////////////////////

/// acceptMoney
export const acceptMoney = createAsyncThunk(
  /// Отплата ТТ
  "acceptMoney",
  async function (props, { dispatch, rejectWithValue }) {
    const { dataObj, closeModal, navigation } = props;
    try {
      const response = await axios({
        method: "POST",
        url: `${API}/tt/point_oplata`,
        data: dataObj,
      });
      if (response.status >= 200 && response.status < 300) {
        closeModal();
        navigation?.navigate("Main");
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/////////////////////////////// pay ////////////////////////////////

const initialState = {
  preloader: false,
  chech: "",
  /////// balance
  balance: 0,
  listHistoryBalance: [], //// список историй платежей ТТ

  listMyInvoice: [],
  listAcceptInvoice: [], /// список накладных , принятых ТT (история)
  listAcceptInvoiceProd: [], /// список продуктов накладных , принятых ТT (история)
  everyInvoice: {},
  listSellersPoints: [],
  listCategory: [], //  список категорий ТА
  listProductTT: [], //  список продуктов ТА (cписок прод-тов отсортированные селектами)
  listLeftovers: [], // список остатков
  listSoldProd: [], /// список проданных товаров

  listInvoiceEveryTT: [], /// список накладных каждой ТТ(типо истории)
  listCategExpense: [],
  listExpense: [],
  infoKassa: { guid: "", codeid: "" }, /// guid каждой накладной ТТ

  /////// return
  listHistoryReturn: [], //// ист0рия возврата
  listLeftoversForReturn: [], // список остатков (переделанный мною)
  listRevizors: [], //// список ревизоров
  listProdReturn: [], //// список возвращенных от ТT

  /////// soputka
  listAgents: [],
  listProdSoputka: [],
  listHistorySoputka: [],
};

const requestSlice = createSlice({
  name: "requestSlice",
  initialState,
  extraReducers: (builder) => {
    //// logInAccount
    builder.addCase(logInAccount.fulfilled, (state, action) => {
      state.preloader = false;
    });
    builder.addCase(logInAccount.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
      Alert.alert("Неверный логин или пароль");
    });
    builder.addCase(logInAccount.pending, (state, action) => {
      state.preloader = true;
    });

    ///// getBalance
    builder.addCase(getBalance.fulfilled, (state, action) => {
      // state.preloader = false;
      state.balance = action.payload;
    });
    builder.addCase(getBalance.rejected, (state, action) => {
      state.error = action.payload;
      // state.preloader = false;
    });
    builder.addCase(getBalance.pending, (state, action) => {
      // state.preloader = true;
    });

    ///// getHistoryBalance
    builder.addCase(getHistoryBalance.fulfilled, (state, action) => {
      state.preloader = false;
      state.listHistoryBalance = action.payload;
    });
    builder.addCase(getHistoryBalance.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
    });
    builder.addCase(getHistoryBalance.pending, (state, action) => {
      state.preloader = true;
    });

    //// createInvoiceTT
    builder.addCase(createInvoiceTT.fulfilled, (state, action) => {
      const { codeid, guid } = action.payload;
      state.preloader = false;
      state.infoKassa = {
        codeid,
        guid,
      };
    });
    builder.addCase(createInvoiceTT.rejected, (state, action) => {
      state.error = action.payload;
      Alert.alert("Упс, что-то пошло не так! Не удалось создать накладную");
      state.preloader = false;
    });
    builder.addCase(createInvoiceTT.pending, (state, action) => {
      state.preloader = true;
    });

    /////// getCategoryTT
    builder.addCase(getCategoryTT.fulfilled, (state, action) => {
      state.preloader = false;
      const allCategory = { label: "Все", value: "0" };
      const categories = action.payload.map(
        ({ category_name, category_guid }, ind) => ({
          label: `${ind + 1}. ${category_name}`,
          value: category_guid,
        })
      );
      state.listCategory = [allCategory, ...categories];
    });
    builder.addCase(getCategoryTT.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
    });
    builder.addCase(getCategoryTT.pending, (state, action) => {
      state.preloader = true;
    });

    //////// getCategDoctor
    builder.addCase(getCategDoctor.fulfilled, (state, action) => {
      state.preloader = false;
      const allCategory = { label: "Все", value: "0" };
      const categories = action.payload?.map(
        ({ category_name, category_guid }, ind) => ({
          label: `${ind + 1}. ${category_name}`,
          value: category_guid,
        })
      );
      state.listCategory = [allCategory, ...categories];
    });
    builder.addCase(getCategDoctor.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
    });
    builder.addCase(getCategDoctor.pending, (state, action) => {
      state.preloader = true;
    });

    ////// getProductTT
    builder.addCase(getProductTT.fulfilled, (state, action) => {
      state.preloader = false;
      state.listProductTT = action.payload;
    });
    builder.addCase(getProductTT.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
    });
    builder.addCase(getProductTT.pending, (state, action) => {
      state.preloader = true;
    });

    //////// searchProdTT
    builder.addCase(searchProdTT.fulfilled, (state, action) => {
      // state.preloader = false;
      state.listProductTT = action.payload;
    });
    builder.addCase(searchProdTT.rejected, (state, action) => {
      state.error = action.payload;
      // state.preloader = false;
    });
    builder.addCase(searchProdTT.pending, (state, action) => {
      // state.preloader = true;
    });

    //////// getMyLeftovers
    builder.addCase(getMyLeftovers.fulfilled, (state, action) => {
      state.preloader = false;
      state.listLeftovers = action.payload?.map((item, ind) => [
        `${ind + 1}. ${item?.product_name}`,
        `${item?.income}`,
        `${item?.count}`,
        `${item?.bonuse || 0}`,
      ]);
      state.listLeftoversForReturn = action.payload?.filter(
        (item) => item?.end_outcome !== 0
      ); ////// проверяю на наличие, если end_outcome === 0 (остаток товара), то не добалять его в массив для в0зврата товара
    });
    builder.addCase(getMyLeftovers.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
      Alert.alert("Упс, что-то пошло не так! Не удалось загрузить данные!");
    });
    builder.addCase(getMyLeftovers.pending, (state, action) => {
      state.preloader = true;
    });

    //////// acceptMoney
    builder.addCase(acceptMoney.fulfilled, (state, action) => {
      state.preloader = false;
    });
    builder.addCase(acceptMoney.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
      Alert.alert("Упс, что-то пошло не так! Не удалось оплатить");
    });
    builder.addCase(acceptMoney.pending, (state, action) => {
      state.preloader = true;
    });

    ////////////////createInvoiceSoputkaTT
    builder.addCase(createInvoiceSoputkaTT.fulfilled, (state, action) => {
      state.preloader = false;
    });
    builder.addCase(createInvoiceSoputkaTT.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
      Alert.alert("Упс, что-то пошло не так! Не удалось создать накладную");
    });
    builder.addCase(createInvoiceSoputkaTT.pending, (state, action) => {
      state.preloader = true;
    });

    /////////////////getListAgents
    builder.addCase(getListAgents.fulfilled, (state, action) => {
      state.preloader = false;
      state.listAgents = action.payload;
    });
    builder.addCase(getListAgents.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
      Alert.alert("Упс, что-то пошло не так! Не удалось создать накладную");
    });
    builder.addCase(getListAgents.pending, (state, action) => {
      state.preloader = true;
    });

    ////////////////addProductSoputkaTT
    builder.addCase(addProductSoputkaTT.fulfilled, (state, action) => {
      state.preloader = false;
    });
    builder.addCase(addProductSoputkaTT.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
      Alert.alert("Упс, что-то пошло не так! Не удалось добавить товар");
    });
    builder.addCase(addProductSoputkaTT.pending, (state, action) => {
      state.preloader = true;
    });

    /////// getListSoputkaProd
    builder.addCase(getListSoputkaProd.fulfilled, (state, action) => {
      state.preloader = false;
      state.listProdSoputka = action.payload;
    });
    builder.addCase(getListSoputkaProd.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
      state.listProdSoputka = [];
      Alert.alert(
        "Упс, что-то пошло не так! Попробуйте перезайти в приложение..."
      );
    });
    builder.addCase(getListSoputkaProd.pending, (state, action) => {
      state.preloader = true;
    });

    /////// deleteSoputkaProd
    builder.addCase(deleteSoputkaProd.fulfilled, (state, action) => {
      state.preloader = false;
    });
    builder.addCase(deleteSoputkaProd.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
      Alert.alert("Упс, что-то пошло не так! Не удалось удалить ...");
    });
    builder.addCase(deleteSoputkaProd.pending, (state, action) => {
      state.preloader = true;
    });

    ///////getHistorySoputka
    builder.addCase(getHistorySoputka.fulfilled, (state, action) => {
      state.preloader = false;
      state.listHistorySoputka = action.payload;
    });
    builder.addCase(getHistorySoputka.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
      state.listHistorySoputka = [];
      Alert.alert(
        "Упс, что-то пошло не так! Попробуйте перезайти в приложение..."
      );
    });
    builder.addCase(getHistorySoputka.pending, (state, action) => {
      state.preloader = true;
    });

    ////// confirmSoputka
    builder.addCase(confirmSoputka.fulfilled, (state, action) => {
      state.preloader = false;
    });
    builder.addCase(confirmSoputka.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
      Alert.alert(
        "Упс, что-то пошло не так! Попробуйте перезайти в приложение..."
      );
    });
    builder.addCase(confirmSoputka.pending, (state, action) => {
      state.preloader = true;
    });
  },

  reducers: {
    changePreloader: (state, action) => {
      state.preloader = action.payload;
    },
    changeListInvoices: (state, action) => {
      state.listMyInvoice = action.payload;
    },
    changeLeftovers: (state, action) => {
      state.listLeftovers = action.payload;
    },
    clearListProductTT: (state, action) => {
      state.listProductTT = [];
    },
    clearListCategory: (state, action) => {
      state.listCategory = [];
    },
    changeListSellersPoints: (state, action) => {
      state.listSellersPoints = action.payload;
    },
    clearListAgents: (state, action) => {
      state.listAgents = [];
    },
  },
});

export const {
  changePreloader,
  changeListInvoices,
  changeLeftovers,
  clearListProductTT,
  clearListCategory,
  changeListSellersPoints,
  clearListAgents,
} = requestSlice.actions;

export default requestSlice.reducer;
