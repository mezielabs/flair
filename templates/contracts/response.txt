declare module '@ioc:Adonis/Core/Response' {
  interface ResponseContract {
    intended(defaultUri?: string): this
  }
}
