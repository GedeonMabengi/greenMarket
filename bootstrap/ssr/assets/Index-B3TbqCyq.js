import { jsxs, jsx } from "react/jsx-runtime";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-mCfdzK-q.js";
import { Head } from "@inertiajs/react";
import "@headlessui/react";
import "react";
function Index({ auth, ordersAsBuyer, ordersAsSeller }) {
  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    confirmed: "bg-blue-100 text-blue-800",
    shipped: "bg-purple-100 text-purple-800",
    delivered: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800"
  };
  const statusLabels = {
    pending: "En attente",
    confirmed: "Confirmée",
    shipped: "Expédiée",
    delivered: "Livrée",
    cancelled: "Annulée"
  };
  return /* @__PURE__ */ jsxs(
    AuthenticatedLayout,
    {
      header: /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold leading-tight text-gray-800", children: "Mes commandes" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Mes commandes" }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-white overflow-hidden shadow-sm sm:rounded-lg", children: [
            /* @__PURE__ */ jsx("div", { className: "p-6 border-b border-gray-200", children: /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-gray-900", children: "Mes achats" }) }),
            ordersAsBuyer.length === 0 ? /* @__PURE__ */ jsx("div", { className: "p-6 text-gray-500 text-center", children: "Aucune commande." }) : /* @__PURE__ */ jsx("div", { className: "divide-y divide-gray-200", children: ordersAsBuyer.map((order) => {
              var _a;
              return /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-2", children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsxs("span", { className: "text-sm font-medium text-gray-900", children: [
                      "Commande #",
                      order.id
                    ] }),
                    /* @__PURE__ */ jsxs("span", { className: "ml-3 text-sm text-gray-500", children: [
                      "chez ",
                      (_a = order.seller) == null ? void 0 : _a.name
                    ] })
                  ] }),
                  /* @__PURE__ */ jsx("span", { className: `px-2 py-1 text-xs font-semibold rounded-full ${statusColors[order.status]}`, children: statusLabels[order.status] })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-600", children: order.items.map((item) => {
                  var _a2;
                  return /* @__PURE__ */ jsxs("div", { className: "flex justify-between py-1", children: [
                    /* @__PURE__ */ jsxs("span", { children: [
                      (_a2 = item.product) == null ? void 0 : _a2.name,
                      " x ",
                      Number(item.quantity).toLocaleString()
                    ] }),
                    /* @__PURE__ */ jsxs("span", { children: [
                      Number(item.total_price).toLocaleString(),
                      " FCFA"
                    ] })
                  ] }, item.id);
                }) }),
                /* @__PURE__ */ jsxs("div", { className: "mt-2 text-right font-semibold text-gray-900", children: [
                  "Total : ",
                  Number(order.total_amount).toLocaleString(),
                  " FCFA"
                ] })
              ] }, order.id);
            }) })
          ] }),
          auth.user.is_seller && /* @__PURE__ */ jsxs("div", { className: "bg-white overflow-hidden shadow-sm sm:rounded-lg", children: [
            /* @__PURE__ */ jsx("div", { className: "p-6 border-b border-gray-200", children: /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-gray-900", children: "Mes ventes" }) }),
            ordersAsSeller.length === 0 ? /* @__PURE__ */ jsx("div", { className: "p-6 text-gray-500 text-center", children: "Aucune vente." }) : /* @__PURE__ */ jsx("div", { className: "divide-y divide-gray-200", children: ordersAsSeller.map((order) => {
              var _a;
              return /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-2", children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsxs("span", { className: "text-sm font-medium text-gray-900", children: [
                      "Commande #",
                      order.id
                    ] }),
                    /* @__PURE__ */ jsxs("span", { className: "ml-3 text-sm text-gray-500", children: [
                      "par ",
                      (_a = order.buyer) == null ? void 0 : _a.name
                    ] })
                  ] }),
                  /* @__PURE__ */ jsx("span", { className: `px-2 py-1 text-xs font-semibold rounded-full ${statusColors[order.status]}`, children: statusLabels[order.status] })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-600", children: order.items.map((item) => {
                  var _a2;
                  return /* @__PURE__ */ jsxs("div", { className: "flex justify-between py-1", children: [
                    /* @__PURE__ */ jsxs("span", { children: [
                      (_a2 = item.product) == null ? void 0 : _a2.name,
                      " x ",
                      Number(item.quantity).toLocaleString()
                    ] }),
                    /* @__PURE__ */ jsxs("span", { children: [
                      Number(item.total_price).toLocaleString(),
                      " FCFA"
                    ] })
                  ] }, item.id);
                }) }),
                /* @__PURE__ */ jsxs("div", { className: "mt-2 text-right font-semibold text-gray-900", children: [
                  "Total : ",
                  Number(order.total_amount).toLocaleString(),
                  " FCFA"
                ] })
              ] }, order.id);
            }) })
          ] })
        ] }) })
      ]
    }
  );
}
export {
  Index as default
};
