import {
  React,
  __toESM,
  init_react,
  require_react,
  useActionData
} from "/build/_shared/chunk-GUSZJOPM.js";

// browser-route-module:/Users/hamza/Documents/Repos/smart-contract-ui/app/routes/contract.tsx?browser
init_react();

// app/routes/contract.tsx
init_react();
var import_react2 = __toESM(require_react());
function Contract() {
  const data = useActionData();
  console.log(data);
  return /* @__PURE__ */ React.createElement("div", {
    style: { fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }
  }, data && data.contractAbi.map((item, key) => {
    switch (item.type) {
      case "function":
        return /* @__PURE__ */ React.createElement(ContractFunction, {
          key,
          name: item.name,
          args: item.inputs,
          onSubmit: (value) => ""
        });
      default:
        return null;
    }
  }));
}
var ContractFunction = ({ name, args, onSubmit }) => {
  const [state, setState] = (0, import_react2.useState)({});
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", null, name), args.map((item, key) => /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("label", {
    key
  }, item.name, " (", item.type, ")", /* @__PURE__ */ React.createElement("input", {
    type: "text",
    onChange: (e) => setState((prev) => ({
      ...prev,
      [item.name]: e.target.value
    }))
  })), /* @__PURE__ */ React.createElement("br", null))), /* @__PURE__ */ React.createElement("button", {
    onClick: () => onSubmit(state)
  }, "Submit"));
};
export {
  Contract as default
};
//# sourceMappingURL=/build/routes/contract-2BWGJZ2U.js.map
