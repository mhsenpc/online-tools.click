/// <reference types="../node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="../node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { ref, onMounted, watch } from 'vue';
import figlet from 'figlet';
import standard from 'figlet/importable-fonts/Standard.js';
import slant from 'figlet/importable-fonts/Slant.js';
import shadow from 'figlet/importable-fonts/Shadow.js';
import block from 'figlet/importable-fonts/Block.js';
import bubbles from 'figlet/importable-fonts/Bubble.js';
import digital from 'figlet/importable-fonts/Digital.js';
import isometric1 from 'figlet/importable-fonts/Isometric1.js';
import script from 'figlet/importable-fonts/Script.js';
const fonts = {
    'Standard': standard,
    'Slant': slant,
    'Shadow': shadow,
    'Block': block,
    'Bubbles': bubbles,
    'Digital': digital,
    'Isometric1': isometric1,
    'Script': script
};
const text = ref('ASCII Art');
const selectedFont = ref('Standard');
const asciiArt = ref('');
const copySuccess = ref(false);
const generateArt = () => {
    if (!text.value) {
        asciiArt.value = '';
        return;
    }
    figlet.parseFont(selectedFont.value, fonts[selectedFont.value]);
    figlet.text(text.value, {
        font: selectedFont.value,
        horizontalLayout: 'default',
        verticalLayout: 'default',
        width: 80,
        whitespaceBreak: true
    }, (err, data) => {
        if (err) {
            console.error('Something went wrong...', err);
            return;
        }
        asciiArt.value = data || '';
    });
};
const copyToClipboard = async () => {
    try {
        await navigator.clipboard.writeText(asciiArt.value);
        copySuccess.value = true;
        setTimeout(() => {
            copySuccess.value = false;
        }, 2000);
    }
    catch (err) {
        console.error('Failed to copy: ', err);
    }
};
watch([text, selectedFont], () => {
    generateArt();
});
onMounted(() => {
    generateArt();
});
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['controls']} */ ;
/** @type {__VLS_StyleScopedClasses['input-group']} */ ;
/** @type {__VLS_StyleScopedClasses['preview-header']} */ ;
/** @type {__VLS_StyleScopedClasses['preview-header']} */ ;
/** @type {__VLS_StyleScopedClasses['preview-header']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "container" },
});
/** @type {__VLS_StyleScopedClasses['container']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.header, __VLS_intrinsics.header)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.h1, __VLS_intrinsics.h1)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.main, __VLS_intrinsics.main)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "controls" },
});
/** @type {__VLS_StyleScopedClasses['controls']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "input-group" },
});
/** @type {__VLS_StyleScopedClasses['input-group']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
    for: "text-input",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.input)({
    id: "text-input",
    value: (__VLS_ctx.text),
    type: "text",
    placeholder: "Type something...",
    autocomplete: "off",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "input-group" },
});
/** @type {__VLS_StyleScopedClasses['input-group']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
    for: "font-select",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.select, __VLS_intrinsics.select)({
    id: "font-select",
    value: (__VLS_ctx.selectedFont),
});
for (const [_, name] of __VLS_vFor((__VLS_ctx.fonts))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.option, __VLS_intrinsics.option)({
        key: (name),
        value: (name),
    });
    (name);
    // @ts-ignore
    [text, selectedFont, fonts,];
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "preview-container" },
});
/** @type {__VLS_StyleScopedClasses['preview-container']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "preview-header" },
});
/** @type {__VLS_StyleScopedClasses['preview-header']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (__VLS_ctx.copyToClipboard) },
    disabled: (!__VLS_ctx.asciiArt),
});
(__VLS_ctx.copySuccess ? 'Copied!' : 'Copy to Clipboard');
__VLS_asFunctionalElement1(__VLS_intrinsics.pre, __VLS_intrinsics.pre)({
    ...{ class: "ascii-preview" },
});
/** @type {__VLS_StyleScopedClasses['ascii-preview']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.code, __VLS_intrinsics.code)({});
(__VLS_ctx.asciiArt);
__VLS_asFunctionalElement1(__VLS_intrinsics.footer, __VLS_intrinsics.footer)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.a, __VLS_intrinsics.a)({
    href: "/",
});
// @ts-ignore
[copyToClipboard, asciiArt, asciiArt, copySuccess,];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
//# sourceMappingURL=App.vue.js.map