import { reactive } from "vue";

const store = reactive({
  loading: false,
  tasks: [],
  states: [],
});

const setStateProp = (propName, newValue) => {
  store[propName] = newValue;
};

export default { state: store, setStateProp };
