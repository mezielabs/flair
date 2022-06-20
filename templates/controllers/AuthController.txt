import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import LoginValidator from 'App/Validators/LoginValidator'

export default class AuthController {
  public create({ view }: HttpContextContract) {
    return view.render('auth/login')
  }

  public async store({ request, session, response, auth }: HttpContextContract) {
    const { email, password, remember } = await request.validate(LoginValidator)

    try {
      await auth.attempt(email, password, remember)

      session.flash({
        notification: {
          type: 'success',
          message: "Welcome back, you're now signed in.",
        },
      })

      return response.intended()
    } catch (error) {
      session.flash({
        notification: {
          type: 'error',
          message: "We couldn't verify your credentials.",
        },
      })

      return response.redirect().back()
    }
  }

  public async destroy({ auth, session, response }: HttpContextContract) {
    await auth.logout()

    session.forget('password_confirmed_at')

    return response.redirect().toRoute('home')
  }
}
