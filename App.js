import { SafeAreaView } from "react-native";
import Search from "./components/search";
import Navigation from "./Navigation/navigation";
import { Provider } from "react-redux";
import Store from "./Store/configureStore";

export default function App() {
  return (
    <Provider store={Store}>
      <SafeAreaView style={{ flex: 1 }}>
        <Navigation />
      </SafeAreaView>
    </Provider>
  );
}
