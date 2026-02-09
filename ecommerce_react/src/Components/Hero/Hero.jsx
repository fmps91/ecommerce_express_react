import React from 'react'
import './Hero.css'
import hand_icon from '../../assets/hand_icon.png'
import arrow_icon from '../../assets/arrow.png'
import hero_image from '../../assets/hero_image.png' 

function Hero() {
  // Importar todas las imágenes de la carpeta assets
  let images = process.env.NODE_ENV === "development" ? import.meta.glob('../../assets/*.png', { 
    eager: true, 
    query: '?url',
    import: 'default'
  }) : import.meta.glob('/src/assets/*.png', { 
    eager: true, 
     query: '?url',
    import: 'default'
  })
  
  const icons = process.env.NODE_ENV === "development" ? {
    hand: images['../../assets/hand_icon.png'],
    arrow: images['../../assets/arrow.png'],
    hero: images['../../assets/hero_image.png']
  } : {
    hand: images['/src/assets/hand_icon.png'],
    arrow: images['/src/assets/arrow.png'],
    hero: images['/src/assets/hero_image.png']
  }

  return (
    <div className='hero'>
      <div className="hero-left">
        <h2>NEW ARRIVALS ONLY</h2>
        <div>
          <div className="hero-hand-icon">
            <p>new</p>
            <img src={icons.hand} alt="" />
          </div>
          <p>collections</p>
          <p>for everyone</p>
        </div>
        <div className="hero-lastest-btn">
          <div>Latest Collection</div>
          <img src={icons.arrow} alt="" />
        </div> 
      </div>
      <div className="hero-right">
        <img src={icons.hero} alt="" />
      </div>
    </div>
  );
}

export default Hero