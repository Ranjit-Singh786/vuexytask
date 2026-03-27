<script setup>
import image1 from '@images/icons/project-icons/image1.jpg'
import image2 from '@images/icons/project-icons/image2.jpg'
import image3 from '@images/icons/project-icons/image3.jpg'
import { ref } from 'vue'
import { SenderIcon, SettingsIcon, StatsIcon, TargetIcon, crmconnectedicon, runningicon } from '../components/svg/Svg.jsx'

const campaign = ref({
  name: 'Tech Founder',
  status: 'Running',
  created: '8 Jan, 2026',
  prospectsProcessed: 74,
  prospectsTotal: 200,
  leads: '1,628',
  invitesSent: '988',
  invitesSentRate: '61%',
  invitesAccepted: '507',
  invitesAcceptedRate: '49%',
  messagesSent: '460',
  messagesSentRate: '91%',
  replies: '202',
  repliesRate: '44%',
})

const replyAnalysis = {
  total: '80%',
  positive: '12%',
  neutral: '14%',
  negative: '8%',
}

const recentActivity = [
  { time: '09:14 AM', icon: 'tabler-rocket', color: 'primary', title: 'Campaign started', user: 'Aman S.' },
  { time: '10:30 AM', icon: 'tabler-message', color: 'secondary', title: 'Reply received', user: 'Suresh K.', sub: 'from' },
  { time: '10:35 AM', icon: 'tabler-arrow-forward-up', color: 'error', title: 'Follow-up message sent', user: 'System', sub: 'by' },
  { time: '10:35 AM', icon: 'tabler-user-check', color: 'info', title: 'Connection accepted', user: 'Suresh K. (Prospect)', sub: 'by' },
  { time: '10:45 AM', icon: 'tabler-player-pause', color: 'warning', title: 'Campaign paused', user: 'Aman S.', sub: 'by' },
]

const replyPerformance = [
  { label: 'Follow-up', value: 80, color: '#7367F0' },
  { label: 'InMail', value: 32, color: '#28C76F' },
  { label: 'Email', value: 11, color: '#EA5455' },
  { label: 'Connection Message', value: 79, color: '#7367F0' },
]

const campaignActions = [
  { label: 'Remaining Leads', value: '110' },
  { label: 'Follow-up message', value: '10' },
  { label: 'InMails Sent', value: '20' },
  { label: 'Emails', value: '89' },
  { label: 'Profile Viewed', value: '45' },
  { label: 'Profile Followed', value: '140' },
  { label: 'Skills Endorsed', value: '50' },
  { label: 'Comments Added', value: '54' },
]
</script>

<template>
  <div class="tech-founder-wrapper">
    <VCard rounded="lg" elevation="0" border class="pa-4 mb-6">
      <div class="d-flex align-center justify-start gap-12 ps-4">
        <div class="d-flex align-center gap-2">
          <TargetIcon style="width: 32px; height: 32px;" />
          <span class="text-subtitle-2 font-weight-medium" style="color: #5D596C;">Define Target Audience</span>
          <VIcon icon="tabler-chevron-right" size="18" class="text-medium-emphasis ms-4" />
        </div>
        <div class="d-flex align-center gap-2">
          <SenderIcon style="width: 32px; height: 32px;" />
          <span class="text-subtitle-2 font-weight-medium" style="color: #5D596C;">Sender Profiles</span>
          <VIcon icon="tabler-chevron-right" size="18" class="text-medium-emphasis ms-4" />
        </div>
        <div class="d-flex align-center gap-2">
          <SettingsIcon style="width: 32px; height: 32px;" />
          <span class="text-subtitle-2 font-weight-medium" style="color: #5D596C;">Settings</span>
          <VIcon icon="tabler-chevron-right" size="18" class="text-medium-emphasis ms-4" />
        </div>
        <div class="d-flex align-center gap-2">
          <StatsIcon style="width: 32px; height: 32px;" />
          <span class="text-subtitle-2 font-weight-bold" style="color: #3666EE;">Stats</span>
        </div>
      </div>
    </VCard>

    <!-- Filter Bar -->
    <div class="d-flex align-center gap-4 mb-3">
      <VSelect
        density="compact"
        variant="outlined"
        placeholder="All"
        rounded="lg"
        style="max-width: 140px; background: white;"
        hide-details
        class="custom-filter-select"
      >
        <template v-slot:selection="{ item }">
          <span class="font-weight-bold" style="color: #5E5873;">{{ item.title }}</span>
        </template>
      </VSelect>
      <VTextField
        density="compact"
        variant="outlined"
        placeholder="Search"
        prepend-inner-icon="tabler-search"
        rounded="lg"
        style="max-width: 250px; background: white;"
        hide-details
        class="custom-search-field"
      />
    </div>

    <!-- Breadcrumbs -->
   

    <!-- Main Grid -->
    <VRow class="flex-grow-1">
      <!-- Left Column -->
      <VCol cols="12" md="8">
        <!-- Header Card -->
        <VCard rounded="lg" elevation="0" class="mb-6 campaign-header-card pa-6">
          <div class="d-flex align-center justify-space-between mb-4">
            <div class="d-flex align-center gap-3">
              <div class="campaign-icon">
                <VIcon icon="tabler-speakerphone" color="primary" />
              </div>
              <div>
                <!-- No Title needed here as per request -->
                <div class="d-flex gap-2">
                  <VChip size="x-small" label color="primary" variant="tonal" class="font-weight-bold">LinkedIn</VChip>
                  <VChip size="x-small" label color="secondary" variant="tonal" class="font-weight-bold">Email</VChip>
                </div>
              </div>
            </div>
            <div class="d-flex align-center gap-2">
              <VChip color="success" size="small" label class="px-3" style="height: 24px;">
                <div class="d-flex align-center">
                  <runningicon class="me-1" />
                  <span style="font-size: 12px; font-weight: 600; line-height: 1;">Running</span>
                </div>
              </VChip>
              <VBtn icon variant="text" size="small" color="secondary"><VIcon icon="tabler-pause" size="18" /></VBtn>
              <VBtn icon variant="text" size="small" color="secondary"><VIcon icon="tabler-edit" size="18" /></VBtn>
            </div>
          </div>

          <div class="progress-section mt-8">
            <div class="progress-bar-wrap mb-2">
              <div class="progress-fill" :style="{ width: (campaign.prospectsProcessed / campaign.prospectsTotal * 100) + '%' }" />
            </div>
            <div class="d-flex justify-space-between align-center">
              <div class="d-flex align-center gap-4">
                <span class="text-caption text-medium-emphasis">Created: <b>{{ campaign.created }}</b></span>
                <VDivider vertical length="12" />
                <VChip size="x-small" color="success" label class="crm-tag px-2" style="height: 22px;">
                   <div class="d-flex align-center">
                     <crmconnectedicon class="me-1" />
                     <span style="font-size: 12px; font-weight: 600; line-height: 1;">CRM Connected</span>
                   </div>
                </VChip>
              </div>
              <span class="text-caption font-weight-bold" style="color: #5D596C;">{{ campaign.prospectsProcessed }} / {{ campaign.prospectsTotal }} prospects processed</span>
            </div>
          </div>
        </VCard>

        <!-- Stats Overview -->
        <VCard rounded="lg" elevation="0" border class="mb-6 overflow-hidden">
          <div class="pa-6 pb-0">
            <div class="d-flex align-center justify-space-between mb-8">
              <h3 class="text-h6 font-weight-bold" style="color: #5D596C;">Campaign Overview</h3>
              <div class="toggle-group d-flex" style="border: 1px solid #DEDEE0; border-radius: 6px; overflow: hidden;">
                <div class="toggle-btn px-4 py-1 font-weight-medium active" style="font-size: 0.8rem; background: #F8F7FA; border-right: 1px solid #DEDEE0; cursor: pointer;">LinkedIn</div>
                <div class="toggle-btn px-4 py-1 font-weight-medium" style="font-size: 0.8rem; background: white; cursor: pointer; color: #A5A3AE;">Email</div>
              </div>
            </div>
          </div>

          <div class="d-flex w-100 px-6 pb-0 gap-2">
            <div v-for="(stat, key) in [
              { label: 'New Leads', val: campaign.leads, color: '#666CFF' },
              { label: 'Invites Sent', val: campaign.invitesSent, rate: campaign.invitesSentRate, rateColor: '#E8F9F1', textRateColor: '#28C76F', color: '#A3BADD', info: true },
              { label: 'Invites Accepted', val: campaign.invitesAccepted, rate: campaign.invitesAcceptedRate, rateColor: '#FFF4E8', textRateColor: '#FF9F43', color: '#CFEFE1', info: true },
              { label: 'Messages Sent', val: campaign.messagesSent, rate: campaign.messagesSentRate, rateColor: '#E8F9F1', textRateColor: '#28C76F', color: '#E4F8D2' },
              { label: 'Replies', val: campaign.replies, rate: campaign.repliesRate, rateColor: '#FFF4E8', textRateColor: '#FF9F43', color: '#E2F6EA', info: true }
            ]" :key="key" class="flex-grow-1" style="border-left: 1px solid #DEDEE0; width: 20%;">
              <div class="px-4 py-0">
                <div class="text-subtitle-2 font-weight-bold mb-1 d-flex align-center gap-1" style="color: #5D596C; font-size: 12px !important;">
                  {{ stat.label }}
                   <!-- <VIcon v-if="stat.info" icon="tabler-info-circle-filled" size="14" style="color: #A5A3AE;" /> -->
                </div>
                <div class="d-flex align-center gap-2 mb-4">
                  <span class="text-h6 font-weight-bold" style="color: #5D596C;">{{ stat.val }}</span>
                  <VChip v-if="stat.rate" size="x-small" label class="font-weight-bold border-0" :style="{ background: stat.rateColor, color: stat.textRateColor }">
                    {{ stat.rate }}
                  </VChip>
                </div>
              </div>
              <div class="stat-bar-new" :style="{ background: stat.color, height: '100px', borderTopRightRadius: '12px' }" />
            </div>
          </div>
        </VCard>

        <VRow>
          <VCol cols="12" md="7">
            <!-- Campaign Actions -->
            <VCard rounded="lg" elevation="0" class="pa-6 h-100">
              <div class="d-flex align-center justify-space-between mb-6">
                <div>
                  <h3 class="text-h6 font-weight-bold mb-1" style="color: #5D596C;">Campaign Actions</h3>
                  <p class="text-caption text-medium-emphasis mb-0">Execution stats & engagement signals</p>
                </div>
                <div class="toggle-group d-flex scale-down">
                  <div class="toggle-btn active">LinkedIn</div>
                  <div class="toggle-btn">Email</div>
                </div>
              </div>

              <div class="actions-grid">
                <div v-for="action in campaignActions" :key="action.label" class="d-flex justify-space-between mb-2">
                  <span class="text-body-2 font-weight-bold" style="color: #5D596C;">{{ action.label }}:</span>
                  <span class="text-body-2 font-weight-bold" style="color: #5D596C;">{{ action.value }}</span>
                </div>
              </div>

              <div class="mt-6 pa-3 rounded-lg d-flex align-center justify-start w-100" style="background-color: #EEF2FF; border: 1px solid #D9E2FF;">
                <div class="d-flex align-center gap-2">
                  <span class="text-body-2 font-weight-bold" style="color: #434050; font-size: 1.1rem !important;">Team:</span>
                  <div class="avatar-group d-flex align-center ms-1">
                    <VAvatar size="36" style="border: 2px solid white !important;">
                      <VImg :src="image1" alt="image1" />
                    </VAvatar>
                    <VAvatar size="36" style="border: 2px solid white !important; margin-left: -12px;">
                      <VImg :src="image2" alt="image2" />
                    </VAvatar>
                    <VAvatar size="36" style="border: 2px solid white !important; margin-left: -12px;">
                      <VImg :src="image3" alt="image3" />
                    </VAvatar>
                  </div>
                </div>
              </div>
            </VCard>
          </VCol>
          <VCol cols="12" md="5">
            <!-- Reply Performance -->
            <VCard rounded="lg" elevation="0" class="pa-6">
              <h3 class="text-h6 font-weight-bold mb-1" style="color: #5D596C;">Reply Performance</h3>
              <p class="text-caption text-medium-emphasis mb-6">Top reply channel</p>

              <div class="performance-list">
                <div v-for="item in replyPerformance" :key="item.label" class="mb-5">
                  <div class="d-flex justify-space-between mb-2">
                    <span class="text-body-2 font-weight-medium" style="color: #5D596C;">{{ item.label }}</span>
                    <span class="text-body-2 font-weight-bold text-primary">{{ item.value }}%</span>
                  </div>
                  <v-progress-linear
                    :model-value="item.value"
                    height="8"
                    rounded
                    :color="item.color"
                    bg-color="#F2F2F3"
                    bg-opacity="1"
                  />
                </div>
              </div>
            </VCard>
          </VCol>
        </VRow>
      </VCol>

      <!-- Right Column -->
      <VCol cols="12" md="4">
        <!-- Reply Analysis (Gauge) -->
        <VCard rounded="lg" elevation="0" class="pa-6 mb-6">
          <h3 class="text-h6 font-weight-bold mb-6" style="color: #5D596C;">Reply Analysis</h3>
          
          <div class="gauge-wrap d-flex justify-center mb-8">
            <div class="gauge-container">
               <svg viewBox="0 0 100 60" class="gauge">
                <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#F2F2F3" stroke-width="8" stroke-dasharray="2, 3" />
                <path d="M 10 50 A 40 40 0 0 1 75 20" fill="none" stroke="#7367F0" stroke-width="8" stroke-dasharray="2, 3" />
              </svg>
              <div class="gauge-center">
                <div class="text-h4 font-weight-bold" style="color: #5D596C;">80%</div>
                <div class="text-caption font-weight-medium text-medium-emphasis">Discussions</div>
              </div>
            </div>
          </div>

          <div class="analysis-legend px-4">
            <div class="d-flex justify-space-between align-center mb-4">
              <span class="text-caption font-weight-bold text-medium-emphasis">Status</span>
              <span class="text-caption font-weight-bold text-medium-emphasis">Results</span>
            </div>
            <div class="d-flex justify-space-between align-center mb-3">
              <div class="d-flex align-center gap-2">
                <div class="legend-dot" style="background: #7367F0;" />
                <span class="text-body-2 font-weight-medium" style="color: #6F6B7D;">Positive</span>
              </div>
              <span class="text-body-2 font-weight-bold" style="color: #5D596C;">12%</span>
            </div>
            <div class="d-flex justify-space-between align-center mb-3">
              <div class="d-flex align-center gap-2">
                <div class="legend-dot" style="background: #FF9F43;" />
                <span class="text-body-2 font-weight-medium" style="color: #6F6B7D;">Neutral</span>
              </div>
              <span class="text-body-2 font-weight-bold" style="color: #5D596C;">14%</span>
            </div>
            <div class="d-flex justify-space-between align-center">
              <div class="d-flex align-center gap-2">
                <div class="legend-dot" style="background: #EA5455;" />
                <span class="text-body-2 font-weight-medium" style="color: #6F6B7D;">Negative</span>
              </div>
              <span class="text-body-2 font-weight-bold" style="color: #5D596C;">8%</span>
            </div>
          </div>
        </VCard>

        <!-- Recent Activity -->
        <VCard rounded="lg" elevation="0" class="pa-6">
          <h3 class="text-h6 font-weight-bold mb-6" style="color: #5D596C;">Recent Campaign Activity</h3>
          
          <div class="activity-timeline">
            <div v-for="(act, i) in recentActivity" :key="i" class="timeline-item d-flex gap-4">
              <div class="timeline-line-wrap">
                <div class="timeline-icon" :style="{ backgroundColor: act.color === 'primary' ? '#7367F0' : (act.color === 'secondary' ? '#7367F0' : (act.color === 'error' ? '#FF4C51' : (act.color === 'info' ? '#00CFE8' : '#FF9F43'))) }">
                  <VIcon :icon="act.icon" size="14" color="white" />
                </div>
                <div v-if="i < recentActivity.length" :class="['timeline-line', { 'last-line': i === recentActivity.length }]" />
              </div>
              <div class="timeline-content pb-6">
                <div class="d-flex justify-space-between mb-1">
                  <span class="text-caption font-weight-bold text-medium-emphasis">{{ act.time }}</span>
                </div>
                <div class="text-body-2 font-weight-bold" style="color: #5D596C;">{{ act.title }}</div>
                <div class="text-caption text-medium-emphasis">{{ act.sub }} <span class="font-weight-bold text-primary">{{ act.user }}</span></div>
              </div>
            </div>
          </div>

          <div class="d-flex align-center mt-n2 px-10 logout-link" style="cursor: pointer; margin-left: -5px;">
            <VIcon icon="tabler-external-link" size="20" color="primary" class="me-2" />
            <span class="text-primary font-weight-bold" style="font-size: 0.8rem;">Open Activity Log</span>
          </div>
        </VCard>
      </VCol>
    </VRow>
  </div>
</template>

<style scoped>
/* Custom Filter Styles */
.custom-filter-select :deep(.v-field__input),
.custom-filter-select :deep(.v-placeholder) {
  font-weight: 700 !important;
  color: #5E5873 !important;
  opacity: 1 !important;
}

.custom-filter-select :deep(.v-icon) {
  color: #5E5873 !important;
  opacity: 1 !important;
}

.custom-search-field :deep(.v-field__input),
.custom-search-field :deep(.v-placeholder) {
  font-weight: 700 !important;
  color: #5E5873 !important;
  opacity: 1 !important;
}

.custom-search-field :deep(.v-field__prepend-inner) .v-icon {
  color: #5E5873 !important;
  opacity: 0.8 !important;
}

.tech-founder-wrapper {
  width: 100%;
  max-width: 100% !important;
}

.breadcrumbs {
  font-size: 0.95rem;
}

.campaign-header-card {
  border: 1px solid rgba(var(--v-theme-on-surface), 0.08) !important;
}

.campaign-icon {
  width: 48px;
  height: 48px;
  background-color: rgba(var(--v-theme-primary), 0.08);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.progress-bar-wrap {
  width: 100%;
  height: 8px;
  background-color: #F8F7FA;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #7367F0 0%, #A098F5 100%);
}

.crm-tag {
  background-color: #28C76F15 !important;
  color: #28C76F !important;
}

/* Toggle Buttons */
.toggle-group {
  border: 1px solid #DEDEE0;
  border-radius: 4px;
  overflow: hidden;
}

.toggle-btn {
  padding: 4px 12px;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  color: #A5A3AE;
  background: white;
}

.toggle-btn.active {
  background: #F2F2F3;
  color: #5D596C;
}

.scale-down {
  transform: scale(0.9);
  transform-origin: right;
}

/* Stats Row */
.stats-row {
  margin: 0 -4px;
}

.stat-bar {
  opacity: 0.7;
  transition: opacity 0.2s;
}

.stat-bar:hover {
  opacity: 1;
}

/* Actions Grid */
.actions-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 40px;
}

.border-top {
  border-top: 1px solid rgba(var(--v-theme-on-surface), 0.08);
}

.avatar-group {
  display: flex;
  margin-left: 8px;
}

.avatar-group .v-avatar {
  margin-left: -8px;
  border: 2px solid white !important;
}

/* Gauge */
.gauge-wrap {
  position: relative;
}

.gauge-container {
  width: 200px;
  height: 120px;
  position: relative;
}

.gauge-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -20%);
  text-align: center;
}

.legend-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

/* Timeline */
.timeline-item {
  position: relative;
}

.timeline-line-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.timeline-icon {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

.timeline-line {
  width: 2px;
  flex-grow: 1;
  background-color: #DEDEE0;
  margin: 4px 0;
}

.timeline-line.last-line {
  background-color: transparent !important;
  border-left: 2px solid #DEDEE0;
  border-bottom: 2px solid #DEDEE0;
  border-bottom-left-radius: 12px;
  width: 24px;
  max-height: 24px;
  margin-left: 2px;
}

.timeline-content {
  flex-grow: 1;
}
</style>
