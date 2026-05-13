import { jsxs, jsx } from "react/jsx-runtime";
import { T as TextInput, I as InputError } from "./TextInput-MzM3hN_S.js";
import { I as InputLabel } from "./InputLabel-CE_n4Upz.js";
import { P as PrimaryButton } from "./PrimaryButton-DgVfVBwo.js";
import { G as GuestLayout } from "./GuestLayout-DaSCEquR.js";
import { useForm, Head, Link } from "@inertiajs/react";
import { useEffect } from "react";
function Register() {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    role: "buyer",
    phone: "",
    address: "",
    bio: "",
    latitude: "",
    longitude: ""
  });
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setData({
            ...data,
            latitude: pos.coords.latitude.toString(),
            longitude: pos.coords.longitude.toString()
          });
        },
        () => {
        }
      );
    }
  }, []);
  const submit = (e) => {
    e.preventDefault();
    post(route("register"), {
      onFinish: () => reset("password", "password_confirmation")
    });
  };
  return /* @__PURE__ */ jsxs(GuestLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Inscription" }),
    /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "name", value: "Nom complet *" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "name",
            name: "name",
            value: data.name,
            className: "mt-1 block w-full",
            autoComplete: "name",
            isFocused: true,
            onChange: (e) => setData("name", e.target.value),
            required: true
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.name, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "email", value: "Email *" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "email",
            type: "email",
            name: "email",
            value: data.email,
            className: "mt-1 block w-full",
            autoComplete: "username",
            onChange: (e) => setData("email", e.target.value),
            required: true
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.email, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "role", value: "Je suis *" }),
        /* @__PURE__ */ jsxs(
          "select",
          {
            id: "role",
            value: data.role,
            onChange: (e) => setData("role", e.target.value),
            className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500",
            required: true,
            children: [
              /* @__PURE__ */ jsx("option", { value: "buyer", children: "Acheteur" }),
              /* @__PURE__ */ jsx("option", { value: "seller", children: "Vendeur (fermier)" })
            ]
          }
        ),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mt-1", children: "Un vendeur peut aussi acheter des produits." }),
        /* @__PURE__ */ jsx(InputError, { message: errors.role, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "phone", value: "Téléphone" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "phone",
            value: data.phone,
            className: "mt-1 block w-full",
            onChange: (e) => setData("phone", e.target.value)
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.phone, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "address", value: "Adresse" }),
        /* @__PURE__ */ jsx(
          "textarea",
          {
            id: "address",
            value: data.address,
            onChange: (e) => setData("address", e.target.value),
            className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500",
            rows: 2
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.address, className: "mt-2" })
      ] }),
      data.role === "seller" && /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "bio", value: "Présentation de la ferme" }),
        /* @__PURE__ */ jsx(
          "textarea",
          {
            id: "bio",
            value: data.bio,
            onChange: (e) => setData("bio", e.target.value),
            className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500",
            rows: 3,
            placeholder: "Décrivez votre ferme, vos produits..."
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.bio, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
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
      /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: "Remplies automatiquement si vous acceptez la géolocalisation." }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "password", value: "Mot de passe *" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "password",
            type: "password",
            name: "password",
            value: data.password,
            className: "mt-1 block w-full",
            autoComplete: "new-password",
            onChange: (e) => setData("password", e.target.value),
            required: true
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.password, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "password_confirmation", value: "Confirmer le mot de passe *" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "password_confirmation",
            type: "password",
            name: "password_confirmation",
            value: data.password_confirmation,
            className: "mt-1 block w-full",
            autoComplete: "new-password",
            onChange: (e) => setData("password_confirmation", e.target.value),
            required: true
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.password_confirmation, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4 flex items-center justify-end", children: [
        /* @__PURE__ */ jsx(
          Link,
          {
            href: route("login"),
            className: "rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2",
            children: "Déjà inscrit ?"
          }
        ),
        /* @__PURE__ */ jsx(PrimaryButton, { className: "ms-4 bg-green-600 hover:bg-green-700", disabled: processing, children: "S'inscrire" })
      ] })
    ] })
  ] });
}
export {
  Register as default
};
