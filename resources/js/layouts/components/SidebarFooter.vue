<script setup>
import { useConfigStore } from '@core/stores/config'
import { useLayoutConfigStore } from '@layouts/stores/config'
import { useRouter } from 'vue-router'
import avatar1 from './avatar-1.js'

const router = useRouter()
const configStore = useConfigStore()
const layoutConfigStore = useLayoutConfigStore()

const userData = useCookie('userData')

// Hide footer when sidebar is collapsed (mini mode)
const isNavMini = layoutConfigStore.isVerticalNavMini()

const logout = async () => {
  useCookie('accessToken').value = null
  userData.value = null
  await router.push('/login')
  useCookie('userAbilityRules').value = null
}

const toggleTheme = (theme) => {
  configStore.theme = theme
}
</script>

<template>
  <Transition name="sidebar-footer-fade">
  <div v-show="!isNavMini" class="sidebar-footer">
    <!-- User Profile Card -->
    <VCard class="user-profile-card bg-var-theme-background mx-4 mb-4" variant="tonal" rounded="lg">
      <VCardText class="d-flex align-center p-3">
        <VBadge
          dot
          location="bottom right"
          offset-x="3"
          offset-y="3"
          color="success"
          bordered
        >
          <VAvatar
            size="40"
            color="primary"
            variant="tonal"
          >
            <VImg :src="avatar1" />
          </VAvatar>
        </VBadge>

        <div class="user-info ms-3 flex-grow-1">
          <h6 class="text-h6 font-weight-medium">
            {{ userData?.fullName || userData?.username || 'John Doe' }}
          </h6>
          <span class="text-caption text-disabled">{{ userData?.role || 'Admin' }}</span>
        </div>

        <IconBtn @click="logout" size="small" class="bg-surface ms-2 logout-btn">
          <VIcon icon="tabler-logout" size="18" />
        </IconBtn>
      </VCardText>

      <div class="px-3 pb-3">
        <p class="text-caption text-disabled mb-0" style="font-size: 10px !important;">Email</p>
        <p class="text-caption font-weight-medium mb-0">{{ userData?.email || 'johndoe@gmail.com' }}</p>
      </div>
    </VCard>

    <!-- Theme Toggle Segment -->
    <div class="theme-toggle-wrapper mx-4 mb-4">
      <div class="theme-toggle">
        <div 
          class="theme-btn" 
          :class="{ active: configStore.theme === 'light' }"
          @click="toggleTheme('light')"
        >
          <VIcon icon="tabler-sun" size="18" class="me-2" />
          <span class="text-sm font-weight-medium">Light</span>
        </div>
        <div 
          class="theme-btn" 
          :class="{ active: configStore.theme === 'dark' }"
          @click="toggleTheme('dark')"
        >
          <VIcon icon="tabler-moon" size="18" class="me-2" />
          <span class="text-sm font-weight-medium">Dark</span>
        </div>
      </div>
    </div>
  </div>
  </Transition>
</template>

<style scoped>
.user-profile-card {
  border-radius: 12px;
  background-color: rgb(var(--v-theme-surface)) !important;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05) !important;
}

.logout-btn {
  background-color: rgba(var(--v-theme-on-surface), 0.04) !important;
}

.theme-toggle-wrapper {
  background-color: rgba(var(--v-theme-on-surface), 0.04);
  border-radius: 20px;
  padding: 4px;
}

.theme-toggle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 20px;
  position: relative;
}

.theme-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  color: rgba(var(--v-theme-on-surface), 0.6);
}

.theme-btn.active {
  background-color: rgb(var(--v-theme-surface));
  color: rgb(var(--v-theme-on-surface));
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}

.sidebar-footer-fade-enter-active,
.sidebar-footer-fade-leave-active {
  transition: opacity 0.2s ease;
}

.sidebar-footer-fade-enter-from,
.sidebar-footer-fade-leave-to {
  opacity: 0;
}
</style>
