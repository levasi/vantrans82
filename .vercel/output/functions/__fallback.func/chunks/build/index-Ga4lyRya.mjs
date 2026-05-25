import { _ as _sfc_main$e } from './NuxtImg-D9GcQBxk.mjs';
import { mergeProps, ref, watch, unref, computed, createVNode, resolveDynamicComponent, readonly, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrInterpolate, ssrRenderStyle, ssrRenderList, ssrRenderVNode, ssrRenderAttr } from 'vue/server-renderer';
import { X, Menu, Truck, Zap, Globe, ArrowRight, Clock, Shield, TrendingUp, Headphones, Settings, Package, Container, CheckCircle, MapPin, Phone, Quote, Users, ChevronDown, Send, Mail, MessageCircle, Facebook, Linkedin, Twitter } from 'lucide-vue-next';
import { u as useHead, b as useI18n, a as useState } from './server.mjs';
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

const useSettings = () => {
  const settings = useState("publicSettings", () => ({
    showLanguageSwitch: true,
    companyName: "VanTrans82",
    phoneNumber: "+40 123 456 789",
    contactEmail: "contact@vantrans82.ro",
    address: "Str. Logistica nr. 123\nBucharest, Romania"
  }));
  const isLoading = useState("settingsLoading", () => false);
  const isLoaded = useState("settingsLoaded", () => false);
  const loadSettings = async () => {
    var _a, _b, _c, _d, _e;
    if (isLoaded.value) {
      return;
    }
    if (isLoading.value) {
      return;
    }
    isLoading.value = true;
    try {
      const response = await $fetch("/api/settings/public");
      if (response) {
        settings.value = {
          showLanguageSwitch: (_a = response.showLanguageSwitch) != null ? _a : settings.value.showLanguageSwitch,
          companyName: (_b = response.companyName) != null ? _b : settings.value.companyName,
          phoneNumber: (_c = response.phoneNumber) != null ? _c : settings.value.phoneNumber,
          contactEmail: (_d = response.contactEmail) != null ? _d : settings.value.contactEmail,
          address: (_e = response.address) != null ? _e : settings.value.address
        };
        isLoaded.value = true;
      }
    } catch (error) {
      console.error("Failed to load settings:", error);
    } finally {
      isLoading.value = false;
    }
  };
  const formatPhoneForTel = (phone) => {
    return phone.replace(/\s+/g, "").replace(/[^\d+]/g, "");
  };
  const formatPhoneForWhatsApp = (phone) => {
    return phone.replace(/\s+/g, "").replace(/[^\d]/g, "");
  };
  return {
    settings: readonly(settings),
    isLoading: readonly(isLoading),
    loadSettings,
    formatPhoneForTel,
    formatPhoneForWhatsApp
  };
};
const _sfc_main$d = {
  __name: "Header",
  __ssrInlineRender: true,
  setup(__props) {
    const { locale, setLocale } = useI18n();
    const mobileMenuOpen = ref(false);
    const showLanguageSwitch = ref(true);
    const activeSection = ref("home");
    function navLinkClass(sectionId, isMobile = false) {
      const base = isMobile ? "text-left transition-colors py-2" : "transition-colors";
      const active = "text-blue-900 font-semibold";
      const inactive = "text-gray-700 hover:text-blue-900";
      return [base, activeSection.value === sectionId ? active : inactive].join(" ");
    }
    const { settings } = useSettings();
    watch(() => settings.value.showLanguageSwitch, (newValue) => {
      showLanguageSwitch.value = newValue;
    }, { immediate: true });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtImg = _sfc_main$e;
      _push(`<header${ssrRenderAttrs(mergeProps({ class: "sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm" }, _attrs))}><nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="flex justify-between items-center h-16 md:h-20"><div class="flex-shrink-0"><button class="flex items-center gap-2 hover:opacity-80 transition-opacity">`);
      _push(ssrRenderComponent(_component_NuxtImg, {
        src: "/vtlogo.png",
        alt: "VanTrans82",
        class: "h-12 w-auto transition-all duration-300"
      }, null, _parent));
      _push(`</button></div><div class="hidden md:flex items-center gap-8"><button class="${ssrRenderClass(navLinkClass("home"))}">${ssrInterpolate(_ctx.$t("nav.home"))}</button><button class="${ssrRenderClass(navLinkClass("services"))}">${ssrInterpolate(_ctx.$t("nav.services"))}</button><button class="${ssrRenderClass(navLinkClass("fleet"))}">${ssrInterpolate(_ctx.$t("nav.fleet"))}</button><button class="${ssrRenderClass(navLinkClass("coverage"))}">${ssrInterpolate(_ctx.$t("nav.coverage"))}</button><button class="${ssrRenderClass(navLinkClass("about"))}">${ssrInterpolate(_ctx.$t("nav.about"))}</button><button class="${ssrRenderClass(navLinkClass("faq"))}">${ssrInterpolate(_ctx.$t("nav.faq"))}</button><button class="${ssrRenderClass(navLinkClass("contact"))}">${ssrInterpolate(_ctx.$t("nav.contact"))}</button></div><div class="hidden md:flex items-center gap-4">`);
      if (showLanguageSwitch.value) {
        _push(`<div class="flex items-center gap-2 border border-gray-300 rounded-lg p-1"><button class="${ssrRenderClass([
          "px-3 py-1 rounded text-sm transition-colors",
          unref(locale) === "en" ? "bg-blue-900 text-white" : "text-gray-700 hover:bg-gray-100"
        ])}"> EN </button><button class="${ssrRenderClass([
          "px-3 py-1 rounded text-sm transition-colors",
          unref(locale) === "ro" ? "bg-blue-900 text-white" : "text-gray-700 hover:bg-gray-100"
        ])}"> RO </button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button class="px-6 py-2.5 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">${ssrInterpolate(_ctx.$t("nav.getQuote"))}</button></div><button class="md:hidden p-2">`);
      if (mobileMenuOpen.value) {
        _push(ssrRenderComponent(unref(X), { class: "w-6 h-6 text-gray-700" }, null, _parent));
      } else {
        _push(ssrRenderComponent(unref(Menu), { class: "w-6 h-6 text-gray-700" }, null, _parent));
      }
      _push(`</button></div>`);
      if (mobileMenuOpen.value) {
        _push(`<div class="md:hidden py-4 border-t border-gray-200"><div class="flex flex-col gap-4"><button class="${ssrRenderClass(navLinkClass("home", true))}">${ssrInterpolate(_ctx.$t("nav.home"))}</button><button class="${ssrRenderClass(navLinkClass("services", true))}">${ssrInterpolate(_ctx.$t("nav.services"))}</button><button class="${ssrRenderClass(navLinkClass("fleet", true))}">${ssrInterpolate(_ctx.$t("nav.fleet"))}</button><button class="${ssrRenderClass(navLinkClass("coverage", true))}">${ssrInterpolate(_ctx.$t("nav.coverage"))}</button><button class="${ssrRenderClass(navLinkClass("about", true))}">${ssrInterpolate(_ctx.$t("nav.about"))}</button><button class="${ssrRenderClass(navLinkClass("faq", true))}">${ssrInterpolate(_ctx.$t("nav.faq"))}</button><button class="${ssrRenderClass(navLinkClass("contact", true))}">${ssrInterpolate(_ctx.$t("nav.contact"))}</button>`);
        if (showLanguageSwitch.value) {
          _push(`<div class="flex items-center gap-2 border border-gray-300 rounded-lg p-1"><button class="${ssrRenderClass([
            "px-3 py-1 rounded text-sm transition-colors flex-1",
            unref(locale) === "en" ? "bg-blue-900 text-white" : "text-gray-700 hover:bg-gray-100"
          ])}"> EN </button><button class="${ssrRenderClass([
            "px-3 py-1 rounded text-sm transition-colors flex-1",
            unref(locale) === "ro" ? "bg-blue-900 text-white" : "text-gray-700 hover:bg-gray-100"
          ])}"> RO </button></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<button class="w-full px-6 py-2.5 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">${ssrInterpolate(_ctx.$t("nav.getQuote"))}</button></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</nav></header>`);
    };
  }
};
const _sfc_setup$d = _sfc_main$d.setup;
_sfc_main$d.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Header.vue");
  return _sfc_setup$d ? _sfc_setup$d(props, ctx) : void 0;
};
const _sfc_main$c = {
  __name: "Hero",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    const heroServices = computed(() => [
      {
        icon: Truck,
        title: t("services.roadTransport"),
        description: t("services.roadTransportDesc")
      },
      {
        icon: Zap,
        title: t("services.expressDelivery"),
        description: t("services.expressDeliveryDesc")
      },
      {
        icon: Globe,
        title: t("services.internationalFreight"),
        description: t("services.internationalFreightDesc")
      }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtImg = _sfc_main$e;
      _push(`<section${ssrRenderAttrs(mergeProps({
        id: "home",
        class: "relative text-white overflow-hidden min-h-[90vh] flex items-center"
      }, _attrs))}><div class="absolute inset-0 w-full h-full">`);
      _push(ssrRenderComponent(_component_NuxtImg, {
        src: "/2.png",
        alt: "VanTrans82 Logistics",
        class: "w-full h-full object-cover",
        loading: "eager",
        format: "webp",
        quality: "90"
      }, null, _parent));
      _push(`<div class="absolute inset-0 bg-gradient-to-br from-blue-950/50 via-blue-900/45 to-blue-800/40"></div><div class="absolute inset-0 bg-gradient-to-tr from-transparent via-orange-600/10 to-transparent"></div><div class="absolute inset-0" style="${ssrRenderStyle({ "background": "radial-gradient(circle at center, transparent 0%, rgba(15, 23, 42, 0.2) 50%, rgba(15, 23, 42, 0.4) 100%)" })}"></div><div class="absolute inset-0 opacity-5" style="${ssrRenderStyle({ "background-image": "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.03) 10px, rgba(255,255,255,0.03) 20px)" })}"></div></div><div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 w-full"><div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"><div class="backdrop-blur-sm bg-white/5 rounded-2xl p-6 md:p-8 border border-white/10 shadow-2xl"><h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight drop-shadow-2xl">${ssrInterpolate(_ctx.$t("hero.title"))}</h1><p class="text-lg md:text-xl text-blue-50 mb-8 leading-relaxed drop-shadow-lg">${ssrInterpolate(_ctx.$t("hero.subtitle"))}</p><div class="flex flex-col sm:flex-row gap-4"><button class="px-8 py-4 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-all transform hover:scale-105 shadow-lg shadow-orange-600/50 flex items-center justify-center gap-2 font-medium">${ssrInterpolate(_ctx.$t("hero.requestQuote"))} `);
      _push(ssrRenderComponent(unref(ArrowRight), { class: "w-5 h-5" }, null, _parent));
      _push(`</button><button class="px-8 py-4 bg-white/10 text-white border-2 border-white/30 rounded-lg hover:bg-white/20 transition-all backdrop-blur-sm font-medium hover:scale-105">${ssrInterpolate(_ctx.$t("hero.ourServices"))}</button></div></div><div class="relative"><div class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4 lg:gap-6"><!--[-->`);
      ssrRenderList(heroServices.value, (service, index) => {
        _push(`<div class="backdrop-blur-md bg-white/10 rounded-xl p-6 border border-white/20 shadow-xl transform hover:scale-105 transition-all cursor-pointer group"><div class="flex items-start gap-4"><div class="p-3 bg-orange-600/30 rounded-lg backdrop-blur-sm group-hover:bg-orange-600/40 transition-colors">`);
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(service.icon), { class: "w-8 h-8 text-orange-300" }, null), _parent);
        _push(`</div><div class="flex-1"><h3 class="text-lg lg:text-xl font-bold text-white mb-2 group-hover:text-orange-300 transition-colors">${ssrInterpolate(service.title)}</h3><p class="text-sm text-blue-100 leading-relaxed line-clamp-2">${ssrInterpolate(service.description)}</p></div></div></div>`);
      });
      _push(`<!--]--></div><div class="absolute -bottom-8 -right-8 w-40 h-40 bg-orange-500/20 rounded-full blur-3xl animate-pulse pointer-events-none"></div><div class="absolute -top-8 -left-8 w-32 h-32 bg-blue-400/20 rounded-full blur-3xl animate-pulse pointer-events-none" style="${ssrRenderStyle({ "animation-delay": "1s" })}"></div></div></div></div></section>`);
    };
  }
};
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Hero.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
const _sfc_main$b = {
  __name: "Features",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "py-16 md:py-20 bg-white border-b border-gray-100" }, _attrs))}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"><div class="text-center"><div class="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-xl mb-4">`);
      _push(ssrRenderComponent(unref(Clock), { class: "w-8 h-8 text-orange-600" }, null, _parent));
      _push(`</div><h3 class="font-bold text-gray-900 mb-2">${ssrInterpolate(_ctx.$t("features.fastDelivery"))}</h3><p class="text-sm text-gray-600">${ssrInterpolate(_ctx.$t("features.fastDeliveryDesc"))}</p></div><div class="text-center"><div class="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-xl mb-4">`);
      _push(ssrRenderComponent(unref(Shield), { class: "w-8 h-8 text-blue-900" }, null, _parent));
      _push(`</div><h3 class="font-bold text-gray-900 mb-2">${ssrInterpolate(_ctx.$t("features.secureTransport"))}</h3><p class="text-sm text-gray-600">${ssrInterpolate(_ctx.$t("features.secureTransportDesc"))}</p></div><div class="text-center"><div class="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-xl mb-4">`);
      _push(ssrRenderComponent(unref(TrendingUp), { class: "w-8 h-8 text-green-600" }, null, _parent));
      _push(`</div><h3 class="font-bold text-gray-900 mb-2">${ssrInterpolate(_ctx.$t("features.liveTracking"))}</h3><p class="text-sm text-gray-600">${ssrInterpolate(_ctx.$t("features.liveTrackingDesc"))}</p></div><div class="text-center"><div class="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-xl mb-4">`);
      _push(ssrRenderComponent(unref(Headphones), { class: "w-8 h-8 text-purple-600" }, null, _parent));
      _push(`</div><h3 class="font-bold text-gray-900 mb-2">${ssrInterpolate(_ctx.$t("features.support"))}</h3><p class="text-sm text-gray-600">${ssrInterpolate(_ctx.$t("features.supportDesc"))}</p></div></div></div></section>`);
    };
  }
};
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Features.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const _sfc_main$a = {
  __name: "Services",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    const services = computed(() => [
      {
        icon: Truck,
        title: t("services.roadTransport"),
        description: t("services.roadTransportDesc"),
        image: "https://images.unsplash.com/photo-1643119270753-9f506b137e38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2FkJTIwaGlnaHdheSUyMHRyYW5zcG9ydHxlbnwxfHx8fDE3Njc3MzkxNTN8MA&ixlib=rb-4.1.0&q=80&w=1080"
      },
      {
        icon: Zap,
        title: t("services.expressDelivery"),
        description: t("services.expressDeliveryDesc"),
        image: "https://images.unsplash.com/photo-1761454200783-ca533f7928e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWxpdmVyeSUyMHZhbiUyMHZlaGljbGV8ZW58MXx8fHwxNzY3NzM4ODM1fDA&ixlib=rb-4.1.0&q=80&w=1080"
      },
      {
        icon: Globe,
        title: t("services.internationalFreight"),
        description: t("services.internationalFreightDesc"),
        image: "https://images.unsplash.com/photo-1663103746090-2e4274c6c7ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaGlwcGluZyUyMGNvbnRhaW5lciUyMHBvcnR8ZW58MXx8fHwxNzY3NzM5MTUyfDA&ixlib=rb-4.1.0&q=80&w=1080"
      },
      {
        icon: Settings,
        title: t("services.customLogistics"),
        description: t("services.customLogisticsDesc"),
        image: "https://images.unsplash.com/photo-1726866672851-5b99c837603c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXJlaG91c2UlMjBtb2Rlcm4lMjBmYWNpbGl0eXxlbnwxfHx8fDE3Njc3MzkxNTF8MA&ixlib=rb-4.1.0&q=80&w=1080"
      }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        id: "services",
        class: "py-20 md:py-24 bg-gray-50"
      }, _attrs))}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="text-center max-w-3xl mx-auto mb-16"><h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">${ssrInterpolate(_ctx.$t("services.title"))}</h2><p class="text-lg text-gray-600">${ssrInterpolate(_ctx.$t("services.subtitle"))}</p></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"><!--[-->`);
      ssrRenderList(services.value, (service, index) => {
        _push(`<div class="bg-white rounded-xl border border-gray-200 hover:border-orange-400 hover:shadow-lg transition-all duration-300 overflow-hidden group"><div class="relative h-48 overflow-hidden"><img${ssrRenderAttr("src", service.image)}${ssrRenderAttr("alt", service.title)} class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"><div class="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent"></div><div class="absolute bottom-4 left-4 w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-lg">`);
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(service.icon), { class: "w-6 h-6 text-blue-900" }, null), _parent);
        _push(`</div></div><div class="p-6"><h3 class="text-xl font-bold text-gray-900 mb-3">${ssrInterpolate(service.title)}</h3><p class="text-gray-600 leading-relaxed">${ssrInterpolate(service.description)}</p></div></div>`);
      });
      _push(`<!--]--></div></div></section>`);
    };
  }
};
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Services.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const _sfc_main$9 = {
  __name: "Process",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    const steps = computed(() => [
      {
        number: "01",
        title: t("process.requestQuote"),
        description: t("process.requestQuoteDesc"),
        image: "https://images.unsplash.com/photo-1763736809655-9337caf643cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb2dpc3RpY3MlMjBjb250cm9sJTIwY2VudGVyfGVufDF8fHx8MTc2NzczOTE1Mnww&ixlib=rb-4.1.0&q=80&w=1080"
      },
      {
        number: "02",
        title: t("process.planRoute"),
        description: t("process.planRouteDesc"),
        image: "https://images.unsplash.com/photo-1730317195704-29f7ced19356?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxldXJvcGUlMjBtYXAlMjBnZW9ncmFwaHl8ZW58MXx8fHwxNzY3NzM5MTUxfDA&ixlib=rb-4.1.0&q=80&w=1080"
      },
      {
        number: "03",
        title: t("process.safeTransport"),
        description: t("process.safeTransportDesc"),
        image: "https://images.unsplash.com/photo-1738507869660-b44ea20ab037?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cnVjayUyMGhpZ2h3YXklMjBsb2dpc3RpY3N8ZW58MXx8fHwxNzY3NzM0MzUzfDA&ixlib=rb-4.1.0&q=80&w=1080"
      },
      {
        number: "04",
        title: t("process.delivery"),
        description: t("process.deliveryDesc"),
        image: "https://images.unsplash.com/photo-1657819547860-ea03df0eafa8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXJlaG91c2UlMjBsb2dpc3RpY3MlMjB0ZWFtfGVufDF8fHx8MTc2NzczODgzNXww&ixlib=rb-4.1.0&q=80&w=1080"
      }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "py-20 md:py-24 bg-white" }, _attrs))}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="text-center max-w-3xl mx-auto mb-16"><h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">${ssrInterpolate(_ctx.$t("process.title"))}</h2><p class="text-lg text-gray-600">${ssrInterpolate(_ctx.$t("process.subtitle"))}</p></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"><!--[-->`);
      ssrRenderList(steps.value, (step, index) => {
        _push(`<div class="relative group">`);
        if (index < steps.value.length - 1) {
          _push(`<div class="hidden lg:block absolute top-24 left-1/2 w-full h-0.5 bg-gradient-to-r from-orange-600 to-blue-900 z-0"></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="relative z-10"><div class="relative h-48 rounded-xl overflow-hidden mb-6 border-4 border-white shadow-lg group-hover:shadow-xl transition-shadow"><img${ssrRenderAttr("src", step.image)}${ssrRenderAttr("alt", step.title)} class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"><div class="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent"></div><div class="absolute top-4 left-4 w-14 h-14 bg-orange-600 rounded-full flex items-center justify-center border-4 border-white shadow-lg"><span class="text-white font-bold text-lg">${ssrInterpolate(step.number)}</span></div></div><div class="text-center"><h3 class="text-xl font-bold text-gray-900 mb-2">${ssrInterpolate(step.title)}</h3><p class="text-gray-600">${ssrInterpolate(step.description)}</p></div></div></div>`);
      });
      _push(`<!--]--></div></div></section>`);
    };
  }
};
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Process.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const _sfc_main$8 = {
  __name: "Fleet",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    const vehicles = computed(() => [
      {
        icon: Package,
        name: t("fleet.vans"),
        capacity: t("fleet.vansCapacity"),
        description: t("fleet.vansDesc"),
        image: "https://images.unsplash.com/photo-1761454200783-ca533f7928e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWxpdmVyeSUyMHZhbiUyMHZlaGljbGV8ZW58MXx8fHwxNzY3NzM4ODM1fDA&ixlib=rb-4.1.0&q=80&w=1080"
      },
      {
        icon: Truck,
        name: t("fleet.trucks"),
        capacity: t("fleet.trucksCapacity"),
        description: t("fleet.trucksDesc"),
        image: "https://images.unsplash.com/photo-1738507869660-b44ea20ab037?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cnVjayUyMGhpZ2h3YXklMjBsb2dpc3RpY3N8ZW58MXx8fHwxNzY3NzM0MzUzfDA&ixlib=rb-4.1.0&q=80&w=1080"
      },
      {
        icon: Container,
        name: t("fleet.trailers"),
        capacity: t("fleet.trailersCapacity"),
        description: t("fleet.trailersDesc"),
        image: "https://images.unsplash.com/photo-1703977883249-d959f2b0c1ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJnbyUyMHRyYW5zcG9ydCUyMHNoaXBwaW5nfGVufDF8fHx8MTc2NzczODgzNXww&ixlib=rb-4.1.0&q=80&w=1080"
      }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        id: "fleet",
        class: "py-20 md:py-24 bg-white"
      }, _attrs))}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="text-center max-w-3xl mx-auto mb-16"><h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">${ssrInterpolate(_ctx.$t("fleet.title"))}</h2><p class="text-lg text-gray-600">${ssrInterpolate(_ctx.$t("fleet.subtitle"))}</p></div><div class="grid grid-cols-1 md:grid-cols-3 gap-8"><!--[-->`);
      ssrRenderList(vehicles.value, (vehicle, index) => {
        _push(`<div class="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300"><div class="relative h-48 bg-gray-100 overflow-hidden"><img${ssrRenderAttr("src", vehicle.image)}${ssrRenderAttr("alt", vehicle.name)} class="w-full h-full object-cover"><div class="absolute top-4 left-4 p-2 bg-white rounded-lg shadow-md">`);
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(vehicle.icon), { class: "w-6 h-6 text-blue-900" }, null), _parent);
        _push(`</div></div><div class="p-6"><h3 class="text-2xl font-bold text-gray-900 mb-2">${ssrInterpolate(vehicle.name)}</h3><div class="text-orange-600 font-semibold mb-4">${ssrInterpolate(vehicle.capacity)}</div><p class="text-gray-600 leading-relaxed">${ssrInterpolate(vehicle.description)}</p></div></div>`);
      });
      _push(`<!--]--></div></div></section>`);
    };
  }
};
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Fleet.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const _sfc_main$7 = {
  __name: "Coverage",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    const regions = computed(() => [
      t("coverage.regions.bucharest"),
      t("coverage.regions.transylvania"),
      t("coverage.regions.moldova"),
      t("coverage.regions.muntenia"),
      t("coverage.regions.westernEurope"),
      t("coverage.regions.centralEurope")
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        id: "coverage",
        class: "py-20 md:py-24 bg-gray-50"
      }, _attrs))}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"><div><h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">${ssrInterpolate(_ctx.$t("coverage.title"))}</h2><p class="text-lg text-gray-600 mb-8 leading-relaxed">${ssrInterpolate(_ctx.$t("coverage.subtitle"))}</p><div class="grid grid-cols-1 sm:grid-cols-2 gap-4"><!--[-->`);
      ssrRenderList(regions.value, (region, index) => {
        _push(`<div class="flex items-center gap-3">`);
        _push(ssrRenderComponent(unref(CheckCircle), { class: "w-5 h-5 text-orange-600 flex-shrink-0" }, null, _parent));
        _push(`<span class="text-gray-700">${ssrInterpolate(region)}</span></div>`);
      });
      _push(`<!--]--></div><div class="mt-8 p-6 bg-blue-50 border border-blue-100 rounded-xl"><div class="flex items-start gap-3">`);
      _push(ssrRenderComponent(unref(MapPin), { class: "w-6 h-6 text-blue-900 flex-shrink-0 mt-1" }, null, _parent));
      _push(`<div><h4 class="font-semibold text-gray-900 mb-2">${ssrInterpolate(_ctx.$t("coverage.strategicLocations"))}</h4><p class="text-gray-600 text-sm leading-relaxed">${ssrInterpolate(_ctx.$t("coverage.strategicLocationsDesc"))}</p></div></div></div></div><div class="relative"><div class="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"><div class="relative h-[500px]"><img src="https://images.unsplash.com/photo-1730317195704-29f7ced19356?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxldXJvcGUlMjBtYXAlMjBnZW9ncmFwaHl8ZW58MXx8fHwxNzY3NzM5MTUxfDA&amp;ixlib=rb-4.1.0&amp;q=80&amp;w=1080" alt="Europe Coverage Map" class="w-full h-full object-cover"><div class="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent"></div><div class="absolute inset-0 flex items-center justify-center"><div class="relative w-full h-full max-w-md"><div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"><div class="w-4 h-4 bg-orange-600 rounded-full animate-ping absolute"></div><div class="w-4 h-4 bg-orange-600 rounded-full border-2 border-white shadow-lg"></div></div><div class="absolute top-1/3 left-1/4 w-3 h-3 bg-blue-400 rounded-full border-2 border-white shadow-lg"></div><div class="absolute top-2/3 left-2/3 w-3 h-3 bg-blue-400 rounded-full border-2 border-white shadow-lg"></div></div></div></div></div><div class="absolute -top-6 -right-6 w-24 h-24 bg-orange-200 rounded-full opacity-30 blur-2xl"></div><div class="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-200 rounded-full opacity-30 blur-2xl"></div></div></div></div></section>`);
    };
  }
};
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Coverage.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const _sfc_main$6 = {
  __name: "CTASection",
  __ssrInlineRender: true,
  setup(__props) {
    const { settings, formatPhoneForTel } = useSettings();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "relative py-20 md:py-24 text-white overflow-hidden" }, _attrs))}><div class="absolute inset-0"><img src="https://images.unsplash.com/photo-1763736809655-9337caf643cc?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb2dpc3RpY3MlMjBjb250cm9sJTIwY2VudGVyfGVufDF8fHx8MTc2NzczOTE1Mnww&amp;ixlib=rb-4.1.0&amp;q=80&amp;w=1080" alt="Logistics Center" class="w-full h-full object-cover"><div class="absolute inset-0 bg-gradient-to-r from-blue-950/95 via-blue-900/90 to-blue-950/95"></div></div><div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="max-w-4xl mx-auto text-center"><h2 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">${ssrInterpolate(_ctx.$t("cta.title"))}</h2><p class="text-lg md:text-xl text-blue-100 mb-10 leading-relaxed">${ssrInterpolate(_ctx.$t("cta.subtitle"))}</p><div class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"><button class="px-8 py-4 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center gap-2 font-medium text-lg">${ssrInterpolate(_ctx.$t("cta.getQuote"))} `);
      _push(ssrRenderComponent(unref(ArrowRight), { class: "w-5 h-5" }, null, _parent));
      _push(`</button><a${ssrRenderAttr("href", `tel:${unref(formatPhoneForTel)(unref(settings).phoneNumber)}`)} class="px-8 py-4 bg-white/10 text-white border-2 border-white/30 rounded-lg hover:bg-white/20 transition-colors backdrop-blur-sm flex items-center gap-2 font-medium text-lg">`);
      _push(ssrRenderComponent(unref(Phone), { class: "w-5 h-5" }, null, _parent));
      _push(` ${ssrInterpolate(unref(settings).phoneNumber)}</a></div><p class="text-sm text-blue-200">${ssrInterpolate(_ctx.$t("cta.available"))}</p></div></div></section>`);
    };
  }
};
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/CTASection.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = {
  __name: "Testimonials",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    const testimonials = computed(() => [
      {
        quote: t("testimonials.testimonial1.quote"),
        name: t("testimonials.testimonial1.name"),
        company: t("testimonials.testimonial1.company"),
        image: "https://images.unsplash.com/photo-1522199899308-2eef382e2158?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGJ1c2luZXNzfGVufDF8fHx8MTc2NzY4NDg2NHww&ixlib=rb-4.1.0&q=80&w=1080"
      },
      {
        quote: t("testimonials.testimonial2.quote"),
        name: t("testimonials.testimonial2.name"),
        company: t("testimonials.testimonial2.company"),
        image: "https://images.unsplash.com/photo-1589458223095-03eee50f0054?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBidXNpbmVzcyUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3Njc3MzkxNTN8MA&ixlib=rb-4.1.0&q=80&w=1080"
      },
      {
        quote: t("testimonials.testimonial3.quote"),
        name: t("testimonials.testimonial3.name"),
        company: t("testimonials.testimonial3.company"),
        image: "https://images.unsplash.com/photo-1629507208649-70919ca33793?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMHBvcnRyYWl0fGVufDF8fHx8MTc2NzcxNzEyMXww&ixlib=rb-4.1.0&q=80&w=1080"
      }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "py-20 md:py-24 bg-blue-50" }, _attrs))}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="text-center max-w-3xl mx-auto mb-16"><h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">${ssrInterpolate(_ctx.$t("testimonials.title"))}</h2><p class="text-lg text-gray-600">${ssrInterpolate(_ctx.$t("testimonials.subtitle"))}</p></div><div class="grid grid-cols-1 md:grid-cols-3 gap-8"><!--[-->`);
      ssrRenderList(unref(testimonials), (testimonial, index) => {
        _push(`<div class="bg-white p-8 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow"><div class="mb-6">`);
        _push(ssrRenderComponent(unref(Quote), { class: "w-10 h-10 text-orange-600 opacity-50" }, null, _parent));
        _push(`</div><p class="text-gray-700 mb-6 leading-relaxed italic"> &quot;${ssrInterpolate(testimonial.quote)}&quot; </p><div class="pt-4 border-t border-gray-100 flex items-center gap-4"><img${ssrRenderAttr("src", testimonial.image)}${ssrRenderAttr("alt", testimonial.name)} class="w-14 h-14 rounded-full object-cover border-2 border-blue-100"><div><div class="font-semibold text-gray-900">${ssrInterpolate(testimonial.name)}</div><div class="text-sm text-gray-600 mt-1">${ssrInterpolate(testimonial.company)}</div></div></div></div>`);
      });
      _push(`<!--]--></div></div></section>`);
    };
  }
};
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Testimonials.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = {
  __name: "About",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    const values = computed(() => [
      {
        icon: Shield,
        title: t("about.safety"),
        description: t("about.safetyDesc")
      },
      {
        icon: Zap,
        title: t("about.speed"),
        description: t("about.speedDesc")
      },
      {
        icon: Users,
        title: t("about.trust"),
        description: t("about.trustDesc")
      }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        id: "about",
        class: "py-20 md:py-24 bg-white"
      }, _attrs))}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"><div><h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">${ssrInterpolate(_ctx.$t("about.title"))}</h2><p class="text-lg text-gray-600 mb-6 leading-relaxed">${ssrInterpolate(_ctx.$t("about.description1"))}</p><p class="text-lg text-gray-600 mb-8 leading-relaxed">${ssrInterpolate(_ctx.$t("about.description2"))}</p><div class="space-y-6"><h3 class="text-xl font-bold text-gray-900 mb-4">${ssrInterpolate(_ctx.$t("about.coreValues"))}</h3><!--[-->`);
      ssrRenderList(unref(values), (value, index) => {
        _push(`<div class="flex items-start gap-4"><div class="p-3 bg-blue-100 rounded-lg flex-shrink-0">`);
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(value.icon), { class: "w-6 h-6 text-blue-900" }, null), _parent);
        _push(`</div><div><h4 class="font-semibold text-gray-900 mb-1">${ssrInterpolate(value.title)}</h4><p class="text-gray-600 text-sm leading-relaxed">${ssrInterpolate(value.description)}</p></div></div>`);
      });
      _push(`<!--]--></div></div><div class="relative"><div class="rounded-2xl overflow-hidden shadow-2xl"><img src="https://images.unsplash.com/photo-1657819547860-ea03df0eafa8?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXJlaG91c2UlMjBsb2dpc3RpY3MlMjB0ZWFtfGVufDF8fHx8MTc2NzczODgzNXww&amp;ixlib=rb-4.1.0&amp;q=80&amp;w=1080" alt="VanTrans82 Team" class="w-full h-[500px] object-cover"></div><div class="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl border border-gray-200"><div class="text-4xl font-bold text-blue-900 mb-1">500+</div><div class="text-sm text-gray-600">${ssrInterpolate(_ctx.$t("about.satisfiedClients"))}</div></div><div class="absolute -top-6 -right-6 w-24 h-24 bg-orange-200 rounded-full opacity-30 blur-2xl"></div></div></div></div></section>`);
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/About.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = {
  __name: "FAQ",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    const openIndex = ref(null);
    const faqs = computed(() => [
      {
        question: t("faq.questions.q1.question"),
        answer: t("faq.questions.q1.answer")
      },
      {
        question: t("faq.questions.q2.question"),
        answer: t("faq.questions.q2.answer")
      },
      {
        question: t("faq.questions.q3.question"),
        answer: t("faq.questions.q3.answer")
      },
      {
        question: t("faq.questions.q4.question"),
        answer: t("faq.questions.q4.answer")
      },
      {
        question: t("faq.questions.q5.question"),
        answer: t("faq.questions.q5.answer")
      },
      {
        question: t("faq.questions.q6.question"),
        answer: t("faq.questions.q6.answer")
      }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        id: "faq",
        class: "py-20 md:py-24 bg-gray-50"
      }, _attrs))}><div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"><div class="text-center mb-16"><h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">${ssrInterpolate(_ctx.$t("faq.title"))}</h2><p class="text-lg text-gray-600">${ssrInterpolate(_ctx.$t("faq.subtitle"))}</p></div><div class="space-y-4"><!--[-->`);
      ssrRenderList(faqs.value, (faq, index) => {
        _push(`<div class="bg-white rounded-xl border border-gray-200 overflow-hidden"><button class="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors group"><span class="font-semibold text-gray-900 pr-4">${ssrInterpolate(faq.question)}</span>`);
        _push(ssrRenderComponent(unref(ChevronDown), {
          class: ["w-5 h-5 text-gray-500 transition-transform duration-300 flex-shrink-0", { "rotate-180": openIndex.value === index }]
        }, null, _parent));
        _push(`</button><div class="px-6 pb-5 text-gray-600 leading-relaxed" style="${ssrRenderStyle(openIndex.value === index ? null : { display: "none" })}">${ssrInterpolate(faq.answer)}</div></div>`);
      });
      _push(`<!--]--></div><div class="mt-12 text-center"><p class="text-gray-600 mb-4">${ssrInterpolate(_ctx.$t("faq.stillHaveQuestions"))}</p><button class="text-orange-600 hover:text-orange-700 font-semibold">${ssrInterpolate(_ctx.$t("faq.contactUs"))}</button></div></div></section>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/FAQ.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = {
  __name: "Contact",
  __ssrInlineRender: true,
  setup(__props) {
    const { settings, formatPhoneForTel, formatPhoneForWhatsApp } = useSettings();
    const formData = ref({
      name: "",
      email: "",
      message: ""
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(`<section${ssrRenderAttrs(mergeProps({
        id: "contact",
        class: "py-20 md:py-24 bg-white"
      }, _attrs))}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="text-center max-w-3xl mx-auto mb-16"><h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">${ssrInterpolate(_ctx.$t("contact.title"))}</h2><p class="text-lg text-gray-600">${ssrInterpolate(_ctx.$t("contact.subtitle"))}</p></div><div class="grid grid-cols-1 lg:grid-cols-3 gap-12"><div class="lg:col-span-2"><form class="space-y-6"><div class="grid grid-cols-1 sm:grid-cols-2 gap-6"><div><label for="name" class="block text-gray-700 mb-2">${ssrInterpolate(_ctx.$t("contact.yourName"))}</label><input type="text" id="name"${ssrRenderAttr("value", formData.value.name)} required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent"${ssrRenderAttr("placeholder", _ctx.$t("contact.yourName"))}></div><div><label for="email" class="block text-gray-700 mb-2">${ssrInterpolate(_ctx.$t("contact.emailAddress"))}</label><input type="email" id="email"${ssrRenderAttr("value", formData.value.email)} required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent"${ssrRenderAttr("placeholder", _ctx.$t("contact.emailAddress"))}></div></div><div><label for="message" class="block text-gray-700 mb-2">${ssrInterpolate(_ctx.$t("contact.message"))}</label><textarea id="message" required rows="6" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent resize-none"${ssrRenderAttr("placeholder", _ctx.$t("contact.message"))}>${ssrInterpolate(formData.value.message)}</textarea></div><button type="submit" class="w-full sm:w-auto px-8 py-4 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center gap-2 font-medium">${ssrInterpolate(_ctx.$t("contact.sendMessage"))} `);
      _push(ssrRenderComponent(unref(Send), { class: "w-5 h-5" }, null, _parent));
      _push(`</button></form></div><div class="space-y-8"><div><h3 class="text-xl font-bold text-gray-900 mb-6">${ssrInterpolate(_ctx.$t("contact.contactInformation"))}</h3><div class="space-y-6"><div class="flex items-start gap-4"><div class="p-3 bg-blue-100 rounded-lg flex-shrink-0">`);
      _push(ssrRenderComponent(unref(Phone), { class: "w-6 h-6 text-blue-900" }, null, _parent));
      _push(`</div><div><div class="font-semibold text-gray-900 mb-1">${ssrInterpolate(_ctx.$t("contact.phone"))}</div><a${ssrRenderAttr("href", `tel:${unref(formatPhoneForTel)(unref(settings).phoneNumber)}`)} class="text-gray-600 hover:text-orange-600 transition-colors">${ssrInterpolate(unref(settings).phoneNumber)}</a></div></div><div class="flex items-start gap-4"><div class="p-3 bg-blue-100 rounded-lg flex-shrink-0">`);
      _push(ssrRenderComponent(unref(Mail), { class: "w-6 h-6 text-blue-900" }, null, _parent));
      _push(`</div><div><div class="font-semibold text-gray-900 mb-1">${ssrInterpolate(_ctx.$t("contact.email"))}</div><a${ssrRenderAttr("href", `mailto:${unref(settings).contactEmail}`)} class="text-gray-600 hover:text-orange-600 transition-colors">${ssrInterpolate(unref(settings).contactEmail)}</a></div></div><div class="flex items-start gap-4"><div class="p-3 bg-green-100 rounded-lg flex-shrink-0">`);
      _push(ssrRenderComponent(unref(MessageCircle), { class: "w-6 h-6 text-green-600" }, null, _parent));
      _push(`</div><div><div class="font-semibold text-gray-900 mb-1">${ssrInterpolate(_ctx.$t("contact.whatsapp"))}</div><a${ssrRenderAttr("href", `https://wa.me/${unref(formatPhoneForWhatsApp)(unref(settings).phoneNumber)}`)} target="_blank" rel="noopener noreferrer" class="text-gray-600 hover:text-green-600 transition-colors inline-flex items-center gap-1">${ssrInterpolate(unref(settings).phoneNumber)}</a><p class="text-xs text-gray-500 mt-1">${ssrInterpolate(_ctx.$t("contact.chatInstantly"))}</p></div></div><div class="flex items-start gap-4"><div class="p-3 bg-blue-100 rounded-lg flex-shrink-0">`);
      _push(ssrRenderComponent(unref(MapPin), { class: "w-6 h-6 text-blue-900" }, null, _parent));
      _push(`</div><div><div class="font-semibold text-gray-900 mb-1">${ssrInterpolate(_ctx.$t("contact.address"))}</div><p class="text-gray-600">${(_a = unref(settings).address.replace(/\n/g, "<br />")) != null ? _a : ""}</p></div></div></div></div><a${ssrRenderAttr("href", `https://wa.me/${unref(formatPhoneForWhatsApp)(unref(settings).phoneNumber)}?text=Hello! I'm interested in your transport services.`)} target="_blank" rel="noopener noreferrer" class="block w-full p-4 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-colors text-center font-semibold flex items-center justify-center gap-2">`);
      _push(ssrRenderComponent(unref(MessageCircle), { class: "w-5 h-5" }, null, _parent));
      _push(` ${ssrInterpolate(_ctx.$t("contact.chatOnWhatsApp"))}</a><div class="bg-blue-50 p-6 rounded-xl border border-blue-100"><h4 class="font-semibold text-gray-900 mb-2">${ssrInterpolate(_ctx.$t("contact.businessHours"))}</h4><div class="text-sm text-gray-600 space-y-1"><p>${ssrInterpolate(_ctx.$t("contact.mondayFriday"))}</p><p>${ssrInterpolate(_ctx.$t("contact.saturday"))}</p><p>${ssrInterpolate(_ctx.$t("contact.sunday"))}</p><p class="text-orange-600 font-medium mt-2">${ssrInterpolate(_ctx.$t("contact.emergencySupport"))}</p></div></div></div></div></div></section>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Contact.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "Footer",
  __ssrInlineRender: true,
  setup(__props) {
    const { settings, formatPhoneForTel } = useSettings();
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_NuxtImg = _sfc_main$e;
      _push(`<footer${ssrRenderAttrs(mergeProps({ class: "bg-gray-900 text-gray-300" }, _attrs))}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16"><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12"><div class="lg:col-span-1"><div class="flex items-center gap-2 mb-4"><span class="inline-flex items-center justify-center bg-white rounded px-2 py-1">`);
      _push(ssrRenderComponent(_component_NuxtImg, {
        src: "/vtlogo.png",
        alt: "VanTrans82",
        class: "h-13 w-auto"
      }, null, _parent));
      _push(`</span></div><p class="text-sm text-gray-400 leading-relaxed mb-6">${ssrInterpolate(_ctx.$t("footer.description"))}</p><div class="flex items-center gap-4"><a href="#" class="w-10 h-10 bg-gray-800 hover:bg-orange-600 rounded-lg flex items-center justify-center transition-colors" aria-label="Facebook">`);
      _push(ssrRenderComponent(unref(Facebook), { class: "w-5 h-5" }, null, _parent));
      _push(`</a><a href="#" class="w-10 h-10 bg-gray-800 hover:bg-orange-600 rounded-lg flex items-center justify-center transition-colors" aria-label="LinkedIn">`);
      _push(ssrRenderComponent(unref(Linkedin), { class: "w-5 h-5" }, null, _parent));
      _push(`</a><a href="#" class="w-10 h-10 bg-gray-800 hover:bg-orange-600 rounded-lg flex items-center justify-center transition-colors" aria-label="Twitter">`);
      _push(ssrRenderComponent(unref(Twitter), { class: "w-5 h-5" }, null, _parent));
      _push(`</a><a${ssrRenderAttr("href", `mailto:${unref(settings).contactEmail}`)} class="w-10 h-10 bg-gray-800 hover:bg-orange-600 rounded-lg flex items-center justify-center transition-colors" aria-label="Email">`);
      _push(ssrRenderComponent(unref(Mail), { class: "w-5 h-5" }, null, _parent));
      _push(`</a></div></div><div><h3 class="text-white font-semibold mb-4">${ssrInterpolate(_ctx.$t("footer.quickLinks"))}</h3><ul class="space-y-3"><li><button class="text-sm hover:text-orange-600 transition-colors">${ssrInterpolate(_ctx.$t("nav.home"))}</button></li><li><button class="text-sm hover:text-orange-600 transition-colors">${ssrInterpolate(_ctx.$t("nav.services"))}</button></li><li><button class="text-sm hover:text-orange-600 transition-colors">${ssrInterpolate(_ctx.$t("nav.fleet"))}</button></li><li><button class="text-sm hover:text-orange-600 transition-colors">${ssrInterpolate(_ctx.$t("nav.about"))}</button></li></ul></div><div><h3 class="text-white font-semibold mb-4">${ssrInterpolate(_ctx.$t("footer.ourServices"))}</h3><ul class="space-y-3"><li class="text-sm">${ssrInterpolate(_ctx.$t("footer.roadTransport"))}</li><li class="text-sm">${ssrInterpolate(_ctx.$t("footer.expressDelivery"))}</li><li class="text-sm">${ssrInterpolate(_ctx.$t("footer.internationalFreight"))}</li><li class="text-sm">${ssrInterpolate(_ctx.$t("footer.customLogistics"))}</li></ul></div><div><h3 class="text-white font-semibold mb-4">${ssrInterpolate(_ctx.$t("footer.contact"))}</h3><ul class="space-y-3"><li class="text-sm"><a${ssrRenderAttr("href", `tel:${unref(formatPhoneForTel)(unref(settings).phoneNumber)}`)} class="hover:text-orange-600 transition-colors">${ssrInterpolate(unref(settings).phoneNumber)}</a></li><li class="text-sm"><a${ssrRenderAttr("href", `mailto:${unref(settings).contactEmail}`)} class="hover:text-orange-600 transition-colors">${ssrInterpolate(unref(settings).contactEmail)}</a></li><li class="text-sm">${(_a = unref(settings).address.replace(/\n/g, "<br />")) != null ? _a : ""}</li></ul></div></div><div class="pt-8 border-t border-gray-800"><div class="flex flex-col md:flex-row justify-between items-center gap-4"><p class="text-sm text-gray-400"> \xA9 2026 ${ssrInterpolate(unref(settings).companyName)}. ${ssrInterpolate(_ctx.$t("footer.rights"))}</p><div class="flex items-center gap-6"><a href="#" class="text-sm text-gray-400 hover:text-orange-600 transition-colors"> Privacy Policy </a><a href="#" class="text-sm text-gray-400 hover:text-orange-600 transition-colors"> Terms of Service </a></div></div></div></div></footer>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Footer.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "VanTrans82 - Fast & Reliable Freight Transport",
      meta: [
        { name: "description", content: "Professional logistics solutions with guaranteed on-time delivery. Your trusted partner for road transport, express delivery, and international freight across Romania and EU." }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Header = _sfc_main$d;
      const _component_Hero = _sfc_main$c;
      const _component_Features = _sfc_main$b;
      const _component_Services = _sfc_main$a;
      const _component_Process = _sfc_main$9;
      const _component_Fleet = _sfc_main$8;
      const _component_Coverage = _sfc_main$7;
      const _component_CTASection = _sfc_main$6;
      const _component_Testimonials = _sfc_main$5;
      const _component_About = _sfc_main$4;
      const _component_FAQ = _sfc_main$3;
      const _component_Contact = _sfc_main$2;
      const _component_Footer = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-white" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_Header, null, null, _parent));
      _push(`<main>`);
      _push(ssrRenderComponent(_component_Hero, null, null, _parent));
      _push(ssrRenderComponent(_component_Features, null, null, _parent));
      _push(ssrRenderComponent(_component_Services, null, null, _parent));
      _push(ssrRenderComponent(_component_Process, null, null, _parent));
      _push(ssrRenderComponent(_component_Fleet, null, null, _parent));
      _push(ssrRenderComponent(_component_Coverage, null, null, _parent));
      _push(ssrRenderComponent(_component_CTASection, null, null, _parent));
      _push(ssrRenderComponent(_component_Testimonials, null, null, _parent));
      _push(ssrRenderComponent(_component_About, null, null, _parent));
      _push(ssrRenderComponent(_component_FAQ, null, null, _parent));
      _push(ssrRenderComponent(_component_Contact, null, null, _parent));
      _push(`</main>`);
      _push(ssrRenderComponent(_component_Footer, null, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-Ga4lyRya.mjs.map
