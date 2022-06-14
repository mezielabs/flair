import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { DateTime } from 'luxon'

export default class ConfirmPassword {
  public async handle(
    { session, request, response }: HttpContextContract,
    next: () => Promise<void>
  ) {
    const confirmedAt = session.get('password_confirmed_at', 0)

    if (DateTime.now().toSeconds() - confirmedAt > 60) {
      session.put('intended_url', request.url())

      return response.redirect().toRoute('ConfirmPasswordController.create')
    }

    await next()
  }
}
