import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import PasswordResetToken from 'App/Models/PasswordResetToken'
import PasswordResetValidator from 'App/Validators/PasswordResetValidator'
import Event from '@ioc:Adonis/Core/Event'

export default class PasswordResetController {
  public async create({ params, view, session, response }: HttpContextContract) {
    try {
      const token = await PasswordResetToken.query()
        .where('token', decodeURIComponent(params.token))
        .preload('user')
        .firstOrFail()

      return view.render('auth/reset-password', {
        token: token.token,
        email: token.user.email,
      })
    } catch (error) {
      session.flash({
        notification: {
          type: 'error',
          message: 'Invalid password reset token.',
        },
      })

      return response.redirect('/forgot-password')
    }
  }

  public async store({ request, session, response }: HttpContextContract) {
    const payload = await request.validate(PasswordResetValidator)

    try {
      const token = await PasswordResetToken.query()
        .where('token', payload.token)
        .preload('user')
        .firstOrFail()

      const user = token.user

      user.password = payload.password
      await user.save()

      await token.delete()

      Event.emit('passwordReset', user)

      session.flash({
        notification: {
          type: 'success',
          message: 'Password reset successful.',
        },
      })

      return response.redirect('/login')
    } catch (error) {
      session.flash({
        notification: {
          type: 'error',
          message: 'Invalid password reset token.',
        },
      })

      return response.redirect().back()
    }
  }
}
