<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const currentStep = ref(0)
const importMethodOpen = ref(true)
const selectedImport = ref(null)
const linkedinUrl = ref('')
const isValidating = ref(false)
const csvFile = ref(null)
const isDraggingOver = ref(false)
const csvStep = ref(0) // 0 = upload, 1 = map properties
const mapSearch = ref('')
const isLookalikesModalOpen = ref(false)
const hasLookalikeLists = ref(false)
const selectedLookalikeList = ref(null)

const lookalikeLists = [
  { id: 1, name: 'Founder', description: '1000+ Users in the List' },
  { id: 2, name: 'Tech Profiles', description: '1000+ Users in the List' },
]

const onCreateList = () => {
  // Simulate creating a list
  hasLookalikeLists.value = true
}

const handleSelectLookalikeList = () => {
  if (selectedLookalikeList.value) {
    selectedImport.value = 'lead'
    isLookalikesModalOpen.value = false
  }
}

const contactFields = [
  { label: 'Full name', icon: 'tabler-list' },
  { label: 'First name', icon: 'tabler-list' },
  { label: 'Last name', icon: 'tabler-list' },
  { label: 'Company Name', icon: 'tabler-list' },
  { label: 'Position', icon: 'tabler-list' },
  { label: 'Headline', icon: 'tabler-list' },
]

const csvColumns = [
  { label: 'Full name', count: 35, icon: 'tabler-user' },
  { label: 'First name', count: 3, icon: 'tabler-user' },
  { label: 'Last name', count: 12, icon: 'tabler-user' },
  { label: 'Company Name', count: 36, icon: 'tabler-building' },
  { label: 'Position', count: 25, icon: 'tabler-briefcase' },
  { label: 'Headline', count: 25, icon: 'tabler-news' },
]

const unmappedFields = [
  { label: 'Location', total: 9, count: 3 },
  { label: 'Industry', total: 3, count: 3 },
  { label: 'Notes', total: 9, count: 9 },
]

const filteredUnmapped = computed(() =>
  unmappedFields.filter(f =>
    f.label.toLowerCase().includes(mapSearch.value.toLowerCase())
  )
)

const handleFileDrop = (e) => {
  isDraggingOver.value = false
  const file = e.dataTransfer?.files?.[0]
  if (file) csvFile.value = file
}

const handleFileInput = (e) => {
  const file = e.target?.files?.[0]
  if (file) csvFile.value = file
}

const triggerFileInput = () => {
  document.getElementById('csv-file-input')?.click()
}

const steps = [
  { label: 'Define Target Audience', icon: 'tabler-filter' },
  { label: 'Sender Profiles', icon: 'tabler-user-circle' },
  { label: 'Settings', icon: 'tabler-settings' },
  { label: 'Stats', icon: 'tabler-chart-bar' },
]

const importMethods = [
  {
    key: 'linkedin',
    icon: 'tabler-brand-linkedin',
    title: 'LinkedIn Search',
    description: '(Basic, Sales Nav, Post, Group or Event URL)',
    color: '#0A66C2',
    bg: '#EBF4FF',
  },
  {
    key: 'csv',
    icon: 'tabler-file-spreadsheet',
    title: 'Upload CSV File',
    description: 'Upload LinkedIn profiles via CSV.',
    link: 'Download Sample',
    color: '#3762EE',
    bg: '#EEF2FF',
  },
  {
    key: 'lead',
    icon: 'tabler-users',
    title: 'Lookalike Audience',
    description: 'Upload your best profiles, let AI find their lookalikes.',
    color: '#8BA6FF',
    bg: '#F0F4FF',
  },
  {
    key: 'webhook',
    icon: 'tabler-webhook',
    title: 'Inbound Webhook',
    description: 'Sync leads from zapier, n8n make in real time',
    color: '#3762EE',
    bg: '#EEF2FF',
  },
]

const goNext = () => {
  // CSV flow: step 0 (upload) → step 1 (map) → main stepper next
  if (selectedImport.value === 'csv') {
    if (csvStep.value === 0 && csvFile.value) {
      csvStep.value = 1
      importMethodOpen.value = false
      return
    }
  }
  if (currentStep.value < steps.length - 1) {
    currentStep.value++
  }
}

const goBack = () => {
  if (selectedImport.value === 'csv' && csvStep.value === 1) {
    csvStep.value = 0
    importMethodOpen.value = true
    return
  }
  router.push({ name: 'campaign' })
}

const validateUrl = () => {
  if (!linkedinUrl.value.trim()) return
  isValidating.value = true
  setTimeout(() => { isValidating.value = false }, 1200)
}

const senderTab = ref('linkedin')
const senderSearch = ref('')
const senderPerPage = ref(10)
const selectedAccounts = ref([])

const senderAccounts = [
  {
    id: 1,
    name: 'Edgar Jones',
    connections: '1,250 connections',
    avatar: 'https://i.pravatar.cc/150?u=edgar',
    health: 72,
    limits: 'Invites: 40 / day',
    type: 'Premium',
    status: 'Connected',
  },
]

// Settings Step Data
const campaignName = ref('New Outreach Campaign')
const selectedSchedule = ref('USA Outreach Time')
const selectedDays = ref(['MON', 'TUE', 'WED', 'THU', 'SAT'])
const startTime = ref('11:30 AM')
const endTime = ref('04:00 PM')
const timezone = ref('USA Timezone')
const aiAutoMessage = ref(false)
const aiAutoHandle = ref(false)
const aiFollowupsCount = ref(2)
const zapierEnabled = ref(true)
const zapierEvents = ref(['Response received'])

const zapierEventList = [
  'Response received',
  'Invite sent',
  'Invitation accepted',
  'Invitation withdrawn',
  'Followup Sent',
]

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
</script>

<template>
  <div class="advance-campaign-wrapper">
    <!-- Stepper Header -->
    <VCard class="stepper-card mb-5" rounded="lg" elevation="0">
      <div class="stepper-row">
        <template v-for="(step, index) in steps" :key="step.label">
          <div
            class="stepper-step"
            :class="{
              'step-active': index === currentStep,
              'step-done': index < currentStep,
            }"
          >
            <div class="step-icon-wrap">
              <VIcon :icon="step.icon" size="18" />
            </div>
            <span class="step-label">{{ step.label }}</span>
          </div>

          <VIcon
            v-if="index < steps.length - 1"
            icon="tabler-chevron-right"
            size="16"
            class="stepper-chevron"
          />
        </template>
      </div>
    </VCard>
    <!-- ── STEP 1: Define Target Audience ── -->
    <div v-show="currentStep === 0">
      <!-- Import Method Section -->
      <VCard rounded="lg" elevation="0" class="import-card">
        <!-- Accordion Header -->
        <div
          class="import-header d-flex align-center justify-space-between pa-5"
          @click="importMethodOpen = !importMethodOpen"
        >
          <div class="d-flex align-center gap-3">
            <!-- Green dot when CSV is in map step, normal dot otherwise -->
            <div :class="csvStep === 1 && selectedImport === 'csv' ? 'step-dot-green' : 'step-dot'" />
            <span class="text-h6 font-weight-medium">
              {{ csvStep === 1 && selectedImport === 'csv' ? 'Upload CSV file Selected' : 'Choose Import Method' }}
            </span>
            <span class="step-badge">Step 1 of 2</span>
          </div>
          <VIcon
            :icon="importMethodOpen ? 'tabler-chevron-up' : 'tabler-chevron-down'"
            size="20"
            class="text-medium-emphasis"
          />
        </div>

        <VDivider />

        <!-- Import Options -->
        <VExpandTransition>
          <div v-show="importMethodOpen" class="import-body pa-5">
            <div class="import-grid">
              <div
                v-for="method in importMethods"
                :key="method.key"
                class="import-option-card"
                :class="{ 'import-selected': selectedImport === method.key }"
                @click="method.key === 'lead' ? (isLookalikesModalOpen = true) : (selectedImport = method.key)"
              >
                <div
                  class="import-icon-wrap mb-3"
                  :style="{ background: method.bg }"
                >
                  <VIcon :icon="method.icon" size="22" :color="method.color" />
                </div>
                <div class="import-title font-weight-semibold mb-1">
                  {{ method.title }}
                </div>
                <div class="import-description text-caption text-medium-emphasis">
                  {{ method.description }}
                  <a
                    v-if="method.link"
                    href="#"
                    class="text-primary ms-1"
                    @click.stop
                  >{{ method.link }}</a>
                </div>

                <!-- Selected check -->
                <Transition name="fade-check">
                  <div v-if="selectedImport === method.key" class="import-check">
                    <VIcon icon="tabler-check" size="12" color="white" />
                  </div>
                </Transition>
              </div>
            </div>
          </div>
        </VExpandTransition>
      </VCard>

      <!-- Lookalikes Modal -->
      <VDialog v-model="isLookalikesModalOpen" max-width="840" content-class="lookalikes-dialog">
        <VCard rounded="xl" elevation="0" class="lookalikes-card">
          <!-- Header -->
          <div class="lookalikes-header d-flex align-start justify-space-between pa-6 pb-4">
            <div>
              <h2 class="text-h4 font-weight-semibold mb-1 " style="color: #5D596C;">Lookalikes</h2>
              <p class="text-body-1 text-medium-emphasis mb-0">Select a lookalike list for this campaign</p>
            </div>
            <VBtn
              icon
              variant="outlined"
              size="small"
              class="lookalikes-close-btn"
              @click="isLookalikesModalOpen = false"
            >
              <VIcon icon="tabler-x" size="20" />
            </VBtn>
          </div>

          <VDivider class="mb-6" />

          <!-- List Selection State -->
          <div v-if="hasLookalikeLists" class="pa-6 pt-0">
            <div class="d-flex flex-column gap-4 mb-4">
              <div
                v-for="list in lookalikeLists"
                :key="list.id"
                class="lookalike-list-item"
                :class="{ 'item-selected': selectedLookalikeList === list.id }"
                @click="selectedLookalikeList = list.id"
              >
                <div class="d-flex align-center flex-grow-1">
                  <VIcon icon="tabler-list" size="24" class="me-4 text-medium-emphasis" />
                  <div class="d-flex align-center flex-wrap gap-1">
                    <span class="text-h6 font-weight-bold" style="color: #5D596C;">{{ list.name }}</span>
                    <span class="text-body-2 text-medium-emphasis">({{ list.description }})</span>
                  </div>
                </div>
                <VCheckbox
                  v-model="selectedLookalikeList"
                  :value="list.id"
                  hide-details
                  density="compact"
                  class="lookalike-checkbox"
                  readonly
                />
              </div>
            </div>

            <div class="d-flex justify-end mb-10">
              <a href="#" class="text-primary font-weight-medium text-decoration-none">Add New</a>
            </div>

            <VDivider class="mb-6" />

            <div class="d-flex justify-end gap-4">
              <VBtn
                variant="flat"
                color="#E6E6E8"
                class="text-none px-10"
                rounded="md"
                size="large"
                style="color: #A5A3AE !important;"
                @click="isLookalikesModalOpen = false"
              >
                Cancel
              </VBtn>
              <VBtn
                class="primary-gradient-btn text-none px-10"
                rounded="md"
                size="large"
                :disabled="!selectedLookalikeList"
                @click="handleSelectLookalikeList"
              >
                Select List
              </VBtn>
            </div>
          </div>

          <!-- Empty state body -->
          <div v-else class="lookalikes-body d-flex flex-column align-center justify-center pa-10 text-center">
            <p class="text-h6 font-weight-bold mb-2">You don't have any leads</p>
            <p class="text-body-2 text-medium-emphasis mb-6">Create a lead list to start running campaigns</p>
            <VBtn
              class="primary-gradient-btn text-none px-8"
              rounded="md"
              size="large"
              @click="onCreateList"
            >
              Create a List
            </VBtn>
          </div>
        </VCard>
      </VDialog>

      <!-- LinkedIn URL Section -->
      <VExpandTransition>
        <VCard
          v-if="selectedImport === 'linkedin'"
          rounded="lg"
          elevation="0"
          class="import-card mt-4"
        >
          <!-- Section Header -->
          <div class="import-header d-flex align-center pa-5">
            <div class="d-flex align-center gap-3">
              <div class="step-dot-outline" />
              <span class="text-h6 font-weight-medium">Paste LinkedIn Search URL</span>
            </div>
          </div>

          <VDivider />

          <!-- URL Input Body -->
          <div class="pa-5">
            <VCard rounded="lg" elevation="0" class="linkedin-url-box pa-5">
              <!-- Info line -->
              <div class="d-flex align-center justify-space-between mb-4 flex-wrap gap-2">
                <div class="text-body-2 text-medium-emphasis">
                  Find your target audience with
                  <a href="https://www.linkedin.com/search/results/people/" target="_blank" class="text-primary font-weight-medium">LinkedIn Search</a>
                  or
                  <a href="https://www.linkedin.com/sales/" target="_blank" class="text-primary font-weight-medium">Sales Navigator</a>
                  or
                  <a href="#" class="text-primary font-weight-medium">Post URL</a>
                  or
                  <a href="#" class="text-primary font-weight-medium">Group URL</a>
                </div>
                <a href="#" class="d-flex align-center gap-1 text-caption text-primary search-guide-link">
                  <VIcon icon="tabler-help-circle" size="14" />
                  Search Guide
                </a>
              </div>

              <!-- URL input + validate -->
              <div class="d-flex gap-3 align-start">
                <VTextField
                  v-model="linkedinUrl"
                  placeholder="https://www.linkedin.com/search/results/people/?keywords="
                  variant="outlined"
                  density="compact"
                  hide-details
                  class="flex-grow-1 linkedin-url-input"
                  @keyup.enter="validateUrl"
                />
                <VBtn
                  class="primary-gradient-btn text-none validate-btn"
                  rounded="md"
                  :loading="isValidating"
                  @click="validateUrl"
                >
                  Validate
                </VBtn>
              </div>

              <!-- Hint -->
              <div class="d-flex align-center gap-2 mt-3">
                <div class="hint-dot" />
                <span class="text-caption text-medium-emphasis">Paste the search URL directly from LinkedIn</span>
              </div>
            </VCard>
          </div>
        </VCard>
      </VExpandTransition>

      <!-- CSV Upload / Map Section -->
      <VExpandTransition>
        <VCard
          v-if="selectedImport === 'csv'"
          rounded="lg"
          elevation="0"
          class="import-card mt-4"
        >
          <!-- Section Header -->
          <div class="import-header d-flex align-center justify-space-between pa-5">
            <div class="d-flex align-center gap-3">
              <div :class="csvStep === 1 ? 'step-dot-green' : 'step-dot-outline'" />
              <span class="text-h6 font-weight-medium">Upload CSV File</span>
              <span class="step-badge">Step 1 of 2</span>
            </div>
            <VIcon icon="tabler-chevron-up" size="20" class="text-medium-emphasis" />
          </div>

          <VDivider />

          <!-- ── STEP 0: Drop zone ── -->
          <div v-if="csvStep === 0" class="pa-5">
            <input
              id="csv-file-input"
              type="file"
              accept=".csv"
              style="display: none"
              @change="handleFileInput"
            />
            <div
              class="csv-dropzone"
              :class="{ 'csv-dropzone-active': isDraggingOver, 'csv-dropzone-filled': csvFile }"
              @dragover.prevent="isDraggingOver = true"
              @dragleave="isDraggingOver = false"
              @drop.prevent="handleFileDrop"
              @click="triggerFileInput"
            >
              <VIcon icon="tabler-upload" size="32" color="primary" class="mb-3" />
              <div v-if="!csvFile">
                <span class="text-primary font-weight-medium" style="cursor:pointer">Drag a File or click a browse</span>
                <p class="text-caption text-medium-emphasis mt-1 mb-0">File with up to 100 rows works best</p>
              </div>
              <div v-else>
                <span class="text-primary font-weight-medium">{{ csvFile.name }}</span>
                <p class="text-caption text-medium-emphasis mt-1 mb-0">{{ (csvFile.size / 1024).toFixed(1) }} KB</p>
              </div>
            </div>
            <div class="d-flex align-center gap-2 mt-3">
              <VIcon icon="tabler-download" size="15" color="primary" />
              <a href="#" class="text-caption text-primary download-sample-link">Download a sample file</a>
            </div>
          </div>

          <!-- ── STEP 1: Map Properties ── -->
          <div v-else class="pa-5">
            <VCard rounded="lg" elevation="0" class="map-card pa-5">
              <!-- Map header -->
              <div class="d-flex align-center justify-space-between mb-3">
                <div>
                  <p class="text-h6 font-weight-semibold mb-1">Map Properties</p>
                  <div class="d-flex align-center gap-1">
                    <VIcon icon="tabler-check" size="14" color="success" />
                    <span class="text-caption text-medium-emphasis">Make sure file includes contact name and phone number</span>
                  </div>
                </div>
                <VBtn icon variant="text" size="small" color="error">
                  <VIcon icon="tabler-trash" size="18" />
                </VBtn>
              </div>

              <VDivider class="mb-4" />

              <!-- 3-column mapping table -->
              <div class="map-columns">
                <!-- Contact Field -->
                <div class="map-col">
                  <p class="text-caption font-weight-semibold text-medium-emphasis mb-3 text-uppercase" style="letter-spacing:0.5px">Contact Field</p>
                  <div class="d-flex flex-column gap-2">
                    <div v-for="field in contactFields" :key="field.label" class="map-field-chip">
                      <VIcon icon="tabler-layout-list" size="15" color="success" class="me-2" />
                      <span class="text-body-2">{{ field.label }}</span>
                    </div>
                  </div>
                </div>

                <!-- CSV Column -->
                <div class="map-col">
                  <p class="text-caption font-weight-semibold text-medium-emphasis mb-3 text-uppercase" style="letter-spacing:0.5px">CSV Column</p>
                  <div class="d-flex flex-column gap-2">
                    <div v-for="col in csvColumns" :key="col.label" class="map-field-chip map-field-chip--csv">
                      <VIcon :icon="col.icon" size="15" class="me-2 text-medium-emphasis" />
                      <span class="text-body-2 flex-grow-1">{{ col.label }}</span>
                      <span class="map-count">({{ col.count }})</span>
                    </div>
                  </div>
                </div>

                <!-- Unmapped Works -->
                <div class="map-col map-col--unmapped">
                  <p class="text-caption font-weight-semibold text-medium-emphasis mb-3 text-uppercase" style="letter-spacing:0.5px">Unmapped Works</p>
                  <!-- Search -->
                  <VTextField
                    v-model="mapSearch"
                    placeholder="Search"
                    prepend-inner-icon="tabler-search"
                    variant="outlined"
                    density="compact"
                    hide-details
                    class="mb-3 map-search"
                  />
                  <div class="d-flex flex-column gap-2">
                    <div v-for="item in filteredUnmapped" :key="item.label" class="map-unmapped-row">
                      <VIcon icon="tabler-list-details" size="14" class="me-2 text-medium-emphasis" />
                      <span class="text-body-2 flex-grow-1">{{ item.label }} ({{ item.total }})</span>
                      <span class="map-count">({{ item.count }})</span>
                    </div>
                  </div>
                  <div class="d-flex justify-end mt-3">
                    <a href="#" class="text-caption text-primary" style="text-decoration:none; font-weight:500">Clear All Matched</a>
                  </div>
                </div>
              </div>
            </VCard>
          </div>
        </VCard>
      </VExpandTransition>
    </div>

    <!-- ── STEP 2: Sender Profiles ── -->
    <div v-show="currentStep === 1">
      <div class="sender-tabs mb-6">
        <div 
          class="sender-tab" 
          :class="{ 'tab-active': senderTab === 'linkedin' }"
          @click="senderTab = 'linkedin'"
        >
          LinkedIn Profile
        </div>
        <div 
          class="sender-tab" 
          :class="{ 'tab-active': senderTab === 'email' }"
          @click="senderTab = 'email'"
        >
          Email Accounts
        </div>
      </div>

      <VCard rounded="lg" elevation="0" class="sender-card">
        <!-- Card Header -->
        <div class="pa-6 d-flex align-center justify-space-between flex-wrap gap-4">
          <div class="d-flex align-center gap-3">
            <div class="linkedin-square-icon">
              <VIcon icon="tabler-brand-linkedin" color="white" size="20" />
            </div>
            <div>
              <h3 class="text-h6 font-weight-bold mb-0" style="color: #5D596C;">LinkedIn Profile</h3>
              <p class="text-body-2 text-medium-emphasis mb-0">Pick which LinkedIn profiles you want to use for this campaign.</p>
            </div>
          </div>
          <VBtn 
            class="add-account-btn text-none" 
            prepend-icon="tabler-plus"
            rounded="md"
          >
            Add Account
          </VBtn>
        </div>

        <VDivider />

        <!-- Table Filters -->
        <div class="pa-6 pt-8 pb-4 d-flex align-center justify-space-between flex-wrap gap-4">
          <div class="d-flex align-center gap-2">
            <span class="text-body-2 text-medium-emphasis">Show</span>
            <VSelect
              v-model="senderPerPage"
              :items="[10, 25, 50]"
              variant="plain"
              density="compact"
              hide-details
              class="per-page-select"
            />
          </div>
          <VTextField
            v-model="senderSearch"
            placeholder="Search"
            prepend-inner-icon="tabler-search"
            variant="outlined"
            density="compact"
            hide-details
            class="sender-search-input"
          />
        </div>

        <!-- Table Header -->
        <div class="sender-table-header px-6 py-3">
          <div class="d-flex align-center">
            <VCheckbox hide-details density="compact" class="me-4" />
            <div class="col-name text-uppercase font-weight-bold">NAME</div>
            <div class="col-health text-uppercase font-weight-bold text-center">HEALTH</div>
            <div class="col-limits text-uppercase font-weight-bold text-center">DAILY LIMITS</div>
            <div class="col-type text-uppercase font-weight-bold">ACCOUNT TYPE</div>
            <div class="col-status text-uppercase font-weight-bold text-center">STATUS</div>
          </div>
        </div>

        <!-- Table Body -->
        <div class="px-6 py-4">
          <div 
            v-for="account in senderAccounts" 
            :key="account.id"
            class="sender-table-row d-flex align-center"
          >
            <VCheckbox hide-details density="compact" class="me-4" />
            
            <!-- Name & Connections -->
            <div class="col-name d-flex align-center gap-3">
              <VAvatar size="40" :image="account.avatar" />
              <div>
                <div class="font-weight-bold text-body-1" style="color: #6F6B7D;">{{ account.name }}</div>
                <div class="text-caption text-medium-emphasis">{{ account.connections }}</div>
              </div>
            </div>

            <!-- Health Progress -->
            <div class="col-health d-flex justify-center">
              <div class="health-ring-wrap">
                <v-progress-circular
                  :model-value="account.health"
                  :rotate="360"
                  :size="42"
                  :width="4"
                  color="orange"
                >
                  <span class="text-caption font-weight-bold">{{ account.health }}</span>
                </v-progress-circular>
              </div>
            </div>

            <!-- Limits -->
            <div class="col-limits d-flex justify-center">
              <div class="limits-pill">
                {{ account.limits }}
              </div>
            </div>

            <!-- Type -->
            <div class="col-type d-flex align-center gap-2">
              <div class="type-icon">
                <VIcon icon="tabler-brand-linkedin" color="#FDB528" size="18" />
              </div>
              <span class="text-body-2 text-medium-emphasis">{{ account.type }}</span>
            </div>

            <!-- Status -->
            <div class="col-status d-flex justify-center">
              <VChip
                color="success"
                size="small"
                label
                class="status-chip font-weight-bold"
              >
                Connected
              </VChip>
            </div>
          </div>
        </div>
      </VCard>
    </div>

    <!-- ── STEP 3: Settings ── -->
    <div v-show="currentStep === 2">
      <VCard rounded="lg" elevation="0" class="settings-card pa-8">
        <!-- Campaign Name -->
        <div class="mb-8">
          <label class="text-h6 font-weight-bold d-block mb-2" style="color: #5D596C;">Campaign name</label>
          <VTextField
            v-model="campaignName"
            variant="outlined"
            density="comfortable"
            hide-details
            class="campaign-name-input"
          />
        </div>

        <!-- Sending Window & AI Assist Row -->
        <div class="d-flex flex-wrap gap-6 mb-8">
          <!-- Left: Sending Window -->
          <div class="flex-grow-1" style="min-width: 300px;">
            <label class="text-h6 font-weight-bold d-block mb-1" style="color: #5D596C;">Sending Window</label>
            <p class="text-caption text-medium-emphasis mb-4">Define when the campaign runs</p>
            
            <VCard variant="outlined" rounded="lg" class="pa-5 sending-window-box">
              <VSelect
                v-model="selectedSchedule"
                :items="['USA Outreach Time']"
                variant="outlined"
                density="compact"
                hide-details
                class="mb-4"
              />

              <div class="d-flex align-center gap-2 mb-4 flex-wrap">
                <div 
                  v-for="day in availableDays" 
                  :key="day"
                  class="day-toggle"
                  :class="{ 'day-active': selectedDays.includes(day) }"
                  @click="selectedDays.includes(day) ? selectedDays = selectedDays.filter(d => d !== day) : selectedDays.push(day)"
                >
                  {{ day }}
                </div>
                <VBtn icon variant="text" size="small" color="secondary" class="ms-auto">
                  <VIcon icon="tabler-trash" size="18" />
                </VBtn>
              </div>

              <div class="d-flex gap-3 mb-6">
                <VTextField
                  :model-value="`${startTime} - ${endTime}`"
                  variant="outlined"
                  density="compact"
                  hide-details
                  prepend-inner-icon="tabler-clock"
                  readonly
                  class="flex-grow-1"
                />
                <VTextField
                  v-model="timezone"
                  variant="outlined"
                  density="compact"
                  hide-details
                  readonly
                  class="flex-grow-1"
                />
              </div>

              <VBtn 
                variant="text" 
                color="primary" 
                class="text-none px-0" 
                prepend-icon="tabler-plus"
              >
                Add New Window
              </VBtn>
            </VCard>
          </div>

          <!-- Right: AI Assist -->
          <div class="flex-grow-1" style="min-width: 300px;">
            <VCard variant="outlined" rounded="lg" class="pa-5 ai-assist-card h-100">
              <div class="d-flex align-center justify-space-between mb-1">
                <div class="d-flex align-center gap-2">
                  <div class="ai-icon-wrap">
                    <VIcon icon="tabler-robot" size="18" color="white" />
                  </div>
                  <span class="text-h6 font-weight-bold" style="color: #5D596C;">AI Assist</span>
                  <span class="text-caption text-medium-emphasis ms-1">Optional</span>
                </div>
                <VBtn color="primary" class="text-none px-6" rounded="md">Train AI</VBtn>
              </div>
              <p class="text-caption text-medium-emphasis mb-6 ms-10">Define when the campaign runs</p>

              <!-- AI Toggles -->
              <div class="d-flex flex-column gap-6 ps-2">
                <div class="d-flex align-start gap-3">
                  <VIcon icon="tabler-messages" size="20" class="mt-1 text-primary" />
                  <div class="flex-grow-1">
                    <div class="d-flex align-center justify-space-between">
                      <span class="font-weight-bold" style="color: #5D596C;">Auto message after reply detected</span>
                      <VSwitch v-model="aiAutoMessage" hide-details density="compact" color="primary" />
                    </div>
                    <p class="text-caption text-medium-emphasis mb-0 mt-1">AI auto-replies to leads who message you back</p>
                  </div>
                </div>

                <div class="d-flex align-start gap-3">
                  <VIcon icon="tabler-arrow-forward-up" size="20" class="mt-1 text-primary" />
                  <div class="flex-grow-1">
                    <div class="d-flex align-center justify-space-between">
                      <div class="d-flex align-center gap-1">
                        <span class="font-weight-bold" style="color: #5D596C;">Auto handle leads after</span>
                        <div class="followup-count-input">{{ aiFollowupsCount }}</div>
                        <span class="font-weight-bold" style="color: #5D596C;">Follow-ups</span>
                      </div>
                      <VSwitch v-model="aiAutoHandle" hide-details density="compact" color="primary" />
                    </div>
                    <p class="text-caption text-medium-emphasis mb-0 mt-1">AI takes over after two follow-ups.</p>
                  </div>
                </div>
              </div>
            </VCard>
          </div>
        </div>

        <div class=" Zapier-trigger-section">
          <!-- Zapier Section -->
          <VCard variant="flat" border rounded="lg" class="zapier-main-card">
            <div class="pa-4 px-6 zapier-header d-flex align-center gap-2">
              <VCheckbox v-model="zapierEnabled" hide-details density="compact" color="primary" />
              <span class="font-weight-bold" style="color: #5D596C;">Select events to trigger zapier</span>
              <VIcon icon="tabler-info-circle" size="16" class="text-medium-emphasis" />
            </div>
            
            <VDivider />

            <div class="pa-6 px-6 zapier-events-grid">
              <div v-for="event in zapierEventList" :key="event" class="d-flex align-center gap-2">
                <VCheckbox
                  v-model="zapierEvents"
                  :value="event"
                  hide-details
                  density="compact"
                  color="primary"
                />
                <span class="text-body-2" style="color: #6F6B7D;">{{ event }}</span>
              </div>
            </div>

            <VDivider />

            <div class="pa-4 px-6 d-flex align-center gap-4">
              <span class="text-caption text-medium-emphasis">Works With</span>
              <div class="d-flex align-center gap-3">
                <img src="https://upload.wikimedia.org/wikipedia/commons/e/e4/Zapier_logo.svg" height="14" alt="Zapier" />
                <div style="width:1px; height:12px; background:#DEDEE0" />
                <span class="font-weight-bold" style="font-size: 11px; color: #5D596C">n8n</span>
                <div style="width:1px; height:12px; background:#DEDEE0" />
                <VIcon icon="tabler-webhook" size="14" class="me-1" />
                <span class="font-weight-semibold" style="font-size: 11px; color: #5D596C">webhooks</span>
              </div>
            </div>
          </VCard>

          <p class="text-caption text-medium-emphasis mt-4">
            If a lead answers your invite, message, or InMail, we stop sending further steps automatically. 
            <a href="#" class="text-primary text-decoration-none">Learn more</a>
          </p>
        </div>
      </VCard>
    </div>

    <!-- ── STEP 4: Stats ── -->
    <div v-show="currentStep === 3">
      <div class="stats-empty-state d-flex flex-column align-center justify-center py-16">
        <img 
          src="C:\Users\DELL\.gemini\antigravity\brain\36b7d573-457e-4529-b7e6-c794530b1661\stats_empty_state_illustration_1774352672325.png" 
          alt="No Stats"
          class="stats-img mb-6"
        />
        <h2 class="text-h4 font-weight-bold mb-2" style="color: #5D596C;">No Stats Yet</h2>
        <p class="text-body-1 text-medium-emphasis mb-8">Once Campaign is launched, Statistics will be shown here.</p>
        
        <VBtn
          class="primary-gradient-btn text-none px-12"
          rounded="md"
          size="large"
          prepend-icon="tabler-rocket"
          style="height: 54px; font-size: 1.1rem; box-shadow: 0 8px 20px rgba(115, 103, 240, 0.4) !important;"
          @click="handleLaunch"
        >
          Launch Campaign
        </VBtn>
      </div>
    </div>

    <!-- Footer Actions -->
    <div class="d-flex justify-end mt-6 gap-3">
      <VBtn
        variant="outlined"
        rounded="md"
        class="text-none px-8"
        color="secondary"
        size="large"
        @click="currentStep--"
      >
        Previous
      </VBtn>
      <VBtn
        v-if="currentStep < 3"
        class="primary-gradient-btn text-none px-12"
        rounded="md"
        size="large"
        @click="currentStep++"
      >
        Next
      </VBtn>
    </div>
  </div>
</template>

<style scoped>
.advance-campaign-wrapper {
  width: 100%;
  max-width: 100% !important;
}

/* ───── Stepper ───── */
.stepper-card {
  border: 1px solid rgba(var(--v-theme-on-surface), 0.08) !important;
  background-color: rgb(var(--v-theme-surface)) !important;
}

.stepper-row {
  display: flex;
  align-items: center;
  padding: 14px 24px;
  gap: 4px;
  overflow-x: auto;
}

.stepper-step {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 14px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s ease;
  white-space: nowrap;
}

.step-icon-wrap {
  width: 34px;
  height: 34px;
  border-radius: 8px;
  background-color: rgba(var(--v-theme-on-surface), 0.06);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(var(--v-theme-on-surface), 0.45);
  transition: all 0.25s ease;
  flex-shrink: 0;
}

.step-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: rgba(var(--v-theme-on-surface), 0.45);
  transition: color 0.25s ease;
}

.stepper-chevron {
  color: rgba(var(--v-theme-on-surface), 0.25);
  flex-shrink: 0;
}

/* Active step */
.step-active .step-icon-wrap {
  background: linear-gradient(180deg, #8BA6FF 0%, #3762EE 100%);
  color: #ffffff;
  box-shadow: 0 4px 10px rgba(55, 98, 238, 0.3);
}

.step-active .step-label {
  color: rgb(var(--v-theme-on-surface));
  font-weight: 600;
}

/* Done step */
.step-done .step-icon-wrap {
  background-color: rgba(55, 98, 238, 0.1);
  color: #3762EE;
}

.step-done .step-label {
  color: #3762EE;
}

/* ───── Import Section ───── */
.import-card {
  border: 1px solid rgba(var(--v-theme-on-surface), 0.08) !important;
  background-color: rgb(var(--v-theme-surface)) !important;
}

.import-header {
  cursor: pointer;
  transition: background 0.2s ease;
}

.import-header:hover {
  background-color: rgba(var(--v-theme-on-surface), 0.02);
}

.step-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid #3762EE;
  background: #fff;
  box-shadow: 0 0 0 3px rgba(55, 98, 238, 0.15);
}

/* ───── Import Grid ───── */
.import-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

@media (max-width: 960px) {
  .import-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .import-grid {
    grid-template-columns: 1fr;
  }
}

.import-option-card {
  position: relative;
  padding: 20px 16px;
  border: 1.5px solid rgba(var(--v-theme-on-surface), 0.1);
  border-radius: 10px;
  cursor: pointer;
  background-color: rgb(var(--v-theme-surface));
  transition: all 0.25s ease;
  overflow: hidden;
}

.import-option-card:hover {
  border-color: rgba(139, 166, 255, 0.5);
  box-shadow: 0 4px 16px rgba(55, 98, 238, 0.08);
  transform: translateY(-2px);
}

.import-option-card.import-selected {
  border-color: #3762EE;
  background-color: rgba(55, 98, 238, 0.03);
  box-shadow: 0 4px 16px rgba(55, 98, 238, 0.12);
}

.import-icon-wrap {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.import-title {
  font-size: 0.9rem;
  color: rgb(var(--v-theme-on-surface));
  line-height: 1.35;
}

.import-description {
  font-size: 0.78rem;
  line-height: 1.5;
}

/* Selected checkmark badge */
.import-check {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: linear-gradient(180deg, #8BA6FF 0%, #3762EE 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.fade-check-enter-active,
.fade-check-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-check-enter-from,
.fade-check-leave-to {
  opacity: 0;
  transform: scale(0.5);
}

/* ───── Next Button ───── */
.primary-gradient-btn {
  background: linear-gradient(180deg, #8BA6FF 0%, #3762EE 100%) !important;
  color: #ffffff !important;
  box-shadow: 0 4px 14px rgba(55, 98, 238, 0.3) !important;
  border: none !important;
  transition: all 0.3s ease;
}

.primary-gradient-btn:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 6px 18px rgba(55, 98, 238, 0.45) !important;
}

.primary-gradient-btn:disabled {
  opacity: 0.55;
  box-shadow: none !important;
}
/* ───── LinkedIn URL Section ───── */
.linkedin-url-box {
  border: 1px solid rgba(var(--v-theme-on-surface), 0.08) !important;
  background-color: rgba(var(--v-theme-on-surface), 0.01) !important;
}

.step-dot-outline {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid rgba(var(--v-theme-on-surface), 0.25);
  background: transparent;
}

.search-guide-link {
  text-decoration: none;
  white-space: nowrap;
  transition: opacity 0.2s;
}

.search-guide-link:hover {
  opacity: 0.7;
}

:deep(.linkedin-url-input .v-field__outline) {
  --v-field-border-opacity: 0.18;
}

.validate-btn {
  height: 40px !important;
  padding: 0 20px !important;
  white-space: nowrap;
  flex-shrink: 0;
}

.hint-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #3762EE;
  flex-shrink: 0;
}

/* ───── Step Badge ───── */
.step-badge {
  font-size: 0.72rem;
  font-weight: 500;
  color: #3762EE;
  background-color: rgba(55, 98, 238, 0.08);
  border: 1px solid rgba(55, 98, 238, 0.2);
  border-radius: 20px;
  padding: 2px 10px;
  white-space: nowrap;
}

/* ───── CSV Drop Zone ───── */
.csv-dropzone {
  border: 2px dashed rgba(55, 98, 238, 0.35);
  border-radius: 10px;
  background-color: rgba(55, 98, 238, 0.02);
  padding: 40px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  transition: all 0.25s ease;
  min-height: 140px;
}

.csv-dropzone:hover,
.csv-dropzone-active {
  border-color: #3762EE;
  background-color: rgba(55, 98, 238, 0.05);
}

.csv-dropzone-filled {
  border-color: #28c76f;
  background-color: rgba(40, 199, 111, 0.03);
}

.download-sample-link {
  text-decoration: none;
  font-weight: 500;
  transition: opacity 0.2s;
}

.download-sample-link:hover {
  opacity: 0.7;
  text-decoration: underline;
}

/* ───── Green completed dot ───── */
.step-dot-green {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: #28c76f;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 0 3px rgba(40, 199, 111, 0.18);
}

/* ───── Map Properties ───── */
.map-card {
  border: 1px solid rgba(var(--v-theme-on-surface), 0.08) !important;
  background-color: rgb(var(--v-theme-surface)) !important;
}

.map-columns {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 16px;
  align-items: start;
}

@media (max-width: 768px) {
  .map-columns {
    grid-template-columns: 1fr;
  }
}

.map-col--unmapped {
  border-left: 1px solid rgba(var(--v-theme-on-surface), 0.08);
  padding-left: 16px;
}

.map-field-chip {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  border: 1px solid rgba(var(--v-theme-on-surface), 0.1);
  border-radius: 6px;
  background-color: rgb(var(--v-theme-surface));
  font-size: 0.875rem;
  transition: border-color 0.2s ease;
}

.map-field-chip:hover {
  border-color: rgba(55, 98, 238, 0.3);
}

.map-field-chip--csv {
  background-color: rgba(var(--v-theme-on-surface), 0.01);
}

.map-count {
  font-size: 0.78rem;
  color: rgba(var(--v-theme-on-surface), 0.4);
  margin-left: 4px;
  white-space: nowrap;
}

.map-unmapped-row {
  display: flex;
  align-items: center;
  padding: 8px 10px;
  border-radius: 6px;
  border: 1px solid rgba(var(--v-theme-on-surface), 0.08);
  font-size: 0.875rem;
  background-color: rgba(var(--v-theme-on-surface), 0.01);
}

:deep(.map-search .v-field__outline) {
  --v-field-border-opacity: 0.15;
}

/* ───── Lookalikes Dialog ───── */
:deep(.lookalikes-dialog) {
  border-radius: 16px !important;
  overflow: hidden;
}

.lookalikes-card {
  border-radius: 16px !important;
  background-color: rgb(var(--v-theme-surface)) !important;
}

.lookalikes-header {
  background-color: rgba(var(--v-theme-on-surface), 0.01);
}

.lookalikes-close-btn {
  border: 1.5px solid rgba(var(--v-theme-on-surface), 0.18) !important;
  border-radius: 50% !important;
  width: 32px !important;
  height: 32px !important;
  color: rgba(var(--v-theme-on-surface), 0.5) !important;
  flex-shrink: 0;
}

.lookalikes-body {
  min-height: 280px;
}

/* List Item Styles */
.lookalike-list-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border: 1px solid #DEDEE0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: #F8F7FA;
}

.lookalike-list-item:hover {
  border-color: #7367F0;
  background-color: #F4F3FF;
}

.lookalike-list-item.item-selected {
  border-color: #7367F0;
  background-color: #F4F3FF;
  box-shadow: 0 0 0 1px #7367F0;
}

.lookalike-checkbox :deep(.v-selection-control) {
  min-height: unset;
}

.lookalike-checkbox :deep(.v-checkbox-btn) {
  padding: 0;
}

/* ───── Sender Profiles ───── */
.sender-tabs {
  display: flex;
  gap: 0;
  border-radius: 8px;
  overflow: hidden;
  width: fit-content;
  border: 1px solid #7367F0;
}

.sender-tab {
  padding: 10px 24px;
  cursor: pointer;
  font-weight: 500;
  color: #7367F0;
  background-color: transparent;
  transition: all 0.2s;
  min-width: 140px;
  text-align: center;
}

.sender-tab.tab-active {
  background-color: #7367F015;
  background: #7367f01a;
  color: #7367f0;
}

.sender-tab:first-child {
  border-right: 1px solid #7367F0;
}

.sender-card {
  border: 1px solid rgba(var(--v-theme-on-surface), 0.08) !important;
}

.linkedin-square-icon {
  width: 32px;
  height: 32px;
  background-color: #0077B5;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.add-account-btn {
  background: #7367F0 !important;
  color: white !important;
  font-weight: 600 !important;
}

.per-page-select {
  width: 70px;
}

.sender-search-input {
  max-width: 200px;
}

.sender-table-header {
  background-color: #F8F7FA;
  border-top: 1px solid rgba(var(--v-theme-on-surface), 0.08);
  border-bottom: 1px solid rgba(var(--v-theme-on-surface), 0.08);
  color: #5D596C;
  font-size: 0.8rem;
  letter-spacing: 0.5px;
}

.sender-table-row {
  border-bottom: 1px solid rgba(var(--v-theme-on-surface), 0.05);
  padding: 12px 0;
}

.sender-table-row:last-child {
  border-bottom: none;
}

/* Column Widths */
.col-name { width: 30%; }
.col-health { width: 15%; }
.col-limits { width: 25%; }
.col-type { width: 15%; }
.col-status { width: 15%; }

.limits-pill {
  border: 1px solid #DEDEE0;
  border-radius: 4px;
  padding: 4px 16px;
  font-size: 0.875rem;
  color: #5D596C;
  background-color: white;
}

.type-icon {
  width: 24px;
  height: 24px;
  background-color: #FDB52815;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

:deep(.status-chip) {
  height: 24px;
}

.health-ring-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ───── Settings Step ───── */
.settings-card {
  border: 1px solid rgba(var(--v-theme-on-surface), 0.08) !important;
}

.campaign-name-input :deep(.v-field__outline) {
  --v-field-border-opacity: 0.15;
}

.sending-window-box {
  border: 1px solid #DEDEE0 !important;
}

.day-toggle {
  padding: 6px 12px;
  border: 1px solid #7367F0;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
  color: #7367F0;
  cursor: pointer;
  transition: all 0.2s;
  background-color: transparent;
}

.day-toggle.day-active {
  background-color: #7367F015;
  background: #7367f01a;
  color: #7367f0;
}

.day-toggle:not(.day-active) {
  border-color: #DEDEE0;
  color: #A5A3AE;
}

.ai-assist-card {
  border: 1px solid #DEDEE0 !important;
}

.ai-icon-wrap {
  width: 28px;
  height: 28px;
  background: #7367F0;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.followup-count-input {
  width: 32px;
  height: 32px;
  border: 1px solid #DEDEE0;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #5D596C;
  margin: 0 4px;
}

.zapier-main-card {
  background-color: #F8F7FA !important;
}

.zapier-header {
  background-color: #7367F008;
}

.zapier-events-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 16px;
  background-color: white;
}

/* ───── Stats Step ───── */
.stats-img {
  width: 100%;
  max-width: 400px;
  opacity: 0.85;
}

.stats-empty-state {
  min-height: 500px;
}
</style>
