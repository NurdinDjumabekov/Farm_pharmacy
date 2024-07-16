//////// tags
import { StyleSheet, Image, View, Text } from "react-native";
import { TextInput, TouchableOpacity } from "react-native";

/////// fns
import { changeSearchProd } from "../../store/reducers/stateSlice";
import { clearListProductTT } from "../../store/reducers/requestSlice";
import { searchProdTT } from "../../store/reducers/requestSlice";

/////// hooks
import { useDispatch, useSelector } from "react-redux";
import React, { useCallback } from "react";
import { debounce } from "lodash";

/////// assets
import searchIcon from "../../assets/icons/searchIcon.png";

export const SearchProds = ({ refInput }) => {
  const dispatch = useDispatch();

  const { searchProd } = useSelector((state) => state.stateSlice);

  const searchData = useCallback(
    debounce((text) => {
      if (text?.length > 1) {
        dispatch(searchProdTT(text)); // Выполнение поиска с заданными параметрами
      }
    }, 800),
    []
  );

  const onChange = (text) => {
    dispatch(changeSearchProd(text));
    searchData(text);
    if (text === "") {
      dispatch(clearListProductTT());
    }
  };

  return (
    <View style={styles.blockSearch}>
      <TextInput
        ref={refInput}
        style={styles.inputSearch}
        placeholderTextColor={"#222"}
        placeholder="Поиск..."
        onChangeText={onChange}
        value={searchProd}
      />
      <TouchableOpacity onPress={() => refInput?.current?.focus()}>
        <Image style={styles.iconSearch} source={searchIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  textSearch: {
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
    fontSize: 17,
    fontWeight: "400",
    color: "#000",
    width: "100%",
  },

  ///////////////////////////////
  blockSearch: {
    height: 50,
    width: "85%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  inputSearch: {
    height: 35,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
    fontSize: 16,
    fontWeight: "400",
    color: "#000",
    width: "100%",
  },

  iconSearch: { width: 30, height: 30 },
});
