import { jsxs, jsx } from "react/jsx-runtime";
import { Head, Link } from "@inertiajs/react";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-mCfdzK-q.js";
import { G as GuestLayout } from "./GuestLayout-DaSCEquR.js";
import "@headlessui/react";
import "react";
function Show({ auth, product }) {
  var _a, _b;
  const Layout = (auth == null ? void 0 : auth.user) ? AuthenticatedLayout : GuestLayout;
  return /* @__PURE__ */ jsxs(Layout, { children: [
    /* @__PURE__ */ jsx(Head, { title: product.name }),
    /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-5xl px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsx("div", { className: "bg-white overflow-hidden shadow-sm sm:rounded-lg", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-0", children: [
      /* @__PURE__ */ jsx("div", { className: "h-64 md:h-auto bg-gray-200 flex items-center justify-center", children: product.image ? /* @__PURE__ */ jsx(
        "img",
        {
          src: `/storage/${product.image}`,
          alt: product.name,
          className: "w-full h-full object-cover"
        }
      ) : /* @__PURE__ */ jsx("svg", { className: "w-24 h-24 text-gray-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1, d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" }) }) }),
      /* @__PURE__ */ jsxs("div", { className: "p-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm text-gray-500 mb-2", children: [
          /* @__PURE__ */ jsx("span", { className: "bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs font-medium", children: (_a = product.category) == null ? void 0 : _a.name }),
          product.is_available ? /* @__PURE__ */ jsx("span", { className: "bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs font-medium", children: "Disponible" }) : /* @__PURE__ */ jsx("span", { className: "bg-red-100 text-red-800 px-2 py-0.5 rounded text-xs font-medium", children: "Indisponible" })
        ] }),
        /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-gray-900", children: product.name }),
        /* @__PURE__ */ jsxs("p", { className: "mt-4 text-3xl font-bold text-green-700", children: [
          Number(product.price).toLocaleString(),
          " ",
          /* @__PURE__ */ jsxs("span", { className: "text-lg font-normal text-gray-600", children: [
            "FCFA / ",
            product.unit
          ] })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 text-gray-600", children: product.description || "Aucune description." }),
        /* @__PURE__ */ jsxs("div", { className: "mt-6 space-y-2 text-sm text-gray-700", children: [
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("span", { className: "font-medium", children: "Stock :" }),
            " ",
            Number(product.quantity).toLocaleString(),
            " ",
            product.unit
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("span", { className: "font-medium", children: "Vendeur :" }),
            " ",
            /* @__PURE__ */ jsx(Link, { href: route("farmers.show", product.user_id), className: "text-green-600 hover:underline", children: (_b = product.user) == null ? void 0 : _b.name })
          ] }),
          product.latitude && product.longitude && /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("span", { className: "font-medium", children: "Position :" }),
            " ",
            /* @__PURE__ */ jsx(
              "a",
              {
                href: `https://www.google.com/maps?q=${product.latitude},${product.longitude}`,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "text-green-600 hover:underline",
                children: "Voir sur la carte"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-8", children: (auth == null ? void 0 : auth.user) ? /* @__PURE__ */ jsx(
          Link,
          {
            href: route("farmers.show", product.user_id),
            className: "inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 font-medium",
            children: "Contacter le vendeur"
          }
        ) : /* @__PURE__ */ jsx(
          Link,
          {
            href: route("login"),
            className: "inline-block bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900 font-medium",
            children: "Connectez-vous pour acheter"
          }
        ) })
      ] })
    ] }) }) }) })
  ] });
}
export {
  Show as default
};
