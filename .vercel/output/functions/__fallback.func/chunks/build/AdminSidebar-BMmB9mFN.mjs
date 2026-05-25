import { _ as _sfc_main$2 } from './NuxtImg-D9GcQBxk.mjs';
import { defineComponent, mergeProps, unref, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass } from 'vue/server-renderer';
import { Menu, ExternalLink, LogOut, X, LayoutDashboard, FileText, Settings } from 'lucide-vue-next';
import { u as useAuth } from './useAuth-jTt8KfVH.mjs';
import { c as useRouter, d as useRoute } from './server.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-Rggx8N4H.mjs';

const _sfc_main$1 = {
  __name: "AdminHeader",
  __ssrInlineRender: true,
  emits: ["toggleSidebar"],
  setup(__props) {
    const { user } = useAuth();
    useRouter();
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      const _component_NuxtImg = _sfc_main$2;
      _push(`<header${ssrRenderAttrs(mergeProps({ class: "bg-white border-b border-gray-200 shadow-sm" }, _attrs))}><div class="px-4 sm:px-6 py-4"><div class="flex items-center justify-between"><div class="flex items-center gap-3"><button class="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors">`);
      _push(ssrRenderComponent(unref(Menu), { class: "w-6 h-6 text-gray-700" }, null, _parent));
      _push(`</button>`);
      _push(ssrRenderComponent(_component_NuxtImg, {
        src: "/vtlogo.png",
        alt: "VanTrans82",
        class: "h-8 sm:h-10 w-auto"
      }, null, _parent));
      _push(`<span class="text-lg sm:text-xl font-bold text-gray-900 hidden sm:inline">Admin Panel</span></div><div class="flex items-center gap-2 sm:gap-4"><a href="/" target="_blank" rel="noopener noreferrer" class="px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs sm:text-sm font-medium flex items-center gap-2">`);
      _push(ssrRenderComponent(unref(ExternalLink), { class: "w-4 h-4" }, null, _parent));
      _push(`<span class="hidden sm:inline">See Website</span><span class="sm:hidden">Website</span></a><div class="text-xs sm:text-sm text-gray-600 hidden sm:block">${ssrInterpolate(((_a = unref(user)) == null ? void 0 : _a.name) || ((_b = unref(user)) == null ? void 0 : _b.email))}</div><button class="px-3 sm:px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-xs sm:text-sm font-medium flex items-center gap-2">`);
      _push(ssrRenderComponent(unref(LogOut), { class: "w-4 h-4" }, null, _parent));
      _push(`<span class="hidden sm:inline">Logout</span></button></div></div></div></header>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/AdminHeader.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AdminSidebar",
  __ssrInlineRender: true,
  props: {
    isOpen: { type: Boolean }
  },
  emits: ["close"],
  setup(__props) {
    const route = useRoute();
    const isActive = (path) => {
      return route.path === path;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<!--[-->`);
      if (__props.isOpen) {
        _push(`<div class="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<aside class="${ssrRenderClass([
        "fixed lg:static inset-y-0 left-0 z-50 bg-white border-r border-gray-200 min-h-screen transition-transform duration-300 ease-in-out",
        __props.isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        "w-64"
      ])}"><nav class="p-4"><div class="flex items-center justify-between mb-4 lg:hidden"><h2 class="text-lg font-semibold text-gray-900">Menu</h2><button class="p-2 hover:bg-gray-100 rounded-lg">`);
      _push(ssrRenderComponent(unref(X), { class: "w-5 h-5 text-gray-600" }, null, _parent));
      _push(`</button></div><ul class="space-y-2"><li>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin",
        onClick: ($event) => _ctx.$emit("close"),
        class: ["flex items-center gap-3 px-4 py-3 rounded-lg transition-colors", isActive("/admin") ? "bg-blue-50 text-blue-900 font-medium" : "text-gray-700 hover:bg-gray-50"]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(LayoutDashboard), { class: "w-5 h-5" }, null, _parent2, _scopeId));
            _push2(`<span${_scopeId}>Dashboard</span>`);
          } else {
            return [
              createVNode(unref(LayoutDashboard), { class: "w-5 h-5" }),
              createVNode("span", null, "Dashboard")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/translations",
        onClick: ($event) => _ctx.$emit("close"),
        class: ["flex items-center gap-3 px-4 py-3 rounded-lg transition-colors", isActive("/admin/translations") ? "bg-blue-50 text-blue-900 font-medium" : "text-gray-700 hover:bg-gray-50"]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(FileText), { class: "w-5 h-5" }, null, _parent2, _scopeId));
            _push2(`<span${_scopeId}>Translations</span>`);
          } else {
            return [
              createVNode(unref(FileText), { class: "w-5 h-5" }),
              createVNode("span", null, "Translations")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/settings",
        onClick: ($event) => _ctx.$emit("close"),
        class: ["flex items-center gap-3 px-4 py-3 rounded-lg transition-colors", isActive("/admin/settings") ? "bg-blue-50 text-blue-900 font-medium" : "text-gray-700 hover:bg-gray-50"]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Settings), { class: "w-5 h-5" }, null, _parent2, _scopeId));
            _push2(`<span${_scopeId}>Settings</span>`);
          } else {
            return [
              createVNode(unref(Settings), { class: "w-5 h-5" }),
              createVNode("span", null, "Settings")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li></ul></nav></aside><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/AdminSidebar.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main$1 as _, _sfc_main as a };
//# sourceMappingURL=AdminSidebar-BMmB9mFN.mjs.map
