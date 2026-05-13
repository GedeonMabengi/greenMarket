import { jsxs, jsx } from "react/jsx-runtime";
import { T as TextInput, I as InputError } from "./TextInput-MzM3hN_S.js";
import { I as InputLabel } from "./InputLabel-CE_n4Upz.js";
import { P as PrimaryButton } from "./PrimaryButton-DgVfVBwo.js";
import { Transition } from "@headlessui/react";
import { usePage, useForm, Link } from "@inertiajs/react";
import "react";
function UpdateProfileInformation({ mustVerifyEmail, status, className = "" }) {
  const user = usePage().props.auth.user;
  const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
    name: user.name,
    email: user.email,
    phone: user.phone || "",
    address: user.address || "",
    bio: user.bio || "",
    latitude: user.latitude || "",
    longitude: user.longitude || "",
    avatar: null,
    _method: "patch"
  });
  const submit = (e) => {
    e.preventDefault();
    post(route("profile.update"));
  };
  return /* @__PURE__ */ jsxs("section", { className, children: [
    /* @__PURE__ */ jsxs("header", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-gray-900", children: "Informations du profil" }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-600", children: "Mettez à jour les informations de votre compte." })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "mt-6 space-y-6", encType: "multipart/form-data", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "name", value: "Nom" }),
        /* @__PURE__ */ jsx(TextInput, { id: "name", className: "mt-1 block w-full", value: data.name, onChange: (e) => setData("name", e.target.value), required: true, isFocused: true, autoComplete: "name" }),
        /* @__PURE__ */ jsx(InputError, { className: "mt-2", message: errors.name })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "email", value: "Email" }),
        /* @__PURE__ */ jsx(TextInput, { id: "email", type: "email", className: "mt-1 block w-full", value: data.email, onChange: (e) => setData("email", e.target.value), required: true, autoComplete: "username" }),
        /* @__PURE__ */ jsx(InputError, { className: "mt-2", message: errors.email })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "phone", value: "Téléphone" }),
        /* @__PURE__ */ jsx(TextInput, { id: "phone", className: "mt-1 block w-full", value: data.phone, onChange: (e) => setData("phone", e.target.value) }),
        /* @__PURE__ */ jsx(InputError, { className: "mt-2", message: errors.phone })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "address", value: "Adresse" }),
        /* @__PURE__ */ jsx("textarea", { id: "address", value: data.address, onChange: (e) => setData("address", e.target.value), className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500", rows: 2 }),
        /* @__PURE__ */ jsx(InputError, { className: "mt-2", message: errors.address })
      ] }),
      user.is_seller && /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "bio", value: "Présentation" }),
        /* @__PURE__ */ jsx("textarea", { id: "bio", value: data.bio, onChange: (e) => setData("bio", e.target.value), className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500", rows: 3 }),
        /* @__PURE__ */ jsx(InputError, { className: "mt-2", message: errors.bio })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(InputLabel, { htmlFor: "latitude", value: "Latitude" }),
          /* @__PURE__ */ jsx(TextInput, { id: "latitude", type: "number", step: "any", className: "mt-1 block w-full", value: data.latitude, onChange: (e) => setData("latitude", e.target.value) }),
          /* @__PURE__ */ jsx(InputError, { className: "mt-2", message: errors.latitude })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(InputLabel, { htmlFor: "longitude", value: "Longitude" }),
          /* @__PURE__ */ jsx(TextInput, { id: "longitude", type: "number", step: "any", className: "mt-1 block w-full", value: data.longitude, onChange: (e) => setData("longitude", e.target.value) }),
          /* @__PURE__ */ jsx(InputError, { className: "mt-2", message: errors.longitude })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "avatar", value: "Photo de profil" }),
        user.avatar && /* @__PURE__ */ jsx("div", { className: "mb-2", children: /* @__PURE__ */ jsx("img", { src: `/storage/${user.avatar}`, alt: "", className: "h-20 rounded" }) }),
        /* @__PURE__ */ jsx(
          "input",
          {
            id: "avatar",
            type: "file",
            accept: "image/*",
            onChange: (e) => setData("avatar", e.target.files[0]),
            className: "mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
          }
        ),
        /* @__PURE__ */ jsx(InputError, { className: "mt-2", message: errors.avatar })
      ] }),
      mustVerifyEmail && user.email_verified_at === null && /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("p", { className: "mt-2 text-sm text-gray-800", children: [
          "Votre email n'est pas vérifié.",
          /* @__PURE__ */ jsx(Link, { href: route("verification.send"), method: "post", as: "button", className: "rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2", children: "Renvoyer le lien." })
        ] }),
        status === "verification-link-sent" && /* @__PURE__ */ jsx("div", { className: "mt-2 text-sm font-medium text-green-600", children: "Un nouveau lien a été envoyé." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx(PrimaryButton, { disabled: processing, className: "bg-green-600 hover:bg-green-700", children: "Enregistrer" }),
        /* @__PURE__ */ jsx(Transition, { show: recentlySuccessful, enter: "transition ease-in-out", enterFrom: "opacity-0", leave: "transition ease-in-out", leaveTo: "opacity-0", children: /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Enregistré." }) })
      ] })
    ] })
  ] });
}
export {
  UpdateProfileInformation as default
};
