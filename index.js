/**
 * @format
 */

import { AppRegistry } from "react-native";
import { name as appName } from "./app.json";
import App from "./App";
import i18n from "./src/Assets/Languages/i18n";

AppRegistry.registerComponent(appName, () => App);
