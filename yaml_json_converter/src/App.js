"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = App;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importStar(require("react"));
const js_yaml_1 = __importDefault(require("js-yaml"));
const lucide_react_1 = require("lucide-react");
const clsx_1 = require("clsx");
const tailwind_merge_1 = require("tailwind-merge");
function cn(...inputs) {
    return (0, tailwind_merge_1.twMerge)((0, clsx_1.clsx)(inputs));
}
function App() {
    const [input, setInput] = (0, react_1.useState)('');
    const [output, setOutput] = (0, react_1.useState)('');
    const [error, setError] = (0, react_1.useState)(null);
    const [mode, setMode] = (0, react_1.useState)('yaml-to-json');
    const [isVertical, setIsVertical] = (0, react_1.useState)(false);
    const [copied, setCopied] = (0, react_1.useState)(false);
    const [indent, setIndent] = (0, react_1.useState)(2);
    const convert = (0, react_1.useCallback)((value, currentMode, currentIndent) => {
        if (!value.trim()) {
            setOutput('');
            setError(null);
            return;
        }
        try {
            if (currentMode === 'yaml-to-json') {
                const obj = js_yaml_1.default.load(value);
                setOutput(JSON.stringify(obj, null, currentIndent));
            }
            else {
                const obj = JSON.parse(value);
                setOutput(js_yaml_1.default.dump(obj, { indent: currentIndent }));
            }
            setError(null);
        }
        catch (e) {
            setError(e.message || 'Conversion error');
        }
    }, []);
    (0, react_1.useEffect)(() => {
        convert(input, mode, indent);
    }, [input, mode, indent, convert]);
    const handleCopy = async () => {
        if (!output)
            return;
        await navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    const handleClear = () => {
        setInput('');
        setOutput('');
        setError(null);
    };
    const toggleMode = () => {
        setMode(prev => prev === 'yaml-to-json' ? 'json-to-yaml' : 'yaml-to-json');
        setInput(output);
    };
    return ((0, jsx_runtime_1.jsx)("div", { className: "min-h-screen bg-neutral-50 dark:bg-neutral-950 p-4 md:p-8", children: (0, jsx_runtime_1.jsxs)("div", { className: "max-w-7xl mx-auto space-y-6", children: [(0, jsx_runtime_1.jsxs)("header", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("h1", { className: "text-2xl font-bold text-neutral-900 dark:text-white flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.ArrowLeftRight, { className: "w-6 h-6 text-primary-500" }), "YAML \u2194 JSON Converter"] }), (0, jsx_runtime_1.jsx)("p", { className: "text-neutral-500 dark:text-neutral-400", children: "Convert between YAML and JSON with ease" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex bg-white dark:bg-neutral-900 rounded-lg p-1 border border-neutral-200 dark:border-neutral-800 shadow-sm", children: [(0, jsx_runtime_1.jsx)("button", { onClick: () => setIsVertical(false), className: cn("p-2 rounded-md transition-colors", !isVertical ? "bg-neutral-100 dark:bg-neutral-800 text-primary-500" : "text-neutral-500"), title: "Horizontal Layout", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Columns, { className: "w-5 h-5" }) }), (0, jsx_runtime_1.jsx)("button", { onClick: () => setIsVertical(true), className: cn("p-2 rounded-md transition-colors", isVertical ? "bg-neutral-100 dark:bg-neutral-800 text-primary-500" : "text-neutral-500"), title: "Vertical Layout", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Rows, { className: "w-5 h-5" }) })] }), (0, jsx_runtime_1.jsxs)("select", { value: indent, onChange: (e) => setIndent(Number(e.target.value)), className: "bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none dark:text-white", children: [(0, jsx_runtime_1.jsx)("option", { value: 2, children: "2 Spaces" }), (0, jsx_runtime_1.jsx)("option", { value: 4, children: "4 Spaces" })] }), (0, jsx_runtime_1.jsx)("button", { onClick: handleClear, className: "p-2.5 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors shadow-sm", title: "Clear All", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Trash2, { className: "w-5 h-5" }) })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: cn("grid gap-6 transition-all duration-300", isVertical ? "grid-cols-1" : "lg:grid-cols-[1fr,auto,1fr]"), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-2", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex items-center justify-between", children: (0, jsx_runtime_1.jsxs)("span", { className: "text-sm font-medium text-neutral-600 dark:text-neutral-400 flex items-center gap-2", children: [mode === 'yaml-to-json' ? (0, jsx_runtime_1.jsx)(lucide_react_1.FileText, { className: "w-4 h-4" }) : (0, jsx_runtime_1.jsx)(lucide_react_1.FileJson, { className: "w-4 h-4" }), mode === 'yaml-to-json' ? 'YAML' : 'JSON', " Input"] }) }), (0, jsx_runtime_1.jsxs)("div", { className: "relative flex-1", children: [(0, jsx_runtime_1.jsx)("textarea", { value: input, onChange: (e) => setInput(e.target.value), placeholder: `Paste your ${mode === 'yaml-to-json' ? 'YAML' : 'JSON'} here...`, className: cn("w-full min-h-[400px] lg:min-h-[600px] p-4 font-mono text-sm bg-white dark:bg-neutral-900 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:outline-none transition-all resize-none shadow-sm dark:text-white", error ? "border-red-300 dark:border-red-900 ring-red-100" : "border-neutral-200 dark:border-neutral-800") }), error && ((0, jsx_runtime_1.jsxs)("div", { className: "absolute bottom-4 left-4 right-4 p-3 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900 rounded-lg flex items-start gap-3 animate-in fade-in slide-in-from-bottom-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.AlertCircle, { className: "w-5 h-5 text-red-500 shrink-0 mt-0.5" }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-red-700 dark:text-red-400 whitespace-pre-wrap break-words overflow-hidden max-h-32 overflow-y-auto", children: error })] }))] })] }), (0, jsx_runtime_1.jsx)("div", { className: cn("flex items-center justify-center", isVertical ? "py-0" : "lg:py-12"), children: (0, jsx_runtime_1.jsx)("button", { onClick: toggleMode, className: "p-4 rounded-full bg-primary-500 text-white shadow-lg shadow-primary-500/30 hover:bg-primary-600 hover:scale-110 active:scale-95 transition-all group", title: "Switch Direction", children: (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowLeftRight, { className: cn("w-6 h-6 transition-transform group-hover:rotate-180", isVertical ? "rotate-90" : "") }) }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-2", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("span", { className: "text-sm font-medium text-neutral-600 dark:text-neutral-400 flex items-center gap-2", children: [mode === 'yaml-to-json' ? (0, jsx_runtime_1.jsx)(lucide_react_1.FileJson, { className: "w-4 h-4" }) : (0, jsx_runtime_1.jsx)(lucide_react_1.FileText, { className: "w-4 h-4" }), mode === 'yaml-to-json' ? 'JSON' : 'YAML', " Result"] }), (0, jsx_runtime_1.jsxs)("button", { onClick: handleCopy, disabled: !output, className: cn("flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all", copied
                                                ? "bg-green-500 text-white"
                                                : "bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed"), children: [copied ? (0, jsx_runtime_1.jsx)(lucide_react_1.Check, { className: "w-4 h-4" }) : (0, jsx_runtime_1.jsx)(lucide_react_1.Copy, { className: "w-4 h-4" }), copied ? 'Copied!' : 'Copy Result'] })] }), (0, jsx_runtime_1.jsx)("div", { className: "relative flex-1", children: (0, jsx_runtime_1.jsx)("pre", { className: "w-full min-h-[400px] lg:min-h-[600px] p-4 font-mono text-sm bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-auto shadow-sm dark:text-white", children: output || (0, jsx_runtime_1.jsx)("span", { className: "text-neutral-400 dark:text-neutral-600", children: "Result will appear here..." }) }) })] })] })] }) }));
}
//# sourceMappingURL=App.js.map