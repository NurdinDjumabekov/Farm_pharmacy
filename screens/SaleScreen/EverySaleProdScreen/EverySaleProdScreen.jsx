///// tags
import { Text, View, TouchableOpacity, Alert } from "react-native";
import { TextInput } from "react-native";

///hooks
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

////components
import { ViewButton } from "../../../customsTags/ViewButton.jsx";
import {
  addProductSoputkaTT,
  getListSoputkaProd,
} from "../../../store/reducers/requestSlice.js";
import { getEveryProd } from "../../../store/reducers/requestSlice.js";

////style
import styles from "./style.js";

const EverySaleProdScreen = ({ route, navigation }) => {
  const invoice_guid = route.params?.guid; //// guid созданной накладной
  const guid = route.params?.obj?.guid; //// guid товара

  const dispatch = useDispatch();
  const refInput = useRef(null);

  const [sum, setSum] = useState("");

  const { everyProdSale } = useSelector((state) => state.requestSlice);
  const { data } = useSelector((state) => state.saveDataSlice);

  const onChange = (text) => {
    if (/^\d*\.?\d*$/.test(text)) {
      // Проверяем, не является ли точка или запятая первым символом
      if (text === "." || text?.indexOf(".") === 0) {
        return;
      }
      setSum(text);
    }
  };

  useEffect(() => {
    if (!!invoice_guid) {
      setTimeout(() => {
        refInput?.current?.focus();
      }, 400);
    }

    dispatch(getEveryProd({ guid, seller_guid: data?.seller_guid }));
    /////// получаю каждый продукт для продажи
  }, []);

  const getData = () => {
    dispatch(getListSoputkaProd(invoice_guid));
  }; /// для отображения всех проданных товаров

  const addInInvoice = () => {
    if (sum == "" || sum == 0) {
      Alert.alert("Введите количество");
    } else {
      const data = {
        invoice_guid,
        count: sum,
        price: everyProdSale?.product_price,
        guid,
      };

      console.log(data, "data");

      dispatch(addProductSoputkaTT({ data, navigation, getData }));
      ///// продаю товар
    }
  };

  const onClose = () => navigation.goBack();

  return (
    <View style={styles.parent}>
      <Text style={styles.title}>{everyProdSale?.product_name}</Text>
      <TouchableOpacity style={styles.krest} onPress={onClose}>
        <View style={[styles.line, styles.deg]} />
        <View style={[styles.line, styles.degMinus]} />
      </TouchableOpacity>
      <View style={styles.addDataBlock}>
        <View style={styles.inputBlock}>
          <Text style={styles.inputTitle}>Цена продажи за шт.</Text>
          <View style={styles.inputPrice}>
            <Text style={styles.price}>
              {everyProdSale?.product_price} сомони
            </Text>
          </View>
        </View>
        <View style={styles.inputBlock}>
          <Text style={styles.inputTitle}>
            Введите итоговое количество товара
          </Text>
          <TextInput
            style={styles.input}
            ref={refInput}
            value={sum}
            onChangeText={onChange}
            keyboardType="numeric"
            maxLength={8}
          />
        </View>
      </View>
      <ViewButton styles={styles.btnAdd} onclick={addInInvoice}>
        Продать товар
      </ViewButton>
    </View>
  );
};

export default EverySaleProdScreen;
