import React from 'react'
import styled from 'styled-components'
import { mix } from 'polished'

export type InputValue = string | number | readonly string[] | undefined
export type InputState = { value: InputValue }
export type InputSetState = React.Dispatch<React.SetStateAction<InputState>>

export type InputDateTimeProps = React.HTMLProps<HTMLInputElement> & {
  offsetTime?: number
}

/**
 * Two input elements designed to normalize datetime inputs across different browsers.
 */
export const InputDateTime = ({ name, placeholder, value, offsetTime = 0, onInput, onChange, style, ...props }: InputDateTimeProps): React.ReactElement => {
  const [ state, setState ] = React.useState<InputState>({ value })

  const [ date, time ] = new Date(new Date(typeof state.value === `number` ? state.value : String(state.value)).getTime() + offsetTime)
    .toISOString()
    .replace(/Z$/, ``)
    .replace(/\.[0-9][0-9][0-9]$/, ``)
    .replace(/:[0-9][0-9]$/, `:00`)
    .split(`T`)

  const getValue = (date: string, time: string): string => {
    let value = new Date(new Date().getTime() - offsetTime).toISOString()

    try {
      value = new Date(new Date(`${date}T${time}Z`).getTime() - offsetTime).toISOString()
    } catch (error) {
    }

    return value
  }

  React.useEffect(() => setState({ value }), [ value, offsetTime ])

  return (
    <>
      <input
        { ...props }
        type='date'
        style={{ ...style, width: `55%` }}
        placeholder={`${placeholder} date`}
        aria-label={`${placeholder} date`}
        value={date}
        onInput={event => {
          const date = event.currentTarget.value
          const value = date && getValue(String(date), time)

          if (value) {
            setState({ value })

            if (onInput) {
              onInput({ ...event, currentTarget: { name, value } as typeof event.currentTarget })
            }
          }
        }}
        onChange={event => {
          const date = event.currentTarget.value
          const value = date && getValue(String(date), time)

          if (value) {
            setState({ value })

            if (onChange) {
              onChange({ ...event, currentTarget: { name, value } as typeof event.currentTarget })
            }
          }
        }}
      />

      <input
        { ...props }
        type='time'
        style={{ ...style, width: `45%` }}
        placeholder={`${placeholder} time`}
        aria-label={`${placeholder} time`}
        value={time}
        onInput={event => {
          let time = event.currentTarget.value
          while (time.split(`:`).length < 3) {
            time = `${time}:00`
          }
          const value = time && getValue(date, time)

          if (value) {
            setState({ value })

            if (onInput) {
              onInput({ ...event, currentTarget: { name, value } as typeof event.currentTarget })
            }
          }
        }}
        onChange={event => {
          let time = event.currentTarget.value
          while (time.split(`:`).length < 3) {
            time = `${time}:00`
          }
          const value = time && getValue(date, time)

          if (value) {
            setState({ value })

            if (onChange) {
              onChange({ ...event, currentTarget: { name, value } as typeof event.currentTarget })
            }
          }
        }}
      />

      {name && (
        <input
          type='hidden'
          name={name}
          value={state.value}
        />
      )}
    </>
  )
}

/**
 * The input's styled placeholder element.
 */
export const InputPlaceholder = styled.span.attrs({ 'aria-hidden': true })`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  padding: 3px;
  font-size: 11px;
  line-height: 1;
  white-space: nowrap;
  color: ${({ theme }) => theme.colors.text};
  text-transform: uppercase;
  pointer-events: none;
  transition: all 0.25s ease-in-out;
`

const InputChild = ({ type, ...props }: React.HTMLProps<HTMLInputElement>): React.ReactElement => (
  (type === `datetime-local` || type === `datetime`) ? (
    <InputDateTime { ...props } />
  ) : (
    <input type={type} { ...props } />
  )
)

export type InputProps = React.HTMLProps<HTMLInputElement> & {
  placeholderComponent?: React.ReactNode
  onInput?: (event: React.FormEvent<HTMLInputElement>, setState?: InputSetState) => void
  onChange?: (event: React.FormEvent<HTMLInputElement>, setState?: InputSetState) => void
  onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>, setState?: InputSetState) => void
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>, setState?: InputSetState) => void
  onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>, setState?: InputSetState) => void
  useEffect?: boolean
}

/**
 * A styled `input` element.
 * 
 * This is a simple wrapper around the native `input` element,
 * so you can replace `<input { ...props } />` with `<UI.Input { ...props } />`
 * for better looking, easily stylable inputs for your application.
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
 *         Type something into the input.
 *       </p>
 * 
 *       <UI.Input
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
export const Input = styled(({
  className,
  width,
  type = `text`,
  placeholder = ``,
  placeholderComponent,
  value = ``,
  onInput,
  onChange,
  onKeyUp,
  onKeyDown,
  onKeyPress,
  children,
  useEffect = true,
  ...props
}: InputProps) => {
  const [ state, setState ] = React.useState<InputState>({ value })

  React.useEffect(() => {
    if (useEffect) {
      setState({ value })
    }
  }, [ useEffect, value ])

  return (
    <span className={className}>
      <InputChild
        type={type || `text`}
        { ...props }
        placeholder={placeholder || props.name}
        aria-label={props[`aria-label`] || placeholder || props.name}
        value={state.value}
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
        onKeyUp={onKeyUp && (event => onKeyUp(event, setState))}
        onKeyDown={onKeyDown && (event => onKeyDown(event, setState))}
        onKeyPress={onKeyPress && (event => onKeyPress(event, setState))}
      />

      {placeholderComponent || (
        <InputPlaceholder>
          {placeholder}
        </InputPlaceholder>
      )}

      {children}
    </span>
  )
})`
  position: relative;
  display: inline-block;
  vertical-align: middle;

  ${({ width }) => typeof width !== `undefined` ? `
    &&& {
      width: ${width};
    }
  ` : ``}

  > input {
    display: inline-block;
    vertical-align: middle;
    width: 100%;
    height: 45px;
    padding: 22px 3px 5px;
    font-size: 18px;
    margin: 0;
    border: 1px solid transparent;
    border-bottom-color: ${({ theme }) => mix(0.33, theme.colors.grayText, theme.colors.background)};
    border-radius: 1px;
    background: transparent;
    color: ${({ theme }) => theme.colors.text};
    line-height: 1;
    text-align: inherit;
    transition: all 0.25s ease-in-out;

    &::placeholder {
      display: none;
      opacity: 0;
    }

    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:active,
    &:-webkit-autofill:focus {
      color: ${({ theme }) => theme.colors.text} !important;
      background-color: ${({ theme }) => theme.colors.inputBackground} !important;
      border-color: ${({ theme }) => theme.colors.inputBackground} !important;
      -webkit-box-shadow: 0 0 0 1000px ${({ theme }) => theme.colors.inputBackground} inset !important;
      -webkit-text-fill-color: ${({ theme }) => theme.colors.text} !important;
    }

    &::-webkit-credentials-auto-fill-button {
      position: absolute;
      bottom: 5px;
      right: 0;
    }

    &:hover {
      border-bottom-color: ${({ theme }) => mix(0.75, theme.colors.grayText, theme.colors.primary)};
      background: ${({ theme }) => theme.colors.inputBackground};

      ~ ${InputPlaceholder} {
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

    &:focus ~ ${InputPlaceholder} {
      color: ${({ theme }) => theme.colors.primary};
      text-shadow: 0 0 ${({ theme }) => theme.colors.primary};
      background: ${({ theme }) => theme.colors.inputBackground};
    }
  }
`
