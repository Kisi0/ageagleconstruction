/*=============== NAV DROPDOWN ===============*/
const navDropdown = document.querySelector('.nav__dropdown')
const navDropdownToggle = document.querySelector('.nav__dropdown-toggle')

if(navDropdownToggle){
   navDropdownToggle.addEventListener('click', (e) => {
      e.preventDefault()
      navDropdown.classList.toggle('open')
   })

   document.addEventListener('click', (e) => {
      if(!navDropdown.contains(e.target)){
         navDropdown.classList.remove('open')
      }
   })
}

/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/* Menu show */
if(navToggle){
   navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
   })
}

/* Menu hidden */
if(navClose){
   navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
   })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link:not(.nav__dropdown-toggle), .nav__dropdown-link')

const linkAction = () =>{
   const navMenu = document.getElementById('nav-menu')
   navMenu.classList.remove('show-menu')
   if(navDropdown) navDropdown.classList.remove('open')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== CHANGE BACKGROUND HEADER ===============*/
const bgHeader = () =>{
   const header = document.getElementById('header')
   // Add a class if the bottom offset is greater than 50 of the viewport
   this.scrollY >= 50 ? header.classList.add('bg-header') 
                      : header.classList.remove('bg-header')
}
window.addEventListener('scroll', bgHeader)
bgHeader()

/*=============== SWIPER SERVICES ===============*/
if(typeof Swiper !== 'undefined' && document.querySelector('.services__swiper')){
   new Swiper('.services__swiper', {
      loop: true,
      grabCursor: true,
      spaceBetween: 24,
      slidesPerView: 'auto',

      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
   })
}

/*=============== CONTACT FLOAT BUTTON ===============*/
const contactFloatBtn = document.getElementById('contact-float-btn')
const contactModal = document.getElementById('contact-modal')
const contactModalClose = document.getElementById('contact-modal-close')

if(contactFloatBtn && contactModal && contactModalClose){
   // Always show float button
   contactFloatBtn.classList.add('show-contact')

   // Open modal
   contactFloatBtn.addEventListener('click', () => {
      contactModal.classList.add('active')
      document.body.style.overflow = 'hidden'
   })

   // Close modal with X button
   contactModalClose.addEventListener('click', () => {
      contactModal.classList.remove('active')
      document.body.style.overflow = ''
   })

   // Close modal clicking outside content
   contactModal.addEventListener('click', (e) => {
      if(e.target === contactModal){
         contactModal.classList.remove('active')
         document.body.style.overflow = ''
      }
   })
}

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')
    
const scrollActive = () =>{
  	const scrollDown = window.scrollY

	sections.forEach(current =>{
		const sectionHeight = current.offsetHeight,
			  sectionTop = current.offsetTop - 58,
			  sectionId = current.getAttribute('id'),
			  sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

		if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
			sectionsClass.classList.add('active-link')
		}else{
			sectionsClass.classList.remove('active-link')
		}                                                    
	})
}
window.addEventListener('scroll', scrollActive)

/*=============== AJAX CONTACT FORMS ===============*/
const ajaxForms = document.querySelectorAll('form[action*="formsubmit.co"]')

ajaxForms.forEach(form => {
   const feedback = form.querySelector('.form-feedback')
   const submitBtn = form.querySelector('button[type="submit"]')
   const submitBtnLabel = submitBtn ? submitBtn.querySelector('span') : null
   const originalLabel = submitBtnLabel ? submitBtnLabel.textContent : ''

   form.addEventListener('submit', (e) => {
      e.preventDefault()

      if(feedback){
         feedback.textContent = ''
         feedback.className = 'form-feedback'
      }
      if(submitBtn){
         submitBtn.disabled = true
      }
      if(submitBtnLabel){
         submitBtnLabel.textContent = 'Sending...'
      }

      const ajaxUrl = form.action.replace('formsubmit.co/', 'formsubmit.co/ajax/')

      fetch(ajaxUrl, {
         method: 'POST',
         body: new FormData(form),
         headers: { 'Accept': 'application/json' }
      })
      .then(response => {
         if(!response.ok) throw new Error('Request failed')
         return response.json()
      })
      .then(() => {
         if(feedback){
            feedback.textContent = 'Thank you! Your message has been sent. We will get back to you shortly.'
            feedback.className = 'form-feedback form-feedback--success'
         }
         form.reset()
      })
      .catch(() => {
         if(feedback){
            feedback.textContent = 'Something went wrong and your message could not be sent. Please call us at (267) 982-7908 or email ageagleconstructionllc@gmail.com directly.'
            feedback.className = 'form-feedback form-feedback--error'
         }
      })
      .finally(() => {
         if(submitBtn){
            submitBtn.disabled = false
         }
         if(submitBtnLabel){
            submitBtnLabel.textContent = originalLabel
         }
      })
   })
})

/*=============== VIDEO SHOWCASE LIGHTBOX ===============*/
const videoCards = document.querySelectorAll('.video-card')
const videoLightbox = document.getElementById('video-lightbox')
const videoLightboxPlayer = document.getElementById('video-lightbox-player')
const videoLightboxClose = document.getElementById('video-lightbox-close')

if(videoLightbox && videoLightboxPlayer && videoCards.length){
   const openVideo = (src, poster) => {
      videoLightboxPlayer.setAttribute('src', src)
      if(poster) videoLightboxPlayer.setAttribute('poster', poster)
      videoLightbox.classList.add('active')
      document.body.style.overflow = 'hidden'
      videoLightboxPlayer.play().catch(() => {})
   }

   const closeVideo = () => {
      videoLightbox.classList.remove('active')
      videoLightboxPlayer.pause()
      videoLightboxPlayer.removeAttribute('src')
      videoLightboxPlayer.load()
      document.body.style.overflow = ''
   }

   videoCards.forEach(card => {
      card.addEventListener('click', () => {
         const src = card.getAttribute('data-video')
         const poster = card.querySelector('.video-card__poster')
         openVideo(src, poster ? poster.src : null)
      })

      card.addEventListener('keydown', (e) => {
         if(e.key === 'Enter' || e.key === ' '){
            e.preventDefault()
            card.click()
         }
      })
   })

   videoLightboxClose.addEventListener('click', closeVideo)
   videoLightbox.addEventListener('click', (e) => {
      if(e.target === videoLightbox) closeVideo()
   })
}

/*=============== BEFORE/AFTER COMPARE SLIDER ===============*/
const compareSlider = document.getElementById('roof-compare')

if(compareSlider){
   const beforeImg = compareSlider.querySelector('.compare-slider__img--before')
   const handle = document.getElementById('roof-compare-handle')
   let dragging = false

   const setPosition = (percent) => {
      const clamped = Math.min(100, Math.max(0, percent))
      beforeImg.style.clipPath = `inset(0 ${100 - clamped}% 0 0)`
      handle.style.left = `${clamped}%`
      handle.setAttribute('aria-valuenow', Math.round(clamped))
   }

   const moveFromEvent = (e) => {
      const rect = compareSlider.getBoundingClientRect()
      const x = e.clientX - rect.left
      setPosition((x / rect.width) * 100)
   }

   compareSlider.addEventListener('pointerdown', (e) => {
      dragging = true
      moveFromEvent(e)
   })

   window.addEventListener('pointermove', (e) => {
      if(dragging) moveFromEvent(e)
   })

   window.addEventListener('pointerup', () => {
      dragging = false
   })

   handle.addEventListener('keydown', (e) => {
      const current = parseFloat(handle.style.left) || 50
      if(e.key === 'ArrowLeft'){
         setPosition(current - 5)
      }else if(e.key === 'ArrowRight'){
         setPosition(current + 5)
      }
   })
}

/*=============== STATS STRIP ===============*/
const stats = document.querySelector('.stats')

if(stats){
   const track = stats.querySelector('.stats__track')
   const group = stats.querySelector('.stats__group')
   const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

   /* Fix widths so counting and changing names don't shift the strip */
   group.querySelectorAll('.stats__number').forEach(el =>{
      el.style.minWidth = el.offsetWidth + 'px'
   })

   const service = group.querySelector('.stats__service')
   const serviceNames = service ? service.dataset.services.split(',') : []
   if(service){
      let maxWidth = 0
      serviceNames.forEach(name =>{
         service.textContent = name
         maxWidth = Math.max(maxWidth, service.offsetWidth)
      })
      service.textContent = serviceNames[0]
      service.style.width = maxWidth + 'px'
   }

   /* Rotate service names every 2 seconds */
   if(serviceNames.length > 1){
      let serviceIndex = 0
      setInterval(() =>{
         serviceIndex = (serviceIndex + 1) % serviceNames.length
         stats.querySelectorAll('.stats__service').forEach(el =>{
            el.classList.add('is-changing')
            setTimeout(() =>{
               el.textContent = serviceNames[serviceIndex]
               el.classList.remove('is-changing')
            }, 300)
         })
      }, 2000)
   }

   if(!reduceMotion){
      /* Moving strip: fill each half of the track wider than the screen */
      const buildMarquee = () =>{
         track.querySelectorAll('.stats__group[aria-hidden]').forEach(clone => clone.remove())
         stats.classList.add('stats--marquee')

         const groupWidth = group.offsetWidth
         const copiesPerHalf = Math.max(1, Math.ceil(window.innerWidth / groupWidth))

         for(let i = 1; i < copiesPerHalf * 2; i++){
            const clone = group.cloneNode(true)
            clone.setAttribute('aria-hidden', 'true')
            track.appendChild(clone)
         }

         const pixelsPerSecond = 50
         stats.style.setProperty('--stats-duration', (groupWidth * copiesPerHalf / pixelsPerSecond) + 's')
      }

      buildMarquee()

      let lastWidth = window.innerWidth
      let resizeTimer
      window.addEventListener('resize', () =>{
         clearTimeout(resizeTimer)
         resizeTimer = setTimeout(() =>{
            if(window.innerWidth > lastWidth) buildMarquee()
            lastWidth = window.innerWidth
         }, 200)
      })

      /* Count numbers up slowly when the strip comes into view */
      if('IntersectionObserver' in window){
         const countUp = (el) =>{
            const target = +el.dataset.target
            const suffix = el.dataset.suffix || ''
            const duration = 3500
            const start = performance.now()

            const step = (now) =>{
               const progress = Math.min((now - start) / duration, 1)
               const eased = 1 - Math.pow(1 - progress, 3)
               el.textContent = Math.round(target * eased) + suffix
               if(progress < 1) requestAnimationFrame(step)
            }
            requestAnimationFrame(step)
         }

         stats.querySelectorAll('.stats__number').forEach(el =>{
            el.textContent = '0' + (el.dataset.suffix || '')
         })

         const statsObserver = new IntersectionObserver((entries, observer) =>{
            if(entries[0].isIntersecting){
               stats.querySelectorAll('.stats__number').forEach(countUp)
               observer.disconnect()
            }
         }, {threshold: 0.3})

         statsObserver.observe(stats)
      }
   }
}

/*=============== SCROLL REVEAL ANIMATION ===============*/
if(typeof ScrollReveal !== 'undefined'){
   const sr = ScrollReveal({
      origin: 'top',
      distance: '20px',
      duration: 300,
      delay: 0,
      viewFactor: 0.05,
      reset: false,
   })

   sr.reveal(`.home__content, .services__data, .services__swiper, .footer__container`)
   sr.reveal(`.home__images`, {origin: 'bottom', delay: 80})
   sr.reveal(`.about__images, .contact__img`, {origin: 'left'})
   sr.reveal(`.about__data, .contact__data`, {origin: 'right'})
   sr.reveal(`.projects__card`, {interval: 30})
   sr.reveal(`.video-card`, {interval: 30})
}
