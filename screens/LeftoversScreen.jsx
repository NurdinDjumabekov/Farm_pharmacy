import { useEffect } from "react";
import { Dimensions, RefreshControl, SafeAreaView, View } from "react-native";
import { ScrollView, StyleSheet, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  changeLeftovers,
  clearListCategory,
  getCategDoctor,
  getListAgents,
  getMyLeftovers,
} from "../store/reducers/requestSlice";
import { Table, Row, Rows, TableWrapper } from "react-native-table-component";
import { listTableLeftoverst } from "../helpers/Data";
import { getLocalDataUser } from "../helpers/returnDataUser";
import { changeLocalData } from "../store/reducers/saveDataSlice";
import RNPickerSelect from "react-native-picker-select";
import { useState } from "react";
import { transformListForSelect } from "../helpers/transformListForSelect";

export const LeftoversScreen = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.saveDataSlice);

  const { preloader, listLeftovers, listCategory, listAgents } = useSelector(
    (state) => state.requestSlice
  );

  const [dataCateg, setDataCateg] = useState({});
  // Установка значения по умолчанию для категории
  const [dataDoctor, setDataDoctor] = useState({});
  // Установка значения по умолчанию для докторов

  useEffect(() => {
    getData();
    return () => {
      dispatch(changeLeftovers([]));
      dispatch(clearListCategory());
    };
  }, []);

  const getData = async () => {
    // const obj = { seller_guid: data?.seller_guid, type: "leftovers" };
    // await dispatch(getCategoryTT({ ...obj, checkComponent: true }));
    // ///// get cписок категорий, продукты которых у меня есть
    // setDataCateg(listCategory?.[0]);
    // /// пропускаю категорию "Все" и сразу отображаю вторую категорию

    /////////////////////
    await getLocalDataUser({ changeLocalData, dispatch });

    await dispatch(
      getListAgents({ seller_guid: data?.seller_guid, check: true })
    );
  };

  // console.log(listAgents, "listAgents");
  // console.log(listCategory, "listCategory");

  const windowWidth = Dimensions.get("window").width;
  const arrWidth = [45, 19, 18, 18]; //  проценты %
  const resultWidths = arrWidth.map(
    (percentage) => (percentage / 100) * windowWidth
  );

  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    if (offsetY <= 0) {
      // Если скролл достиг верхней границы
      getData();
    }
  };

  const onChangeDoctor = (value) => {
    setDataDoctor(value);
    dispatch(getCategDoctor(value));
  };

  const onChangeCateg = (value) => {
    setDataCateg(value);
    const objData = { doctor_guid: dataDoctor, initilalCateg: value };
    dispatch(getMyLeftovers(objData));
    console.log(dataDoctor, "dataDoctor");
  };

  const listCategoryNew = listCategory?.slice(1, 250);

  // console.log(listCategoryNew, "listCategoryNew");

  return (
    <ScrollView
      style={styles.container}
      onScroll={handleScroll}
      scrollEventThrottle={400}
      refreshControl={
        <RefreshControl refreshing={preloader} onRefresh={getData} />
      }
    >
      <SafeAreaView>
        <View>
          <Text style={styles.choiceCateg}>Выберите доктора *</Text>
          <View style={styles.blockSelect}>
            <RNPickerSelect
              onValueChange={onChangeDoctor}
              items={transformListForSelect(listAgents)}
              value={dataDoctor}
              placeholder={{}}
            />
          </View>
        </View>
        <View>
          <Text style={styles.choiceCateg}>Выберите категорию *</Text>
          <View style={styles.blockSelect}>
            <RNPickerSelect
              onValueChange={onChangeCateg}
              items={listCategoryNew}
              value={dataCateg}
              placeholder={{}}
            />
          </View>
        </View>
        <Table borderStyle={styles.styleHeadTable}>
          <Row
            data={listTableLeftoverst}
            style={styles.head}
            textStyle={{ margin: 3, fontSize: 14, fontWeight: "500" }}
            flexArr={resultWidths}
          />
          <TableWrapper style={{ flexDirection: "row" }}>
            <Rows
              data={listLeftovers.map((item) => [
                item[0], // Товар
                item[1], // Остаток на начало
                <Text style={{ ...styles.textStyles, color: "green" }}>
                  {item[2]}
                </Text>, // Приход
                <Text style={{ ...styles.textStyles, color: "red" }}>
                  {item[3]}
                </Text>, // Расход
              ])}
              textStyle={styles.textStyles}
              flexArr={resultWidths}
            />
          </TableWrapper>
        </Table>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 1,
    paddingRight: 1,
    paddingTop: 10,
    paddingBottom: 100,
    marginBottom: 20,
  },

  choiceCateg: {
    fontSize: 16,
    width: "96%",
    alignSelf: "center",
    paddingVertical: 8,
    fontWeight: "600",
    paddingTop: 0,
  },

  blockSelect: {
    backgroundColor: "#fff",
    width: "97%",
    alignSelf: "center",
    borderRadius: 5,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.9,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 12,
  },

  textStyles: {
    margin: 7,
    marginBottom: 8,
    marginTop: 8,
    fontSize: 13,
  },

  sortBlock: {
    display: "flex",
    flexDirection: "row",
  },

  head: {
    height: 65,
    backgroundColor: "rgba(199, 210, 254, 0.250)",
  },
  noneData: {
    flex: 1,
    height: 500,
    paddingTop: 250,
    textAlign: "center",
    fontSize: 20,
  },

  styleHeadTable: {
    borderWidth: 1,
    borderColor: "rgba(199, 210, 254, 0.718)",
    minWidth: "100%",
    textAlign: "center",
  },
});
