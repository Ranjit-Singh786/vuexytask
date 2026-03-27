// Step 1: Define Target Audience — checklist lines with checkmarks
export function TargetIcon({ color = 'currentColor' } = {}) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.25 4.5H15.75"  stroke={color} strokeWidth="1.125" strokeLinecap="round" />
      <path d="M8.25 9H15.75"    stroke={color} strokeWidth="1.125" strokeLinecap="round" />
      <path d="M8.25 13.5H15.75" stroke={color} strokeWidth="1.125" strokeLinecap="round" />
      <path d="M2.25 5.54464C2.25 5.54464 3 6.03349 3.375 6.75C3.375 6.75 4.5 3.9375 6 3"
        stroke={color} strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2.25 13.7947C2.25 13.7947 3 14.2835 3.375 15C3.375 15 4.5 12.1875 6 11.25"
        stroke={color} strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// Step 2: Sender Profiles — user silhouette (head + full shoulder arc)
export function SenderIcon({ color = 'currentColor' } = {}) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="9" cy="6" r="3" stroke={color} strokeWidth="1.125" />
      <path d="M2.25 15.75C2.25 12.4363 5.27208 9.75 9 9.75C12.7279 9.75 15.75 12.4363 15.75 15.75"
        stroke={color} strokeWidth="1.125" strokeLinecap="round" />
    </svg>
  )
}

// Step 3: Settings — gear / cog
export function SettingsIcon({ color = 'currentColor' } = {}) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M15.9881 5.35604L15.6179 4.71359C15.3379 4.22772 15.198 3.98479 14.9598 3.88791C14.7216 3.79104 14.4522 3.86748 13.9135 4.02036L12.9983 4.27814C12.6544 4.35746 12.2935 4.31246 11.9794 4.15109L11.7268 4.00532C11.4574 3.83282 11.2503 3.5785 11.1356 3.27956L10.8852 2.53152C10.7205 2.03651 10.6381 1.789 10.4421 1.64743C10.2461 1.50586 9.98572 1.50586 9.46492 1.50586H8.62882C8.1081 1.50586 7.8477 1.50586 7.65165 1.64743C7.45564 1.789 7.37329 2.03651 7.20862 2.53152L6.95815 3.27956C6.84349 3.5785 6.63634 3.83282 6.36703 4.00532L6.11437 4.15109C5.8003 4.31246 5.43944 4.35746 5.09548 4.27814L4.18031 4.02036C3.64156 3.86748 3.37219 3.79104 3.134 3.88791C2.89582 3.98479 2.75584 4.22772 2.47586 4.71359L2.10568 5.35604C1.84324 5.81148 1.71202 6.0392 1.73749 6.28162C1.76296 6.52403 1.93862 6.71939 2.28994 7.11009L3.06322 7.9746C3.25222 8.21385 3.38641 8.63085 3.38641 9.00578C3.38641 9.38085 3.25227 9.7977 3.06325 10.037L2.28994 10.9016C1.93862 11.2923 1.76296 11.4876 1.73749 11.7301C1.71202 11.9725 1.84324 12.2002 2.10568 12.6556L2.47585 13.298C2.75582 13.7839 2.89582 14.0269 3.134 14.1237C3.37219 14.2206 3.64156 14.1442 4.18033 13.9913L5.09545 13.7335C5.43947 13.6541 5.8004 13.6992 6.1145 13.8606L6.36712 14.0064C6.63638 14.1789 6.84348 14.4332 6.95812 14.7321L7.20862 15.4802C7.37329 15.9752 7.45564 16.2227 7.65165 16.3643C7.8477 16.5059 8.1081 16.5059 8.62882 16.5059H9.46492C9.98572 16.5059 10.2461 16.5059 10.4421 16.3643C10.6381 16.2227 10.7205 15.9752 10.8852 15.4802L11.1357 14.7321C11.2503 14.4332 11.4574 14.1789 11.7267 14.0064L11.9793 13.8606C12.2934 13.6992 12.6543 13.6541 12.9983 13.7335L13.9135 13.9913C14.4522 14.1442 14.7216 14.2206 14.9598 14.1237C15.198 14.0269 15.3379 13.7839 15.6179 13.298L15.9881 12.6556C16.2505 12.2002 16.3817 11.9725 16.3563 11.7301C16.3308 11.4876 16.1551 11.2923 15.8038 10.9016L15.0305 10.037C14.8415 9.7977 14.7073 9.38085 14.7073 9.00578C14.7073 8.63085 14.8416 8.21385 15.0305 7.9746L15.8038 7.11009C16.1551 6.71939 16.3308 6.52403 16.3563 6.28162C16.3817 6.0392 16.2505 5.81148 15.9881 5.35604Z"
        stroke={color} strokeWidth="1.125" strokeLinecap="round"
      />
      <path
        d="M11.6406 9C11.6406 10.4497 10.4654 11.625 9.0156 11.625C7.56585 11.625 6.39062 10.4497 6.39062 9C6.39062 7.55025 7.56585 6.375 9.0156 6.375C10.4654 6.375 11.6406 7.55025 11.6406 9Z"
        stroke={color} strokeWidth="1.125"
      />
    </svg>
  )
}

// Step 4: Stats — speedometer / analytics
export function StatsIcon({ color = 'currentColor' } = {}) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1.875 8.99998C1.875 5.64124 1.875 3.96186 2.91843 2.91843C3.96187 1.875 5.64124 1.875 9 1.875C12.3587 1.875 14.0381 1.875 15.0816 2.91843C16.125 3.96186 16.125 5.64124 16.125 8.99998C16.125 12.3588 16.125 14.0381 15.0816 15.0816C14.0381 16.125 12.3587 16.125 9 16.125C5.64124 16.125 3.96187 16.125 2.91843 15.0816C1.875 14.0381 1.875 12.3588 1.875 8.99998Z"
        stroke={color} strokeWidth="1.125"
      />
      <path d="M1.875 6.75H16.125" stroke={color} strokeWidth="1.125" strokeLinejoin="round" />
      <path d="M5.25 4.5H5.25673"  stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8.25 4.5H8.25675"  stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12.75 12.75C12.75 10.679 11.071 9 9 9C6.92893 9 5.25 10.679 5.25 12.75"
        stroke={color} strokeWidth="1.125" strokeLinecap="round" />
      <path d="M9.5294 11.4688L8.46875 12.5294"
        stroke={color} strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
