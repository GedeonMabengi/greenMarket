import { jsxs, jsx } from "react/jsx-runtime";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-mCfdzK-q.js";
import { useForm, Head, Link } from "@inertiajs/react";
import "@headlessui/react";
import "react";
function Index({ auth, products }) {
  const { delete: destroy } = useForm();
  const handleDelete = (id) => {
    if (confirm("Supprimer ce produit ?")) {
      destroy(route("products.destroy", id));
    }
  };
  return /* @__PURE__ */ jsxs(
    AuthenticatedLayout,
    {
      header: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold leading-tight text-gray-800", children: "Mes produits" }),
        /* @__PURE__ */ jsx(
          Link,
          {
            href: route("products.create"),
            className: "bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm font-medium",
            children: "+ Ajouter un produit"
          }
        )
      ] }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Mes produits" }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-7xl sm:px-6 lg:px-8", children: products.data.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "bg-white overflow-hidden shadow-sm sm:rounded-lg p-12 text-center text-gray-500", children: [
          "Vous n'avez pas encore de produits.",
          /* @__PURE__ */ jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsx(
            Link,
            {
              href: route("products.create"),
              className: "text-green-600 hover:text-green-800 font-medium",
              children: "Ajouter votre premier produit"
            }
          ) })
        ] }) : /* @__PURE__ */ jsx("div", { className: "bg-white overflow-hidden shadow-sm sm:rounded-lg", children: /* @__PURE__ */ jsxs("table", { className: "min-w-full divide-y divide-gray-200", children: [
          /* @__PURE__ */ jsx("thead", { className: "bg-gray-50", children: /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase", children: "Produit" }),
            /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase", children: "Prix" }),
            /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase", children: "Stock" }),
            /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase", children: "Statut" }),
            /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase", children: "Actions" })
          ] }) }),
          /* @__PURE__ */ jsx("tbody", { className: "bg-white divide-y divide-gray-200", children: products.data.map((product) => {
            var _a;
            return /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
                /* @__PURE__ */ jsx("div", { className: "h-10 w-10 rounded bg-gray-200 flex-shrink-0 overflow-hidden", children: product.image ? /* @__PURE__ */ jsx("img", { src: `/storage/${product.image}`, alt: "", className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsx("div", { className: "h-full w-full flex items-center justify-center text-gray-400 text-xs", children: "N/A" }) }),
                /* @__PURE__ */ jsxs("div", { className: "ml-4", children: [
                  /* @__PURE__ */ jsx("div", { className: "text-sm font-medium text-gray-900", children: product.name }),
                  /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-500", children: (_a = product.category) == null ? void 0 : _a.name })
                ] })
              ] }) }),
              /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-900", children: [
                Number(product.price).toLocaleString(),
                " FCFA / ",
                product.unit
              ] }),
              /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-900", children: [
                Number(product.quantity).toLocaleString(),
                " ",
                product.unit
              ] }),
              /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsx("span", { className: `px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${product.is_available ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`, children: product.is_available ? "Disponible" : "Indisponible" }) }),
              /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 whitespace-nowrap text-right text-sm font-medium", children: [
                /* @__PURE__ */ jsx(Link, { href: route("products.edit", product.id), className: "text-indigo-600 hover:text-indigo-900 mr-3", children: "Modifier" }),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => handleDelete(product.id),
                    className: "text-red-600 hover:text-red-900",
                    children: "Supprimer"
                  }
                )
              ] })
            ] }, product.id);
          }) })
        ] }) }) }) })
      ]
    }
  );
}
export {
  Index as default
};
