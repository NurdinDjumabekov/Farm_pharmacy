import { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { LoginScreen } from "./LoginScreen";
import { MainScreen } from "./MainScreen";
import { useDispatch, useSelector } from "react-redux";
import { StatusBar } from "expo-status-bar";
import { LogOut } from "../components/Header/LogOut";
import UserInfo from "../components/Header/UserInfo";
import { getLocalDataUser } from "../helpers/returnDataUser";
import { changeLocalData } from "../store/reducers/saveDataSlice";
import { Preloader } from "../components/Preloader";
import { AddProdSoputkaSrceen } from "./AddProdSoputkaSrceen";
import { SoputkaScreen } from "./SoputkaScreen";
import { SoputkaProdHistoryScreen } from "./SoputkaProdHistoryScreen";
import { SearchScreen } from "./SearchScreen";
import ScannerScreen from "./ScannerScreen";
import ScannerProdScreen from "./ScannerProdScreen";

/////// delete
import { LeftoversScreen } from "./LeftoversScreen";
import { PayMoneyScreen } from "./PayMoneyScreen";
import { HistoryBalance } from "./HistoryBalance";
import ChoiceDoctorScreen from "./ChoiceDoctorScreen/ChoiceDoctorScreen";
import EverySaleProdScreen from "./SaleScreen/EverySaleProdScreen/EverySaleProdScreen";

const Stack = createNativeStackNavigator();

export const Navigation = () => {
  const dispatch = useDispatch();

  const { data } = useSelector((state) => state.saveDataSlice);

  useEffect(() => {
    getLocalDataUser({ changeLocalData, dispatch });
  }, []);

  const checkLogin = !data?.seller_guid;

  return (
    <NavigationContainer>
      <Preloader />
      <Stack.Navigator
        screenOptions={{ headerStyle: { backgroundColor: "#fff" } }}
      >
        {checkLogin ? (
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
        ) : (
          <>
            <Stack.Screen
              name="Main"
              component={MainScreen}
              options={({ navigation }) => ({
                title: "",
                headerLeft: () => <UserInfo />,
                headerRight: () => <LogOut navigation={navigation} />,
              })}
            />

            {/* /////////////////////// cameraQRCode ///////////////////////*/}
            <Stack.Screen
              name="ScannerScreen"
              component={ScannerScreen}
              options={{ title: "Сканер" }}
              ////// сканер для докторов
            />

            {/* /////////////////////// cameraQRCode for prod ///////////////////////*/}
            <Stack.Screen
              name="ScannerProdScreen"
              component={ScannerProdScreen}
              options={{ title: "Сканер для продажи товаров" }}
              ////// сканер для продажи товаров
            />

            {/* /////////////////////// Сопутка ///////////////////////*/}
            <Stack.Screen
              name="Soputka"
              component={SoputkaScreen}
              options={{ title: "Проданные товары" }}
            />

            <Stack.Screen
              name="AddProdSoputkaSrceen"
              component={AddProdSoputkaSrceen}
              options={{ title: "Выбор товара" }}
              ///// страница продаж
            />

            <Stack.Screen
              name="EverySaleProdScreen"
              component={EverySaleProdScreen}
              options={{ title: "Назад" }} ////// страница продажи каждого товара
            />

            <Stack.Screen
              name="SoputkaProdHistoryScreen"
              component={SoputkaProdHistoryScreen}
              ///// детальный просмотр каждой истории продаж
            />

            {/* /////////////////////// SearchScreen ///////////////////////*/}
            <Stack.Screen
              name="SearchScreen"
              component={SearchScreen}
              options={{ title: "" }}
            />

            <Stack.Screen
              name="ChoiceDoctorScreen"
              component={ChoiceDoctorScreen}
              options={{ title: "Выбор врача" }}
            />
          </>
        )}
      </Stack.Navigator>
      <StatusBar theme="auto" />
    </NavigationContainer>
  );
};
