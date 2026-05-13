import { jsxs, jsx } from "react/jsx-runtime";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-mCfdzK-q.js";
import { T as TextInput, I as InputError } from "./TextInput-MzM3hN_S.js";
import { I as InputLabel } from "./InputLabel-CE_n4Upz.js";
import { P as PrimaryButton } from "./PrimaryButton-DgVfVBwo.js";
import { useForm, Head } from "@inertiajs/react";
import "@headlessui/react";
import "react";
function Edit({ auth, product, categories }) {
  const { data, setData, post, processing, errors } = useForm({
    name: product.name,
    description: product.description || "",
    price: product.price,
    quantity: product.quantity,
    unit: product.unit,
    category_id: product.category_id,
    image: null,
    is_available: product.is_available,
    latitude: product.latitude || "",
    longitude: product.longitude || "",
    _method: "patch"
  });
  const submit = (e) => {
    e.preventDefault();
    post(route("products.update", product.id));
  };
  return /* @__PURE__ */ jsxs(
    AuthenticatedLayout,
    {
      header: /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold leading-tight text-gray-800", children: "Modifier le produit" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Modifier le produit" }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-3xl sm:px-6 lg:px-8", children: /* @__PURE__ */ jsx("div", { className: "bg-white overflow-hidden shadow-sm sm:rounded-lg p-6", children: /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "space-y-6", encType: "multipart/form-data", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "name", value: "Nom du produit *" }),
            /* @__PURE__ */ jsx(
              TextInput,
              {
                id: "name",
                value: data.name,
                onChange: (e) => setData("name", e.target.value),
                className: "mt-1 block w-full",
                required: true
              }
            ),
            /* @__PURE__ */ jsx(InputError, { message: errors.name, className: "mt-2" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "description", value: "Description" }),
            /* @__PURE__ */ jsx(
              "textarea",
              {
                id: "description",
                value: data.description,
                onChange: (e) => setData("description", e.target.value),
                className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500",
                rows: 3
              }
            ),
            /* @__PURE__ */ jsx(InputError, { message: errors.description, className: "mt-2" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(InputLabel, { htmlFor: "price", value: "Prix (FCFA) *" }),
              /* @__PURE__ */ jsx(
                TextInput,
                {
                  id: "price",
                  type: "number",
                  min: "0",
                  step: "0.01",
                  value: data.price,
                  onChange: (e) => setData("price", e.target.value),
                  className: "mt-1 block w-full",
                  required: true
                }
              ),
              /* @__PURE__ */ jsx(InputError, { message: errors.price, className: "mt-2" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(InputLabel, { htmlFor: "quantity", value: "Quantité *" }),
              /* @__PURE__ */ jsx(
                TextInput,
                {
                  id: "quantity",
                  type: "number",
                  min: "0",
                  step: "0.01",
                  value: data.quantity,
                  onChange: (e) => setData("quantity", e.target.value),
                  className: "mt-1 block w-full",
                  required: true
                }
              ),
              /* @__PURE__ */ jsx(InputError, { message: errors.quantity, className: "mt-2" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(InputLabel, { htmlFor: "unit", value: "Unité *" }),
              /* @__PURE__ */ jsxs(
                "select",
                {
                  id: "unit",
                  value: data.unit,
                  onChange: (e) => setData("unit", e.target.value),
                  className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500",
                  required: true,
                  children: [
                    /* @__PURE__ */ jsx("option", { value: "kg", children: "kg" }),
                    /* @__PURE__ */ jsx("option", { value: "litre", children: "litre" }),
                    /* @__PURE__ */ jsx("option", { value: "unité", children: "unité" }),
                    /* @__PURE__ */ jsx("option", { value: "botte", children: "botte" }),
                    /* @__PURE__ */ jsx("option", { value: "douzaine", children: "douzaine" }),
                    /* @__PURE__ */ jsx("option", { value: "sac", children: "sac" })
                  ]
                }
              ),
              /* @__PURE__ */ jsx(InputError, { message: errors.unit, className: "mt-2" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "category_id", value: "Catégorie *" }),
            /* @__PURE__ */ jsxs(
              "select",
              {
                id: "category_id",
                value: data.category_id,
                onChange: (e) => setData("category_id", e.target.value),
                className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500",
                required: true,
                children: [
                  /* @__PURE__ */ jsx("option", { value: "", children: "Choisir une catégorie" }),
                  categories.map((cat) => /* @__PURE__ */ jsx("option", { value: cat.id, children: cat.name }, cat.id))
                ]
              }
            ),
            /* @__PURE__ */ jsx(InputError, { message: errors.category_id, className: "mt-2" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "image", value: "Image (laisser vide pour conserver l'actuelle)" }),
            product.image && /* @__PURE__ */ jsx("div", { className: "mb-2", children: /* @__PURE__ */ jsx("img", { src: `/storage/${product.image}`, alt: "", className: "h-24 rounded" }) }),
            /* @__PURE__ */ jsx(
              "input",
              {
                id: "image",
                type: "file",
                accept: "image/*",
                onChange: (e) => setData("image", e.target.files[0]),
                className: "mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
              }
            ),
            /* @__PURE__ */ jsx(InputError, { message: errors.image, className: "mt-2" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                id: "is_available",
                type: "checkbox",
                checked: data.is_available,
                onChange: (e) => setData("is_available", e.target.checked),
                className: "rounded border-gray-300 text-green-600 shadow-sm focus:ring-green-500"
              }
            ),
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "is_available", value: "Disponible à la vente" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(InputLabel, { htmlFor: "latitude", value: "Latitude" }),
              /* @__PURE__ */ jsx(
                TextInput,
                {
                  id: "latitude",
                  type: "number",
                  step: "any",
                  value: data.latitude,
                  onChange: (e) => setData("latitude", e.target.value),
                  className: "mt-1 block w-full"
                }
              ),
              /* @__PURE__ */ jsx(InputError, { message: errors.latitude, className: "mt-2" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(InputLabel, { htmlFor: "longitude", value: "Longitude" }),
              /* @__PURE__ */ jsx(
                TextInput,
                {
                  id: "longitude",
                  type: "number",
                  step: "any",
                  value: data.longitude,
                  onChange: (e) => setData("longitude", e.target.value),
                  className: "mt-1 block w-full"
                }
              ),
              /* @__PURE__ */ jsx(InputError, { message: errors.longitude, className: "mt-2" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex items-center gap-4", children: /* @__PURE__ */ jsx(PrimaryButton, { disabled: processing, className: "bg-green-600 hover:bg-green-700", children: "Mettre à jour" }) })
        ] }) }) }) })
      ]
    }
  );
}
export {
  Edit as default
};
