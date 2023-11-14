import { Merge } from 'type-fest'
interface ScriptOptions {
  id?: string
  src: string
  async?: boolean
  [key: string]: string | undefined | boolean | (() => void)
  callback?: (script?: HTMLScriptElement) => void
}
const scriptsState = {
  cache: {} as Record<string, HTMLScriptElement>,
  queue: {} as Record<
    string,
    Array<
      Merge<
        ScriptOptions,
        {
          resolve: (script?: HTMLScriptElement) => void
          reject: () => void
        }
      >
    >
  >,
  create: (src: string, scriptConfigs: ScriptOptions) => {
    const $script = document.createElement('script')
    const $fjs = document.querySelector('script')
    for (const key in scriptConfigs) {
      const value = scriptConfigs[key]
      if (key !== 'callback' && typeof value === 'string') {
        $script.setAttribute(key, value)
      }
    }
    $fjs?.parentNode?.insertBefore($script, $fjs)
    $script.onload = () => {
      scriptConfigs?.callback?.($script)
      scriptsState.cache[src] = $script
      while (scriptsState.queue[src].length) {
        scriptsState.queue[src].shift()?.resolve($script)
      }
    }
    $script.onerror = () => {
      scriptsState.queue[src].shift()?.reject()
    }
  }
}
export const loadScripts = async (
  scripts: ScriptOptions | Array<ScriptOptions>,
  parallel = false,
  cache = true
) => {
  scripts = Array.isArray(scripts) ? scripts : [scripts]
  const loadScript = (script: ScriptOptions) =>
    new Promise((resolve, reject) => {
      const { src } = script
      if (scriptsState.cache[src] && cache) {
        return resolve(scriptsState.cache[src])
      }
      scriptsState.queue[src] = [...(scriptsState.queue[src] || []),
        {
          ...script,
          resolve: resolve as (script?: HTMLScriptElement) => void,
          reject: reject as () => void
        }
      ]
      if (scriptsState.queue[src].length === 1) {
        scriptsState.create(src, script)
      }
    })
  if (parallel) {
    return Promise.all(scripts.map((script) => loadScript(script)))
  }
  const result = []
  for (let index = 0; index < scripts.length; index++) {
    result[index] = await loadScript(scripts[index])
  }
  return result
}
