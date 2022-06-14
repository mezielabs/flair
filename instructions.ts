/*
 * @mezielabs/flair
 *
 * (c) Chimezie Enyinnaya <chimezie@mezielabs.dev>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { join } from 'path'
import * as sinkStatic from '@adonisjs/sink'
import { ApplicationContract } from '@ioc:Adonis/Core/Application'

/**
 * Returns absolute path to the stub relative from the templates
 * directory
 */
function getStub(...relativePaths: string[]) {
  return join(__dirname, 'templates', ...relativePaths)
}

/**
 * Create the model files
 */
function makeModels(projectRoot: string, app: ApplicationContract, sink: typeof sinkStatic) {
  const modelsDirectory = app.resolveNamespaceDirectory('models') || 'app/Models'

  /**
   * User model
   */
  const userModelPath = join(modelsDirectory, 'User.ts')
  const userModelTemplate = new sink.files.MustacheFile(
    projectRoot,
    userModelPath,
    getStub('models/User.txt')
  )

  userModelTemplate.overwrite = true

  userModelTemplate.commit()
  sink.logger.action('create').succeeded(userModelPath)

  /**
   * PasswordResetToken model
   */
  const passwordResetTokenModelPath = join(modelsDirectory, 'PasswordResetToken.ts')
  const passwordResetTokenModelTemplate = new sink.files.MustacheFile(
    projectRoot,
    passwordResetTokenModelPath,
    getStub('models/PasswordResetToken.txt')
  )

  if (passwordResetTokenModelTemplate.exists()) {
    sink.logger.action('create').skipped(`${passwordResetTokenModelPath} file already exists`)
  } else {
    passwordResetTokenModelTemplate.commit()
    sink.logger.action('create').succeeded(passwordResetTokenModelPath)
  }
}

/**
 * Create the migration files
 */
function makeMigrations(projectRoot: string, app: ApplicationContract, sink: typeof sinkStatic) {
  const migrationsDirectory = app.directoriesMap.get('migrations') || 'database'

  /**
   * users migration
   */
  const usersMigrationPath = join(migrationsDirectory, `${Date.now()}_users.ts`)

  const usersMigrationTemplate = new sink.files.MustacheFile(
    projectRoot,
    usersMigrationPath,
    getStub('migrations/users.txt')
  )

  if (usersMigrationTemplate.exists()) {
    sink.logger.action('create').skipped(`${usersMigrationPath} file already exists`)
  } else {
    usersMigrationTemplate.commit()
    sink.logger.action('create').succeeded(usersMigrationPath)
  }

  /**
   * password_reset_tokens migration
   */
  const passwordResetTokensMigrationPath = join(
    migrationsDirectory,
    `${Date.now()}_password_reset_tokens.ts`
  )

  const passwordResetTokensMigrationTemplate = new sink.files.MustacheFile(
    projectRoot,
    passwordResetTokensMigrationPath,
    getStub('migrations/password_reset_tokens.txt')
  )

  if (passwordResetTokensMigrationTemplate.exists()) {
    sink.logger.action('create').skipped(`${passwordResetTokensMigrationPath} file already exists`)
  } else {
    passwordResetTokensMigrationTemplate.commit()
    sink.logger.action('create').succeeded(passwordResetTokensMigrationPath)
  }
}

/**
 * Create the middlewares
 */
function makeMiddlewares(projectRoot: string, app: ApplicationContract, sink: typeof sinkStatic) {
  const middlewareDirectory = app.resolveNamespaceDirectory('middleware') || 'app/Middleware'

  /**
   * Auth middleware
   */
  const authMiddlewarePath = join(middlewareDirectory, 'Auth.ts')
  const authMiddlewareTemplate = new sink.files.MustacheFile(
    projectRoot,
    authMiddlewarePath,
    getStub('middlewares/Auth.txt')
  )

  authMiddlewareTemplate.overwrite = true

  authMiddlewareTemplate.commit()
  sink.logger.action('create').succeeded(authMiddlewarePath)

  /**
   * Guest middleware
   */
  const guestMiddlewarePath = join(middlewareDirectory, 'Guest.ts')
  const guestMiddlewareTemplate = new sink.files.MustacheFile(
    projectRoot,
    guestMiddlewarePath,
    getStub('middlewares/Guest.txt')
  )

  if (guestMiddlewareTemplate.exists()) {
    sink.logger.action('create').skipped(`${guestMiddlewarePath} file already exists`)
  } else {
    guestMiddlewareTemplate.commit()
    sink.logger.action('create').succeeded(guestMiddlewarePath)
  }

  /**
   * ConfirmPassword middleware
   */
  const confirmPasswordMiddlewarePath = join(middlewareDirectory, 'ConfirmPassword.ts')
  const confirmPasswordMiddlewareTemplate = new sink.files.MustacheFile(
    projectRoot,
    confirmPasswordMiddlewarePath,
    getStub('middlewares/ConfirmPassword.txt')
  )

  if (confirmPasswordMiddlewareTemplate.exists()) {
    sink.logger.action('create').skipped(`${confirmPasswordMiddlewarePath} file already exists`)
  } else {
    confirmPasswordMiddlewareTemplate.commit()
    sink.logger.action('create').succeeded(confirmPasswordMiddlewarePath)
  }
}

/**
 * Create the controllers
 */
function makeControllers(projectRoot: string, app: ApplicationContract, sink: typeof sinkStatic) {
  const controllerDirectory =
    app.resolveNamespaceDirectory('httpControllers') || 'app/Controllers/Http'

  /**
   * AuthController
   */
  const authControllerPath = join(controllerDirectory, 'Auth/AuthController.ts')
  const authControllerTemplate = new sink.files.MustacheFile(
    projectRoot,
    authControllerPath,
    getStub('controllers/AuthController.txt')
  )

  if (authControllerTemplate.exists()) {
    sink.logger.action('create').skipped(`${authControllerPath} file already exists`)
  } else {
    authControllerTemplate.commit()
    sink.logger.action('create').succeeded(authControllerPath)
  }

  /**
   * RegisterController
   */
  const registerControllerPath = join(controllerDirectory, 'Auth/RegisterController.ts')
  const registerControllerTemplate = new sink.files.MustacheFile(
    projectRoot,
    registerControllerPath,
    getStub('controllers/RegisterController.txt')
  )

  if (registerControllerTemplate.exists()) {
    sink.logger.action('create').skipped(`${registerControllerPath} file already exists`)
  } else {
    registerControllerTemplate.commit()
    sink.logger.action('create').succeeded(registerControllerPath)
  }

  /**
   * ConfirmPasswordController
   */
  const confirmPasswordControllerPath = join(
    controllerDirectory,
    'Auth/ConfirmPasswordController.ts'
  )
  const confirmPasswordControllerTemplate = new sink.files.MustacheFile(
    projectRoot,
    confirmPasswordControllerPath,
    getStub('controllers/ConfirmPasswordController.txt')
  )

  if (confirmPasswordControllerTemplate.exists()) {
    sink.logger.action('create').skipped(`${confirmPasswordControllerPath} file already exists`)
  } else {
    confirmPasswordControllerTemplate.commit()
    sink.logger.action('create').succeeded(confirmPasswordControllerPath)
  }

  /**
   * EmailVerificationController
   */
  const emailVerificationControllerPath = join(
    controllerDirectory,
    'Auth/EmailVerificationController.ts'
  )
  const emailVerificationControllerTemplate = new sink.files.MustacheFile(
    projectRoot,
    emailVerificationControllerPath,
    getStub('controllers/EmailVerificationController.txt')
  )

  if (emailVerificationControllerTemplate.exists()) {
    sink.logger.action('create').skipped(`${emailVerificationControllerPath} file already exists`)
  } else {
    emailVerificationControllerTemplate.commit()
    sink.logger.action('create').succeeded(emailVerificationControllerPath)
  }

  /**
   * PasswordResetController
   */
  const passwordResetControllerPath = join(controllerDirectory, 'Auth/PasswordResetController.ts')
  const passwordResetControllerTemplate = new sink.files.MustacheFile(
    projectRoot,
    passwordResetControllerPath,
    getStub('controllers/PasswordResetController.txt')
  )

  if (passwordResetControllerTemplate.exists()) {
    sink.logger.action('create').skipped(`${passwordResetControllerPath} file already exists`)
  } else {
    passwordResetControllerTemplate.commit()
    sink.logger.action('create').succeeded(passwordResetControllerPath)
  }

  /**
   * PasswordResetRequestController
   */
  const passwordResetRequestControllerPath = join(
    controllerDirectory,
    'Auth/PasswordResetRequestController.ts'
  )
  const passwordResetRequestControllerTemplate = new sink.files.MustacheFile(
    projectRoot,
    passwordResetRequestControllerPath,
    getStub('controllers/PasswordResetRequestController.txt')
  )

  if (passwordResetRequestControllerTemplate.exists()) {
    sink.logger
      .action('create')
      .skipped(`${passwordResetRequestControllerPath} file already exists`)
  } else {
    passwordResetRequestControllerTemplate.commit()
    sink.logger.action('create').succeeded(passwordResetRequestControllerPath)
  }
}

/**
 * Create validators
 */
function makeValidators(projectRoot: string, app: ApplicationContract, sink: typeof sinkStatic) {
  const validatorsDirectory = app.resolveNamespaceDirectory('validators') || 'app/Validators'

  /**
   * EmailValidator
   */
  const emailValidatorPath = join(validatorsDirectory, 'EmailValidator.ts')
  const emailValidatorTemplate = new sink.files.MustacheFile(
    projectRoot,
    emailValidatorPath,
    getStub('validators/EmailValidator.txt')
  )

  if (emailValidatorTemplate.exists()) {
    sink.logger.action('create').skipped(`${emailValidatorPath} file already exists`)
  } else {
    emailValidatorTemplate.commit()
    sink.logger.action('create').succeeded(emailValidatorPath)
  }

  /**
   * LoginValidator
   */
  const loginValidatorPath = join(validatorsDirectory, 'LoginValidator.ts')
  const loginValidatorTemplate = new sink.files.MustacheFile(
    projectRoot,
    loginValidatorPath,
    getStub('validators/LoginValidator.txt')
  )

  if (loginValidatorTemplate.exists()) {
    sink.logger.action('create').skipped(`${loginValidatorPath} file already exists`)
  } else {
    loginValidatorTemplate.commit()
    sink.logger.action('create').succeeded(loginValidatorPath)
  }

  /**
   * PasswordResetValidator
   */
  const passwordResetValidatorPath = join(validatorsDirectory, 'PasswordResetValidator.ts')
  const passwordResetValidatorTemplate = new sink.files.MustacheFile(
    projectRoot,
    passwordResetValidatorPath,
    getStub('validators/PasswordResetValidator.txt')
  )

  if (passwordResetValidatorTemplate.exists()) {
    sink.logger.action('create').skipped(`${passwordResetValidatorPath} file already exists`)
  } else {
    passwordResetValidatorTemplate.commit()
    sink.logger.action('create').succeeded(passwordResetValidatorPath)
  }

  /**
   * RegisterValidator
   */
  const registerValidatorPath = join(validatorsDirectory, 'RegisterValidator.ts')
  const registerValidatorTemplate = new sink.files.MustacheFile(
    projectRoot,
    registerValidatorPath,
    getStub('validators/RegisterValidator.txt')
  )

  if (registerValidatorTemplate.exists()) {
    sink.logger.action('create').skipped(`${registerValidatorPath} file already exists`)
  } else {
    registerValidatorTemplate.commit()
    sink.logger.action('create').succeeded(registerValidatorPath)
  }
}

/**
 * Create AppProvider
 */
function makeProvider(projectRoot: string, sink: typeof sinkStatic) {
  const appProviderPath = join('providers', 'AppProvider.ts')
  const template = new sink.files.MustacheFile(
    projectRoot,
    appProviderPath,
    getStub('providers/AppProvider.txt')
  )

  template.overwrite = true

  template.commit()
  sink.logger.action('create').succeeded(appProviderPath)
}

/**
 * Create EventsContract
 */
function makeEventsContract(projectRoot: string, sink: typeof sinkStatic) {
  const appProviderPath = join('contracts', 'events.ts')
  const template = new sink.files.MustacheFile(
    projectRoot,
    appProviderPath,
    getStub('contracts/events.txt')
  )

  template.overwrite = true

  template.commit()
  sink.logger.action('create').succeeded(appProviderPath)
}

/**
 * Create EventsContract
 */
function makeRoutes(projectRoot: string, sink: typeof sinkStatic) {
  const appProviderPath = join('start', 'routes.ts')
  const template = new sink.files.MustacheFile(
    projectRoot,
    appProviderPath,
    getStub('start/routes.txt')
  )

  template.overwrite = true

  template.commit()
  sink.logger.action('create').succeeded(appProviderPath)
}

/**
 * Create assets
 */
function makeAssets(projectRoot: string, sink: typeof sinkStatic) {
  const resourcesDirectory = 'resources'

  /**
   * app.css
   */
  const appCssPath = join(resourcesDirectory, 'css/app.css')
  const appCssTemplate = new sink.files.MustacheFile(
    projectRoot,
    appCssPath,
    getStub('resources/css/app.txt')
  )

  appCssTemplate.overwrite = true

  appCssTemplate.commit()
  sink.logger.action('create').succeeded(appCssPath)

  /**
   * app.js
   */
  const appJsPath = join(resourcesDirectory, 'js/app.js')
  const appJsTemplate = new sink.files.MustacheFile(
    projectRoot,
    appJsPath,
    getStub('resources/js/app.txt')
  )

  appJsTemplate.overwrite = true

  appJsTemplate.commit()
  sink.logger.action('create').succeeded(appJsPath)
}

/**
 * Create EventsContract
 */
function makeTailwindFiles(projectRoot: string, sink: typeof sinkStatic) {
  /**
   * PostCSS config
   */
  const postCssConfigPath = 'postcss.config.js'
  const postCssConfigTemplate = new sink.files.MustacheFile(
    projectRoot,
    postCssConfigPath,
    getStub('postcss.config.txt')
  )

  if (postCssConfigTemplate.exists()) {
    sink.logger.action('create').skipped(`${postCssConfigPath} file already exists`)
  } else {
    postCssConfigTemplate.commit()
    sink.logger.action('create').succeeded(postCssConfigPath)
  }

  /**
   * Tailwind config
   */
  const tailwindConfigPath = 'tailwind.config.js'
  const tailwindConfigTemplate = new sink.files.MustacheFile(
    projectRoot,
    tailwindConfigPath,
    getStub('tailwind.config.txt')
  )

  if (tailwindConfigTemplate.exists()) {
    sink.logger.action('create').skipped(`${tailwindConfigPath} file already exists`)
  } else {
    tailwindConfigTemplate.commit()
    sink.logger.action('create').succeeded(tailwindConfigPath)
  }

  /**
   * Webpack config
   */
  const webpackConfigPath = 'webpack.config.js'
  const webpackConfigTemplate = new sink.files.MustacheFile(
    projectRoot,
    webpackConfigPath,
    getStub('webpack.config.txt')
  )

  webpackConfigTemplate.overwrite = true

  webpackConfigTemplate.commit()
  sink.logger.action('create').succeeded(webpackConfigPath)
}

/**
 * Instructions to be executed when setting up the package.
 */
export default async function instructions(
  projectRoot: string,
  app: ApplicationContract,
  sink: typeof sinkStatic
) {
  makeModels(projectRoot, app, sink)

  makeMigrations(projectRoot, app, sink)

  makeMiddlewares(projectRoot, app, sink)

  makeControllers(projectRoot, app, sink)

  makeValidators(projectRoot, app, sink)

  makeProvider(projectRoot, sink)

  makeEventsContract(projectRoot, sink)

  makeRoutes(projectRoot, sink)

  makeAssets(projectRoot, sink)

  makeTailwindFiles(projectRoot, sink)

  /**
   * Install required dependencies
   */
  const pkg = new sink.files.PackageJsonFile(projectRoot)

  pkg.install('tailwindcss', undefined, true)
  pkg.install('@tailwindcss/forms', undefined, true)
  pkg.install('autoprefixer', undefined, true)
  pkg.install('postcss', undefined, true)
  pkg.install('postcss-loader', '^6.0.0', true)
  pkg.install('alpinejs', undefined, true)

  const logLines = [`Installing: ${sink.logger.colors.gray(pkg.getInstalls(true).list.join(', '))}`]

  const spinner = sink.logger.await(logLines.join(' '))

  try {
    await pkg.commitAsync()
    spinner.update('Packages installed')
  } catch (error) {
    spinner.update('Unable to install packages')
    sink.logger.fatal(error)
  }

  spinner.stop()
}
