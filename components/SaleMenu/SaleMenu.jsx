///// tags
import { View, Text, TouchableOpacity, Image } from "react-native";
import { TextInput, Modal, Alert } from "react-native";
import { ViewButton } from "../../customsTags/ViewButton";

/////hooks
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

/////imgs
import searchIcon from "../../assets/icons/searchIcon.png";
import qrCode from "../../assets/icons/qr_code.png";
import inputIcon from "../../assets/icons/inputIcon.png";

///// fns
import { getEveryProd } from "../../store/reducers/requestSlice";
import { changeSearchProd } from "../../store/reducers/stateSlice";

///// style
import styles from "./style";

const SaleMenu = ({ navigation, guid }) => {
  const dispatch = useDispatch();
  const refInput = useRef();

  const { data } = useSelector((state) => state.saveDataSlice);

  const [obj, setObj] = useState({ qrcode: "", seller_guid: "" });

  const navQRCode = () => navigation.navigate("ScannerProdScreen", { guid });
  ///// перехожу на страницу сканера

  const navSearch = () => {
    navigation.navigate("SearchScreen", { guid });
    dispatch(changeSearchProd(""));
    ////// очищаю поиск
  };

  const navInputQrCode = () => {
    setObj({ ...obj, seller_guid: data?.seller_guid });
    ////// открываю модалку для вводa ЦИФР QRCode

    setTimeout(() => {
      refInput?.current?.focus();
    }, 500);
  };

  const closeModal = () => setObj({ qrcode: "", seller_guid: "" });

  const onChange = (text) => {
    if (/^[0-9]*$/.test(text)) {
      setObj({ ...obj, qrcode: text });
    }
  };

  const sendData = () => {
    if (obj?.qrcode?.length < 1) {
      Alert.alert("Введите код товара");
    } else {
      const { seller_guid } = data;
      const sendData = { qrcode: obj?.qrcode, seller_guid, closeModal };
      dispatch(getEveryProd({ ...sendData, navigation, invoice_guid: guid }));
    }
  };

  return (
    <>
      {/* ///// menu  */}
      <View style={styles.blockBtn}>
        <TouchableOpacity style={styles.btnNav} onPress={navSearch}>
          <Image style={styles.imgIcon} source={searchIcon} />
          <Text style={styles.textIcon}>Поиск</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.blockBtn_inner_QR} onPress={navQRCode}>
          <Image style={styles.qrCodeImg} source={qrCode} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnNav} onPress={navInputQrCode}>
          <Image style={styles.imgIcon} source={inputIcon} />
          <Text style={styles.textIcon}>Ввод</Text>
        </TouchableOpacity>
      </View>
      {/* /////////////////// */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={!!obj?.seller_guid}
        onRequestClose={closeModal}
      >
        <TouchableOpacity
          style={styles.modalOuter}
          activeOpacity={1}
          onPress={closeModal} // Закрыть модальное окно
        >
          <View style={styles.modalInner}>
            <Text style={styles.titleSelect}>Введите код товара</Text>
            <TextInput
              style={styles.input}
              value={obj?.qrcode?.toString()}
              onChangeText={onChange}
              placeholder="763546"
              keyboardType="numeric"
              maxLength={25}
              ref={refInput}
            />
            <ViewButton styles={styles.sendBtn} onclick={sendData}>
              Найти
            </ViewButton>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

export default SaleMenu;
