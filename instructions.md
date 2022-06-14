Congratulations! You have configured `@mezielabs/flair` package successfully. Make sure to add the following middlewares inside the `start/kernel.ts` file:

```ts
Server.middleware.registerNamed({
  '...',
  guest: () => import('App/Middleware/Guest'),
  confirmPassword: () => import('App/Middleware/ConfirmPassword'),
})
```
