import React from 'react'
import styled from 'styled-components'
import { mix } from 'polished'
import { Button } from './Button'

export type SelectValue = string | number | readonly string[] | undefined
export type SelectState = { value?: SelectValue; selectedText?: string }
export type SelectSetState = React.Dispatch<React.SetStateAction<SelectState>>

/**
 * To achieve the same style across browsers, the selected option's text
 * is rendered on top of the `select` element.
 */
export const SelectSelectedText = styled.span`
  position: absolute;
  top: 0;
  bottom: 1px;
  left: 0;
  right: 0;
  width: 100%;
  height: calc(100% - 1px);
  padding: 17px 3px 0;
  font-size: 17px;
  line-height: 23px;
  white-space: nowrap;
  overflow: hidden;
  color: ${({ theme }) => theme.colors.text};
  background: inherit;
  pointer-events: none;
`

/**
 * The styled placeholder element for the select menu.
 */
export const SelectPlaceholder = styled.span.attrs({ 'aria-hidden': true })`
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

/**
 * The styled arrow icon for the select menu.
 */
export const SelectArrow = styled.b`
  position: absolute;
  top: 1px;
  bottom: 1px;
  right: 1px;
  padding: 0 5px;
  font-size: 12px;
  font-weight: normal;
  line-height: 40px;
  background: ${({ theme }) => theme.colors.inputBackground};
  color: ${({ theme }) => theme.colors.text};
  pointer-events: none;
  opacity: 0.25;
  transition: all 0.25s ease-in-out;
`

export type SelectProps = React.HTMLProps<HTMLSelectElement> & {
  placeholderComponent?: React.ReactNode
  useEffect?: boolean
}

/**
 * A styled `select` element, normalized to look the same for every major browser.
 * 
 * You can replace `<select { ...props } />` with `<UI.Select { ...props } />`
 * for filterable, better looking, easily stylable select menus for your application.
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
 *   const options = [
 *     '',
 *     'foo',
 *     'bar'
 *   ]
 * 
 *   return (
 *     <div { ...props }>
 *       <p>
 *         Select an option.
 *       </p>
 * 
 *       <UI.Select
 *         style={{ width: 200 }}
 *         placeholder='Hello, World!'
 *         name='example'
 *         value={value}
 *         onChange={event => {
 *           setValue(event.currentTarget.value)
 *         }}
 *       >
 *         {options.map(option => (
 *           <option key={option} value={option}>
 *             {option}
 *           </option>
 *         ))}
 *       </UI.Select>
 *     </div>
 *   )
 * }
 * ```
 */
export const Select = styled(({
  className,
  name,
  placeholder,
  placeholderComponent,
  value = ``,
  onChange,
  useEffect = true,
  children,
  ...props
}: SelectProps): React.ReactElement => {
  const [ state, setState ] = React.useState<SelectState>({ value, selectedText: `` })

  React.useEffect(() => {
    if (useEffect) {
      setState(state => ({ value, selectedText: state.selectedText }))
    }
  }, [ useEffect, value ])

  return (
    <span className={className}>
      <select
        { ...props }
        name={name}
        placeholder={placeholder || name}
        aria-label={props['aria-label'] || placeholder || name}
        value={state.value}
        ref={element => {
          if (element && element.options[element.selectedIndex]) {
            const { value } = element
            const selectedText = element.options[element.selectedIndex].text

            if (selectedText !== state.selectedText) {
              setState({ value, selectedText })
            }
          }
        }}
        onChange={event => {
          const { value } = event.currentTarget
          const selectedText = event.currentTarget.options[event.currentTarget.selectedIndex].text

          setState({ value, selectedText })

          if (onChange) {
            onChange(event)
          }
        }}
      >
        {children}
      </select>

      <SelectSelectedText className='selected-text'>
        {state.selectedText}
      </SelectSelectedText>

      {placeholderComponent || (
        <SelectPlaceholder>
          {placeholder}
        </SelectPlaceholder>
      )}

      <SelectArrow>
        ▼
      </SelectArrow>
    </span>
  )
})`
  position: relative;
  display: inline-block;
  vertical-align: middle;
  background: inherit;

  > select {
    display: inline-block;
    vertical-align: middle;
    width: 100%;
    height: 45px;
    font-size: 18px;
    line-height: 21px;
    margin: 0;
    padding: 45px 22px 0 3px;
    border: 1px solid transparent;
    border-bottom-color: ${({ theme }) => mix(0.33, theme.colors.grayText, theme.colors.background)};
    border-radius: 1px;
    background: inherit;
    color: transparent;
    text-align: inherit;
    appearance: none;
    transition: all 0.25s ease-in-out;

    &::placeholder {
      display: none;
      opacity: 0;
    }

    &:hover {
      border-bottom-color: ${({ theme }) => mix(0.75, theme.colors.grayText, theme.colors.primary)};
      background: ${({ theme }) => theme.colors.inputBackground};
      color: ${({ theme }) => theme.colors.text};

      ~ ${SelectPlaceholder} {
        color: ${({ theme }) => mix(0.75, theme.colors.text, theme.colors.primary)};
        background: ${({ theme }) => theme.colors.inputBackground};
      }
    }

    &:focus,
    &:focus:hover {
      border-bottom-color: ${({ theme }) => theme.colors.primary};
      background: ${({ theme }) => theme.colors.inputBackground};
      color: ${({ theme }) => theme.colors.text};
    }

    &:hover,
    &:focus,
    &:focus:hover {
      box-shadow: 0 0 1.5px 1.5px rgba(0, 0, 0, 0.025);
    }

    &:hover ~ ${SelectPlaceholder} {
      color: inherit;
      background: ${({ theme }) => theme.colors.inputBackground};
    }

    &:focus ~ ${SelectPlaceholder} {
      color: ${({ theme }) => theme.colors.primary};
      text-shadow: 0 0 ${({ theme }) => theme.colors.primary};
      background: ${({ theme }) => theme.colors.inputBackground};
    }

    &[disabled] {
      ~ ${SelectArrow} {
        display: none;
      }
    }

    ~ ${Button} {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }
  }

  &:hover {
    > ${SelectArrow} {
      opacity: 1;
    }
  }
`
