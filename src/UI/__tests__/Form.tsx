import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { App } from '../../App'
import { Form } from '../Form'
import { Combo } from '../Combo'
import { Input } from '../Input'
import { RTE } from '../RTE'
import { Select } from '../Select'
import { Textarea } from '../Textarea'

it('renders and submits complex form data', () => {
  let submittedFormData: null | JSONObject = null

  render(
    <App>
      <Form data-testid='form' onSubmit={(event, formData) => {
        submittedFormData = formData
      }}>
        <Combo
          name='combo.box'
          value='Hello (Combo)'
        >
          <option value='Hello (Combo)'>
            Hello (Combo)
          </option>

          <option value='World! (Combo)'>
            World! (Combo)
          </option>
        </Combo>

        <Input
          name='input.hello'
          value='Hello (Input)'
        />

        <Input
          name='input.world'
          value='World! (Input)'
        />

        <RTE
          name='rich.text.editor'
          value={{
            html: `<p>Hello, World! (RTE)</p>`,
            text: `Hello, World! (RTE)`
          }}
        />

        <Select
          name='select.menu'
          value='Hello (Select)'
        >
          <option value='Hello (Select)'>
            Hello (Select)
          </option>

          <option value='World! (Select)'>
            World! (Select)
          </option>
        </Select>

        <Textarea
          name='textarea'
          value='Hello, World! (Textarea)'
        />

        <Textarea
          name='text.area'
          value='Hello, World! (Textarea)'
        />

        <input
          type='hidden'
          name='hidden.object'
          data-json={JSON.stringify({
            hello: `Hello (Hidden)`,
            world: `World! (Hidden)`
          })}
        />

        <input
          type='hidden'
          name='hidden.array'
          data-json={JSON.stringify([
            `Hello (Hidden)`,
            `World! (Hidden)`
          ])}
        />
      </Form>
    </App>
  )

  const form = screen.getByTestId(`form`)

  // confirm render
  expect(form).toBeInTheDocument()

  // submit the form
  fireEvent.submit(form)

  // confirm form data
  expect(submittedFormData).toMatchObject({
    combo: {
      box: `Hello (Combo)`
    },
    input: {
      hello: `Hello (Input)`,
      world: `World! (Input)`
    },
    rich: {
      text: {
        editor: {
          html: `<p>Hello, World! (RTE)</p>`,
          text: `Hello, World! (RTE)`
        }
      }
    },
    select: {
      menu: `Hello (Select)`
    },
    textarea: `Hello, World! (Textarea)`,
    text: {
      area: `Hello, World! (Textarea)`
    },
    hidden: {
      object: {
        hello: `Hello (Hidden)`,
        world: `World! (Hidden)`
      },
      array: [
        `Hello (Hidden)`,
        `World! (Hidden)`
      ]
    }
  })
})
