import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@inertiajs/react";
function ProductCard({ product }) {
  var _a, _b;
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow", children: [
    /* @__PURE__ */ jsxs("div", { className: "h-48 bg-gray-200 relative", children: [
      product.image ? /* @__PURE__ */ jsx(
        "img",
        {
          src: `/storage/${product.image}`,
          alt: product.name,
          className: "w-full h-full object-cover"
        }
      ) : /* @__PURE__ */ jsx("div", { className: "w-full h-full flex items-center justify-center text-gray-400", children: /* @__PURE__ */ jsx("svg", { className: "w-16 h-16", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5, d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" }) }) }),
      product.distance !== null && /* @__PURE__ */ jsxs("span", { className: "absolute top-2 right-2 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded-full", children: [
        product.distance,
        " km"
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "p-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "font-semibold text-gray-900", children: product.name }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 mt-1", children: (_a = product.category) == null ? void 0 : _a.name })
        ] }),
        /* @__PURE__ */ jsxs("span", { className: "font-bold text-green-700", children: [
          Number(product.price).toLocaleString(),
          " FCFA"
        ] })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 mt-2 line-clamp-2", children: product.description }),
      /* @__PURE__ */ jsxs("div", { className: "mt-3 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("span", { className: "text-xs text-gray-500", children: [
          Number(product.quantity).toLocaleString(),
          " ",
          product.unit,
          " dispo"
        ] }),
        /* @__PURE__ */ jsx(
          Link,
          {
            href: route("farmers.show", product.user_id),
            className: "text-sm text-green-600 hover:text-green-800",
            children: (_b = product.user) == null ? void 0 : _b.name
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        Link,
        {
          href: route("products.show", product.id),
          className: "mt-4 block w-full text-center bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium",
          children: "Voir le produit"
        }
      )
    ] })
  ] });
}
export {
  ProductCard as P
};
