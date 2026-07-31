/**
 * Online Tools - Theme Manager
 * Provides consistent dark/light theme switching across all tool pages
 */

(function() {
    'use strict';

    const THEME_KEY = 'online-tools-theme';

    /**
     * Get the initial theme based on saved preference or system preference
     */
    function getInitialTheme() {
        const savedTheme = localStorage.getItem(THEME_KEY);
        if (savedTheme === 'light' || savedTheme === 'dark') {
            return savedTheme;
        }

        // Check system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
            return 'light';
        }

        return 'dark';
    }

    /**
     * Apply theme to the document
     */
    function applyTheme(theme) {
        const html = document.documentElement;
        html.setAttribute('data-theme', theme);

        // Support for Tailwind dark mode (used in some tools)
        if (theme === 'dark') {
            html.classList.add('dark');
        } else {
            html.classList.remove('dark');
        }
    }

    /**
     * Toggle between dark and light themes
     */
    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        applyTheme(newTheme);
        localStorage.setItem(THEME_KEY, newTheme);

        return newTheme;
    }

    /**
     * Initialize theme on page load
     */
    function initTheme() {
        const initialTheme = getInitialTheme();
        applyTheme(initialTheme);
    }

    /**
     * Set up theme toggle button
     */
    function setupThemeToggle() {
        const toggleBtn = document.getElementById('themeToggle');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', toggleTheme);
        }
    }

    /**
     * Listen for system theme changes
     */
    function watchSystemTheme() {
        if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                // Only auto-switch if user hasn't manually set a preference
                if (!localStorage.getItem(THEME_KEY)) {
                    applyTheme(e.matches ? 'dark' : 'light');
                }
            });
        }
    }

    // Initialize immediately (before DOM ready) to prevent flash
    initTheme();

    // Setup interactive features when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setupThemeToggle();
            watchSystemTheme();
        });
    } else {
        setupThemeToggle();
        watchSystemTheme();
    }

    // Export to window for programmatic access
    window.themeManager = {
        getTheme: () => document.documentElement.getAttribute('data-theme') || 'dark',
        setTheme: applyTheme,
        toggleTheme: toggleTheme
    };
})();
