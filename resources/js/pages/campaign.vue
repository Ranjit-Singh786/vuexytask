<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import emptyStateImg from './object-pic.js'

const router = useRouter()

const filterStatus = ref('All')
const filterChannel = ref('All')
const searchQuery = ref('')
const isWorkflowModalOpen = ref(false)
const selectedWorkflow = ref('advanced')

const campaigns = ref([])

const campaignName = ref('')

// Router for navigation
const handleLaunch = () => {
  const newCampaign = {
    id: Date.now(),
    name: campaignName.value,
    channels: ['LinkedIn', 'Email'],
    created: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
    crm: 'Synced',
    crmTime: 'Just now',
    invites: 0,
    accepted: '0%',
    replies: 0,
    replyRate: '0%',
    emailSent: 0,
    emailOpen: '0%',
    sender: ['https://i.pravatar.cc/150?u=new'],
    status: 'Running',
    limit: '40 invites/day'
  }

  const existing = JSON.parse(localStorage.getItem('campaigns_list') || '[]')
  existing.unshift(newCampaign)
  localStorage.setItem('campaigns_list', JSON.stringify(existing))

  router.push({ name: 'tech-founder' })
}

onMounted(() => {
  const stored = localStorage.getItem('campaigns_list')
  if (stored) {
    campaigns.value = JSON.parse(stored)
  }
})

const filteredCampaigns = computed(() => {
  return campaigns.value.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesStatus = filterStatus.value === 'All' || c.status === filterStatus.value
    return matchesSearch && matchesStatus
  })
})

const clearFilters = () => {
  filterStatus.value = 'All'
  filterChannel.value = 'All'
  searchQuery.value = ''
}

const openWorkflowModal = () => {
  isWorkflowModalOpen.value = true
}

const proceedNext = () => {
  isWorkflowModalOpen.value = false
  if (selectedWorkflow.value === 'advanced') {
    router.push({ name: 'advance-campaign' })
  } else {
    router.push({ name: 'advance-campaign' })
  }
}
</script>

<template>
  <div class="campaign-page-wrapper pa-6 pa-md-8">
    <!-- Header -->
    <div class="d-flex align-end justify-space-between mb-6 mb-md-8 flex-wrap gap-3">
      <div>
        <h1 class="text-h5 text-md-h4 font-weight-bold mb-1">All Campaigns List</h1>
        <p class="text-body-2 text-body-md-1 text-medium-emphasis mb-0">A quick look at all of your outreach initiatives.</p>
      </div>
      <VBtn
        class="primary-gradient-btn text-none px-6 px-md-8"
        rounded="md"
        size="large"
        @click="openWorkflowModal"
      >
        New Campaign
      </VBtn>
    </div>

    <!-- Filters Row -->
    <div class="filters-row d-flex align-center justify-space-between mb-6 flex-wrap gap-4">
      <!-- Left Filters -->
      <div class="d-flex align-center gap-3 flex-wrap">
        <VSelect
          v-model="filterChannel"
          placeholder="Channel"
          :items="['All', 'LinkedIn', 'Email']"
          density="compact"
          variant="outlined"
          hide-details
          class="filter-select custom-control"
        />
        <VSelect
          v-model="filterStatus"
          placeholder="Status"
          :items="['All', 'Running', 'Paused']"
          density="compact"
          variant="outlined"
          hide-details
          class="filter-select custom-control"
        />
        <VBtn
          variant="outlined"
          class="text-none px-6 custom-control-btn"
          rounded="md"
          @click="clearFilters"
        >
          Clear All
        </VBtn>
      </div>

      <!-- Right Search & Export -->
      <div class="d-flex align-center gap-4 flex-grow-1 justify-end flex-wrap">
        <VTextField
          v-model="searchQuery"
          placeholder="Search..."
          prepend-inner-icon="tabler-search"
          density="compact"
          variant="outlined"
          hide-details
          class="search-input flex-grow-1"
        />
        <VBtn variant="text" color="secondary" prepend-icon="tabler-file-download" class="text-none font-weight-bold px-0">
          Export List
        </VBtn>
      </div>
    </div>

    <!-- Campaign Table / List -->
    <VCard rounded="lg" elevation="0" border class="campaign-table-card">
      <div v-if="filteredCampaigns.length > 0">
        <!-- Scrollable table wrapper for mobile -->
        <div class="table-scroll-wrapper">
          <!-- Table Header -->
          <div class="table-header px-6 py-3">
            <div class="d-flex align-center table-min-width">
              <VCheckbox hide-details density="compact" class="me-4 flex-shrink-0" />
              <div class="col-campaign font-weight-bold text-uppercase text-caption">ALL CAMPAIGNS</div>
              <div class="col-crm font-weight-bold text-uppercase text-caption">CRM</div>
              <div class="col-invites font-weight-bold text-uppercase text-caption">INVITES SENT</div>
              <div class="col-replies font-weight-bold text-uppercase text-caption">REPLY RATE</div>
              <div class="col-email font-weight-bold text-uppercase text-caption">EMAIL SENT</div>
              <div class="col-sender font-weight-bold text-uppercase text-caption">SENDER</div>
              <div class="col-status font-weight-bold text-uppercase text-caption">STATUS</div>
              <div class="col-limit font-weight-bold text-uppercase text-caption">DAILY LIMIT</div>
              <div style="width: 40px" />
            </div>
          </div>

          <!-- Table Body -->
          <div class="table-body">
            <div v-for="c in filteredCampaigns" :key="c.id" class="table-row px-6 py-4">
              <div class="d-flex align-center table-min-width">
                <VCheckbox hide-details density="compact" class="me-4 flex-shrink-0" />

                <!-- Campaign Name & Channels -->
                <div class="col-campaign pe-4">
                  <div class="d-flex align-center gap-1 mb-1" style="min-width: 0; width: 100%;">
                    <span
                      class="text-body-1 font-weight-bold cursor-pointer hover-text-primary text-truncate"
                      style="min-width: 0;"
                      @click="router.push({ name: 'tech-founder' })"
                    >{{ c.name }}</span>
                    <div class="d-flex gap-1 flex-shrink-0">
                      <VChip v-for="chn in c.channels" :key="chn" size="x-small" variant="tonal" color="primary" class="font-weight-bold">{{ chn }}</VChip>
                    </div>
                  </div>
                  <div class="text-caption text-medium-emphasis">Created On: {{ c.created }}</div>
                </div>

                <!-- CRM Status -->
                <div class="col-crm">
                  <template v-if="c.crm === 'Synced'">
                    <div class="d-flex flex-column">
                      <div class="d-flex align-center gap-1 text-error">
                        <VIcon icon="tabler-sun" size="14" />
                        <span class="font-weight-bold text-body-2">Synced</span>
                      </div>
                      <span class="text-caption text-medium-emphasis">{{ c.crmTime }}</span>
                    </div>
                  </template>
                  <VBtn v-else variant="outlined" color="secondary" size="small" class="text-none px-4" rounded="md" style="height: 32px; font-size: 11px;">
                    Sync to CRM
                  </VBtn>
                </div>

                <!-- Stats Columns -->
                <div class="col-invites">
                  <div class="font-weight-bold text-body-2">{{ c.invites }}</div>
                  <div class="text-caption text-medium-emphasis">{{ c.accepted }} Accepted</div>
                </div>

                <div class="col-replies">
                  <div class="font-weight-bold text-body-2">{{ c.replies }}</div>
                  <div class="text-caption text-medium-emphasis">{{ c.replyRate }} Received</div>
                </div>

                <div class="col-email">
                  <div class="font-weight-bold text-body-2">{{ c.emailSent }}</div>
                  <div class="text-caption text-medium-emphasis">{{ c.emailOpen }} Mail Opened</div>
                </div>

                <!-- Sender Avatars -->
                <div class="col-sender">
                  <div class="avatar-group">
                    <VAvatar v-for="(img, idx) in c.sender" :key="idx" size="28" :image="img" class="avatar-border" />
                  </div>
                </div>

                <!-- Status Chip -->
                <div class="col-status">
                  <div class="status-pill d-flex align-center gap-2">
                    <div class="status-indicator-wrap">
                      <VIcon icon="tabler-pause" v-if="c.status === 'Paused'" size="10" />
                      <div v-else class="running-dots d-flex gap-1">
                        <div class="dot" />
                        <div class="dot" />
                      </div>
                    </div>
                    <span class="text-caption font-weight-bold text-success">{{ c.status }}</span>
                  </div>
                </div>

                <!-- Daily Limit -->
                <div class="col-limit">
                  <div class="limit-box text-caption font-weight-bold">
                    {{ c.limit }}
                  </div>
                </div>

                <!-- Actions -->
                <div style="width: 40px" class="text-end flex-shrink-0">
                  <VMenu transition="fade-transition">
                    <template #activator="{ props }">
                      <VBtn icon variant="text" size="small" v-bind="props">
                        <VIcon icon="tabler-dots-vertical" size="18" color="secondary" />
                      </VBtn>
                    </template>
                    <VList density="compact" class="campaign-action-list">
                      <VListItem prepend-icon="tabler-chart-bar" @click="router.push({ name: 'tech-founder' })">View Analytics</VListItem>
                      <VListItem prepend-icon="tabler-git-merge">Edit Sequence</VListItem>
                      <VListItem prepend-icon="tabler-copy">Duplicate</VListItem>
                    </VList>
                  </VMenu>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State / No Results -->
      <div v-else class="pa-10 pa-md-16 text-center">
        <img :src="emptyStateImg" style="width: 200px; max-width: 100%; opacity: 0.8;" class="mb-6" />
        <h3 class="text-h5 font-weight-bold mb-2">No Campaigns Found</h3>
        <p class="text-body-1 text-medium-emphasis mb-6">Try adjusting your filters or create a new campaign to get started.</p>
        <VBtn @click="openWorkflowModal" class="primary-gradient-btn text-none px-8" rounded="md" size="large">
          New Campaign
        </VBtn>
      </div>
    </VCard>

    <!-- Workflow Selection Modal -->
    <VDialog v-model="isWorkflowModalOpen" max-width="800" content-class="workflow-dialog-content">
      <div class="workflow-modal-card bg-surface">
        <div class="modal-header d-flex justify-space-between align-start">
          <div class="modal-title-wrap">
            <h2 class="text-h5 font-weight-medium text-high-emphasis mb-1">Select Workflow Mode</h2>
            <p class="text-body-1 text-medium-emphasis mb-0">Choose how you want your campaign to behave</p>
          </div>
          <IconBtn @click="isWorkflowModalOpen = false" class="close-modal-btn">
            <VIcon icon="tabler-x" size="20" />
          </IconBtn>
        </div>

        <div class="modal-body">
          <!-- Advanced Workflow Card -->
          <div
            class="workflow-option-card mb-4"
            :class="{ active: selectedWorkflow === 'advanced' }"
            @click="selectedWorkflow = 'advanced'"
          >
            <div class="d-flex align-center custom-radio mt-1 me-4">
              <div class="radio-outer">
                <div class="radio-inner" />
              </div>
            </div>

            <div class="d-flex flex-column flex-grow-1">
              <div class="d-flex align-center mb-1 flex-wrap gap-2">
                <span class="text-h6 font-weight-bold me-3">Advanced Workflow</span>
                <span class="recommended-badge">Recommended</span>
              </div>
              <p class="text-body-1 mb-3 text-medium-emphasis">Best for high-volume outreach</p>

              <div class="d-flex flex-wrap gap-4 workflow-features">
                <div class="d-flex align-center"><div class="bullet-dot" /> Conditional logic</div>
                <div class="d-flex align-center"><div class="bullet-dot" /> Multiple paths</div>
                <div class="d-flex align-center"><div class="bullet-dot" /> More control</div>
              </div>
            </div>

            <div class="workflow-graphic advanced-graphic d-none d-sm-block">
              <div class="wf-header" />
              <div class="d-flex gap-2">
                <div class="wf-box" />
                <div class="d-flex flex-column gap-1">
                  <div class="wf-line" />
                  <div class="wf-line" />
                  <div class="wf-stats d-flex gap-1 mt-1">
                    <div class="wf-bar" style="height: 10px" />
                    <div class="wf-bar" style="height: 14px" />
                    <div class="wf-bar" style="height: 8px" />
                  </div>
                </div>
                <div class="wf-card-float">
                  <div class="wf-header-mini" />
                  <div class="wf-row d-flex gap-1 p-1">
                    <div class="wf-sq" />
                    <div class="wf-sq w-50" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Standard Workflow Card -->
          <div
            class="workflow-option-card"
            :class="{ active: selectedWorkflow === 'standard' }"
            @click="selectedWorkflow = 'standard'"
          >
            <div class="d-flex align-center custom-radio mt-1 me-4">
              <div class="radio-outer">
                <div class="radio-inner" />
              </div>
            </div>

            <div class="d-flex flex-column flex-grow-1">
              <div class="d-flex align-center mb-1">
                <span class="text-h6 font-weight-bold">Standard Workflow</span>
              </div>
              <p class="text-body-1 mb-3 text-medium-emphasis">Best for beginners</p>

              <div class="d-flex flex-wrap gap-4 workflow-features">
                <div class="d-flex align-center"><div class="bullet-dot" /> Linear steps</div>
                <div class="d-flex align-center"><div class="bullet-dot" /> No conditions</div>
                <div class="d-flex align-center"><div class="bullet-dot" /> Easy Setup</div>
              </div>
            </div>

            <div class="workflow-graphic standard-graphic d-none d-sm-block">
              <div class="wf-header" />
              <div class="d-flex gap-2 w-100">
                <div class="wf-box w-50 d-flex flex-column gap-2 justify-end pb-2">
                  <div class="wf-stats d-flex gap-1 ms-2">
                    <div class="wf-bar" style="height: 8px" />
                    <div class="wf-bar" style="height: 12px" />
                    <div class="wf-bar" style="height: 6px" />
                  </div>
                </div>
                <div class="d-flex flex-column gap-1 w-50">
                  <div class="wf-line w-100" />
                  <div class="wf-line w-100" />
                  <div class="wf-line w-100" />
                  <div class="wf-line w-100" />
                  <div class="wf-line w-100" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="modal-footer d-flex justify-end gap-3">
          <VBtn
            class="close-btn text-none"
            variant="tonal"
            color="secondary"
            rounded="md"
            size="large"
            @click="isWorkflowModalOpen = false"
          >
            Close
          </VBtn>
          <VBtn
            class="primary-gradient-btn text-none px-6"
            rounded="md"
            size="large"
            @click="proceedNext"
          >
            Next
          </VBtn>
        </div>
      </div>
    </VDialog>
  </div>
</template>

<style scoped>
/* ──────────────────────────────────────
   Base field border opacity
────────────────────────────────────── */
:deep(.v-field__outline) {
  --v-field-border-opacity: 0.15;
}

/* ──────────────────────────────────────
   Gradient Button
────────────────────────────────────── */
.primary-gradient-btn {
  background: linear-gradient(180deg, #8BA6FF 0%, #3762EE 100%) !important;
  color: #ffffff !important;
  box-shadow: 0 4px 14px rgba(55, 98, 238, 0.3) !important;
  border: none !important;
  transition: all 0.3s ease;
}

.primary-gradient-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 18px rgba(55, 98, 238, 0.45) !important;
}

/* ──────────────────────────────────────
   Page Wrapper
────────────────────────────────────── */
.campaign-page-wrapper {
  background-color: rgb(var(--v-theme-background));
  min-height: 100vh;
}

/* ──────────────────────────────────────
   Table Card
────────────────────────────────────── */
.campaign-table-card {
  background-color: rgb(var(--v-theme-surface)) !important;
  border: 1px solid rgba(var(--v-theme-on-surface), 0.1) !important;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.07) !important;
}

.table-scroll-wrapper {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.table-min-width {
  min-width: 820px;
}

/* ──────────────────────────────────────
   Table Header
────────────────────────────────────── */
.table-header {
  background-color: rgba(var(--v-theme-on-surface), 0.03);
  border-bottom: 1px solid rgba(var(--v-theme-on-surface), 0.08);
  padding-top: 12px;
  padding-bottom: 12px;
}

.table-header div {
  font-size: 0.72rem;
  font-weight: 600;
  color: rgba(var(--v-theme-on-surface), 0.55);
  letter-spacing: 0.6px;
}

/* ──────────────────────────────────────
   Table Rows
────────────────────────────────────── */
.table-row {
  border-bottom: 1px solid rgba(var(--v-theme-on-surface), 0.07);
  transition: background-color 0.2s;
  min-height: 72px;
}

.table-row:last-child {
  border-bottom: none;
}

.table-row:hover {
  background-color: rgba(var(--v-theme-on-surface), 0.025);
}

/* ──────────────────────────────────────
   Column Widths
────────────────────────────────────── */
.col-campaign { width: 22%; flex-shrink: 0; }
.col-crm { width: 12%; flex-shrink: 0; }
.col-invites { width: 11%; flex-shrink: 0; }
.col-replies { width: 11%; flex-shrink: 0; }
.col-email { width: 11%; flex-shrink: 0; }
.col-sender { width: 10%; flex-shrink: 0; }
.col-status { width: 11%; flex-shrink: 0; }
.col-limit { width: 12%; flex-shrink: 0; }

/* ──────────────────────────────────────
   Avatar Group
────────────────────────────────────── */
.avatar-group {
  display: flex;
}

.avatar-group .avatar-border {
  margin-left: -8px;
  border: 2px solid rgb(var(--v-theme-surface)) !important;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
}

.avatar-group .avatar-border:first-child {
  margin-left: 0;
}

/* ──────────────────────────────────────
   Status Pill
────────────────────────────────────── */
.status-pill {
  background-color: rgba(40, 199, 111, 0.08);
  border-radius: 4px;
  padding: 4px 10px;
  width: fit-content;
  border: 1px solid rgba(40, 199, 111, 0.2);
}

.status-indicator-wrap {
  width: 14px;
  height: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.running-dots .dot {
  width: 2px;
  height: 10px;
  background-color: #28C76F;
  border-radius: 1px;
}

/* ──────────────────────────────────────
   Limit Box
────────────────────────────────────── */
.limit-box {
  border: 1px solid rgba(var(--v-theme-on-surface), 0.14);
  border-radius: 4px;
  padding: 4px 8px;
  color: rgba(var(--v-theme-on-surface), 0.65);
  font-size: 11px;
  width: fit-content;
  background-color: rgba(var(--v-theme-on-surface), 0.02);
}

/* ──────────────────────────────────────
   Hover on campaign name
────────────────────────────────────── */
.hover-text-primary:hover {
  color: #7367F0 !important;
}

/* ──────────────────────────────────────
   Filters
────────────────────────────────────── */
.filter-select {
  width: 120px;
  min-width: 100px;
}

.custom-control :deep(.v-field__input) {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  min-height: 38px !important;
}

.custom-control-btn {
  height: 38px;
  font-weight: 500;
  color: rgba(var(--v-theme-on-surface), 0.7) !important;
  border-color: rgba(var(--v-theme-on-surface), 0.2) !important;
}

.search-input {
  max-width: 500px;
}

/* ──────────────────────────────────────
   Action List
────────────────────────────────────── */
.campaign-action-list :deep(.v-list-item) {
  min-height: 40px;
  font-size: 0.9rem;
}

.campaign-action-list :deep(.v-list-item__prepend) {
  margin-inline-end: 12px;
}

/* ──────────────────────────────────────
   Modal
────────────────────────────────────── */
:deep(.workflow-dialog-content) {
  border-radius: 12px;
  overflow: hidden;
}

.workflow-modal-card {
  border-radius: 12px;
  box-shadow: 0px 8px 32px rgba(0, 0, 0, 0.15);
}

.modal-header {
  padding: 24px 24px 16px 24px;
  background-color: rgba(var(--v-theme-on-surface), 0.02);
  border-bottom: 1px solid rgba(var(--v-theme-on-surface), 0.06);
}

.modal-body {
  padding: 20px 24px;
}

.modal-footer {
  padding: 16px 24px;
  background-color: rgba(var(--v-theme-on-surface), 0.02);
  border-top: 1px solid rgba(var(--v-theme-on-surface), 0.06);
}

.close-modal-btn {
  color: rgba(var(--v-theme-on-surface), 0.5) !important;
  border: 1.5px solid rgba(var(--v-theme-on-surface), 0.2) !important;
  background: rgba(var(--v-theme-on-surface), 0.03) !important;
  width: 32px;
  height: 32px;
  flex-shrink: 0;
}

/* ──────────────────────────────────────
   Workflow Option Cards
────────────────────────────────────── */
.workflow-option-card {
  display: flex;
  align-items: flex-start;
  padding: 20px;
  border: 1.5px solid rgba(var(--v-theme-on-surface), 0.12);
  border-radius: 10px;
  cursor: pointer;
  background-color: rgb(var(--v-theme-surface));
  transition: all 0.25s ease;
}

.workflow-option-card:hover {
  border-color: rgba(139, 166, 255, 0.55);
  background-color: rgba(var(--v-theme-on-surface), 0.01);
}

.workflow-option-card.active {
  border-color: #8BA6FF;
  background-color: rgba(139, 166, 255, 0.04);
}

/* ──────────────────────────────────────
   Radio Button
────────────────────────────────────── */
.radio-outer {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid rgba(var(--v-theme-on-surface), 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.25s ease;
  flex-shrink: 0;
}

.workflow-option-card.active .radio-outer {
  border-color: #3762EE;
}

.radio-inner {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #3762EE;
  transform: scale(0);
  transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.workflow-option-card.active .radio-inner {
  transform: scale(1);
}

/* ──────────────────────────────────────
   Recommended Badge
────────────────────────────────────── */
.recommended-badge {
  background-color: rgba(40, 199, 111, 0.12);
  color: #28c76f;
  font-size: 12px;
  padding: 2px 10px;
  border-radius: 16px;
  font-weight: 500;
  border: 1px solid rgba(40, 199, 111, 0.2);
}

/* ──────────────────────────────────────
   Workflow Features
────────────────────────────────────── */
.bullet-dot {
  width: 6px;
  height: 6px;
  background-color: rgba(var(--v-theme-on-surface), 0.35);
  border-radius: 50%;
  margin-right: 8px;
  flex-shrink: 0;
}

.workflow-features {
  color: rgba(var(--v-theme-on-surface), 0.6);
  font-size: 14px;
}

/* ──────────────────────────────────────
   Workflow Graphic (decorative)
────────────────────────────────────── */
.workflow-graphic {
  width: 130px;
  flex-shrink: 0;
  margin-left: 16px;
  padding: 10px;
  border-radius: 8px;
  background-color: rgba(var(--v-theme-on-surface), 0.03);
  border: 1px solid rgba(var(--v-theme-on-surface), 0.07);
}

.wf-header {
  height: 8px;
  background-color: rgba(var(--v-theme-on-surface), 0.1);
  border-radius: 4px;
  margin-bottom: 8px;
}

.wf-header-mini {
  height: 5px;
  background-color: rgba(55, 98, 238, 0.25);
  border-radius: 3px;
  margin-bottom: 4px;
}

.wf-box {
  width: 40px;
  flex-shrink: 0;
  background-color: rgba(55, 98, 238, 0.08);
  border-radius: 4px;
  min-height: 40px;
  border: 1px solid rgba(55, 98, 238, 0.12);
}

.wf-line {
  height: 5px;
  background-color: rgba(var(--v-theme-on-surface), 0.08);
  border-radius: 3px;
  flex-grow: 1;
}

.wf-bar {
  width: 8px;
  background-color: rgba(55, 98, 238, 0.3);
  border-radius: 2px;
  align-self: flex-end;
}

.wf-card-float {
  background-color: rgb(var(--v-theme-surface));
  border: 1px solid rgba(var(--v-theme-on-surface), 0.1);
  border-radius: 4px;
  padding: 4px;
  min-width: 28px;
}

.wf-sq {
  height: 8px;
  background-color: rgba(var(--v-theme-on-surface), 0.1);
  border-radius: 2px;
  flex: 1;
}

/* ──────────────────────────────────────
   Responsive Breakpoints
────────────────────────────────────── */

/* Tablet */
@media (max-width: 768px) {
  .campaign-page-wrapper {
    padding: 16px !important;
  }

  .filter-select {
    width: 100px;
  }

  .search-input {
    max-width: 100%;
  }

  .modal-body {
    padding: 16px;
  }

  .modal-header {
    padding: 16px;
  }

  .modal-footer {
    padding: 12px 16px;
  }

  .workflow-option-card {
    padding: 16px;
  }
}

/* Mobile */
@media (max-width: 600px) {
  .campaign-page-wrapper {
    padding: 12px !important;
  }

  .filters-row {
    flex-direction: column;
    align-items: stretch !important;
  }

  .filters-row > div {
    width: 100%;
  }

  .filter-select {
    flex: 1;
    width: auto;
  }

  .search-input {
    max-width: 100%;
  }

  .table-header .text-caption {
    font-size: 0.65rem !important;
  }

  .workflow-option-card {
    flex-wrap: wrap;
    gap: 12px;
  }
}
</style>
