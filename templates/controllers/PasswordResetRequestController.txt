import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import PasswordResetToken from 'App/Models/PasswordResetToken'
import User from 'App/Models/User'
import EmailValidator from 'App/Validators/EmailValidator'
import { string } from '@ioc:Adonis/Core/Helpers'
import Encryption from '@ioc:Adonis/Core/Encryption'
import Event from '@ioc:Adonis/Core/Event'

export default class PasswordResetRequestController {
  public create({ view }: HttpContextContract) {
    return view.render('auth/forgot-password')
  }

  public async store({ request, session, response }: HttpContextContract) {
    const { email } = await request.validate(EmailValidator)

    const user = await User.findByOrFail('email', email)

    await PasswordResetToken.query().where('user_id', user.id).delete()

    const { token } = await PasswordResetToken.create({
      userId: user.id,
      token: Encryption.encrypt(string.generateRandom(32)),
    })

    Event.emit('passwordResetRequested', { user, token })

    session.flash({
      alert: {
        type: 'success',
        message: 'A password reset link has been sent to your email address.',
      },
    })

    return response.redirect().back()
  }
}
