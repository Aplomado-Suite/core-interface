/**
 * Router Array
 *
 * This module handles dynamic loading of micro-frontend applications
 * from separate repositories into the main viewport area.
 */

interface AppRoute {
  id: string
  name: string
  path: string
  component?: React.ComponentType<any>
  isLoading?: boolean
  error?: Error
}

class Router {
  private routes: Map<string, AppRoute> = new Map()
  private loadingPromises: Map<string, Promise<any>> = new Map()

  /**
   * Register an application route
   */
  registerRoute(route: AppRoute): void {
    this.routes.set(route.id, route)
  }

  /**
   * Get a registered route
   */
  getRoute(appId: string): AppRoute | undefined {
    return this.routes.get(appId)
  }

  /**
   * Load an application dynamically
   * In production, this would load from separate repositories
   */
  async loadApp(appId: string): Promise<React.ComponentType<any>> {
    // Check if already loading
    const existingPromise = this.loadingPromises.get(appId)
    if (existingPromise) {
      return existingPromise
    }

    // Check if already loaded
    const route = this.routes.get(appId)
    if (route?.component) {
      return route.component
    }

    // Mark as loading
    const routeData = this.routes.get(appId) || { id: appId, name: appId, path: '', isLoading: true }
    this.routes.set(appId, { ...routeData, isLoading: true })

    // Create loading promise
    const loadPromise = this.loadAppComponent(appId)
    this.loadingPromises.set(appId, loadPromise)

    try {
      const component = await loadPromise
      this.routes.set(appId, {
        ...routeData,
        component,
        isLoading: false,
      })
      this.loadingPromises.delete(appId)
      return component
    } catch (error) {
      this.routes.set(appId, {
        ...routeData,
        error: error as Error,
        isLoading: false,
      })
      this.loadingPromises.delete(appId)
      throw error
    }
  }

  /**
   * Load app component from repository
   * This is a placeholder for the actual micro-frontend loading logic
   */
  private async loadAppComponent(appId: string): Promise<React.ComponentType<any>> {
    // In production, this would:
    // 1. Fetch the micro-frontend bundle from the app's repository
    // 2. Load it using dynamic import or SystemJS
    // 3. Return the component

    // For now, return a placeholder component
    const PlaceholderComponent = () => (
      <div className="h-full w-full flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📦</div>
          <h3 className="text-2xl font-bold text-[var(--falcon-accent)] mb-2">
            {appId.charAt(0).toUpperCase() + appId.slice(1)}
          </h3>
          <p className="text-[var(--falcon-text-secondary)]">
            Micro-frontend placeholder for {appId}
          </p>
          <p className="text-sm text-[var(--falcon-text-secondary)] mt-4">
            This will dynamically load from the {appId} repository
          </p>
        </div>
      </div>
    )

    return PlaceholderComponent
  }

  /**
   * Preload an application (for performance)
   */
  async preloadApp(appId: string): Promise<void> {
    try {
      await this.loadApp(appId)
    } catch (error) {
      console.error(`Failed to preload app ${appId}:`, error)
    }
  }

  /**
   * Unload an application (for memory management)
   */
  unloadApp(appId: string): void {
    const route = this.routes.get(appId)
    if (route) {
      this.routes.set(appId, {
        ...route,
        component: undefined,
      })
    }
  }

  /**
   * Get all registered routes
   */
  getAllRoutes(): AppRoute[] {
    return Array.from(this.routes.values())
  }

  /**
   * Clear all routes
   */
  clearRoutes(): void {
    this.routes.clear()
    this.loadingPromises.clear()
  }
}

// Export singleton instance
export const router = new Router()

// Register default routes
router.registerRoute({
  id: 'docs',
  name: 'Documents',
  path: '/apps/docs',
})

router.registerRoute({
  id: 'audio',
  name: 'Audio Workstation',
  path: '/apps/audio',
})

router.registerRoute({
  id: 'academy',
  name: 'Academy',
  path: '/apps/academy',
})

router.registerRoute({
  id: 'flashcards',
  name: 'Flashcards',
  path: '/apps/flashcards',
})

router.registerRoute({
  id: 'settings',
  name: 'Settings',
  path: '/apps/settings',
})
