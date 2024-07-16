/// hooks
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

/// tags
import { View, Text, Alert, RefreshControl } from "react-native";
import { TouchableOpacity, FlatList } from "react-native";

/// style
import styles from "./style.js";

/// fns
import { createInvoiceSoputkaTT } from "../../store/reducers/requestSlice";
import { getListAgents } from "../../store/reducers/requestSlice";

const ChoiceDoctorScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const { preloader, listAgents } = useSelector((state) => state.requestSlice);
  const { data } = useSelector((state) => state.saveDataSlice);
  const { seller_guid } = data;

  const getData = () => dispatch(getListAgents({ seller_guid }));

  useEffect(() => {
    getData();
  }, []);

  const choiceDoctor = (obj) => {
    const dataObj = { ...obj, seller_guid };
    dispatch(createInvoiceSoputkaTT({ navigation, dataObj }));
    //// после выбора доктора перекидываю в продажи товаров
  };

  return (
    <View style={styles.parentBlockDoctor}>
      <FlatList
        data={listAgents}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => choiceDoctor(item)}
            style={styles.blockMain}
          >
            <View style={styles.blockMainInner}>
              <View>
                <View style={styles.mainContent}>
                  <Text style={styles.title}>{index + 1}. </Text>
                  <Text style={[styles.title, styles.width85]}>
                    {item?.fio}
                  </Text>
                </View>
              </View>
              <View style={styles.arrow}></View>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item?.guid}
        refreshControl={
          <RefreshControl refreshing={preloader} onRefresh={getData} />
        }
      />
    </View>
  );
};

export default ChoiceDoctorScreen;
