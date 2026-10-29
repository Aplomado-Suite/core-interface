/**
 * Shared Local Data Bridge
 *
 * This module establishes the pipeline rules for how separate repositories
 * talk to each other. It ensures all data is stored locally on the user's
 * machine and provides a unified API for cross-app data access.
 */

const LOCAL_DATA_PATH = process.env.NEXT_PUBLIC_LOCAL_DATA_PATH || './local-data'
const USER_PREFERENCES_PATH = process.env.NEXT_PUBLIC_USER_PREFERENCES_PATH || './local-data/preferences'
const APP_DATA_PATH = process.env.NEXT_PUBLIC_APP_DATA_PATH || './local-data/apps'

interface DataItem {
  id: string
  appId: string
  data: any
  timestamp: number
  metadata?: Record<string, any>
}

class DataBridge {
  private storageKey = 'aplomado_data_bridge'

  /**
   * Store data from an application
   */
  async storeData(appId: string, dataId: string, data: any, metadata?: Record<string, any>): Promise<void> {
    try {
      const item: DataItem = {
        id: dataId,
        appId,
        data,
        timestamp: Date.now(),
        metadata,
      }

      const allData = this.getAllData()
      allData.push(item)

      localStorage.setItem(this.storageKey, JSON.stringify(allData))
    } catch (error) {
      console.error('Failed to store data:', error)
      throw new Error('Data storage failed')
    }
  }

  /**
   * Retrieve data for a specific application
   */
  async getData(appId: string, dataId?: string): Promise<any[]> {
    try {
      const allData = this.getAllData()

      if (dataId) {
        // Return specific data item
        const item = allData.find((item) => item.appId === appId && item.id === dataId)
        return item ? [item] : []
      } else {
        // Return all data for the app
        return allData.filter((item) => item.appId === appId)
      }
    } catch (error) {
      console.error('Failed to retrieve data:', error)
      throw new Error('Data retrieval failed')
    }
  }

  /**
   * Query data across all applications (for cross-app functionality)
   */
  async queryData(query: {
    appId?: string
    dataId?: string
    timestamp?: { from?: number; to?: number }
    metadata?: Record<string, any>
  }): Promise<any[]> {
    try {
      const allData = this.getAllData()

      return allData.filter((item) => {
        if (query.appId && item.appId !== query.appId) return false
        if (query.dataId && item.id !== query.dataId) return false
        if (query.timestamp) {
          if (query.timestamp.from && item.timestamp < query.timestamp.from) return false
          if (query.timestamp.to && item.timestamp > query.timestamp.to) return false
        }
        if (query.metadata) {
          for (const [key, value] of Object.entries(query.metadata)) {
            if (item.metadata?.[key] !== value) return false
          }
        }
        return true
      })
    } catch (error) {
      console.error('Failed to query data:', error)
      throw new Error('Data query failed')
    }
  }

  /**
   * Update existing data
   */
  async updateData(appId: string, dataId: string, newData: any): Promise<void> {
    try {
      const allData = this.getAllData()
      const index = allData.findIndex((item) => item.appId === appId && item.id === dataId)

      if (index === -1) {
        throw new Error('Data item not found')
      }

      allData[index] = {
        ...allData[index],
        data: newData,
        timestamp: Date.now(),
      }

      localStorage.setItem(this.storageKey, JSON.stringify(allData))
    } catch (error) {
      console.error('Failed to update data:', error)
      throw new Error('Data update failed')
    }
  }

  /**
   * Delete data
   */
  async deleteData(appId: string, dataId: string): Promise<void> {
    try {
      const allData = this.getAllData()
      const filtered = allData.filter((item) => !(item.appId === appId && item.id === dataId))

      localStorage.setItem(this.storageKey, JSON.stringify(filtered))
    } catch (error) {
      console.error('Failed to delete data:', error)
      throw new Error('Data deletion failed')
    }
  }

  /**
   * Clear all data for an application
   */
  async clearAppData(appId: string): Promise<void> {
    try {
      const allData = this.getAllData()
      const filtered = allData.filter((item) => item.appId !== appId)

      localStorage.setItem(this.storageKey, JSON.stringify(filtered))
    } catch (error) {
      console.error('Failed to clear app data:', error)
      throw new Error('App data clearing failed')
    }
  }

  /**
   * Get user preferences
   */
  async getPreferences(key?: string): Promise<any> {
    try {
      const preferencesKey = 'aplomado_preferences'
      const preferencesJson = localStorage.getItem(preferencesKey)

      if (!preferencesJson) {
        return null
      }

      const preferences = JSON.parse(preferencesJson)

      if (key) {
        return preferences[key] || null
      }

      return preferences
    } catch (error) {
      console.error('Failed to get preferences:', error)
      return null
    }
  }

  /**
   * Set user preferences
   */
  async setPreferences(key: string, value: any): Promise<void> {
    try {
      const preferencesKey = 'aplomado_preferences'
      const preferencesJson = localStorage.getItem(preferencesKey)
      const preferences = preferencesJson ? JSON.parse(preferencesJson) : {}

      preferences[key] = value

      localStorage.setItem(preferencesKey, JSON.stringify(preferences))
    } catch (error) {
      console.error('Failed to set preferences:', error)
      throw new Error('Preferences update failed')
    }
  }

  /**
   * Export all data (for backup)
   */
  async exportData(): Promise<string> {
    try {
      const allData = this.getAllData()
      const preferences = await this.getPreferences()

      const exportData = {
        data: allData,
        preferences,
        exportDate: new Date().toISOString(),
      }

      return JSON.stringify(exportData, null, 2)
    } catch (error) {
      console.error('Failed to export data:', error)
      throw new Error('Data export failed')
    }
  }

  /**
   * Import data (from backup)
   */
  async importData(jsonData: string): Promise<void> {
    try {
      const importData = JSON.parse(jsonData)

      if (!importData.data || !Array.isArray(importData.data)) {
        throw new Error('Invalid import data format')
      }

      localStorage.setItem(this.storageKey, JSON.stringify(importData.data))

      if (importData.preferences) {
        localStorage.setItem('aplomado_preferences', JSON.stringify(importData.preferences))
      }
    } catch (error) {
      console.error('Failed to import data:', error)
      throw new Error('Data import failed')
    }
  }

  /**
   * Helper method to get all data from localStorage
   */
  private getAllData(): DataItem[] {
    try {
      const dataJson = localStorage.getItem(this.storageKey)
      return dataJson ? JSON.parse(dataJson) : []
    } catch (error) {
      console.error('Failed to parse stored data:', error)
      return []
    }
  }
}

// Export singleton instance
export const dataBridge = new DataBridge()
