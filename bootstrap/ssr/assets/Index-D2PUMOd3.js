import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useForm, Head, Link } from "@inertiajs/react";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-mCfdzK-q.js";
import { G as GuestLayout } from "./GuestLayout-DaSCEquR.js";
import { P as ProductCard } from "./ProductCard-BnaGfXzs.js";
import { useState, useEffect } from "react";
import "@headlessui/react";
function Index({ auth, products, categories, filters }) {
  const Layout = (auth == null ? void 0 : auth.user) ? AuthenticatedLayout : GuestLayout;
  const { data, setData, get, processing } = useForm({
    search: filters.search || "",
    category: filters.category || "",
    radius: filters.radius || "",
    lat: filters.lat || "",
    lng: filters.lng || ""
  });
  const [locationStatus, setLocationStatus] = useState("");
  useEffect(() => {
    if (!data.lat && !data.lng && navigator.geolocation) {
      setLocationStatus("recherche");
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setData({
            ...data,
            lat: pos.coords.latitude.toString(),
            lng: pos.coords.longitude.toString(),
            radius: data.radius || "50"
          });
          setLocationStatus("trouvée");
        },
        () => setLocationStatus("refusée"),
        { enableHighAccuracy: true }
      );
    }
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    get(route("marketplace.index"), { preserveState: true });
  };
  const handleCategoryClick = (slug) => {
    const newCategory = data.category === slug ? "" : slug;
    setData("category", newCategory);
    get(route("marketplace.index", { ...data, category: newCategory }), { preserveState: true });
  };
  return /* @__PURE__ */ jsxs(Layout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Marché agricole" }),
    /* @__PURE__ */ jsx("div", { className: "bg-green-50 py-12", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold text-green-900 text-center", children: "GreenMarket — Vos produits frais, près de chez vous" }),
      /* @__PURE__ */ jsx("p", { className: "mt-2 text-center text-green-700", children: "Achetez directement auprès des fermiers de votre région" }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "mt-8 max-w-3xl mx-auto space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: data.search,
              onChange: (e) => setData("search", e.target.value),
              placeholder: "Rechercher un produit...",
              className: "flex-1 rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              disabled: processing,
              className: "bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50",
              children: "Rechercher"
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2 justify-center", children: categories.map((cat) => /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => handleCategoryClick(cat.slug),
            className: `px-3 py-1 rounded-full text-sm font-medium transition-colors ${data.category === cat.slug ? "bg-green-600 text-white" : "bg-white text-gray-700 hover:bg-green-100 border border-gray-200"}`,
            children: cat.name
          },
          cat.id
        )) }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 justify-center", children: [
          /* @__PURE__ */ jsxs("label", { className: "text-sm text-gray-600", children: [
            "Rayon max :",
            /* @__PURE__ */ jsxs(
              "select",
              {
                value: data.radius,
                onChange: (e) => setData("radius", e.target.value),
                className: "ml-2 rounded-md border-gray-300 text-sm",
                children: [
                  /* @__PURE__ */ jsx("option", { value: "", children: "Tout" }),
                  /* @__PURE__ */ jsx("option", { value: "5", children: "5 km" }),
                  /* @__PURE__ */ jsx("option", { value: "10", children: "10 km" }),
                  /* @__PURE__ */ jsx("option", { value: "25", children: "25 km" }),
                  /* @__PURE__ */ jsx("option", { value: "50", children: "50 km" }),
                  /* @__PURE__ */ jsx("option", { value: "100", children: "100 km" })
                ]
              }
            )
          ] }),
          locationStatus === "recherche" && /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-500", children: "Localisation en cours..." }),
          locationStatus === "refusée" && /* @__PURE__ */ jsx("span", { className: "text-xs text-orange-500", children: "Localisation refusée" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "py-12 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", children: products.data.length === 0 ? /* @__PURE__ */ jsx("div", { className: "text-center text-gray-500 py-12", children: "Aucun produit trouvé." }) : /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6", children: products.data.map((product) => /* @__PURE__ */ jsx(ProductCard, { product }, product.id)) }),
      /* @__PURE__ */ jsx("div", { className: "mt-8 flex justify-center gap-2", children: products.links.map((link, i) => /* @__PURE__ */ jsx(
        Link,
        {
          href: link.url || "",
          preserveState: true,
          className: `px-4 py-2 rounded-lg text-sm ${link.active ? "bg-green-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"} ${!link.url ? "opacity-50 cursor-not-allowed" : ""}`,
          dangerouslySetInnerHTML: { __html: link.label }
        },
        i
      )) })
    ] }) })
  ] });
}
export {
  Index as default
};
