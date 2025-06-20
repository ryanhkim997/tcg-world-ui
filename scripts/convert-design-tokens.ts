const fs = require("fs")
const path = require("path")
const { argv } = require("yargs")

interface TokenMap {
  [key: string]: string
}

interface TailwindTokens {
  theme: {
    extend: AnyObject
  }
}

// Get the input file path from command line arguments
const inputFile = argv._[0]
if (!inputFile) {
  console.error("Please provide a JSON file path as an argument")
  console.log("Usage: yarn build:tokens <path-to-json-file>")
  process.exit(1)
}

// Resolve the input file path relative to the script
const resolvedInputPath = path.resolve(__dirname, inputFile)
if (!fs.existsSync(resolvedInputPath)) {
  console.error(`File not found: ${resolvedInputPath}`)
  process.exit(1)
}

const raw = require(resolvedInputPath) as any[]

// --- UTILITY FUNCTIONS ---
const toKebab = (str: string): string =>
  str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[^\w\s.\%-✦]/g, "") // Allow dots, percentage signs, hyphens, and special '✦' for nested paths
    .replace(/\s+/g, "-")
    .toLowerCase()

const formatValue = (
  value: any,
  key: string,
  allResolvedTokens: AnyObject
): string => {
  if (key.includes("font-weight")) {
    return String(value) // Keep font weights as unitless numbers
  }

  if (key.includes("shadow") && typeof value === "object" && value !== null) {
    const getPx = (v: any) => {
      const resolved = resolveValue(v, allResolvedTokens)
      return typeof resolved === "number" ? `${resolved}px` : resolved
    }
    const x = getPx(value.x)
    const y = getPx(value.y)
    const blur = getPx(value.blur)
    const spread = getPx(value.spread)
    const color = resolveValue(value.color, allResolvedTokens)
    return `${x} ${y} ${blur} ${spread} ${color}`
  }

  if (typeof value === "number") {
    return `${value}px`
  } else if (typeof value === "string" && value.startsWith("$")) {
    // Resolve aliases before formatting
    const resolved = resolveValue(value, allResolvedTokens)
    return String(resolved)
  }

  return String(value)
}

// --- TOKEN SETUP ---
type AnyObject = Record<string, any>
const allTokens: AnyObject = {}
const cssLines: string[] = []

const tailwindTokens = {
  theme: {
    extend: {
      colors: {} as AnyObject,
      fontSize: {} as AnyObject,
      fontFamily: {} as AnyObject,
      fontWeight: {} as AnyObject,
      lineHeight: {} as AnyObject,
      letterSpacing: {} as AnyObject,
    },
  },
}

// --- RECURSIVE TOKEN EXTRACTION ---
function extractTokens(obj: AnyObject, path: string[] = []): AnyObject {
  const result: AnyObject = {}
  for (const [key, value] of Object.entries(obj)) {
    const newPath = [...path, key] // Don't convert to kebab case here
    if (value?.$value !== undefined) {
      result[newPath.join(".")] = value.$value
    } else if (value?.$type === "FLOAT") {
      result[newPath.join(".")] = value.$value
    } else if (typeof value === "object" && value !== null && !value.$type) {
      Object.assign(result, extractTokens(value, newPath))
    }
  }
  return result
}

// --- ALIAS RESOLUTION ---
function resolveValue(value: any, tokens: AnyObject): any {
  if (typeof value !== "string") return value

  if (value.startsWith("$")) {
    const path = value.substring(1)
    let resolved = get(tokens, path)

    // Resolve nested aliases with depth limit and circular reference detection
    let depth = 0
    const visited: Set<string> = new Set()

    while (
      typeof resolved === "string" &&
      resolved.startsWith("$") &&
      depth < 10
    ) {
      const aliasPath = resolved.substring(1)
      if (visited.has(aliasPath)) {
        console.warn(`Circular reference detected: ${aliasPath}`)
        break
      }
      visited.add(aliasPath)
      resolved = get(tokens, aliasPath)
      depth++
    }

    // Format numeric values with units
    if (typeof resolved === "number") {
      return `${resolved}px`
    }
    return resolved
  }

  return value
}

// Helper function to get nested values from an object
function get(obj: AnyObject, path: string): any {
  return path.split(".").reduce((acc, curr) => acc && acc[curr], obj)
}

// Fully resolve all tokens before mapping
function fullyResolveTokens(tokens: AnyObject): AnyObject {
  const resolvedTokens: AnyObject = {}

  // First pass: resolve all aliases
  for (const [key, value] of Object.entries(tokens)) {
    resolvedTokens[key] = resolveValue(value, tokens)
  }

  // Second pass: resolve any remaining aliases
  let hasChanges = true
  const maxIterations = 10
  let iterations = 0

  while (hasChanges && iterations < maxIterations) {
    hasChanges = false
    iterations++

    for (const [key, value] of Object.entries(resolvedTokens)) {
      const resolved = resolveValue(value, resolvedTokens)
      if (resolved !== value) {
        resolvedTokens[key] = resolved
        hasChanges = true
      }
    }
  }

  if (iterations >= maxIterations) {
    console.warn("Reached maximum iterations while resolving tokens")
  }

  return resolvedTokens
}

// --- TOKEN PROCESSING ---
const TOKEN_MAP = {
  colors: "colors",
  "typography.font-size": "fontSize",
  "typography.font-family": "fontFamily",
  "typography.font-weight": "fontWeight",
  "typography.line-height": "lineHeight",
  "typography.letter-spacing": "letterSpacing",
}

// Add usage information
console.log(`Processing design tokens from: ${resolvedInputPath}`)

// First pass: extract all raw tokens
const rawTokens: AnyObject = {}
for (const block of raw) {
  if (!block.variables || typeof block.variables !== "object") continue
  // 1. Flatten and convert keys to kebab case
  const rawFlatTokens = extractTokens(block.variables)
  const flatTokens: AnyObject = {}
  for (const [key, value] of Object.entries(rawFlatTokens)) {
    flatTokens[toKebab(key)] = value
  }
  Object.assign(rawTokens, flatTokens)
}

// Two-pass resolution to handle nested aliases
const resolvedTokens: AnyObject = {}
for (const key in rawTokens) {
  try {
    resolvedTokens[key] = resolveValue(rawTokens[key], rawTokens)
  } catch (error) {
    console.warn(
      `Could not resolve alias for "${key}": ${(error as Error).message}`
    )
  }
}

// Second pass: fully resolve all tokens
const fullyResolvedTokens = fullyResolveTokens(resolvedTokens)

// Third pass: format and categorize tokens
for (const [key, value] of Object.entries(fullyResolvedTokens)) {
  const cssKey = key.replace(/\./g, "-")
  const formattedValue = formatValue(value, key, fullyResolvedTokens)

  allTokens[cssKey] = formattedValue
  cssLines.push(`  --${cssKey}: ${formattedValue};`)

  for (const [jsonPath, tailwindSection] of Object.entries(TOKEN_MAP)) {
    if (key.startsWith(jsonPath)) {
      const tailwindKey = key
        .substring(jsonPath.length > 0 ? jsonPath.length + 1 : 0)
        .replace(/\./g, "-")

      if (tailwindSection === "colors") {
        const colorPath = key.substring(jsonPath.length + 1)
        const colorPathParts = colorPath.split(".")
        const group = colorPathParts[0]
        const shade = colorPathParts[1]

        if (group && shade) {
          if (!tailwindTokens.theme.extend.colors[group]) {
            tailwindTokens.theme.extend.colors[group] = {}
          }
          tailwindTokens.theme.extend.colors[group][shade] = `var(--${cssKey})`
        }
      } else if (tailwindSection === "fontFamily") {
        tailwindTokens.theme.extend.fontFamily[tailwindKey] = (value as string)
          .split(",")
          .map((s) => s.trim().replace(/\"'|\"'$/g, ""))
      } else {
        ;(tailwindTokens.theme.extend as AnyObject)[tailwindSection][
          tailwindKey
        ] = `var(--${cssKey})`
      }
      break // Move to next token once matched
    }
  }
}

// --- FILE OUTPUT ---
const outputDir = path.join(__dirname, "../")
fs.writeFileSync(
  path.join(outputDir, "styles/theme.css"),
  `:root {\n${cssLines.join("\n")}\n}`
)

fs.writeFileSync(
  path.join(outputDir, "tailwind-theme-extension.json"),
  JSON.stringify(tailwindTokens, null, 2)
)

console.log(`✅ Exported ${Object.keys(allTokens).length} tokens to:
- styles/theme.css
- tailwind-theme-extension.json`)
