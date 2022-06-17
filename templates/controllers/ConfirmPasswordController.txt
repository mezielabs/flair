import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { DateTime } from 'luxon'

export default class ConfirmPasswordController {
  public create({ view }: HttpContextContract) {
    return view.render('auth/confirm-password')
  }

  public async store({ request, auth, session, response }: HttpContextContract) {
    try {
      await auth.verifyCredentials(auth.user!.email, request.input('password'))

      session.put('password_confirmed_at', DateTime.now().toSeconds())

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
}
