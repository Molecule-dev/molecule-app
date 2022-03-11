import React from 'react'
import styled from 'styled-components'
import { mix } from 'polished'

export type TextareaValue = string | number | readonly string[] | undefined
export type TextareaState = { value: TextareaValue }
export type TextareaSetState = React.Dispatch<React.SetStateAction<TextareaState>>

/**
 * The styled placeholder element for the `textarea`.
 */
export const TextareaPlaceholder = styled.span.attrs({ 'aria-hidden': true })`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 17px;
  padding: 3px;
  font-size: 11px;
  line-height: 1;
  white-space: nowrap;
  color: ${({ theme }) => theme.colors.text};
  text-transform: uppercase;
  pointer-events: none;
  transition: all 0.25s ease-in-out;

  &:empty {
    display: none;
  }
`

export type TextareaProps = React.HTMLProps<HTMLTextAreaElement> & {
  placeholderComponent?: React.ReactNode
  onInput?: (event: React.FormEvent<HTMLTextAreaElement>, setState?: TextareaSetState) => void
  onChange?: (event: React.FormEvent<HTMLTextAreaElement>, setState?: TextareaSetState) => void
  onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>, setState?: TextareaSetState) => void
  onKeyUp?: (event: React.KeyboardEvent<HTMLTextAreaElement>, setState?: TextareaSetState) => void
  onKeyDown?: (event: React.KeyboardEvent<HTMLTextAreaElement>, setState?: TextareaSetState) => void
  onKeyPress?: (event: React.KeyboardEvent<HTMLTextAreaElement>, setState?: TextareaSetState) => void
  useEffect?: boolean
}

/**
 * A styled `textarea` element.
 * 
 * This is a simple wrapper around the native `textarea` element,
 * so you can replace `<textarea { ...props } />` with `<UI.Textarea { ...props } />`
 * for better looking, easily stylable textareas for your application.
 * 
 * Example usage:
 * ```tsx
 * import React, { useState } from 'react'
 * import * as UI from '../../UI'
 * 
 * export type ExampleProps = React.HTMLProps<HTMLDivElement>
 * 
 * export const Example = (props: ExampleProps): React.ReactElement => {
 *   const [ value, setValue ] = useState('')
 * 
 *   return (
 *     <div { ...props }>
 *       <p>
 *         Type something into the textarea.
 *       </p>
 * 
 *       <UI.Textarea
 *         placeholder='Hello, World!'
 *         name='example'
 *         value={value}
 *         onInput={event => {
 *           setValue(event.currentTarget.value)
 *         }}
 *       />
 *     </div>
 *   )
 * }
 * ```
 */
export const Textarea = styled(({
  className,
  placeholder,
  placeholderComponent,
  value = ``,
  onInput,
  onChange,
  onBlur,
  onKeyUp,
  onKeyDown,
  onKeyPress,
  children,
  useEffect = true,
  ...props
}: TextareaProps) => {
  const [ state, setState ] = React.useState<TextareaState>({ value })

  React.useEffect(() => {
    if (useEffect) {
      setState({ value })
    }
  }, [ useEffect, value ])

  return (
    <span className={className}>
      <textarea
        { ...props }
        value={state.value}
        placeholder={placeholder || props.name}
        aria-label={props['aria-label'] || placeholder || props.name}
        onInput={event => {
          setState({ value: event.currentTarget.value })

          if (onInput) {
            onInput(event, setState)
          }
        }}
        onChange={event => {
          setState({ value: event.currentTarget.value })

          if (onChange) {
            onChange(event, setState)
          }
        }}
        onBlur={event => {
          if (onBlur) {
            onBlur(event, setState)
          }
        }}
        onKeyUp={onKeyUp && (event => onKeyUp(event, setState))}
        onKeyDown={onKeyDown && (event => onKeyDown(event, setState))}
        onKeyPress={onKeyPress && (event => onKeyPress(event, setState))}
      />

      {placeholderComponent || (
        <TextareaPlaceholder>
          {placeholder}
        </TextareaPlaceholder>
      )}

      {children}
    </span>
  )
})`
  position: relative;
  display: inline-block;
  vertical-align: middle;

  > textarea {
    display: inline-block;
    vertical-align: middle;
    width: 100%;
    height: 100%;
    min-height: 150px;
    margin: 0;
    padding: 5px 3px;
    padding-top: ${({ placeholder, placeholderComponent }) => (placeholder || placeholderComponent) ? `17px` : `5px`};
    border: 1px solid transparent;
    border-bottom-color: ${({ theme }) => mix(0.33, theme.colors.grayText, theme.colors.background)};
    border-radius: 1px;
    background: transparent;
    color: ${({ theme }) => theme.colors.text};
    font-size: 17px;
    font-family: inherit;
    line-height: 1.25;
    text-align: inherit;
    transition: border 0.25s ease-in-out, color 0.25s ease-in-out, background 0.25s ease-in-out;

    &::placeholder {
      display: none;
      opacity: 0;
    }

    &:hover {
      border-bottom-color: ${({ theme }) => mix(0.75, theme.colors.grayText, theme.colors.primary)};
      background: ${({ theme }) => theme.colors.inputBackground};

      ~ ${TextareaPlaceholder} {
        color: ${({ theme }) => mix(0.75, theme.colors.text, theme.colors.primary)};
        background: ${({ theme }) => theme.colors.inputBackground};
      }
    }

    &:focus,
    &:focus:hover {
      border-bottom-color: ${({ theme }) => theme.colors.primary};
      background: ${({ theme }) => theme.colors.inputBackground};
    }

    &:hover,
    &:focus,
    &:focus:hover {
      box-shadow: 0 0 1.5px 1.5px rgba(0, 0, 0, 0.025);
    }

    &:focus ~ ${TextareaPlaceholder} {
      color: ${({ theme }) => theme.colors.primary};
      text-shadow: 0 0 ${({ theme }) => theme.colors.primary};
      background: ${({ theme }) => theme.colors.inputBackground};

      &.default {
        display: none;
      }
    }
  }
`
