import React from 'react'

/**
 * Assigns the value to a potentially deep key.
 * 
 * The `keyPath` can be just one - e.g., `foo` - or it can be deep - e.g., `foo.bar.baz`.
 */
export const getDeepObject = (keyPath: string, value: JSONObject, deepObject: JSONObject = {}): JSONObject => {
  let current = deepObject
  let key = ``

  const keys = keyPath.split(`.`)

  while (keys.length) {
    key = keys.shift() || ``

    if (keys.length) {
      if (!current[key]) {
        current[key] = {} as JSONObject
      }

      current = current[key] as JSONObject
    } else {
      current[key] = value
    }
  }

  return deepObject
}

/**
 * Gets form data with some helpful additions/shortcuts.
 * 
 * By default, all elements with a `name` attribute are used (i.e., the `selector` argument defaults to `[name]`),
 * regardless of being a valid form element.
 * 
 * Any elements with a `data-json` attribute will have this attribute parsed as JSON and used as its value.
 * 
 * If an element does not have a `value` attribute but has `innerText`, the `innerText` is used as its value.
 * 
 * The `value` attribute of checkboxes will be used if checked, empty string if not.
 * 
 * The `value` attribute of radio buttons will be set only if the radio button is selected.
 * 
 * You can include periods within elements names to create "deep" form data which matches the original object.
 * For example, <UI.Input name='foo.bar.baz' value={foo.bar.baz} /> will result in form data which looks like `{ foo: { bar: { baz } } }`.
 */
export const getFormData = (form: HTMLFormElement, selector = `[name]`): JSONObject => {
  const elements = Array.prototype.slice.call(form.querySelectorAll(selector))
  const formData = {}

  for (const element of elements) {
    if (element.name) {
      if (element.hasAttribute('data-json')) {
        try {
          getDeepObject(
            element.name,
            JSON.parse(element.getAttribute('data-json')),
            formData
          )
        } catch (error) {
        }
      } else if (!element.value && element.value !== `` && element.innerText) {
        getDeepObject(element.name, element.innerText, formData)
      } else if (element.type === 'checkbox') {
        getDeepObject(element.name, element.checked ? element.value : '', formData)
      } else if (element.type === 'radio') {
        if (element.checked) {
          getDeepObject(element.name, element.value, formData)
        }
      } else {
        getDeepObject(element.name, element.value, formData)
      }
    }
  }

  return formData
}

const defaultGetFormData = getFormData

export type FormProps = Omit<React.HTMLProps<HTMLFormElement>, 'onSubmit'> & {
  getFormData?: (form: HTMLFormElement, selector?: string) => JSONObject
  onSubmit?: (event: React.FormEvent, formData: JSONObject) => void
  onInput?: (event: React.FormEvent, formData: JSONObject) => void
}

/**
 * A wrapper around the native `form` element with some helpful additions.
 * 
 * Intercepts `onSubmit` and `onInput` to pass an extra `formData` parameter
 * which is a JSON object containing the state of the form data,
 * which can be as complex (deep) or as simple as you need it to be.
 * 
 * By default, the form data is determined from elements with a `name` attribute,
 * where name can be a "deep" string. For example, consider the following:
 * ```ts
 * return (
 *   <UI.Form onSubmit={(event, formData) => logger.info(formData)}>
 *     <UI.Input
 *       name='foo.bar.baz'
 *       value='Hello, World!'
 *     />
 * 
 *     <UI.Button type='submit'>
 *       <span>
 *         Submit
 *       </span>
 *     </UI.Button>
 *   </UI.Form>
 * )
 * 
 * // Submitting the form would log the following:
 * const formData: JSONObject = {
 *   foo: {
 *     bar: {
 *       baz: 'Hello, World!"
 *     }
 *   }
 * }
 * ```
 * 
 * You can also use a `data-json` attribute to specify JSON values, if necessary:
 * ```
 * const [ value, setValue ] = useState('')
 * 
 * return (
 *   <UI.Form onSubmit={(event, formData) => logger.info(formData)}>
 *     <UI.Input
 *       name='foo'
 *       value={value}
 *       onInput={event => setValue(event.currentTarget.value)}
 *       data-json={JSON.stringify({ bar: { baz: value } })}
 *     />
 * 
 *     <UI.Button type='submit'>
 *       <span>
 *         Submit
 *       </span>
 *     </UI.Button>
 *   </UI.Form>
 * )
 * ```
 * 
 * If you're managing the state of the form elsewhere, then you probably don't need any of this,
 * but wrapping your inputs in a form is generally a good idea to avoid any confusion,
 * even if the form submission functionality goes unused.
 */
export const Form = ({ action = `#`, getFormData = defaultGetFormData, onSubmit, onInput, ...props }: FormProps): React.ReactElement => {
  const ref = React.useRef<HTMLFormElement>()

  return (
    <form
      ref={(element) => {
        ref.current = element || undefined
      }}

      action={action}

      onSubmit={event => {
        if (onSubmit) {
          onSubmit(event, ref.current ? getFormData(ref.current) : {})
        }

        event.preventDefault()
        return false
      }}

      onInput={event => {
        if (onInput) {
          onInput(event, ref.current ? getFormData(ref.current) : {})
        }
      }}

      { ...props }
    />
  )
}
