import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-mCfdzK-q.js";
import { Head, Link } from "@inertiajs/react";
import "@headlessui/react";
import "react";
function Dashboard({ auth }) {
  const user = auth.user;
  return /* @__PURE__ */ jsxs(
    AuthenticatedLayout,
    {
      header: /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold leading-tight text-gray-800", children: "Tableau de bord" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Tableau de bord" }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-7xl sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-white overflow-hidden shadow-sm sm:rounded-lg p-6", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-gray-900 mb-4", children: "Mon profil" }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
              /* @__PURE__ */ jsx("div", { className: "h-16 w-16 rounded-full bg-gray-200 overflow-hidden", children: user.avatar ? /* @__PURE__ */ jsx("img", { src: `/storage/${user.avatar}`, alt: "", className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsx("div", { className: "h-full w-full flex items-center justify-center bg-green-100 text-green-700 text-xl font-bold", children: user.name.charAt(0).toUpperCase() }) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "font-medium text-gray-900", children: user.name }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: user.email }),
                /* @__PURE__ */ jsx("span", { className: `mt-1 inline-block px-2 py-0.5 rounded text-xs font-medium ${user.role === "seller" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}`, children: user.role === "seller" ? "Vendeur" : "Acheteur" })
              ] })
            ] }),
            /* @__PURE__ */ jsx(Link, { href: route("profile.edit"), className: "mt-4 inline-block text-sm text-green-600 hover:text-green-800", children: "Modifier mon profil →" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white overflow-hidden shadow-sm sm:rounded-lg p-6", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-gray-900 mb-4", children: "Actions rapides" }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsx(
                Link,
                {
                  href: route("marketplace.index"),
                  className: "block w-full text-center bg-green-50 text-green-700 py-2 rounded-lg hover:bg-green-100 font-medium",
                  children: "Explorer le marché"
                }
              ),
              user.is_seller && /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx(
                  Link,
                  {
                    href: route("products.index"),
                    className: "block w-full text-center bg-green-50 text-green-700 py-2 rounded-lg hover:bg-green-100 font-medium",
                    children: "Gérer mes produits"
                  }
                ),
                /* @__PURE__ */ jsx(
                  Link,
                  {
                    href: route("products.create"),
                    className: "block w-full text-center bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 font-medium",
                    children: "+ Ajouter un produit"
                  }
                )
              ] }),
              /* @__PURE__ */ jsx(
                Link,
                {
                  href: route("orders.index"),
                  className: "block w-full text-center bg-gray-50 text-gray-700 py-2 rounded-lg hover:bg-gray-100 font-medium",
                  children: "Voir mes commandes"
                }
              )
            ] })
          ] }),
          user.is_seller && /* @__PURE__ */ jsxs("div", { className: "bg-white overflow-hidden shadow-sm sm:rounded-lg p-6", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-gray-900 mb-4", children: "Statistiques" }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: "Produits en vente" }),
                /* @__PURE__ */ jsx("span", { className: "text-2xl font-bold text-green-700", children: user.products_count || 0 })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: "Commandes reçues" }),
                /* @__PURE__ */ jsx("span", { className: "text-2xl font-bold text-green-700", children: user.orders_as_seller_count || 0 })
              ] })
            ] })
          ] })
        ] }) }) })
      ]
    }
  );
}
export {
  Dashboard as default
};
