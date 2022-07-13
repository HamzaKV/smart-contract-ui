import {
  Form
} from "/build/_shared/chunk-F26QDFYF.js";
import {
  React,
  init_react
} from "/build/_shared/chunk-DNEVBLEG.js";

// browser-route-module:/Users/hamza/Documents/Repos/smart-contract-ui/app/routes/index.tsx?browser
init_react();

// app/routes/index.tsx
init_react();
function Index() {
  return /* @__PURE__ */ React.createElement("div", {
    style: { fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }
  }, /* @__PURE__ */ React.createElement(Form, {
    method: "post"
  }, /* @__PURE__ */ React.createElement("label", {
    htmlFor: "rpc-url"
  }, "RPC URL:"), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("input", {
    type: "text",
    id: "rpc-url",
    name: "rpc-url"
  }), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("label", {
    htmlFor: "contract-abi"
  }, "Contract ABI:"), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("textarea", {
    id: "contract-abi",
    name: "contract-abi"
  }), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("label", {
    htmlFor: "private-key"
  }, "Private Key:"), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("input", {
    type: "text",
    id: "private-key",
    name: "private-key"
  }), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("button", {
    type: "submit"
  }, "Submit")));
}
export {
  Index as default
};
//# sourceMappingURL=/build/routes/index-ISZJFBW5.js.map
