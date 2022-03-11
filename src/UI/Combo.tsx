import React from 'react'
import styled from 'styled-components'
import { mix } from 'polished'

export type ComboState = { value?: string; inputValue?: string }
export type ComboSetState = React.Dispatch<React.SetStateAction<ComboState>>

/**
 * The styled `input` element for the combo box.
 */
export const ComboInput = styled.input`
  display: inline-block;
  vertical-align: middle;
  width: 100%;
  height: 45px;
  padding: 19px 22px 5px 3px;
  font-size: 18px;
  line-height: 20px;
  margin: 0;
  border: 1px solid transparent;
  border-bottom-color: ${({ theme }) => mix(0.33, theme.colors.grayText, theme.colors.background)};
  border-radius: 1px;
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
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
`

/**
 * The combo box's list of selectable options.
 */
export const ComboOptions = styled.ul`
  display: none;
  list-style: none;
  margin: 0;
  padding: 3px 0;
  background: ${({ theme }) => theme.colors.inputBackground};
  box-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.05);
  position: absolute;
  z-index: 10;
  top: 100%;
  left: 0;
  right: 0;
  max-height: 250px;
  overflow: auto;

  > * {
    padding: 10px 15px;
    font-size: 14px;
    line-height: 1;
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => theme.colors.inputBackground};
    cursor: pointer;

    &:hover {
      color: inherit;
      background: ${({ theme }) => theme.colors.highlight};
      transition: color 0.25s ease-in-out, background 0.25s ease-in-out;
    }
  }
`

/**
 * The styled placeholder element for the combo box.
 */
export const ComboPlaceholder = styled.span.attrs({ 'aria-hidden': true })`
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
 * The styled arrow icon for the combo box.
 */
export const ComboArrow = styled.b`
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

export type ComboProps = React.HTMLProps<HTMLInputElement> & {
  placeholderComponent?: React.ReactNode
  value?: string
  inputValue?: string
  onInput?: (event: React.FormEvent<HTMLInputElement>, setState?: ComboSetState) => void
  onChange?: (event: { currentTarget: { name: string; value: string } }, setState?: ComboSetState) => void
  useEffect?: boolean
}

/**
 * A custom "combo" box. Looks like a select menu, but you can type into it like it's an input.
 * The `value` prop represents the selected value, while the `inputValue` prop represents the value of the input.
 * What you do with the input/selection is up to you - e.g., filtering, adding/removing options, etc.
 * 
 * You can replace `<select { ...props } />` with `<UI.Combo { ...props } />`
 * for filterable, better looking, easily stylable select menus with inputs for your application.
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
 *   const [ inputValue, setInputValue ] = useState('')
 *   const options = [
 *     '',
 *     'foo',
 *     'bar'
 *   ]
 * 
 *   return (
 *     <div { ...props }>
 *       <p>
 *         Type into the combo box and select an option.
 *       </p>
 * 
 *       <UI.Combo
 *         placeholder='Hello, World!'
 *         name='example'
 *         value={value}
 *         inputValue={inputValue}
 *         onInput={event => {
 *           setInputValue(event.currentTarget.value)
 *         }}
 *         onChange={event => {
 *           setValue(event.currentTarget.value)
 *         }}
 *       >
 *         {options.map(option => inputValue && option.indexOf(inputValue) < 0 ? null : (
 *           <option key={option} value={option}>
 *             {option}
 *           </option>
 *         ))}
 *       </UI.Combo>
 *     </div>
 *   )
 * }
 * ```
 */
export const Combo = styled(({
  className,
  name = ``,
  placeholder = ``,
  placeholderComponent,
  value = ``,
  inputValue = ``,
  onInput,
  onChange,
  useEffect = true,
  children,
  ref,
  as,
  ...props
}: ComboProps) => {
  React.Children.forEach(children, option => {
    if (option && React.isValidElement(option) && option.props.value === value && typeof option.props.children === `string`) {
      inputValue = option.props.children
    }
  })

  const [ state, setState ] = React.useState<ComboState>({ value, inputValue })

  React.useEffect(() => {
    if (useEffect) {
      setState({ value, inputValue })
    }
  }, [ useEffect, value, inputValue ])

  if (typeof children === `function`) {
    children = children(state)
  }

  const options: React.ReactElement[] = []
  const otherChildren: React.ReactElement[] = []

  React.Children.forEach(children, (child, index) => {
    if (child && React.isValidElement(child)) {
      if (child.type === `option`) {
        options.push(React.cloneElement(child, {
          key: child.key || child.props.key || `option_${index}`,
          onMouseDown: () => {
            const { value } = child.props
            const nextState: ComboState = { value }

            if (typeof child.props.children === `string`) {
              nextState.inputValue = child.props.children
            }

            setState(nextState)

            if (onChange) {
              onChange({ currentTarget: { name, value } }, setState)
            }
          }
        }))
      } else {
        otherChildren.push(child)
      }
    }
  })

  return (
    <span className={className} ref={ref}>
      <ComboInput
        { ...props }
        type='text'
        placeholder={placeholder || name}
        aria-label={props['aria-label'] || placeholder || name}
        value={state.inputValue}
        onInput={event => {
          setState({ value, inputValue: event.currentTarget.value || `` })

          if (onInput) {
            onInput(event, setState)
          }
        }}
        onChange={event => {
          setState({ value, inputValue: event.currentTarget.value })
        }}
      />

      {name && (
        <input
          type='hidden'
          name={name}
          value={state.value}
        />
      )}

      <ComboOptions>
        {options}
      </ComboOptions>

      {placeholderComponent || (
        <ComboPlaceholder>
          {placeholder}
        </ComboPlaceholder>
      )}

      <ComboArrow className='arrow'>
        ▼
      </ComboArrow>

      {otherChildren}
    </span>
  )
})`
  position: relative;
  display: inline-block;
  vertical-align: middle;

  > ${ComboInput} {
    &:hover {
      ~ ${ComboPlaceholder} {
        color: ${({ theme }) => mix(0.75, theme.colors.text, theme.colors.primary)};
        background: ${({ theme }) => theme.colors.inputBackground};
      }
    }

    &:focus {
      ~ ${ComboOptions} {
        display: block;
      }

      ~ ${ComboPlaceholder} {
        color: ${({ theme }) => theme.colors.primary};
        text-shadow: 0 0 ${({ theme }) => theme.colors.primary};
        background: ${({ theme }) => theme.colors.inputBackground};
      }

      ~ .arrow {
        opacity: 1;
      }
    }
  }

  &:hover {
    > .arrow {
      opacity: 1;
    }
  }
`
