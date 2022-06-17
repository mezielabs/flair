import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import RegisterValidator from 'App/Validators/RegisterValidator'
import Event from '@ioc:Adonis/Core/Event'

export default class RegisterController {
  public create({ view }: HttpContextContract) {
    return view.render('auth/register')
  }

  public async store({ request, auth, session, response }: HttpContextContract) {
    const payload = await request.validate(RegisterValidator)

    const user = await User.create(payload)

    Event.emit('userRegistered', user)

    session.flash({
      notification: {
        type: 'success',
        message: 'Register successful!',
      },
    })

    await auth.login(user)

    return response.redirect().toRoute('dashboard')
  }
}
