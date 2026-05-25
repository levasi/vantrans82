import { _ as _sfc_main$1 } from './NuxtImg-D9GcQBxk.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-Rggx8N4H.mjs';
import { ref, mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { u as useAuth } from './useAuth-jTt8KfVH.mjs';
import { c as useRouter, u as useHead } from './server.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'vue-router';
import 'pg';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';

const _sfc_main = {
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    useAuth();
    useRouter();
    const formData = ref({
      email: "",
      password: ""
    });
    const error = ref("");
    const loading = ref(false);
    useHead({
      title: "Admin Login - VanTrans82"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtImg = _sfc_main$1;
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 flex items-center justify-center px-4 py-8" }, _attrs))}><div class="w-full max-w-md mx-auto"><div class="bg-white rounded-2xl shadow-2xl p-6 sm:p-8"><div class="flex justify-center mb-8">`);
      _push(ssrRenderComponent(_component_NuxtImg, {
        src: "/vtlogo.png",
        alt: "VanTrans82",
        class: "h-16 w-auto"
      }, null, _parent));
      _push(`</div><h1 class="text-3xl font-bold text-gray-900 text-center mb-2">Admin Login</h1><p class="text-gray-600 text-center mb-8">Sign in to access the admin area</p>`);
      if (error.value) {
        _push(`<div class="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg"><p class="text-sm text-red-600">${ssrInterpolate(error.value)}</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<form class="space-y-6"><div><label for="email" class="block text-sm font-medium text-gray-700 mb-2"> Email Address </label><input id="email"${ssrRenderAttr("value", formData.value.email)} type="email" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent" placeholder="admin@vantrans82.ro"></div><div><label for="password" class="block text-sm font-medium text-gray-700 mb-2"> Password </label><input id="password"${ssrRenderAttr("value", formData.value.password)} type="password" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent" placeholder="Enter your password"></div><button type="submit"${ssrIncludeBooleanAttr(loading.value) ? " disabled" : ""} class="w-full px-6 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-950 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">`);
      if (!loading.value) {
        _push(`<span>Sign In</span>`);
      } else {
        _push(`<span class="flex items-center gap-2"><svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Signing in... </span>`);
      }
      _push(`</button></form><div class="mt-6 text-center"><p class="text-sm text-gray-600"> Don&#39;t have an account? `);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/register",
        class: "text-blue-900 font-medium hover:underline"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Create one `);
          } else {
            return [
              createTextVNode(" Create one ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</p></div><p class="mt-6 text-center text-sm text-gray-500"> VanTrans82 Admin Portal </p></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=login-BZz3m33t.mjs.map
