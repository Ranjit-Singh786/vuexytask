<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import navItems from '@/navigation/vertical'
import { themeConfig } from '@themeConfig'

// Components
import Footer from '@/layouts/components/Footer.vue'
import SidebarFooter from '@/layouts/components/SidebarFooter.vue'
import UserProfile from '@/layouts/components/UserProfile.vue'

// @layouts plugin
import { VerticalNavLayout } from '@layouts'

const route = useRoute()
const router = useRouter()

// Route name → human-readable label map
const routeLabels = {
  'campaign': 'Campaign',
  'advance-campaign': 'Advance Campaign',
  'tech-founder': 'Tech Founder',
}

// Build breadcrumb trail based on current route
const breadcrumbs = computed(() => {
  const name = route.name || ''
  
  // Define parent relationships
  const parentMap = {
    'advance-campaign': 'campaign',
    'tech-founder': 'campaign',
  }

  const trail = []
  let current = name

  while (current) {
    trail.unshift({
      label: routeLabels[current] || formatRouteName(current),
      name: current,
      isActive: current === name,
    })
    current = parentMap[current] || null
  }

  return trail
})

const formatRouteName = name =>
  name.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')

const navigateTo = (crumb) => {
  if (!crumb.isActive) router.push({ name: crumb.name })
}
</script>

<template>
  <VerticalNavLayout :nav-items="navItems">
    <!-- 👉 navbar -->
    <template #navbar="{ toggleVerticalOverlayNavActive }">
      <div class="d-flex h-100 align-center w-100">
        <IconBtn
          id="vertical-nav-toggle-btn"
          class="ms-n3 d-lg-none"
          @click="toggleVerticalOverlayNavActive(true)"
        >
          <VIcon
            size="26"
            icon="tabler-menu-2"
          />
        </IconBtn>

        <!-- Dynamic Breadcrumbs -->
        <div class="d-flex align-center text-body-1 ml-lg-2">
          <VIcon icon="tabler-home" size="20" color="primary" class="me-2" />
          <VIcon icon="tabler-chevron-right" size="16" class="me-2 text-disabled" />

          <template v-for="(crumb, i) in breadcrumbs" :key="crumb.name">
            <span
              v-if="crumb.isActive"
              class="text-high-emphasis font-weight-medium"
            >{{ crumb.label }}</span>
            <a
              v-else
              class="breadcrumb-link text-primary"
              @click="navigateTo(crumb)"
            >{{ crumb.label }}</a>

            <VIcon
              v-if="i < breadcrumbs.length - 1"
              icon="tabler-chevron-right"
              size="14"
              class="mx-2 text-disabled"
            />
          </template>
        </div>

        <VSpacer />

        <div class="d-flex align-center text-right mr-3">
          <div class="d-flex flex-column align-end">
            <span class="text-body-2 font-weight-medium text-high-emphasis">John Doe</span>
            <span class="text-caption text-disabled" style="line-height:1">Admin</span>
          </div>
        </div>
        <UserProfile />
      </div>
    </template>

    <template #after-vertical-nav-items>
      <SidebarFooter />
    </template>

    <!-- 👉 Pages -->
    <slot />

    <!-- 👉 Footer -->
    <template #footer>
      <Footer />
    </template>
  </VerticalNavLayout>
</template>

<style scoped>
.breadcrumb-link {
  cursor: pointer;
  text-decoration: none;
  font-weight: 500;
  transition: opacity 0.2s ease;
}
.breadcrumb-link:hover {
  opacity: 0.75;
  text-decoration: underline;
}
</style>
