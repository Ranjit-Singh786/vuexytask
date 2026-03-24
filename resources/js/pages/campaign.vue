<script setup>
import { ref, onMounted, computed } from 'vue'
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
const campaignSteps = [
  'Campaign Name',
  'Channels',
  'Audience',
  'Sequence',
  'Review',
  'Launch',
  'Followup Sent',
]

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

  // Save to localStorage
  const existing = JSON.parse(localStorage.getItem('campaigns_list') || '[]')
  existing.unshift(newCampaign)
  localStorage.setItem('campaigns_list', JSON.stringify(existing))

  // Redirect to dashboard
  router.push({ name: 'tech-founder' })
}

onMounted(() => {
  const stored = localStorage.getItem('campaigns_list')
  if (stored) {
    campaigns.value = JSON.parse(stored)
  } else {
    // Initial dummy data to match design
    const initialData = [
      { id: 1, name: 'Tech Founder', channels: ['LinkedIn', 'Email'], created: '21 Jan, 2026', crm: 'Synced', crmTime: '2h ago', invites: 265, accepted: '15%', replies: 125, replyRate: '10%', emailSent: 400, emailOpen: '10%', sender: ['https://i.pravatar.cc/150?u=1', 'https://i.pravatar.cc/150?u=2'], status: 'Running', limit: '40 invites/day' },
      { id: 2, name: 'Growth Campaign', channels: ['LinkedIn', 'Email'], created: '21 Jan, 2026', crm: 'Sync to CRM', crmTime: '', invites: 265, accepted: '15%', replies: 125, replyRate: '10%', emailSent: 400, emailOpen: '10%', sender: ['https://i.pravatar.cc/150?u=3', 'https://i.pravatar.cc/150?u=4'], status: 'Running', limit: '40 invites/day' },
      { id: 3, name: 'Lead Engine', channels: ['LinkedIn', 'Email'], created: '21 Jan, 2026', crm: 'Synced', crmTime: '1d ago', invites: 265, accepted: '15%', replies: 125, replyRate: '10%', emailSent: 400, emailOpen: '10%', sender: ['https://i.pravatar.cc/150?u=5', 'https://i.pravatar.cc/150?u=6'], status: 'Running', limit: '40 invites/day' },
    ]
    campaigns.value = initialData
    localStorage.setItem('campaigns_list', JSON.stringify(initialData))
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
  <div class="campaign-page-wrapper pa-8">
    <!-- Header -->
    <div class="d-flex align-end justify-space-between mb-8">
      <div>
        <h1 class="text-h4 font-weight-bold mb-1" style="color: #2F2B3D;">All Campaigns List</h1>
        <p class="text-body-1 text-medium-emphasis mb-0">A quick look at all of your outreach initiatives.</p>
      </div>
      <VBtn 
        class="primary-gradient-btn text-none px-8" 
        rounded="md" 
        size="large"
        @click="openWorkflowModal"
      >
        New Campaign
      </VBtn>
    </div>

    <!-- Filters Row -->
    <div class="d-flex align-center justify-space-between mb-6 flex-wrap gap-4">
      <!-- Left Filters -->
      <div class="d-flex align-center gap-3">
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
          color="#A5A3AE" 
          class="text-none px-6 custom-control-btn" 
          rounded="md" 
          style="border-color: #DEDEE0"
          @click="clearFilters"
        >
          Clear All
        </VBtn>
      </div>
      
      <!-- Right Search & Export -->
      <div class="d-flex align-center gap-6 flex-grow-1 justify-end">
        <VTextField
          v-model="searchQuery"
          placeholder="Search..."
          prepend-inner-icon="tabler-search"
          density="compact"
          variant="outlined"
          hide-details
          class="search-input flex-grow-1"
          style="max-width: 500px;"
        />
        <VBtn variant="text" color="secondary" prepend-icon="tabler-file-download" class="text-none font-weight-bold px-0">
          Export List
        </VBtn>
      </div>
    </div>

    <!-- Campaign Table / List -->
    <VCard rounded="lg" elevation="0" border class="campaign-table-card">
      <div v-if="filteredCampaigns.length > 0">
        <!-- Table Header -->
        <div class="table-header px-6 py-3">
          <div class="d-flex align-center">
            <VCheckbox hide-details density="compact" class="me-4" />
            <div class="col-campaign font-weight-bold text-uppercase">ALL CAMPAIGNS</div>
            <div class="col-crm font-weight-bold text-uppercase">CRM</div>
            <div class="col-invites font-weight-bold text-uppercase">INVITES SENT</div>
            <div class="col-replies font-weight-bold text-uppercase">REPLY RATE</div>
            <div class="col-email font-weight-bold text-uppercase">EMAIL SENT</div>
            <div class="col-sender font-weight-bold text-uppercase">SENDER</div>
            <div class="col-status font-weight-bold text-uppercase">STATUS</div>
            <div class="col-limit font-weight-bold text-uppercase">DAILY LIMIT</div>
            <div style="width: 40px" />
          </div>
        </div>

        <!-- Table Body -->
        <div class="table-body">
          <div v-for="c in filteredCampaigns" :key="c.id" class="table-row px-6 py-4 border-bottom">
            <div class="d-flex align-center">
              <VCheckbox hide-details density="compact" class="me-4" />
              
              <!-- Campaign Name & Channels -->
              <div class="col-campaign pe-4">
                <div class="d-flex align-center gap-1 mb-1" style="min-width: 0; width: 100%;">
                  <span class="text-h6 font-weight-bold cursor-pointer hover-text-primary text-truncate" @click="router.push({ name: 'tech-founder' })" style="color: #6F6B7D; min-width: 0;">{{ c.name }}</span>
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
                     <div class="d-flex align-center gap-1" style="color: #FF4C51;">
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
                <div class="font-weight-bold text-body-2" style="color: #6F6B7D;">{{ c.invites }}</div>
                <div class="text-caption text-medium-emphasis">{{ c.accepted }} Accepted</div>
              </div>
              
              <div class="col-replies">
                <div class="font-weight-bold text-body-2" style="color: #6F6B7D;">{{ c.replies }}</div>
                <div class="text-caption text-medium-emphasis">{{ c.replyRate }} Received</div>
              </div>

              <div class="col-email">
                <div class="font-weight-bold text-body-2" style="color: #6F6B7D;">{{ c.emailSent }}</div>
                <div class="text-caption text-medium-emphasis">{{ c.emailOpen }} Mail Opened</div>
              </div>

              <!-- Sender Avatars -->
              <div class="col-sender">
                <div class="avatar-group">
                  <VAvatar v-for="(img, idx) in c.sender" :key="idx" size="28" :image="img" class="border" />
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
              <div style="width: 40px" class="text-end">
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

      <!-- Empty State / No Results -->
      <div v-else class="pa-16 text-center">
        <img :src="emptyStateImg" style="width: 250px; opacity: 0.8;" class="mb-6" />
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
              <div class="d-flex align-center mb-1">
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
            
            <div class="workflow-graphic advanced-graphic">
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
            
            <div class="workflow-graphic standard-graphic">
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
            color="#EAEAEA" 
            rounded="md" 
            flat 
            size="large"
            @click="isWorkflowModalOpen = false"
          >
            <span style="color: #6E6B7B;">Close</span>
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
.campaign-container {
  min-height: calc(100vh - 120px) !important;
  background-color: #ffffff !important;
}

:deep(.v-field__outline) {
  --v-field-border-opacity: 0.15;
}

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

/* Modal Styling */
:deep(.workflow-dialog-content) {
  border-radius: 12px;
  overflow: hidden;
}
.workflow-modal-card {
  border-radius: 12px;
  box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.1);
}
.modal-header {
  padding: 24px 24px 16px 24px;
  background-color: #fbfbfb;
  border-bottom: 1px solid rgba(var(--v-theme-on-surface), 0.05);
}
.modal-body {
  padding: 24px;
}
.modal-footer {
  padding: 16px 24px;
  background-color: #ffffff;
  border-top: 1px solid rgba(var(--v-theme-on-surface), 0.05);
}
.close-modal-btn {
  color: #a8a3b5 !important;
  border: 1.5px solid rgba(168, 163, 181, 0.4);
  background: white;
  width: 32px;
  height: 32px;
}
.workflow-option-card {
  display: flex;
  align-items: flex-start;
  padding: 24px;
  border: 1.5px solid rgba(var(--v-theme-on-surface), 0.12);
  border-radius: 8px;
  cursor: pointer;
  background-color: #ffffff;
  transition: all 0.25s ease;
}
.workflow-option-card:hover {
  border-color: rgba(139, 166, 255, 0.6);
}
.workflow-option-card.active {
  border-color: #8BA6FF;
  background-color: rgba(139, 166, 255, 0.03);
}
.radio-outer {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid rgba(var(--v-theme-on-surface), 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.25s ease;
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
.recommended-badge {
  background-color: #e0f8eb;
  color: #28c76f;
  font-size: 13px;
  padding: 2px 10px;
  border-radius: 16px;
  font-weight: 500;
}
.bullet-dot {
  width: 6px;
  height: 6px;
  background-color: #a8a3b5;
  border-radius: 50%;
  margin-right: 8px;
}
.workflow-features {
  color: #6E6B7B;
  font-size: 14.5px;
}

.campaign-page-wrapper {
  background-color: #F8F7FA;
  min-height: 100vh;
}

.campaign-table-card {
  background-color: white !important;
  border: 1px solid #DEDEE0 !important;
  box-shadow: 0 4px 18px rgba(75, 70, 92, 0.1) !important;
}

.table-header {
  background-color: #F8F7FA;
  border-bottom: 1px solid #DEDEE0;
  padding-top: 12px;
  padding-bottom: 12px;
}

.table-header div {
  font-size: 0.75rem;
  font-weight: 600;
  color: #5D596C;
  letter-spacing: 0.5px;
}

.table-row {
  border-bottom: 1px solid #DEDEE0;
  transition: background-color 0.2s;
  min-height: 80px;
}

.table-row:last-child {
  border-bottom: none;
}

.table-row:hover {
  background-color: #F8F7FA;
}

/* Col Widths */
.col-campaign { width: 20%; flex-shrink: 0; }
.col-crm { width: 12%; }
.col-invites { width: 12%; }
.col-replies { width: 12%; }
.col-email { width: 12%; }
.col-sender { width: 10%; }
.col-status { width: 10%; }
.col-limit { width: 12%; }

.hover-text-primary:hover {
  color: #7367F0 !important;
}

.avatar-group {
  display: flex;
}

.avatar-group .v-avatar {
  margin-left: -10px;
  border: 2px solid white !important;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.avatar-group .v-avatar:first-child {
  margin-left: 0;
}

.status-pill {
  background-color: #28C76F10;
  border-radius: 4px;
  padding: 4px 12px;
  width: fit-content;
  border: 1px solid #28C76F30;
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

.limit-box {
  border: 1px solid #DEDEE0;
  border-radius: 4px;
  padding: 4px 10px;
  color: #5D596C;
  font-size: 11px;
  width: fit-content;
  background-color: white;
}

.filter-select {
  width: 130px;
}

.custom-control :deep(.v-field__input) {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  min-height: 38px !important;
  color: #5D596C !important;
}

.custom-control-btn {
  height: 38px;
  color: #5D596C !important;
  font-weight: 500;
}

.search-input {
  max-width: 500px;
}

.search-input :deep(.v-field__outline) {
  color: #DEDEE0 !important;
}

.campaign-action-list :deep(.v-list-item) {
  min-height: 40px;
  font-size: 0.9rem;
}

.campaign-action-list :deep(.v-list-item__prepend) {
  margin-inline-end: 12px;
}

.border-bottom {
  border-bottom: 1px solid #DEDEE0;
}
</style>
