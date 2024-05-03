import { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { LoginScreen } from "./LoginScreen";
import { MainScreen } from "./MainScreen";
import { useDispatch, useSelector } from "react-redux";
import { StatusBar } from "expo-status-bar";
import { LogOut } from "../components/Header/LogOut";
import { LeftoversScreen } from "./LeftoversScreen";
import { PayMoneyScreen } from "./PayMoneyScreen";
import UserInfo from "../components/Header/UserInfo";
import { getLocalDataUser } from "../helpers/returnDataUser";
import { changeLocalData } from "../store/reducers/saveDataSlice";
import { Preloader } from "../components/Preloader";
import { HistoryBalance } from "./HistoryBalance";
import { ScannerScreen } from "./ScannerScreen";
import { AddProdSoputkaSrceen } from "./AddProdSoputkaSrceen";
import { SoputkaScreen } from "./SoputkaScreen";
import { SoputkaProductScreen } from "./SoputkaProductScreen";
import { SoputkaProdHistoryScreen } from "./SoputkaProdHistoryScreen";

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
            />

            {/* /////////////////////// HistoryBalance ///////////////////////*/}
            <Stack.Screen
              name="HistoryBalance"
              component={HistoryBalance}
              options={{ title: "История" }}
            />

            {/* /////////////////////// Сопутка ///////////////////////*/}
            <Stack.Screen
              name="Soputka"
              component={SoputkaScreen}
              options={{ title: "Проданные товары и бонусы" }}
            />
            <Stack.Screen
              name="AddProdSoputkaSrceen"
              component={AddProdSoputkaSrceen}
              options={{ title: "Сопутствующие товары" }}
            />
            <Stack.Screen
              name="SoputkaProductScreen"
              component={SoputkaProductScreen}
              options={{ title: "Сопутствующие товары" }}
            />

            <Stack.Screen
              name="SoputkaProdHistoryScreen"
              component={SoputkaProdHistoryScreen}
              options={{ title: "Сопутствующие товары" }}
            />
            {/* /////////////////////// Бонусы ///////////////////////*/}
            <Stack.Screen
              name="Leftovers"
              component={LeftoversScreen}
              options={{ title: "Проданные товары и бонусы " }}
            />

            {/* /////////////////////// 0плата ТТ /////////////////////// */}
            <Stack.Screen
              name="PayMoney"
              component={PayMoneyScreen}
              options={{ title: "Оплата" }}
            />
          </>
        )}
      </Stack.Navigator>
      <StatusBar theme="auto" />
    </NavigationContainer>
  );
};
