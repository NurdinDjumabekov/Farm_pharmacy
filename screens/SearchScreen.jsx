//////// hooks
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

//////// tags
import { ScrollView, StyleSheet } from "react-native";

//////// fns
import { clearListProductTT } from "../store/reducers/requestSlice";
import { changeSearchProd } from "../store/reducers/stateSlice";

//////// components
import { SearchProds } from "../components/Soputka/SearchProds";
import { EveryProduct } from "../components/SaleProd/EveryProduct/EveryProduct";

export const SearchScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { guid } = route.params; ////guid созданной накладной

  const { listProductTT } = useSelector((state) => state.requestSlice);

  const refInput = useRef(null);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <SearchProds refInput={refInput} />,
    });

    setTimeout(() => {
      refInput?.current?.focus();
    }, 300);

    return () => {
      dispatch(clearListProductTT());
      dispatch(changeSearchProd(""));
    };
    //// очищаю список категорий и товаров
  }, []);

  return (
    <ScrollView style={styles.parentBlock}>
      {listProductTT?.map((item, index) => (
        <EveryProduct
          obj={item}
          index={index}
          navigation={navigation}
          guid={guid}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  parentBlock: {
    flex: 1,
    backgroundColor: "#fff",
    position: "relative",
  },

  container: {
    paddingHorizontal: 10,
    paddingVertical: 18,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 8,
    fontSize: 18,
    fontWeight: "500",
    marginVertical: 1,
    backgroundColor: "rgba(47, 71, 190, 0.672)",
  },

  arrow: {
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderColor: "#fff",
    height: 15,
    width: 15,
    borderRadius: 3,
    transform: [{ rotate: "45deg" }],
    marginRight: 20,
  },

  name: {
    fontSize: 18,
    fontWeight: "400",
    lineHeight: 18,
    maxWidth: "82%",
    color: "#fff",
  },
});
