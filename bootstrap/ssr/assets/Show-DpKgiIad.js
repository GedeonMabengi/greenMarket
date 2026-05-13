import { jsxs, jsx } from "react/jsx-runtime";
import { Head } from "@inertiajs/react";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-mCfdzK-q.js";
import { G as GuestLayout } from "./GuestLayout-DaSCEquR.js";
import { P as ProductCard } from "./ProductCard-BnaGfXzs.js";
import "@headlessui/react";
import "react";
function Show({ auth, farmer, products }) {
  const Layout = (auth == null ? void 0 : auth.user) ? AuthenticatedLayout : GuestLayout;
  return /* @__PURE__ */ jsxs(Layout, { children: [
    /* @__PURE__ */ jsx(Head, { title: farmer.name }),
    /* @__PURE__ */ jsx("div", { className: "bg-green-50 py-12", children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row items-center gap-6", children: [
      /* @__PURE__ */ jsx("div", { className: "h-24 w-24 rounded-full bg-gray-200 overflow-hidden flex-shrink-0", children: farmer.avatar ? /* @__PURE__ */ jsx("img", { src: `/storage/${farmer.avatar}`, alt: "", className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsx("div", { className: "h-full w-full flex items-center justify-center bg-green-100 text-green-700 text-2xl font-bold", children: farmer.name.charAt(0).toUpperCase() }) }),
      /* @__PURE__ */ jsxs("div", { className: "text-center sm:text-left", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-gray-900", children: farmer.name }),
        farmer.bio && /* @__PURE__ */ jsx("p", { className: "mt-1 text-gray-600 max-w-xl", children: farmer.bio }),
        /* @__PURE__ */ jsxs("div", { className: "mt-2 flex flex-wrap gap-4 text-sm text-gray-500 justify-center sm:justify-start", children: [
          farmer.phone && /* @__PURE__ */ jsxs("span", { children: [
            "📞 ",
            farmer.phone
          ] }),
          farmer.address && /* @__PURE__ */ jsxs("span", { children: [
            "📍 ",
            farmer.address
          ] })
        ] }),
        farmer.latitude && farmer.longitude && /* @__PURE__ */ jsx(
          "a",
          {
            href: `https://www.google.com/maps?q=${farmer.latitude},${farmer.longitude}`,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "inline-block mt-2 text-sm text-green-600 hover:underline",
            children: "Voir la localisation sur Google Maps"
          }
        )
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxs("div", { className: "py-12 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold text-gray-900 mb-6", children: [
        "Produits en vente (",
        products.length,
        ")"
      ] }),
      products.length === 0 ? /* @__PURE__ */ jsx("div", { className: "text-center text-gray-500 py-12", children: "Ce vendeur n'a pas de produits disponibles." }) : /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6", children: products.map((product) => /* @__PURE__ */ jsx(ProductCard, { product }, product.id)) })
    ] })
  ] });
}
export {
  Show as default
};
