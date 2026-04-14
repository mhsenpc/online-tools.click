<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import figlet from 'figlet'
import standard from 'figlet/importable-fonts/Standard.js'
import slant from 'figlet/importable-fonts/Slant.js'
import shadow from 'figlet/importable-fonts/Shadow.js'
import block from 'figlet/importable-fonts/Block.js'
import bubbles from 'figlet/importable-fonts/Bubble.js'
import digital from 'figlet/importable-fonts/Digital.js'
import isometric1 from 'figlet/importable-fonts/Isometric1.js'
import script from 'figlet/importable-fonts/Script.js'

const fonts: Record<string, string> = {
  'Standard': standard,
  'Slant': slant,
  'Shadow': shadow,
  'Block': block,
  'Bubbles': bubbles,
  'Digital': digital,
  'Isometric1': isometric1,
  'Script': script
}

const text = ref('ASCII Art')
const selectedFont = ref('Standard')
const asciiArt = ref('')
const copySuccess = ref(false)

const generateArt = () => {
  if (!text.value) {
    asciiArt.value = ''
    return
  }

  figlet.parseFont(selectedFont.value, fonts[selectedFont.value])
  figlet.text(text.value, {
    font: selectedFont.value as any,
    horizontalLayout: 'default',
    verticalLayout: 'default',
    width: 80,
    whitespaceBreak: true
  }, (err, data) => {
    if (err) {
      console.error('Something went wrong...', err)
      return
    }
    asciiArt.value = data || ''
  })
}

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(asciiArt.value)
    copySuccess.value = true
    setTimeout(() => {
      copySuccess.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy: ', err)
  }
}

watch([text, selectedFont], () => {
  generateArt()
})

onMounted(() => {
  generateArt()
})
</script>

<template>
  <div class="container">
    <header>
      <h1>ASCII Art Generator</h1>
      <p>Convert your text into stylized ASCII banners</p>
    </header>

    <main>
      <div class="controls">
        <div class="input-group">
          <label for="text-input">Input Text</label>
          <input 
            id="text-input"
            v-model="text" 
            type="text" 
            placeholder="Type something..."
            autocomplete="off"
          />
        </div>

        <div class="input-group">
          <label for="font-select">Font Style</label>
          <select id="font-select" v-model="selectedFont">
            <option v-for="(_, name) in fonts" :key="name" :value="name">
              {{ name }}
            </option>
          </select>
        </div>
      </div>

      <div class="preview-container">
        <div class="preview-header">
          <span>Preview</span>
          <button @click="copyToClipboard" :disabled="!asciiArt">
            {{ copySuccess ? 'Copied!' : 'Copy to Clipboard' }}
          </button>
        </div>
        <pre class="ascii-preview"><code>{{ asciiArt }}</code></pre>
      </div>
    </main>

    <footer>
      <p>Part of <a href="/">online-tools.click</a></p>
    </footer>
  </div>
</template>

<style scoped>
:root {
  --primary-color: #4f46e5;
  --bg-color: #f9fafb;
  --card-bg: #ffffff;
  --text-color: #111827;
  --border-color: #e5e7eb;
}

.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  color: var(--text-color);
}

header {
  text-align: center;
  margin-bottom: 3rem;
}

header h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  color: var(--primary-color);
}

header p {
  color: #6b7280;
}

.controls {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

@media (max-width: 600px) {
  .controls {
    grid-template-columns: 1fr;
  }
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.input-group label {
  font-weight: 600;
  font-size: 0.875rem;
}

input, select {
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  font-size: 1rem;
  background-color: white;
}

input:focus, select:focus {
  outline: 2px solid var(--primary-color);
  outline-offset: -1px;
}

.preview-container {
  background: #1e293b;
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.preview-header {
  background: #334155;
  padding: 0.75rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  font-size: 0.875rem;
}

.preview-header button {
  background: var(--primary-color);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  cursor: pointer;
  font-weight: 500;
  transition: opacity 0.2s;
}

.preview-header button:hover {
  opacity: 0.9;
}

.preview-header button:disabled {
  background: #64748b;
  cursor: not-allowed;
}

.ascii-preview {
  margin: 0;
  padding: 1.5rem;
  overflow-x: auto;
  min-height: 200px;
  color: #38bdf8;
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.875rem;
  line-height: 1.2;
}

footer {
  margin-top: 4rem;
  text-align: center;
  font-size: 0.875rem;
  color: #6b7280;
}

footer a {
  color: var(--primary-color);
  text-decoration: none;
}
</style>
