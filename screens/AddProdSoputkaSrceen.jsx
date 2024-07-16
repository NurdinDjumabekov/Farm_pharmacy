/// hooks
import { useEffect } from "react";
import { useDispatch } from "react-redux";

/// tags
import { View, Text, ScrollView } from "react-native";
import { StyleSheet, TouchableOpacity } from "react-native";

///fns
import { clearListProductTT } from "../store/reducers/requestSlice";
import { changeSearchProd } from "../store/reducers/stateSlice";

///components
import { ListSoldProduct } from "../components/Soputka/ListSoldProduct";
import { AddProducts } from "../components/Soputka/AddProducts";
import SaleMenu from "../components/SaleMenu/SaleMenu";

export const AddProdSoputkaSrceen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { guid } = route.params?.forAddTovar; ////guid созданной накладной

  useEffect(() => {
    return () => {
      dispatch(clearListProductTT());
      dispatch(changeSearchProd(""));
    };
    //// очищаю список категорий и товаров
  }, []);

  const openScanerAddProd = () => {
    navigation.navigate("ScannerProdScreen", { guid });
    ////guid созданной накладной
  };

  return (
    <View style={styles.parentBlock}>
      <ScrollView style={styles.childBlock}>
        <TouchableOpacity onPress={openScanerAddProd} style={styles.arrow}>
          <Text style={styles.textBtn}>Сканировать товар</Text>
          <View style={styles.arrowInner}></View>
        </TouchableOpacity>
        <ListSoldProduct guidInvoice={guid} navigation={navigation} />
      </ScrollView>
      <AddProducts guid={guid} />
      {/* ///// модалка для добавления товаров */}
      <SaleMenu guid={guid} navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  parentBlock: {
    flex: 1,
    backgroundColor: "#ebeef2",
    position: "relative",
  },

  childBlock: {
    flex: 1,
    backgroundColor: "#ebeef2",
    marginBottom: 40,
  },

  arrow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    paddingTop: 12,
    paddingBottom: 15,
    backgroundColor: "rgba(97, 112, 188, 0.972)",
    marginBottom: 0,
  },

  arrowInner: {
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderColor: "#fff",
    height: 15,
    width: 15,
    borderRadius: 3,
    transform: [{ rotate: "45deg" }],
    marginRight: 20,
    marginTop: 5,
  },

  textBtn: {
    fontSize: 18,
    fontWeight: "500",
    color: "#fff",
  },

  btnScaner: {
    width: 60,
    height: 60,
    backgroundColor: "#67FE53",
    // backgroundColor: "#3DDCE7",
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    zIndex: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
  },

  imgQR: {
    width: "80%",
    height: "80%",
  },
});
