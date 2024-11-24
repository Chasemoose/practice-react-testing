import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LoginForm from './LoginForm'
import Catcher from './Catcher'



describe('<LoginForm', () => {
    test('loginInput - long value', async () => {
        render(<LoginForm/>)

        const fieldLogin = await screen.findByRole('textbox', {name: /login/i})
        userEvent.type(fieldLogin, 'ka')

        const error = await screen.findByText('The field is too short!')
        expect(error).toBeInTheDocument()
    })
    test('submit incorrect data', async () => {
        const mock = jest.fn()
        mock.mockReturnValueOnce(false)
        render(<Catcher><LoginForm tryAuth={mock}/></Catcher>)

        const button = await screen.findByRole('button')
        userEvent.click(button)

        const error = await screen.findByText('Jest błąd!')
        expect(error).toBeInTheDocument()
    })
} )