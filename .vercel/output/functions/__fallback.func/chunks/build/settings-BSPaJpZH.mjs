import { _ as _sfc_main$1, a as _sfc_main$2 } from './AdminSidebar-BMmB9mFN.mjs';
import { defineComponent, ref, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain } from 'vue/server-renderer';
import { Globe, Mail, Server, Trash2, Save } from 'lucide-vue-next';
import { u as useAuth } from './useAuth-jTt8KfVH.mjs';
import { c as useRouter, u as useHead } from './server.mjs';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "settings",
  __ssrInlineRender: true,
  setup(__props) {
    const sidebarOpen = ref(false);
    const settings = ref({
      companyName: "VanTrans82",
      contactEmail: "contact@vantrans82.ro",
      phoneNumber: "+40 123 456 789",
      address: "Str. Logistica nr. 123\nBucharest, Romania",
      smtpHost: "",
      smtpPort: "587",
      smtpUsername: "",
      smtpPassword: "",
      smtpSecure: false,
      showLanguageSwitch: true
    });
    const systemInfo = ref({
      dbConnected: false,
      environment: "development",
      nodeVersion: "",
      uptime: ""
    });
    const saving = ref(false);
    const deleting = ref(false);
    const message = ref("");
    const messageType = ref("success");
    useAuth();
    useRouter();
    useHead({
      title: "Settings - Admin - VanTrans82"
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
      _push(`<main class="flex-1 p-4 sm:p-6 lg:p-8 lg:ml-0"><div class="max-w-4xl mx-auto"><div class="mb-6 sm:mb-8"><h1 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Settings</h1><p class="text-sm sm:text-base text-gray-600">Manage your website settings and configuration</p></div>`);
      if (message.value) {
        _push(`<div class="${ssrRenderClass([
          "mb-6 p-4 rounded-lg",
          messageType.value === "success" ? "bg-green-50 text-green-800 border border-green-200" : "bg-red-50 text-red-800 border border-red-200"
        ])}">${ssrInterpolate(message.value)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-6"><h2 class="text-lg sm:text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">`);
      _push(ssrRenderComponent(unref(Globe), { class: "w-5 h-5" }, null, _parent));
      _push(` General Settings </h2><div class="space-y-4"><div><label class="block text-sm font-medium text-gray-700 mb-2">Company Name</label><input${ssrRenderAttr("value", settings.value.companyName)} type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent" placeholder="VanTrans82"></div><div><label class="block text-sm font-medium text-gray-700 mb-2">Contact Email</label><input${ssrRenderAttr("value", settings.value.contactEmail)} type="email" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent" placeholder="contact@vantrans82.ro"></div><div><label class="block text-sm font-medium text-gray-700 mb-2">Phone Number</label><input${ssrRenderAttr("value", settings.value.phoneNumber)} type="tel" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent" placeholder="+40 123 456 789"></div><div><label class="block text-sm font-medium text-gray-700 mb-2">Address</label><textarea rows="3" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent" placeholder="Str. Logistica nr. 123, Bucharest, Romania">${ssrInterpolate(settings.value.address)}</textarea></div></div></div><div class="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-6"><h2 class="text-lg sm:text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">`);
      _push(ssrRenderComponent(unref(Mail), { class: "w-5 h-5" }, null, _parent));
      _push(` Email Settings </h2><div class="space-y-4"><div><label class="block text-sm font-medium text-gray-700 mb-2">SMTP Host</label><input${ssrRenderAttr("value", settings.value.smtpHost)} type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent" placeholder="smtp.example.com"></div><div class="grid grid-cols-1 sm:grid-cols-2 gap-4"><div><label class="block text-sm font-medium text-gray-700 mb-2">SMTP Port</label><input${ssrRenderAttr("value", settings.value.smtpPort)} type="number" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent" placeholder="587"></div><div><label class="block text-sm font-medium text-gray-700 mb-2">SMTP Username</label><input${ssrRenderAttr("value", settings.value.smtpUsername)} type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent" placeholder="your-email@example.com"></div></div><div><label class="block text-sm font-medium text-gray-700 mb-2">SMTP Password</label><input${ssrRenderAttr("value", settings.value.smtpPassword)} type="password" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent" placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"></div><div><label class="flex items-center gap-2"><input${ssrIncludeBooleanAttr(Array.isArray(settings.value.smtpSecure) ? ssrLooseContain(settings.value.smtpSecure, null) : settings.value.smtpSecure) ? " checked" : ""} type="checkbox" class="w-4 h-4 text-blue-900 border-gray-300 rounded focus:ring-blue-900"><span class="text-sm text-gray-700">Use SSL/TLS</span></label></div></div></div><div class="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-6"><h2 class="text-lg sm:text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">`);
      _push(ssrRenderComponent(unref(Server), { class: "w-5 h-5" }, null, _parent));
      _push(` System Information </h2><div class="space-y-3"><div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 py-2 border-b border-gray-100"><span class="text-sm text-gray-600">Database Status</span><span class="${ssrRenderClass([
        "px-3 py-1 rounded-full text-xs font-medium",
        systemInfo.value.dbConnected ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
      ])}">${ssrInterpolate(systemInfo.value.dbConnected ? "Connected" : "Disconnected")}</span></div><div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 py-2 border-b border-gray-100"><span class="text-sm text-gray-600">Environment</span><span class="text-sm font-medium text-gray-900">${ssrInterpolate(systemInfo.value.environment)}</span></div><div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 py-2 border-b border-gray-100"><span class="text-sm text-gray-600">Node.js Version</span><span class="text-sm font-medium text-gray-900">${ssrInterpolate(systemInfo.value.nodeVersion)}</span></div><div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 py-2"><span class="text-sm text-gray-600">Uptime</span><span class="text-sm font-medium text-gray-900">${ssrInterpolate(systemInfo.value.uptime)}</span></div></div></div><div class="bg-white rounded-xl shadow-sm border border-red-200 p-4 sm:p-6 mb-6"><h2 class="text-lg sm:text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">`);
      _push(ssrRenderComponent(unref(Trash2), { class: "w-5 h-5 text-red-600" }, null, _parent));
      _push(`<span class="text-red-600">Danger Zone</span></h2><div class="space-y-4"><div><h3 class="text-base font-medium text-gray-900 mb-2">Delete Account</h3><p class="text-sm text-gray-600 mb-4"> Once you delete your account, there is no going back. This action cannot be undone. You will be logged out immediately and will need to create a new account to access the admin area. </p><button${ssrIncludeBooleanAttr(deleting.value) ? " disabled" : ""} class="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">`);
      if (!deleting.value) {
        _push(ssrRenderComponent(unref(Trash2), { class: "w-4 h-4" }, null, _parent));
      } else {
        _push(`<div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>`);
      }
      _push(` ${ssrInterpolate(deleting.value ? "Deleting..." : "Delete My Account")}</button></div></div></div><div class="flex flex-col sm:flex-row justify-end gap-4"><button class="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"> Reset </button><button${ssrIncludeBooleanAttr(saving.value) ? " disabled" : ""} class="px-6 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-950 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">`);
      if (!saving.value) {
        _push(ssrRenderComponent(unref(Save), { class: "w-5 h-5" }, null, _parent));
      } else {
        _push(`<div class="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>`);
      }
      _push(` ${ssrInterpolate(saving.value ? "Saving..." : "Save Settings")}</button></div></div></main></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/settings.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=settings-BSPaJpZH.mjs.map
