<script setup>
import { ref } from 'vue'

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
    <!-- Breadcrumbs -->
    <div class="d-flex align-center gap-2 mb-6 breadcrumbs">
      <span class="text-primary cursor-pointer font-weight-medium">Campaign</span>
      <VIcon icon="tabler-chevron-right" size="14" class="text-medium-emphasis" />
      <span class="text-medium-emphasis font-weight-medium">Tech Founder</span>
    </div>

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
                <h2 class="text-h5 font-weight-bold" style="color: #5D596C;">{{ campaign.name }}</h2>
                <div class="d-flex gap-2">
                  <VChip size="x-small" label color="primary" variant="tonal" class="font-weight-bold">LinkedIn</VChip>
                  <VChip size="x-small" label color="secondary" variant="tonal" class="font-weight-bold">Email</VChip>
                </div>
              </div>
            </div>
            <div class="d-flex align-center gap-2">
              <VChip color="success" size="small" label class="px-4 font-weight-bold">
                <VIcon icon="tabler-bolt" size="14" class="me-1" /> Running
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
                <VChip size="x-small" color="success" label class="font-weight-bold crm-tag">
                   <VIcon icon="tabler-sun" size="12" class="me-1" /> CRM Connected
                </VChip>
              </div>
              <span class="text-caption font-weight-bold" style="color: #5D596C;">{{ campaign.prospectsProcessed }} / {{ campaign.prospectsTotal }} prospects processed</span>
            </div>
          </div>
        </VCard>

        <!-- Stats Overview -->
        <VCard rounded="lg" elevation="0" class="mb-6 pa-6">
          <div class="d-flex align-center justify-space-between mb-6">
            <h3 class="text-h6 font-weight-bold" style="color: #5D596C;">Campaign Overview</h3>
            <div class="toggle-group d-flex">
              <div class="toggle-btn active">LinkedIn</div>
              <div class="toggle-btn">Email</div>
            </div>
          </div>

          <VRow class="stats-row">
            <VCol v-for="(stat, key) in [
              { label: 'New Leads', val: campaign.leads, color: '#7367F0' },
              { label: 'Invites Sent', val: campaign.invitesSent, rate: campaign.invitesSentRate, color: '#9AA7C1' },
              { label: 'Invites Accepted', val: campaign.invitesAccepted, rate: campaign.invitesAcceptedRate, color: '#CFE6D9' },
              { label: 'Messages Sent', val: campaign.messagesSent, rate: campaign.messagesSentRate, color: '#E1F2D1' },
              { label: 'Replies', val: campaign.replies, rate: campaign.repliesRate, color: '#E1F2D1' }
            ]" :key="key" class="text-center px-1">
              <div class="text-caption font-weight-medium text-medium-emphasis mb-1 d-flex align-center justify-center gap-1">
                {{ stat.label }} <VIcon v-if="stat.rate" icon="tabler-info-circle" size="12" />
              </div>
              <div class="d-flex align-center justify-center gap-1 mb-3">
                <span class="text-h6 font-weight-bold" style="color: #5D596C;">{{ stat.val }}</span>
                <span v-if="stat.rate" class="text-caption font-weight-bold text-success">{{ stat.rate }}</span>
              </div>
              <div class="stat-bar" :style="{ background: stat.color, height: '80px', borderRadius: '4px' }" />
            </VCol>
          </VRow>
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

              <div class="mt-6 pt-4 border-top">
                <div class="d-flex align-center gap-2">
                  <span class="text-body-2 font-weight-bold" style="color: #5D596C;">Team:</span>
                  <div class="avatar-group">
                    <VAvatar size="28" image="https://i.pravatar.cc/150?u=1" class="border" />
                    <VAvatar size="28" image="https://i.pravatar.cc/150?u=2" class="border" />
                    <VAvatar size="28" image="https://i.pravatar.cc/150?u=3" class="border" />
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
                <div v-if="i < recentActivity.length - 1" class="timeline-line" />
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

          <VBtn block variant="tonal" color="primary" class="mt-4 text-none" prepend-icon="tabler-external-link">
            Open Activity Log
          </VBtn>
        </VCard>
      </VCol>
    </VRow>
  </div>
</template>

<style scoped>
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

.timeline-content {
  flex-grow: 1;
}
</style>
