import React from 'react'
import styled from 'styled-components'
import { mix } from 'polished'
import { EllipsisIcon } from '@primer/octicons-react'
import Quill from 'quill'
import { Button } from './Button'
import 'quill/dist/quill.snow.css'

export type RTEValue = { text: string; html: string }
export type RTEState = { value: RTEValue }
export type RTESetState = React.Dispatch<React.SetStateAction<RTEState>>
export type RTEFormEvent = { currentTarget: RTEWrapperElement }
export type RTEFormEventHandler = (event: RTEFormEvent, setState?: RTESetState) => void

export interface RTEWrapperElement extends HTMLDivElement {
  name?: string
  value: RTEValue
}

export interface RTEQuillInstance extends Quill {
  element?: RTEWrapperElement
}

export interface RTEToolbars {
  [key: string]: JSONArray
}

// Configure Quill to use inline styles
const DirectionAttribute = Quill.import('attributors/attribute/direction')
Quill.register(DirectionAttribute, true)
const AlignClass = Quill.import('attributors/class/align')
Quill.register(AlignClass, true)
const BackgroundClass = Quill.import('attributors/class/background')
Quill.register(BackgroundClass, true)
const ColorClass = Quill.import('attributors/class/color')
Quill.register(ColorClass, true)
const DirectionClass = Quill.import('attributors/class/direction')
Quill.register(DirectionClass, true)
const FontClass = Quill.import('attributors/class/font')
Quill.register(FontClass, true)
const SizeClass = Quill.import('attributors/class/size')
Quill.register(SizeClass, true)
const AlignStyle = Quill.import('attributors/style/align')
Quill.register(AlignStyle, true)
const BackgroundStyle = Quill.import('attributors/style/background')
Quill.register(BackgroundStyle, true)
const ColorStyle = Quill.import('attributors/style/color')
Quill.register(ColorStyle, true)
const DirectionStyle = Quill.import('attributors/style/direction')
Quill.register(DirectionStyle, true)
const FontStyle = Quill.import('attributors/style/font')
Quill.register(FontStyle, true)
const SizeStyle = Quill.import('attributors/style/size')
Quill.register(SizeStyle, true)

export const defaultToolbars: RTEToolbars = {
  minimal: [
    ['bold', 'italic', 'underline'],                  // toggled buttons
    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    ['link', 'image']
  ],

  all: [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    ['link', 'image'],
    ['blockquote', 'code-block'],
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'align': [] }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [{ 'font': [] }],
    ['clean']                                         // remove formatting button
  ]
}

export const RTEPlaceholder = styled.span.attrs({ 'aria-hidden': true })`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  padding: 4px 3px 3px;
  font-size: 11px;
  line-height: 1;
  white-space: nowrap;
  color: ${({ theme }) => theme.colors.grayText};
  text-transform: uppercase;
  pointer-events: none;
  transition: all 0.25s ease-in-out;

  &:empty {
    display: none;
  }
`

export type RTEProps = Omit<React.HTMLProps<HTMLDivElement>, 'value' | 'onInput' | 'onChange' | 'onFocus' | 'onBlur'> & {
  placeholderComponent?: React.ReactNode
  value: RTEValue
  onInput?: RTEFormEventHandler
  onChange?: RTEFormEventHandler
  onFocus?: RTEFormEventHandler
  onBlur?: RTEFormEventHandler
  useEffect?: boolean
  toolbars?: RTEToolbars
  toolbarKey?: string
  buttonDisabled?: boolean
  scrollElementRef?: React.RefObject<null | HTMLElement>
}

/**
 * A custom rich text editor using Quill.
 * 
 * Aims to be similar in function to the native `textarea` element,
 * but the value is an object containing both `text` and `html` instead of a string.
 * 
 * Example usage:
 * ```tsx
 * import React, { useState } from 'react'
 * import * as UI from '../../UI'
 * 
 * export type ExampleProps = React.HTMLProps<HTMLDivElement>
 * 
 * export const Example = (props: ExampleProps): React.ReactElement => {
 *   const [ value, setValue ] = useState({
 *     html: `<p><br></p>`,
 *     text: `\n`
 *   })
 * 
 *   return (
 *     <div { ...props }>
 *       <p>
 *         Type something into the rich text editor and see console logs for value changes.
 *       </p>
 * 
 *       <UI.RTE
 *         placeholder='Hello, World!'
 *         name='example'
 *         value={value}
 *         onInput={event => {
 *           console.log(event.currentTarget.value)
 *           setValue(event.currentTarget.value)
 *         }}
 *       />
 *     </div>
 *   )
 * }
 * ```
 * 
 * @see https://www.npmjs.com/package/quill
 */
export const RTE = styled(({
  className,
  name,
  placeholder,
  placeholderComponent,
  value = { text: ``, html: `` },
  disabled,
  autoFocus,
  onInput,
  onChange,
  onFocus,
  onBlur,
  children,
  useEffect = true,
  toolbars = defaultToolbars,
  toolbarKey: initialToolbarKey,
  buttonDisabled,
  scrollElementRef,
  ...props
}: RTEProps) => {
  const [ state, setState ] = React.useState<RTEState>({ value })
  const [ editor, setEditor ] = React.useState<null | RTEQuillInstance>(null)
  const [ hasFocus, setHasFocus ] = React.useState<boolean>(false)
  const [ shouldAutoFocus, setShouldAutoFocus ] = React.useState<boolean>(autoFocus || false)
  const [ toolbarKey, setToolbarKey ] = React.useState<string>(initialToolbarKey || `minimal`)
  const ref = React.useRef({ height: 0 })

  const updateEditor = (element: null | RTEWrapperElement, toolbarKey: string) => {
    if (!element) {
      return
    }

    const existingToolbar = element.parentNode?.querySelector(`.ql-toolbar`)

    if (existingToolbar && element.parentNode) {
      element.parentNode.removeChild(existingToolbar)
    }

    element.innerHTML = state.value.html

    const editor: RTEQuillInstance = new Quill(element, {
      theme: `snow`,
      modules: {
        toolbar: toolbars[toolbarKey] || toolbars.minimal
      }
    })

    editor.on(`text-change`, () => {
      const content = element.querySelector(`.ql-editor`) as HTMLDivElement

      if (!content) {
        return
      }

      const height = content.offsetHeight
      const value = {
        text: editor.getText(),
        html: content.innerHTML
      }

      element.value = value

      if (onInput) {
        onInput({ currentTarget: element }, setState)
      }

      if (onChange) {
        onChange({ currentTarget: element }, setState)
      }

      if (scrollElementRef?.current && height > ref.current.height) {
        scrollElementRef.current.scrollTop += height - ref.current.height
      }

      ref.current.height = height
    })

    editor.element = element
    setEditor(editor)
  }

  React.useEffect(() => {
    if (useEffect) {
      setState({ value })
    }
  }, [ useEffect, value ])

  React.useEffect(() => {
    if (editor && shouldAutoFocus) {
      setShouldAutoFocus(false)
      editor.focus()
    }
  }, [ editor, shouldAutoFocus ])

  React.useEffect(() => {
    const content = editor?.element?.querySelector(`.ql-editor`) as HTMLDivElement

    if (content) {
      content.tabIndex = disabled ? -1 : 0
    }
  }, [ editor, disabled ])

  return (
    <div className={`${className}${hasFocus ? ` focus` : ``}${disabled ? ` disabled` : ``}`}>
      {placeholderComponent || (
        <RTEPlaceholder>
          {placeholder}
        </RTEPlaceholder>
      )}

      {name && (
        <input
          type='hidden'
          name={name}
          data-json={JSON.stringify(state.value)}
        />
      )}

      <div
        ref={(element: RTEWrapperElement) => {
          if (element && !editor) {
            updateEditor(element, toolbarKey)
          }
        }}
        placeholder={placeholder || name}
        aria-label={props['aria-label'] || placeholder || name}
        onFocus={() => {
          if (editor) {
            setHasFocus(editor.hasFocus())
          }

          if (onFocus && editor?.element) {
            editor.element.value = value
            onFocus({ currentTarget: editor.element }, setState)
          }
        }}
        onBlur={() => {
          if (editor) {
            setHasFocus(editor.hasFocus())
          }

          if (onBlur && editor?.element) {
            editor.element.value = value
            onBlur({ currentTarget: editor.element }, setState)
          }
        }}
        { ...props }
      />

      {toolbarKey !== `all` && (
        <Button
          title='Show all formatting options'
          backgroundColor='transparent'
          color='text'
          disabled={Boolean(buttonDisabled)}
          onClick={() => {
            const nextToolbarKey = `all`
            setToolbarKey(nextToolbarKey)
            updateEditor(editor?.element || null, nextToolbarKey)
          }}
        >
          <EllipsisIcon aria-label='Show all formatting options' />
        </Button>
      )}

      {children}
    </div>
  )
})`
  &&& {
    position: relative;
    margin: 0 auto 15px;
    padding: 0;
    padding-top: ${({ placeholder, placeholderComponent }) => (placeholder || placeholderComponent) ? `19px` : `0`};
    border-bottom: 1px solid ${({ theme }) => mix(0.33, theme.colors.grayText, theme.colors.background)};
    transition: all 0.25s ease-in-out;

    > .ql-toolbar {
      border: 0;
      padding: 8px 3px;
      background-color: transparent;
    }

    > .ql-container {
      border: 0;
      font-size: 15px;

      &::placeholder {
        display: none;
        opacity: 0;
      }

      > .ql-editor {
        padding: 12px;
        min-height: 60px;
      }

      > .ql-tooltip {
        left: auto !important;
        right: 0 !important;
      }
    }

    > ${Button} {
      position: absolute;
      z-index: 1;
      top: ${({ placeholder }) => placeholder ? `19px` : `0`};
      right: 0;
      width: 26px;
      height: 40px;
      padding: 10px 3px;

      &:hover {
        color: ${({ theme }) => theme.colors.blue};
      }
    }

    &:hover {
      border-bottom-color: ${({ theme }) => mix(0.75, theme.colors.grayText, theme.colors.primary)};
      background: ${({ theme }) => theme.colors.inputBackground};

      ~ ${RTEPlaceholder} {
        color: ${({ theme }) => mix(0.75, theme.colors.text, theme.colors.primary)};
        background: ${({ theme }) => theme.colors.inputBackground};
      }
    }

    &.focus,
    &.focus:hover {
      border-bottom-color: ${({ theme }) => theme.colors.primary};
      background: ${({ theme }) => theme.colors.inputBackground};
    }

    &:hover,
    &.focus,
    &.focus:hover {
      box-shadow: 0 0 1.5px 1.5px rgba(0, 0, 0, 0.025);
    }

    &.focus > ${RTEPlaceholder} {
      color: ${({ theme }) => theme.colors.primary};
      text-shadow: 0 0 ${({ theme }) => theme.colors.primary};
      background: ${({ theme }) => theme.colors.inputBackground};
    }

    &.disabled {
      &:after {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: 100%;
      }

      > .ql-toolbar {
        display: none;
      }

      > ${Button} {
        display: none;
      }
    }
  }
`
