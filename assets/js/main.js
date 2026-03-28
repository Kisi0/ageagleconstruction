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
const navLink = document.querySelectorAll('.nav__link:not(.nav__dropdown-toggle)')

const linkAction = () =>{
   const navMenu = document.getElementById('nav-menu')
   navMenu.classList.remove('show-menu')
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

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
   origin: 'top',
   distance: '100px',
   duration: 1500,
   delay: 300,
})

sr.reveal(`.home__content, .services__data, .services__swiper, .footer__container`)
sr.reveal(`.home__images`, {origin: 'bottom', delay: 1000})
sr.reveal(`.about__images, .contact__img`, {origin: 'left'})
sr.reveal(`.about__data, .contact__data`, {origin: 'right'})
sr.reveal(`.projects__card`, {interval: 100})
