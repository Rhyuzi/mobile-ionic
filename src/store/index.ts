import { createStore } from "vuex";
import modules from "./modules";

interface State {
  [key: string]: any;
}

export default createStore<State>({
  modules: modules,
});
