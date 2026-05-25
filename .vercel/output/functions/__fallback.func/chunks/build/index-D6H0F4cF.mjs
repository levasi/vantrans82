import { _ as _sfc_main$1$1, a as _sfc_main$3 } from './AdminSidebar-BMmB9mFN.mjs';
import { ref, mergeProps, unref, defineComponent, computed, createVNode, resolveDynamicComponent, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderVNode } from 'vue/server-renderer';
import * as LucideIcons from 'lucide-vue-next';
import { Mail, Clock, Truck, CheckCircle, ChevronRight } from 'lucide-vue-next';
import { u as useHead, n as navigateTo } from './server.mjs';
import { u as useAuth } from './useAuth-jTt8KfVH.mjs';
import './NuxtImg-D9GcQBxk.mjs';
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
import './nuxt-link-Rggx8N4H.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';

const _sfc_main$2 = {
  __name: "AdminStats",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" }, _attrs))}><div class="bg-white rounded-xl border border-gray-200 p-6"><div class="flex items-center justify-between"><div><p class="text-sm text-gray-600 mb-1">Total Messages</p><p class="text-3xl font-bold text-gray-900">0</p></div><div class="p-3 bg-blue-100 rounded-lg">`);
      _push(ssrRenderComponent(unref(Mail), { class: "w-6 h-6 text-blue-900" }, null, _parent));
      _push(`</div></div></div><div class="bg-white rounded-xl border border-gray-200 p-6"><div class="flex items-center justify-between"><div><p class="text-sm text-gray-600 mb-1">Pending Requests</p><p class="text-3xl font-bold text-gray-900">0</p></div><div class="p-3 bg-orange-100 rounded-lg">`);
      _push(ssrRenderComponent(unref(Clock), { class: "w-6 h-6 text-orange-900" }, null, _parent));
      _push(`</div></div></div><div class="bg-white rounded-xl border border-gray-200 p-6"><div class="flex items-center justify-between"><div><p class="text-sm text-gray-600 mb-1">Active Services</p><p class="text-3xl font-bold text-gray-900">4</p></div><div class="p-3 bg-green-100 rounded-lg">`);
      _push(ssrRenderComponent(unref(Truck), { class: "w-6 h-6 text-green-900" }, null, _parent));
      _push(`</div></div></div><div class="bg-white rounded-xl border border-gray-200 p-6"><div class="flex items-center justify-between"><div><p class="text-sm text-gray-600 mb-1">Website Status</p><p class="text-3xl font-bold text-green-600">Online</p></div><div class="p-3 bg-green-100 rounded-lg">`);
      _push(ssrRenderComponent(unref(CheckCircle), { class: "w-6 h-6 text-green-900" }, null, _parent));
      _push(`</div></div></div></div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/AdminStats.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "AdminActionCard",
  __ssrInlineRender: true,
  props: {
    title: {},
    description: {},
    icon: {}
  },
  emits: ["click"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const iconComponent = computed(() => {
      const iconName = props.icon;
      const IconComponent = LucideIcons[iconName];
      return IconComponent || LucideIcons.FileText;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<button${ssrRenderAttrs(mergeProps({ class: "bg-white border border-gray-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-md transition-all text-left w-full group" }, _attrs))}><div class="flex items-start gap-4"><div class="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">`);
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(iconComponent.value), { class: "w-6 h-6 text-blue-900" }, null), _parent);
      _push(`</div><div class="flex-1"><h3 class="font-semibold text-gray-900 mb-1">${ssrInterpolate(__props.title)}</h3><p class="text-sm text-gray-600">${ssrInterpolate(__props.description)}</p></div>`);
      _push(ssrRenderComponent(unref(ChevronRight), { class: "w-5 h-5 text-gray-400 group-hover:text-blue-900 transition-colors" }, null, _parent));
      _push(`</div></button>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/AdminActionCard.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { user } = useAuth();
    const sidebarOpen = ref(false);
    useHead({
      title: "Admin Dashboard - VanTrans82"
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      const _component_AdminHeader = _sfc_main$1$1;
      const _component_AdminSidebar = _sfc_main$3;
      const _component_AdminStats = _sfc_main$2;
      const _component_AdminActionCard = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_AdminHeader, {
        onToggleSidebar: ($event) => sidebarOpen.value = !sidebarOpen.value
      }, null, _parent));
      _push(`<div class="flex">`);
      _push(ssrRenderComponent(_component_AdminSidebar, {
        "is-open": sidebarOpen.value,
        onClose: ($event) => sidebarOpen.value = false
      }, null, _parent));
      _push(`<main class="flex-1 p-4 sm:p-6 lg:p-8 lg:ml-0"><div class="max-w-7xl mx-auto"><div class="mb-6 sm:mb-8"><h1 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Welcome, ${ssrInterpolate(((_a = unref(user)) == null ? void 0 : _a.name) || ((_b = unref(user)) == null ? void 0 : _b.email))}</h1><p class="text-sm sm:text-base text-gray-600">Manage your VanTrans82 website from here</p></div>`);
      _push(ssrRenderComponent(_component_AdminStats, null, null, _parent));
      _push(`<div class="mt-6 sm:mt-8"><h2 class="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">`);
      _push(ssrRenderComponent(_component_AdminActionCard, {
        title: "Translations",
        description: "Edit website translations for all languages",
        icon: "FileText",
        onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/admin/translations")
      }, null, _parent));
      _push(ssrRenderComponent(_component_AdminActionCard, {
        title: "View Messages",
        description: "Check contact form submissions",
        icon: "Mail",
        onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/admin/messages")
      }, null, _parent));
      _push(ssrRenderComponent(_component_AdminActionCard, {
        title: "Settings",
        description: "Configure website settings",
        icon: "Settings",
        onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/admin/settings")
      }, null, _parent));
      _push(`</div></div></div></main></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-D6H0F4cF.mjs.map
