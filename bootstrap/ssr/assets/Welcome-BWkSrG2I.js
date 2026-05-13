import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { Head, Link } from "@inertiajs/react";
function Welcome({ auth }) {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, { title: "GreenMarket" }),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-green-50", children: [
      /* @__PURE__ */ jsx("nav", { className: "bg-white border-b border-gray-100", children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "flex h-16 justify-between items-center", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx("div", { className: "h-8 w-8 bg-green-600 rounded-lg flex items-center justify-center", children: /* @__PURE__ */ jsx("span", { className: "text-white font-bold text-sm", children: "G" }) }),
          /* @__PURE__ */ jsx("span", { className: "font-bold text-xl text-green-800", children: "GreenMarket" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex items-center gap-4", children: auth.user ? /* @__PURE__ */ jsx(
          Link,
          {
            href: route("dashboard"),
            className: "bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm font-medium",
            children: "Tableau de bord"
          }
        ) : /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(Link, { href: route("login"), className: "text-gray-600 hover:text-gray-900 text-sm font-medium", children: "Connexion" }),
          /* @__PURE__ */ jsx(
            Link,
            {
              href: route("register"),
              className: "bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm font-medium",
              children: "S'inscrire"
            }
          )
        ] }) })
      ] }) }) }),
      /* @__PURE__ */ jsxs("div", { className: "py-20 text-center px-4", children: [
        /* @__PURE__ */ jsxs("h1", { className: "text-4xl sm:text-5xl font-extrabold text-green-900", children: [
          "Vos produits frais,",
          /* @__PURE__ */ jsx("br", {}),
          "directement du producteur"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 text-lg text-green-700 max-w-2xl mx-auto", children: "GreenMarket connecte les fermiers avec les consommateurs. Trouvez des produits frais près de chez vous et soutenez l'agriculture locale." }),
        /* @__PURE__ */ jsxs("div", { className: "mt-8 flex justify-center gap-4", children: [
          /* @__PURE__ */ jsx(
            Link,
            {
              href: route("marketplace.index"),
              className: "bg-green-600 text-white px-8 py-3 rounded-xl hover:bg-green-700 font-semibold text-lg",
              children: "Explorer le marché"
            }
          ),
          /* @__PURE__ */ jsx(
            Link,
            {
              href: route("register"),
              className: "bg-white text-green-700 border-2 border-green-600 px-8 py-3 rounded-xl hover:bg-green-50 font-semibold text-lg",
              children: "Devenir vendeur"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "py-16 bg-white", children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8 text-center", children: [
        /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
          /* @__PURE__ */ jsx("div", { className: "h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsxs("svg", { className: "w-6 h-6 text-green-600", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: [
            /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" }),
            /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 11a3 3 0 11-6 0 3 3 0 016 0z" })
          ] }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-gray-900", children: "Proche de chez vous" }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 text-gray-600", children: "Trouvez des produits frais dans un rayon de quelques kilomètres grâce à la géolocalisation." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
          /* @__PURE__ */ jsx("div", { className: "h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6 text-green-600", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }) }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-gray-900", children: "Prix direct producteur" }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 text-gray-600", children: "Achetez sans intermédiaires et profitez de prix justes pour vous et le fermier." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
          /* @__PURE__ */ jsx("div", { className: "h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6 text-green-600", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" }) }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-gray-900", children: "Qualité garantie" }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 text-gray-600", children: "Tous les produits sont frais, locaux et vendus par des agriculteurs vérifiés." })
        ] })
      ] }) }) })
    ] })
  ] });
}
export {
  Welcome as default
};
