import { _ as _sfc_main$1, a as _sfc_main$2 } from './AdminSidebar-BMmB9mFN.mjs';
import { defineComponent, ref, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrIncludeBooleanAttr, ssrLooseContain, ssrRenderAttr, ssrInterpolate, ssrRenderClass, ssrRenderList } from 'vue/server-renderer';
import { Search, X, Save } from 'lucide-vue-next';
import { u as useHead } from './server.mjs';
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
import './useAuth-jTt8KfVH.mjs';
import './nuxt-link-Rggx8N4H.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "translations",
  __ssrInlineRender: true,
  setup(__props) {
    const sidebarOpen = ref(false);
    ref({});
    ref({});
    const showLanguageSwitch = ref(true);
    const saving = ref(false);
    ref(false);
    const message = ref("");
    const messageType = ref("success");
    const searchQuery = ref("");
    const flattenedTranslations = ref({});
    const filteredTranslations = computed(() => {
      if (!searchQuery.value.trim()) {
        return flattenedTranslations.value;
      }
      const query = searchQuery.value.toLowerCase().trim();
      const filtered = {};
      for (const [key, translation] of Object.entries(flattenedTranslations.value)) {
        const keyMatch = key.toLowerCase().includes(query);
        const enMatch = translation.en.toLowerCase().includes(query);
        const roMatch = translation.ro.toLowerCase().includes(query);
        if (keyMatch || enMatch || roMatch) {
          filtered[key] = translation;
        }
      }
      return filtered;
    });
    const filteredTranslationsCount = computed(() => {
      return Object.keys(filteredTranslations.value).length;
    });
    const highlightMatch = (text, query) => {
      if (!query.trim()) {
        return text;
      }
      const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
      return text.replace(regex, '<mark class="bg-yellow-200">$1</mark>');
    };
    useHead({
      title: "Translations - Admin - VanTrans82"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AdminHeader = _sfc_main$1;
      const _component_AdminSidebar = _sfc_main$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_AdminHeader, {
        onToggleSidebar: ($event) => sidebarOpen.value = !sidebarOpen.value
      }, null, _parent));
      _push(`<div class="flex">`);
      _push(ssrRenderComponent(_component_AdminSidebar, {
        "is-open": sidebarOpen.value,
        onClose: ($event) => sidebarOpen.value = false
      }, null, _parent));
      _push(`<main class="flex-1 p-4 sm:p-6 lg:p-8 lg:ml-0 overflow-x-hidden"><div class="max-w-7xl mx-auto w-full"><div class="mb-6 sm:mb-8"><h1 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Translations</h1><p class="text-sm sm:text-base text-gray-600">Manage all translated texts for your website</p></div><div class="mb-6 bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6"><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"><div><h3 class="text-base sm:text-lg font-semibold text-gray-900 mb-1">Language Switcher</h3><p class="text-xs sm:text-sm text-gray-600">Show or hide the language switcher in the storefront </p></div><label class="relative inline-flex items-center cursor-pointer"><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(showLanguageSwitch.value) ? ssrLooseContain(showLanguageSwitch.value, null) : showLanguageSwitch.value) ? " checked" : ""} class="sr-only peer"><div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[&#39;&#39;] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-900"></div></label></div></div><div class="mb-6"><div class="relative">`);
      _push(ssrRenderComponent(unref(Search), { class: "absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" }, null, _parent));
      _push(`<input${ssrRenderAttr("value", searchQuery.value)} type="text" placeholder="Search by key or translation..." class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent">`);
      if (searchQuery.value) {
        _push(`<button class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">`);
        _push(ssrRenderComponent(unref(X), { class: "w-5 h-5" }, null, _parent));
        _push(`</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (searchQuery.value) {
        _push(`<div class="mt-2 text-sm text-gray-600"> Found ${ssrInterpolate(filteredTranslationsCount.value)} translation(s) </div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="mb-6 flex justify-end"><button${ssrIncludeBooleanAttr(saving.value) ? " disabled" : ""} class="w-full sm:w-auto px-6 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-950 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">`);
      if (!saving.value) {
        _push(ssrRenderComponent(unref(Save), { class: "w-5 h-5" }, null, _parent));
      } else {
        _push(`<div class="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>`);
      }
      _push(` ${ssrInterpolate(saving.value ? "Saving..." : "Save Changes")}</button></div>`);
      if (message.value) {
        _push(`<div class="${ssrRenderClass([
          "mb-6 p-4 rounded-lg",
          messageType.value === "success" ? "bg-green-50 text-green-800 border border-green-200" : "bg-red-50 text-red-800 border border-red-200"
        ])}">${ssrInterpolate(message.value)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"><div class="overflow-x-auto"><table class="w-full min-w-[600px]"><thead class="bg-gray-50 border-b border-gray-200"><tr><th class="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-900">Key</th><th class="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-900"><div class="flex items-center gap-2"><span class="inline-block w-2 h-2 rounded-full bg-blue-600"></span><span class="hidden sm:inline">English (EN)</span><span class="sm:hidden">EN</span></div></th><th class="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-900"><div class="flex items-center gap-2"><span class="inline-block w-2 h-2 rounded-full bg-red-600"></span><span class="hidden sm:inline">Rom\xE2n\u0103 (RO)</span><span class="sm:hidden">RO</span></div></th></tr></thead><tbody class="divide-y divide-gray-200"><!--[-->`);
      ssrRenderList(filteredTranslations.value, (translation, key) => {
        var _a;
        _push(`<tr class="hover:bg-gray-50"><td class="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-mono text-gray-600 align-top break-all"><span>${(_a = highlightMatch(key, searchQuery.value)) != null ? _a : ""}</span></td><td class="px-4 sm:px-6 py-3 sm:py-4 align-top"><input${ssrRenderAttr("value", translation.en)} type="text" class="w-full px-2 sm:px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent" placeholder="Enter English translation"></td><td class="px-4 sm:px-6 py-3 sm:py-4 align-top"><input${ssrRenderAttr("value", translation.ro)} type="text" class="w-full px-2 sm:px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent" placeholder="Introdu traducerea \xEEn rom\xE2n\u0103"></td></tr>`);
      });
      _push(`<!--]--></tbody></table></div></div>`);
      if (Object.keys(flattenedTranslations.value).length === 0) {
        _push(`<div class="text-center py-12"><p class="text-gray-500">No translations found</p></div>`);
      } else if (Object.keys(filteredTranslations.value).length === 0 && searchQuery.value) {
        _push(`<div class="text-center py-12"><p class="text-gray-500">No translations match your search query</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></main></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/translations.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=translations-DCmvhDLC.mjs.map
